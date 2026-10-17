import { useMemo } from "react"

import { Button } from "#/components/ui/button.tsx"
import { NetworkCanvas } from "#/components/network-canvas.tsx"
import { Reveal } from "#/components/reveal.tsx"
import { Typewriter } from "#/components/typewriter.tsx"
import { useSpotlight } from "#/hooks/use-spotlight.ts"
import { useLocale } from "#/lib/locale-context.tsx"
import { contactHref } from "#/lib/contact.ts"
import { BRAND, WHATSAPP_NUMBER_DISPLAY, whatsappLink } from "#/lib/site.ts"
import { SiteHeader } from "#/components/site-header.tsx"
import { publicUrl } from "#/lib/utils.ts"

function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
}: {
  eyebrow: string
  title: string
  lead: string
  id: string
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="text-xs font-semibold tracking-[0.18em] text-brand-pool uppercase">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 font-display text-3xl leading-[1.15] font-semibold tracking-tight text-balance text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      <span aria-hidden="true" className="cd-bar" />
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{lead}</p>
    </Reveal>
  )
}

export function HomePage() {
  const { t } = useLocale()
  const whatsapp = whatsappLink(t.cta.whatsappMessage)
  const serviceTitles = useMemo(() => t.services.items.map((item) => item.title), [t])
  useSpotlight()

  return (
    <div id="top" className="theme-surface min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        {t.nav.skipToContent}
      </a>

      <SiteHeader />

      <main id="main">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden border-b border-border/70">
          <NetworkCanvas className="pointer-events-none absolute inset-0 -z-10" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_65%_at_25%_48%,color-mix(in_oklab,var(--background)_82%,transparent),transparent_80%),linear-gradient(to_bottom,transparent_60%,var(--background))]"
          />

          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <p
                className="cd-hero-item inline-flex items-center gap-2 rounded-full border border-brand-pool/40 bg-card/70 px-3 py-1.5 text-xs font-medium text-foreground/85 shadow-[0_0_24px_-6px_var(--brand-pool)] backdrop-blur-sm"
                style={{ "--cd-delay": "60ms" } as React.CSSProperties}
              >
                <span className="relative flex size-1.5 rounded-full bg-brand-pool">
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand-pool/70" />
                </span>
                {t.hero.eyebrow}
              </p>

              <h1
                className="cd-hero-item mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
                style={{ "--cd-delay": "160ms" } as React.CSSProperties}
              >
                <span className="cd-shimmer-text">{t.hero.title}</span>
              </h1>

              <p
                className="cd-hero-item mt-5 font-mono text-base text-brand-pool sm:text-lg"
                style={{ "--cd-delay": "220ms" } as React.CSSProperties}
              >
                <span aria-hidden="true" className="mr-2 text-muted-foreground">
                  &gt;
                </span>
                <Typewriter key={serviceTitles.join("|")} words={serviceTitles} className="cd-glow-text" />
              </p>

              <p
                className="cd-hero-item mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground"
                style={{ "--cd-delay": "260ms" } as React.CSSProperties}
              >
                {t.hero.lead}
              </p>

              <p
                className="cd-hero-item mt-4 max-w-2xl border-l-2 border-brand-pool/50 pl-4 text-sm leading-relaxed text-muted-foreground/90"
                style={{ "--cd-delay": "320ms" } as React.CSSProperties}
              >
                {t.hero.support}
              </p>

              <div
                className="cd-hero-item mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
                style={{ "--cd-delay": "400ms" } as React.CSSProperties}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="cd-shine h-11 rounded-full bg-primary px-6 text-primary-foreground transition-transform hover:scale-[1.03] hover:bg-primary-hover hover:text-primary-hover-foreground"
                  >
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                        <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4c1.44.78 3.06 1.2 4.7 1.2h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.78 9.78 0 0 0 12.04 2Zm-3.1 5.82c-.15 0-.4.06-.6.28-.21.23-.8.78-.8 1.9 0 1.13.82 2.22.93 2.37.11.15 1.6 2.55 3.94 3.48 1.95.77 2.35.62 2.77.58.42-.04 1.36-.55 1.55-1.09.19-.54.19-1 .13-1.1-.06-.1-.21-.15-.44-.27-.23-.11-1.36-.67-1.57-.75-.21-.08-.36-.11-.51.12-.15.23-.6.75-.73.9-.13.15-.27.17-.5.06-.23-.11-.98-.36-1.86-1.15-.69-.61-1.15-1.37-1.28-1.6-.13-.23-.02-.36.1-.47.1-.1.23-.27.35-.4.11-.14.15-.23.23-.38.08-.15.04-.29-.02-.4-.06-.12-.5-1.25-.69-1.7-.16-.38-.32-.4-.45-.4l-.36-.01Z" />
                      </svg>
                      {t.cta.talk}
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-11 rounded-full border-brand-pool/50 bg-card/40 px-6 backdrop-blur-sm transition-transform hover:scale-[1.03] hover:bg-accent hover:text-accent-foreground"
                  >
                    <a href="#work">{t.cta.viewProjects}</a>
                  </Button>
                </div>

                <img
                  src={publicUrl("logo.png")}
                  alt=""
                  aria-hidden="true"
                  width={1147}
                  height={1147}
                  className="hidden size-24 shrink-0 animate-[cd-float_5s_ease-in-out_infinite] object-contain drop-shadow-[0_0_32px_rgba(46,155,214,0.55)] motion-reduce:animate-none lg:block"
                />
              </div>

              <dl
                className="cd-hero-fade mt-10 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-6 border-t border-border/70 pt-7 sm:grid-cols-3"
                style={{ "--cd-delay": "560ms" } as React.CSSProperties}
              >
                {[
                  { label: "Web", value: "React · Vue.js · Laravel" },
                  { label: "Mobile", value: ".NET MAUI · REST APIs" },
                  { label: "Security", value: "Auth · Hardening · Review" },
                ].map((item) => (
                  <div key={item.label}>
                    <dt className="font-display text-sm font-semibold tracking-tight text-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-mono text-[11px] leading-relaxed text-muted-foreground">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── Services ────────────────────────────────────────────────── */}
        <section id="services" aria-labelledby="services-title" className="cd-ambient scroll-mt-20 border-b border-border/70">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <SectionHeading
              id="services-title"
              eyebrow={t.services.eyebrow}
              title={t.services.title}
              lead={t.services.lead}
            />

            <ol className="mt-8 grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
              {t.services.items.map((service, index) => (
                <Reveal
                  as="li"
                  key={service.id}
                  delay={index * 0.06}
                  className="group border-t border-border/70 py-7 first:border-t sm:[&:nth-child(2)]:border-t"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand-pool/40 bg-brand-pool/10 font-display text-xs font-semibold text-brand-pool tabular-nums transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-pool group-hover:text-background group-hover:shadow-[0_0_22px_-4px_var(--brand-pool)]">
                      {service.index}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand-pool">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                      <p className="mt-3 font-mono text-[11px] tracking-wide text-muted-foreground/80">
                        {service.meta}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Clients ─────────────────────────────────────────────────── */}
        <section id="clients" aria-labelledby="clients-title" className="scroll-mt-20 border-b border-border/70 bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <SectionHeading
              id="clients-title"
              eyebrow={t.clients.eyebrow}
              title={t.clients.title}
              lead={t.clients.lead}
            />

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {t.clients.items.map((client, index) => (
                <Reveal
                  key={client.id}
                  delay={index * 0.08}
                  className="cd-spot group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 font-display text-lg font-semibold text-primary ring-1 ring-primary/15 ring-inset">
                        {client.name.charAt(0)}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold tracking-tight text-card-foreground">
                          {client.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {client.sector} · {client.region}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {client.summary}
                  </p>

                  <div className="mt-5 border-t border-border/70 pt-4">
                    <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                      {t.clients.contributionLabel}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-card-foreground">
                      {client.contribution}
                    </p>
                  </div>

                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 self-start rounded-md text-sm font-semibold text-primary outline-none hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card dark:text-pool-ink dark:hover:text-brand-pool"
                  >
                    {client.name}
                    <span aria-hidden="true" className="text-muted-foreground">
                      ·
                    </span>
                    {t.clients.visits}
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ────────────────────────────────────────────────── */}
        <section id="work" aria-labelledby="work-title" className="cd-ambient scroll-mt-20 border-b border-border/70">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <SectionHeading
              id="work-title"
              eyebrow={t.work.eyebrow}
              title={t.work.title}
              lead={t.work.lead}
            />

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.work.items.map((project, index) => (
                <Reveal
                  key={project.id}
                  delay={(index % 3) * 0.08}
                  className="cd-spot group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  {project.media.type === "image" && project.media.src ? (
                    <img
                      src={project.media.src}
                      alt={project.media.alt}
                      width={1200}
                      height={675}
                      loading="lazy"
                      decoding="async"
                      className="aspect-video w-full border-b border-border/70 object-cover"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`${project.name} — ${project.kind}`}
                      className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-border/70 bg-[radial-gradient(120%_120%_at_15%_10%,color-mix(in_oklab,var(--brand-pool)_22%,transparent),transparent_60%),radial-gradient(100%_100%_at_85%_90%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_55%)]"
                    >
                      <svg viewBox="0 0 240 135" className="h-full w-full opacity-80 transition-transform duration-500 group-hover:scale-105" aria-hidden="true">
                        <g className="cd-flow" stroke="var(--brand-pool)" strokeOpacity="0.7" strokeWidth="1.2" fill="none">
                          <path d="M20 100h44l22-26h40l20 26h54" />
                          <path d="M64 100V58h40l20-22h44l22 22h30" />
                        </g>
                        <g className="cd-nodes" fill="var(--brand-pool)">
                          <circle cx="20" cy="100" r="3.2" />
                          <circle cx="64" cy="100" r="3.2" />
                          <circle cx="86" cy="74" r="3.2" />
                          <circle cx="126" cy="36" r="3.2" />
                          <circle cx="170" cy="36" r="3.2" />
                          <circle cx="200" cy="100" r="3.2" />
                        </g>
                      </svg>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] font-semibold tracking-[0.12em] text-brand-pool uppercase">
                        {project.kind}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-card-foreground">
                      {project.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4 border-t border-border/70 pt-4">
                      <p className="sr-only">{t.work.stackLabel}</p>
                      <ul className="flex flex-wrap gap-1.5">
                        {project.stack.map((item) => (
                          <li
                            key={item}
                            className="rounded-md bg-secondary px-2 py-1 font-mono text-[11px] text-secondary-foreground"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Developer ───────────────────────────────────────────────── */}
        <section id="developer" aria-labelledby="developer-title" className="cd-ambient scroll-mt-20 border-b border-border/70 bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-12">
              <div>
                <Reveal>
                  <p className="text-xs font-semibold tracking-[0.18em] text-brand-pool uppercase">
                    {t.developer.eyebrow}
                  </p>
                  <div className="mt-4 flex items-center gap-5">
                    <span className="cd-avatar-ring shrink-0">
                      <img
                        src={publicUrl("profile.jpg")}
                        alt={t.developer.name}
                        width={112}
                        height={112}
                        loading="lazy"
                        decoding="async"
                        className="block size-20 rounded-full border-4 border-background object-cover sm:size-28"
                      />
                    </span>
                    <div className="min-w-0">
                      <h2
                        id="developer-title"
                        className="font-display text-3xl leading-[1.15] font-semibold tracking-tight text-foreground sm:text-4xl"
                      >
                        {t.developer.name}
                      </h2>
                      <p className="mt-2 font-display text-base font-medium text-brand-pool">
                        {t.developer.role}
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.06} className="mt-6 max-w-2xl space-y-4">
                  {t.developer.bio.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </Reveal>

                <Reveal delay={0.1} className="mt-8 max-w-2xl">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    {t.developer.stackLabel}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {t.developer.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs text-card-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-pool/70 hover:text-brand-pool hover:shadow-[0_0_18px_-6px_var(--brand-pool)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={0.08} className="lg:pt-6">
                <div className="cd-spot rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex size-2 rounded-full bg-brand-pool">
                      <span className="absolute inset-0 animate-ping rounded-full bg-brand-pool/70" />
                    </span>
                    <p className="text-sm font-semibold text-card-foreground">
                      {t.developer.availability}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-border/70 pt-5">
                    <h3 className="font-display text-sm font-semibold text-card-foreground">
                      {t.developer.security.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t.developer.security.body}
                    </p>
                  </div>

                  <dl className="mt-5 space-y-2.5 border-t border-border/70 pt-5 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-muted-foreground">WhatsApp</dt>
                      <dd className="font-mono text-xs text-card-foreground">
                        {WHATSAPP_NUMBER_DISPLAY}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-muted-foreground">{t.cta.email}</dt>
                      <dd>
                        <a
                          href={contactHref()}
                          className="rounded-md text-xs font-semibold text-primary outline-none hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-ring dark:text-pool-ink dark:hover:text-brand-pool"
                        >
                          {contactHref().replace("mailto:", "")}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Closing action ──────────────────────────────────────────── */}
        <section aria-labelledby="closing-title" className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-accent/40 to-background"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2
                id="closing-title"
                className="font-display text-3xl leading-[1.15] font-semibold tracking-tight text-balance text-foreground sm:text-4xl"
              >
                {t.closing.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {t.closing.lead}
              </p>

              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  className="cd-shine h-12 w-full rounded-full bg-primary px-7 text-primary-foreground transition-transform hover:scale-[1.03] hover:bg-primary-hover hover:text-primary-hover-foreground sm:w-auto"
                >
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4c1.44.78 3.06 1.2 4.7 1.2h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.78 9.78 0 0 0 12.04 2Zm-3.1 5.82c-.15 0-.4.06-.6.28-.21.23-.8.78-.8 1.9 0 1.13.82 2.22.93 2.37.11.15 1.6 2.55 3.94 3.48 1.95.77 2.35.62 2.77.58.42-.04 1.36-.55 1.55-1.09.19-.54.19-1 .13-1.1-.06-.1-.21-.15-.44-.27-.23-.11-1.36-.67-1.57-.75-.21-.08-.36-.11-.51.12-.15.23-.6.75-.73.9-.13.15-.27.17-.5.06-.23-.11-.98-.36-1.86-1.15-.69-.61-1.15-1.37-1.28-1.6-.13-.23-.02-.36.1-.47.1-.1.23-.27.35-.4.11-.14.15-.23.23-.38.08-.15.04-.29-.02-.4-.06-.12-.5-1.25-.69-1.7-.16-.38-.32-.4-.45-.4l-.36-.01Z" />
                    </svg>
                    {t.closing.primary}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-full border-border bg-card px-7 hover:bg-accent hover:text-accent-foreground sm:w-auto"
                >
                  <a href={contactHref()}>{t.cta.email}</a>
                </Button>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">{t.closing.whatsappHint}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.closing.emailHint} {contactHref().replace("mailto:", "")}
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="theme-surface border-t border-border/70 bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-display text-sm font-semibold tracking-tight text-foreground">
              {BRAND}
            </p>
            <p className="mt-1 max-w-md text-xs leading-relaxed text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-1 text-xs text-muted-foreground lg:items-end">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md font-mono hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              WhatsApp {WHATSAPP_NUMBER_DISPLAY}
            </a>
            <a
              href={contactHref()}
              className="rounded-md font-mono hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {contactHref().replace("mailto:", "")}
            </a>
            <p className="mt-1">
              © {BRAND}. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
