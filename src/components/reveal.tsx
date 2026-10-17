import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import { cn } from "#/lib/utils.ts"

gsap.registerPlugin(useGSAP)

interface RevealProps {
  as?: ElementType
  children: ReactNode
  className?: string
  /** Seconds to wait once the element enters, for intra-group sequencing. */
  delay?: number
  /** Starting vertical offset in px. */
  y?: number
  id?: string
}

/**
 * The element is hidden by CSS while `data-motion="pending"`, and ScrollTrigger
 * animates it to the visible state once — never back. If the user prefers
 * reduced motion the CSS keeps it visible and no tween is created.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  y = 22,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      gsap.registerPlugin(ScrollTrigger)

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.removeAttribute("data-motion")
        return
      }

      gsap.fromTo(
        el,
        { autoAlpha: 0, y, scale: 0.98, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          // Drop the filter afterwards so text is not left on its own layer.
          clearProps: "filter,transform",
          duration: 0.8,
          delay,
          ease: "power2.out",
          overwrite: "auto",
          onStart: () => el.removeAttribute("data-motion"),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      )
    },
    { scope: ref },
  )

  const style = { "--cd-delay": `${Math.round(delay * 1000)}ms` } as CSSProperties

  return (
    <Tag
      id={id}
      ref={ref}
      data-motion="pending"
      style={style}
      className={cn("cd-reveal", className)}
    >
      {children}
    </Tag>
  )
}
