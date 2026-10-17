import { useCallback, useRef, useState } from "react"

export type Theme = "light" | "dark"

const STORAGE_KEY = "castagnaro.theme"

/**
 * Inline in <head> so the stored theme is on <html> before the first paint.
 * Keeps the dark preference as the studio default for a first visit.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("${STORAGE_KEY}");var t=s==="light"||s==="dark"?s:"dark";var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t;}catch(e){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark";}})();`

/**
 * Animated variant: the first paint stays static, then a short cross-fade runs
 * the next time the user flips the switch. The stored preference is read here
 * rather than at paint time, so nothing can strand the page in a fading state.
 */
export const themeAnimInitScript = `(function(){var s=null;try{s=localStorage.getItem("${STORAGE_KEY}")}catch(e){}var t=s==="light"||s==="dark"?s:"dark";var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t;if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){r.classList.add("theme-fade");window.setTimeout(function(){r.classList.remove("theme-fade")},260);}})();`

export function useTheme() {
  // Server markup renders the studio's dark default; the first client render
  // reads the class the inline head script already applied, so the toggle icon
  // is correct without a follow-up render.
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document === "undefined") return "dark"
    return document.documentElement.classList.contains("dark") ? "dark" : "light"
  })
  const flipRef = useRef(false)

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage blocked — the in-memory switch still works */
    }

    const root = document.documentElement
    const animate =
      flipRef.current &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (animate) root.classList.add("theme-fade")
    root.classList.toggle("dark", next === "dark")
    root.style.colorScheme = next
    if (animate) {
      window.setTimeout(() => root.classList.remove("theme-fade"), 280)
    }

    flipRef.current = true
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark")
  }, [setTheme])

  return { theme, setTheme, toggleTheme }
}
