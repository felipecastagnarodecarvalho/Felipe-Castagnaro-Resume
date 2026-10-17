import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Resolves a file from `public/` against Vite's base, so it also works under a subpath. */
export function publicUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`
}
