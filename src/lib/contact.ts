import { CONTACT_EMAIL } from "#/lib/site.ts"

export function contactHref(): string {
  return `mailto:${CONTACT_EMAIL}`
}
