import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import { copy as copyByLocale, inferLocale, type Copy, type Locale } from "#/lib/site.ts"

const STORAGE_KEY = "castagnaro.locale"

interface LocaleContextValue {
  locale: Locale
  setLocale: (next: Locale) => void
  t: Copy
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

/**
 * The locale lives in a cookie so the server already renders the right
 * language, with localStorage kept as a mirror for faster repeat visits.
 */
export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale
  children: ReactNode
}) {
  // The cookie already decides the server render; localStorage only matters on
  // a first visit, so it is read during the first client render instead of in
  // an effect that would trigger a second one.
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return initialLocale
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === "en" || stored === "es" || stored === "pt") return stored
    } catch {
      /* storage blocked — fall through to detection */
    }
    return inferLocale(window.navigator.language)
  })

  const value = useMemo<LocaleContextValue>(() => {
    const setLocale = (next: Locale) => {
      setLocaleState(next)
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* storage blocked — the in-memory switch still works */
      }
      document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000; samesite=lax`
      document.documentElement.lang = next
    }

    return { locale, setLocale, t: copyByLocale[locale] }
  }, [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext)
  if (!value) throw new Error("useLocale must be used inside LocaleProvider")
  return value
}
