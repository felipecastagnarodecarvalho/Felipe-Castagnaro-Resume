import { HappySeedsInspector } from "@happyseeds/devtools/react"
import "@happyseeds/devtools/runtime"
import type { QueryClient } from "@tanstack/react-query"
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouter,
} from "@tanstack/react-router"
import type { ErrorComponentProps } from "@tanstack/react-router"

import { LocaleProvider } from "#/lib/locale-context.tsx"
import { copy, type Locale } from "#/lib/site.ts"
import { themeInitScript } from "#/lib/theme.ts"
import { publicUrl } from "#/lib/utils.ts"

import appCss from "../styles.css?url"

interface MyRouterContext {
  queryClient: QueryClient
}

const UMAMI_SCRIPT_URL = import.meta.env.VITE_UMAMI_SCRIPT_URL ?? ""
const UMAMI_WEBSITE_ID = (import.meta.env.VITE_UMAMI_WEBSITE_ID ?? "").trim()
const UMAMI_ENABLED =
  import.meta.env.PROD && UMAMI_SCRIPT_URL !== "" && UMAMI_WEBSITE_ID !== ""

const FALLBACK_LOCALE: Locale = "en"

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => {
    const t = copy[FALLBACK_LOCALE]

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: t.meta.title },
        { name: "description", content: t.meta.description },
        {
          name: "keywords",
          content:
            "Castagnaro Digital, software studio, web development, mobile applications, RESTful APIs, Laravel, .NET, Vue.js, React, Felipe Castagnaro de Carvalho",
        },
        { name: "theme-color", content: "#080d14", media: "(prefers-color-scheme: dark)" },
        { name: "theme-color", content: "#ffffff", media: "(prefers-color-scheme: light)" },
        { property: "og:title", content: t.meta.title },
        { property: "og:description", content: t.meta.description },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Castagnaro Digital" },
        { property: "og:locale", content: "pt_BR" },
        { property: "og:locale:alternate", content: "en_US" },
        { property: "og:locale:alternate", content: "es_ES" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap",
        },
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: publicUrl("favicon.ico"), sizes: "any" },
        { rel: "icon", href: publicUrl("favicon.svg"), type: "image/svg+xml" },
        { rel: "apple-touch-icon", href: publicUrl("apple-touch-icon.png") },
      ],
      scripts: [{ children: themeInitScript }],
    }
  },
  shellComponent: RootDocument,
  errorComponent: RootError,
})

function RootError({ reset }: ErrorComponentProps) {
  const router = useRouter()

  return (
    <main
      key="root-error"
      className="theme-surface fixed inset-0 flex items-center justify-center overflow-hidden bg-background px-4"
    >
      <section className="flex w-full max-w-md flex-col items-center text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
          This page failed to load
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          An error stopped it from rendering.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover hover:text-primary-hover-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            onClick={() => {
              void router.invalidate()
              reset()
            }}
          >
            Try again
          </button>
          <a
            className="inline-flex h-9 items-center justify-center rounded-full border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            href={import.meta.env.BASE_URL}
          >
            Go home
          </a>
        </div>
      </section>
    </main>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  // Browser extensions decorate <html>/<body> before React hydrates. The
  // suppression is element-local — mismatches inside the app still warn.
  return (
    <html lang={FALLBACK_LOCALE} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <LocaleProvider initialLocale={FALLBACK_LOCALE}>{children}</LocaleProvider>
        <HappySeedsInspector />
        {UMAMI_ENABLED && (
          <script
            async
            src={UMAMI_SCRIPT_URL}
            data-website-id={UMAMI_WEBSITE_ID}
          />
        )}
        <Scripts />
      </body>
    </html>
  )
}
