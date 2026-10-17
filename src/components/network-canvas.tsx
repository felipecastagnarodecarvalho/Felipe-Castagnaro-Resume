import { useEffect, useRef } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  /** Twinkle phase, so nodes pulse out of step with each other. */
  phase: number
}

interface Pulse {
  a: Node
  b: Node
  t: number
  speed: number
}

interface Palette {
  /** "r, g, b" so alpha can be applied per draw. */
  node: string
  core: string
  link: string
  glow: string
  pulse: string
  /** Additive blending reads as light on dark, but washes out on white. */
  blend: GlobalCompositeOperation
}

const PALETTES: Record<"light" | "dark", Palette> = {
  light: {
    node: "30, 140, 205",
    core: "255, 255, 255",
    link: "30, 140, 205",
    glow: "46, 170, 230",
    pulse: "15, 94, 168",
    blend: "source-over",
  },
  dark: {
    node: "110, 205, 245",
    core: "225, 250, 255",
    link: "70, 190, 240",
    glow: "127, 227, 218",
    pulse: "160, 255, 240",
    blend: "lighter",
  },
}

/** Distance (in px) below which two nodes are drawn as connected. */
const LINK_DISTANCE = 128
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE
const POINTER_RADIUS = 180
const MAX_NODES = 120
const MAX_NODES_MOBILE = 55
const MIN_NODES = 24
/** Area per node; the count scales with canvas size. */
const NODE_AREA = 8500
const MAX_PULSES = 9
/**
 * Links are bucketed by opacity and stroked once per bucket, so the frame
 * costs a handful of draw calls instead of one per line.
 */
const ALPHA_BUCKETS = 6

function readPalette(): Palette {
  const isDark = document.documentElement.classList.contains("dark")
  return isDark ? PALETTES.dark : PALETTES.light
}

/** A soft radial halo rendered once and stamped with drawImage per node. */
function makeGlowSprite(rgb: string): HTMLCanvasElement {
  const size = 64
  const sprite = document.createElement("canvas")
  sprite.width = size
  sprite.height = size
  const ctx = sprite.getContext("2d")
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, `rgba(${rgb}, 0.9)`)
    g.addColorStop(0.25, `rgba(${rgb}, 0.35)`)
    g.addColorStop(1, `rgba(${rgb}, 0)`)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
  }
  return sprite
}

/**
 * The banner graphic is a real node/link simulation rather than a decorative
 * loop: the pointer pulls nearby nodes toward it, and light pulses travel along
 * the links. It pauses when hidden or scrolled away and stays static (but
 * legible) when the visitor prefers reduced motion.
 */
export function NetworkCanvas({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mobileQuery = window.matchMedia("(max-width: 767px)")

    let nodes: Node[] = []
    let pulses: Pulse[] = []
    let width = 0
    let height = 0
    let dpr = 1
    let rafId = 0
    let running = false
    let onScreen = true
    let time = 0
    let palette = readPalette()
    let glowSprite = makeGlowSprite(palette.glow)
    const buckets: number[][] = Array.from({ length: ALPHA_BUCKETS }, () => [])
    const pointer = { x: 0, y: 0, active: false }

    const seed = () => {
      const mobile = mobileQuery.matches
      const density = mobile ? NODE_AREA * 1.4 : NODE_AREA
      const count = Math.max(
        MIN_NODES,
        Math.min(mobile ? MAX_NODES_MOBILE : MAX_NODES, Math.round((width * height) / density)),
      )
      nodes = Array.from({ length: count }, (_, i) => {
        // R2 low-discrepancy sequence: an even, deterministic spread that never
        // lines up into rows or diagonals however many nodes there are.
        const gx = (0.5 + i * 0.7548776662) % 1
        const gy = (0.5 + i * 0.5698402910) % 1
        return {
          x: gx * width,
          y: gy * height,
          vx: ((i % 5) - 2) * 0.11,
          vy: ((i % 3) - 1) * 0.1,
          r: 1.4 + ((i * 7) % 5) * 0.4,
          phase: (i * 2.399) % (Math.PI * 2),
        }
      })
      pulses = []
    }

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      width = Math.max(320, rect.width)
      height = Math.max(320, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
      draw()
    }

    const drawLinks = () => {
      for (const bucket of buckets) bucket.length = 0

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq > LINK_DISTANCE_SQ) continue
          const strength = 1 - Math.sqrt(distSq) / LINK_DISTANCE
          const index = Math.min(ALPHA_BUCKETS - 1, Math.floor(strength * ALPHA_BUCKETS))
          buckets[index].push(i, j)
        }
      }

      ctx.lineWidth = 1
      for (let k = 0; k < ALPHA_BUCKETS; k++) {
        const pairs = buckets[k]
        if (pairs.length === 0) continue
        const alpha = ((k + 1) / ALPHA_BUCKETS) * 0.85
        ctx.strokeStyle = `rgba(${palette.link}, ${alpha.toFixed(3)})`
        ctx.beginPath()
        for (let p = 0; p < pairs.length; p += 2) {
          const a = nodes[pairs[p]]
          const b = nodes[pairs[p + 1]]
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
        }
        ctx.stroke()
      }
    }

    const spawnPulse = () => {
      if (pulses.length >= MAX_PULSES || nodes.length < 2) return
      const a = nodes[Math.floor(Math.random() * nodes.length)]
      let best: Node | null = null
      let bestDist = LINK_DISTANCE_SQ
      for (const b of nodes) {
        if (b === a) continue
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d = dx * dx + dy * dy
        // Prefer a longer link so the pulse has room to travel.
        if (d < bestDist && d > LINK_DISTANCE_SQ * 0.15) {
          best = b
          bestDist = d
        }
      }
      if (best) pulses.push({ a, b: best, t: 0, speed: 0.012 + Math.random() * 0.014 })
    }

    const drawPulses = () => {
      pulses = pulses.filter((pulse) => {
        pulse.t += pulse.speed
        const dx = pulse.a.x - pulse.b.x
        const dy = pulse.a.y - pulse.b.y
        if (pulse.t >= 1 || dx * dx + dy * dy > LINK_DISTANCE_SQ) return false
        const x = pulse.a.x + (pulse.b.x - pulse.a.x) * pulse.t
        const y = pulse.a.y + (pulse.b.y - pulse.a.y) * pulse.t
        ctx.drawImage(glowSprite, x - 14, y - 14, 28, 28)
        ctx.fillStyle = `rgba(${palette.pulse}, 1)`
        ctx.beginPath()
        ctx.arc(x, y, 1.8, 0, Math.PI * 2)
        ctx.fill()
        return true
      })
    }

    const drawNodes = () => {
      // Halos first, in one pass, then the solid dots on top.
      for (const node of nodes) {
        const twinkle = 0.55 + 0.45 * Math.sin(time * 0.03 + node.phase)
        const size = node.r * 9 * (0.7 + twinkle * 0.5)
        ctx.globalAlpha = 0.35 + twinkle * 0.5
        ctx.drawImage(glowSprite, node.x - size / 2, node.y - size / 2, size, size)
      }
      ctx.globalAlpha = 1

      ctx.fillStyle = `rgba(${palette.node}, 0.95)`
      ctx.beginPath()
      for (const node of nodes) {
        ctx.moveTo(node.x + node.r, node.y)
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
      }
      ctx.fill()

      ctx.fillStyle = `rgba(${palette.core}, 0.9)`
      ctx.beginPath()
      for (const node of nodes) {
        if (node.r < 2.4) continue
        ctx.moveTo(node.x + node.r * 0.45, node.y)
        ctx.arc(node.x, node.y, node.r * 0.45, 0, Math.PI * 2)
      }
      ctx.fill()
    }

    const drawPointer = () => {
      if (!pointer.active) return
      ctx.lineWidth = 1.2
      for (const node of nodes) {
        const dist = Math.hypot(node.x - pointer.x, node.y - pointer.y)
        if (dist > POINTER_RADIUS) continue
        const alpha = (1 - dist / POINTER_RADIUS) * 0.85
        ctx.strokeStyle = `rgba(${palette.link}, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(pointer.x, pointer.y)
        ctx.lineTo(node.x, node.y)
        ctx.stroke()
      }
      const size = POINTER_RADIUS * 1.2
      ctx.globalAlpha = 0.6
      ctx.drawImage(glowSprite, pointer.x - size / 2, pointer.y - size / 2, size, size)
      ctx.globalAlpha = 1
    }

    const draw = () => {
      ctx.globalCompositeOperation = "source-over"
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = palette.blend
      drawLinks()
      drawPointer()
      drawPulses()
      drawNodes()
      ctx.globalCompositeOperation = "source-over"
    }

    const step = () => {
      time++
      for (const node of nodes) {
        if (pointer.active) {
          const dx = pointer.x - node.x
          const dy = pointer.y - node.y
          const dist = Math.hypot(dx, dy)
          if (dist < POINTER_RADIUS && dist > 0.001) {
            const pull = ((POINTER_RADIUS - dist) / POINTER_RADIUS) * 0.05
            node.vx += (dx / dist) * pull
            node.vy += (dy / dist) * pull
          }
        }

        node.vx *= 0.995
        node.vy *= 0.995
        node.vx = Math.max(-0.9, Math.min(0.9, node.vx))
        node.vy = Math.max(-0.9, Math.min(0.9, node.vy))
        node.x += node.vx
        node.y += node.vy

        if (node.x < -12) node.x = width + 12
        if (node.x > width + 12) node.x = -12
        if (node.y < -12) node.y = height + 12
        if (node.y > height + 12) node.y = -12
      }

      if (time % 18 === 0) spawnPulse()
      draw()
      rafId = window.requestAnimationFrame(step)
    }

    const syncPlayback = () => {
      const shouldRun = !reduceQuery.matches && !document.hidden && onScreen
      if (shouldRun && !running) {
        running = true
        cancelAnimationFrame(rafId)
        rafId = window.requestAnimationFrame(step)
      } else if (!shouldRun && running) {
        running = false
        cancelAnimationFrame(rafId)
        rafId = 0
        draw()
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = pointer.y >= 0 && pointer.y <= rect.height
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    const onThemeChange = () => {
      palette = readPalette()
      glowSprite = makeGlowSprite(palette.glow)
      if (!running) draw()
    }

    const themeObserver = new MutationObserver(onThemeChange)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrap)

    // No frames are spent once the banner has scrolled out of view.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      syncPlayback()
    })
    visibilityObserver.observe(wrap)

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onPointerLeave)
    document.addEventListener("visibilitychange", syncPlayback)
    reduceQuery.addEventListener("change", syncPlayback)
    mobileQuery.addEventListener("change", resize)

    resize()
    syncPlayback()

    return () => {
      cancelAnimationFrame(rafId)
      themeObserver.disconnect()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      document.documentElement.removeEventListener("pointerleave", onPointerLeave)
      document.removeEventListener("visibilitychange", syncPlayback)
      reduceQuery.removeEventListener("change", syncPlayback)
      mobileQuery.removeEventListener("change", resize)
    }
  }, [])

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  )
}
