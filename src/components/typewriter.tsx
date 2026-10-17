import { useEffect, useState } from "react"

const TYPE_MS = 55
const DELETE_MS = 28
const HOLD_MS = 1800

/**
 * Types each phrase, holds it, deletes it and moves on. The server renders the
 * first phrase in full, so the line is readable before hydration and with
 * reduced motion; the cycle only starts in the browser. Give it a `key` that
 * changes with the phrase list (e.g. on a locale switch) to restart it.
 */
export function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const [text, setText] = useState(words[0] ?? "")

  useEffect(() => {
    if (words.length < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let index = 0
    let length = words[0].length
    let deleting = false
    let timer = 0

    const tick = () => {
      const word = words[index]
      let wait = deleting ? DELETE_MS : TYPE_MS

      if (!deleting && length === word.length) {
        deleting = true
        wait = HOLD_MS
      } else if (deleting && length === 0) {
        deleting = false
        index = (index + 1) % words.length
      } else {
        length += deleting ? -1 : 1
        setText(word.slice(0, length))
      }

      timer = window.setTimeout(tick, wait)
    }

    timer = window.setTimeout(tick, TYPE_MS)
    return () => window.clearTimeout(timer)
  }, [words])

  return (
    <span className={className}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span className="cd-caret" />
      </span>
    </span>
  )
}
