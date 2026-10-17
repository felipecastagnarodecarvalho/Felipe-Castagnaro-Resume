import { useEffect, useRef } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

interface Palette {
  node: string
  nodeCore: string
  link: string
  glow: string
  accent: string
}

const PALETTES: Record<"light" | "dark", Palette> = {
  light: {
    node: "rgba(46, 155, 214, 0.85)",
    nodeCore: "rgba(255, 255, 255, 0.95)",
    link: "46, 155, 214",
    glow: "rgba(127, 227, 218, 0.5)",
    accent: "15, 94, 168",
  },
  dark: {
    node: "rgba(46, 155, 214, 0.9)",
    nodeCore: "rgba(200, 240, 255, 0.95)",
    link: "50, 170, 230",
    glow: "rgba(127, 227, 218, 0.7)",
    accent: "46, 155, 214",
  },
}

/** Distance (in px) below which two nodes are drawn as connected. */
const LINK_DISTANCE = 104
const POINTER_RADIUS = 160
const MAX_NODES = 58
const MIN_NODES = 16
/** Area per node; the count scales with canvas size. */
const NODE_AREA = 14000

function readPalette(): Palette {
  const isDark = document.documentElement.classList.contains("dark")
  return isDark ? PALETTES.dark : PALETTES.light
}

/**
 * The banner graphic is a real node/link simulation rather than a decorative
 * loop: the pointer pulls nearby nodes toward it, which makes the network read
 * as "connected systems". It pauses when hidden and stays static (but legible)
 * when the visitor prefers reduced motion.
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
    let width = 0
    let height = 0
    let dpr = 1
    let rafId = 0
    let running = false
    let palette = readPalette()
    const pointer = { x: 0, y: 0, active: false }

    const seed = () => {
      const density = mobileQuery.matches ? NODE_AREA * 1.5 : NODE_AREA
      const count = Math.max(
        MIN_NODES,
        Math.min(MAX_NODES, Math.round((width * height) / density)),
      )
      nodes = Array.from({ length: count }, (_, i) => {
        // Deterministic spread with an offset so the first frame is not a grid.
        const gx = (i * 0.618) % 1
        const gy = (i * 0.381) % 1
        return {
          x: gx * width,
          y: gy * height,
          vx: ((i % 5) - 2) * 0.08,
          vy: ((i % 3) - 1) * 0.07,
          r: 1.6 + ((i * 7) % 5) * 0.34,
        }
      })
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
      drawStatic()
      if (running && !reduceQuery.matches) start()
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      for (const node of nodes) drawNode(node)
    }

    const drawNode = (node: Node) => {
      ctx.beginPath()
      ctx.fillStyle = palette.node
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawLinks = () => {
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist > LINK_DISTANCE) continue
          const alpha = (1 - dist / LINK_DISTANCE) * 0.55
          ctx.strokeStyle = `rgba(${palette.link}, ${alpha.toFixed(3)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }

    const drawPointerLinks = () => {
      if (!pointer.active) return
      for (const node of nodes) {
        const dist = Math.hypot(node.x - pointer.x, node.y - pointer.y)
        if (dist > POINTER_RADIUS) continue
        const alpha = (1 - dist / POINTER_RADIUS) * 0.7
        ctx.strokeStyle = `rgba(${palette.link}, ${alpha.toFixed(3)})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(pointer.x, pointer.y)
        ctx.lineTo(node.x, node.y)
        ctx.stroke()
      }

      const glow = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        POINTER_RADIUS * 0.7,
      )
      glow.addColorStop(0, palette.glow)
      glow.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(pointer.x, pointer.y, POINTER_RADIUS * 0.7, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.fillStyle = palette.nodeCore
      ctx.arc(pointer.x, pointer.y, 2.4, 0, Math.PI * 2)
      ctx.fill()
    }

    const step = () => {
      ctx.clearRect(0, 0, width, height)

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

      drawLinks()
      drawPointerLinks()
      for (const node of nodes) drawNode(node)

      rafId = window.requestAnimationFrame(step)
    }

    const start = () => {
      cancelAnimationFrame(rafId)
      rafId = window.requestAnimationFrame(step)
    }

    const stop = () => {
      cancelAnimationFrame(rafId)
      rafId = 0
    }

    const syncPlayback = () => {
      const shouldRun = !reduceQuery.matches && !document.hidden
      if (shouldRun && !running) {
        running = true
        start()
      } else if (!shouldRun && running) {
        running = false
        stop()
        if (reduceQuery.matches) drawStatic()
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    const onThemeChange = () => {
      palette = readPalette()
      if (reduceQuery.matches) drawStatic()
    }

    const themeObserver = new MutationObserver(onThemeChange)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrap)

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave)
    document.addEventListener("visibilitychange", syncPlayback)
    reduceQuery.addEventListener("change", syncPlayback)
    mobileQuery.addEventListener("change", resize)

    resize()
    syncPlayback()

    return () => {
      stop()
      themeObserver.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
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
