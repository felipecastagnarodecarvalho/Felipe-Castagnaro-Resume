import { useEffect } from "react"

/**
 * One delegated listener feeds the cursor position to whichever `.cd-spot`
 * card is under the pointer, so cards can paint a glow that follows it
 * without a listener (or a re-render) per card.
 */
export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return

    let frame = 0
    let last: PointerEvent | null = null

    const apply = () => {
      frame = 0
      if (!last) return
      const target = (last.target as Element | null)?.closest<HTMLElement>(".cd-spot")
      if (!target) return
      const rect = target.getBoundingClientRect()
      target.style.setProperty("--mx", `${last.clientX - rect.left}px`)
      target.style.setProperty("--my", `${last.clientY - rect.top}px`)
    }

    const onMove = (event: PointerEvent) => {
      last = event
      if (!frame) frame = window.requestAnimationFrame(apply)
    }

    document.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      document.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(frame)
    }
  }, [])
}
