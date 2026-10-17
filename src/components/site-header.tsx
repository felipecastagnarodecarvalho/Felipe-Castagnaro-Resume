import { useEffect, useState } from "react"

import { Button } from "#/components/ui/button.tsx"
import { useLocale } from "#/lib/locale-context.tsx"
import { BRAND, LOCALES, whatsappLink } from "#/lib/site.ts"
import { useTheme } from "#/lib/theme.ts"
import { cn } from "#/lib/utils.ts"

const SECTIONS = [
  { id: "services", key: "services" },
  { id: "clients", key: "clients" },
  { id: "work", key: "work" },
  { id: "developer", key: "developer" },
] as const

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4c1.44.78 3.06 1.2 4.7 1.2h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.78 9.78 0 0 0 12.04 2Zm0 1.8c2.15 0 4.17.84 5.69 2.36a8 8 0 0 1 2.36 5.68c0 4.44-3.6 8.04-8.05 8.04a8 8 0 0 1-4.1-1.12l-.3-.18-3.05.8.81-2.98-.19-.31a8 8 0 0 1-1.23-4.25c0-4.44 3.62-8.04 8.06-8.04Zm-3.1 4.02c-.15 0-.4.06-.6.28-.21.23-.8.78-.8 1.9 0 1.13.82 2.22.93 2.37.11.15 1.6 2.55 3.94 3.48 1.95.77 2.35.62 2.77.58.42-.04 1.36-.55 1.55-1.09.19-.54.19-1 .13-1.1-.06-.1-.21-.15-.44-.27-.23-.11-1.36-.67-1.57-.75-.21-.08-.36-.11-.51.12-.15.23-.6.75-.73.9-.13.15-.27.17-.5.06-.23-.11-.98-.36-1.86-1.15-.69-.61-1.15-1.37-1.28-1.6-.13-.23-.02-.36.1-.47.1-.1.23-.27.35-.4.11-.14.15-.23.23-.38.08-.15.04-.29-.02-.4-.06-.12-.5-1.25-.69-1.7-.16-.38-.32-.4-.45-.4l-.36-.01Z" />
    </svg>
  )
}

function ThemeIcon({ theme }: { theme: string }) {
  if (theme === "dark") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
    </svg>
  )
}

function LocaleSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLocale()

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="inline-flex items-center rounded-full border border-border p-0.5"
    >
      {LOCALES.map((item) => (
        <button
          key={item.code}
          type="button"
          lang={item.code}
          onClick={() => setLocale(item.code)}
          aria-current={locale === item.code}
          title={item.label}
          className={cn(
            "rounded-full text-[11px] font-semibold tracking-[0.08em] transition-colors",
            compact ? "px-2 py-1" : "px-2.5 py-1.5",
            locale === item.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          {item.short}
        </button>
      ))}
    </div>
  )
}

export function SiteHeader() {
  const { t } = useLocale()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const whatsapp = whatsappLink(t.cta.whatsappMessage)

  return (
    <header className="theme-surface sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <a
          href="#top"
          className="group flex min-w-0 items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary text-primary-foreground">
            <svg viewBox="0 0 64 64" className="size-7" fill="none" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.85">
                <path d="M18 20 32 32M18 44 32 32M32 32h14" />
              </g>
              <circle cx="18" cy="20" r="4.4" fill="currentColor" opacity="0.55" />
              <circle cx="18" cy="44" r="4.4" fill="currentColor" opacity="0.55" />
              <circle cx="32" cy="32" r="5.6" fill="currentColor" />
              <circle cx="46" cy="32" r="4.4" fill="currentColor" opacity="0.75" />
            </svg>
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-[15px] font-semibold tracking-tight text-foreground">
              {BRAND}
            </span>
            <span className="mt-0.5 hidden text-[10px] font-medium tracking-[0.16em] text-muted-foreground uppercase sm:block">
              Software studio
            </span>
          </span>
        </a>

        <nav aria-label={t.nav.menu} className="ml-6 hidden items-center gap-1 lg:flex">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {t.nav[section.key]}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t.nav.lightTheme : t.nav.darkTheme}
            title={theme === "dark" ? t.nav.lightTheme : t.nav.darkTheme}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ThemeIcon theme={theme} />
          </button>

          <Button
            asChild
            size="sm"
            className="cd-shine hidden h-9 rounded-full bg-primary px-3.5 text-primary-foreground hover:bg-primary-hover hover:text-primary-hover-foreground sm:inline-flex"
          >
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              {t.cta.talk}
            </a>
          </Button>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background lg:hidden">
          <nav
            aria-label={t.nav.menu}
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6"
          >
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {t.nav[section.key]}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3 border-t border-border/70 pt-3">
              <LocaleSwitcher compact />
              <Button
                asChild
                size="sm"
                className="h-9 rounded-full bg-primary px-3.5 text-primary-foreground hover:bg-primary-hover hover:text-primary-hover-foreground"
              >
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <WhatsAppIcon className="size-4" />
                  {t.cta.talk}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
