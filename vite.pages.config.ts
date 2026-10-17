import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

/**
 * Static build for GitHub Pages. The default config targets Cloudflare
 * Workers (SSR); this one prerenders the home page to plain HTML instead,
 * served from the repository's project-site subpath.
 */
export default defineConfig({
  base: "/Felipe-Castagnaro-Resume/",
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: false },
      pages: [{ path: "/" }],
    }),
    react(),
  ],
})
