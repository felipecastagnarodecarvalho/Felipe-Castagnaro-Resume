export const BRAND = "Castagnaro Digital"

export const WHATSAPP_NUMBER_DISPLAY = "+55 45 99809-2892"
export const WHATSAPP_NUMBER_E164 = "5545998092892"
export const CONTACT_EMAIL = "contato@castagnarocastro.dev"

export type Locale = "en" | "es" | "pt"

export const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "pt", label: "Português", short: "PT" },
]

/**
 * Builds a wa.me deep link with a prefilled message. Used by the header CTA
 * and the closing section so every "talk to us" entry point behaves the same.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(message)}`
}

export type ServiceId = "web" | "apps" | "apis" | "security"

export interface ServiceCopy {
  id: ServiceId
  index: string
  title: string
  description: string
  meta: string
}

export type ClientId = "nissei" | "shipsmart"

export interface ClientCopy {
  id: ClientId
  name: string
  sector: string
  region: string
  summary: string
  contribution: string
  url: string
}

export interface ProjectCopy {
  id: string
  name: string
  kind: string
  year: string
  description: string
  stack: string[]
  /** `image` swaps in a real screenshot once the backend supplies one. */
  media: { type: "image" | "placeholder"; src?: string; alt: string }
}

export interface Copy {
  localeName: string
  meta: { title: string; description: string }
  nav: {
    services: string
    clients: string
    work: string
    developer: string
    theme: string
    lightTheme: string
    darkTheme: string
    language: string
    menu: string
    close: string
    skipToContent: string
  }
  cta: { talk: string; whatsappMessage: string; viewProjects: string; email: string }
  hero: {
    eyebrow: string
    title: string
    lead: string
    support: string
    networkLabel: string
  }
  services: { eyebrow: string; title: string; lead: string; items: ServiceCopy[] }
  clients: {
    eyebrow: string
    title: string
    lead: string
    visits: string
    contributionLabel: string
    items: ClientCopy[]
  }
  work: {
    eyebrow: string
    title: string
    lead: string
    sampleBadge: string
    sampleNote: string
    stackLabel: string
    items: ProjectCopy[]
  }
  developer: {
    eyebrow: string
    name: string
    role: string
    bio: string[]
    stackLabel: string
    stack: string[]
    security: { title: string; body: string }
    availability: string
  }
  closing: {
    title: string
    lead: string
    primary: string
    whatsappHint: string
    emailHint: string
  }
  footer: { tagline: string; rights: string; builtWith: string }
}

const projects: ProjectCopy[] = [
  {
    id: "fieldops",
    name: "FieldOps",
    kind: "Operations platform",
    year: "2026",
    description:
      "Scheduling, routing and proof-of-delivery in one console for distributed field teams.",
    stack: ["Laravel", "Vue.js", "PostgreSQL"],
    media: { type: "placeholder", alt: "" },
  },
  {
    id: "ledgerly",
    name: "Ledgerly",
    kind: "Finance API",
    year: "2025",
    description:
      "Double-entry ledger service with idempotent writes, audit trails and role-based access.",
    stack: [".NET", "C#", "REST"],
    media: { type: "placeholder", alt: "" },
  },
  {
    id: "atlasone",
    name: "Atlas One",
    kind: "Customer portal",
    year: "2025",
    description:
      "Self-service portal for quotes, invoices and support history with a typed design system.",
    stack: ["React", "TypeScript", "Stripe"],
    media: { type: "placeholder", alt: "" },
  },
  {
    id: "nimbus",
    name: "Nimbus Sync",
    kind: "Mobile application",
    year: "2024",
    description:
      "Offline-first mobile app that reconciles records with a legacy ERP once connectivity returns.",
    stack: ["C#", ".NET MAUI", "REST"],
    media: { type: "placeholder", alt: "" },
  },
  {
    id: "sentinel",
    name: "Sentinel Review",
    kind: "Security tooling",
    year: "2024",
    description:
      "Internal review toolkit that flags exposed endpoints and weak authentication flows.",
    stack: ["PHP", "Laravel", "Redis"],
    media: { type: "placeholder", alt: "" },
  },
  {
    id: "mercatto",
    name: "Mercatto",
    kind: "Commerce front end",
    year: "2023",
    description:
      "Storefront rebuild with server-rendered catalog pages and a tuned checkout funnel.",
    stack: ["React", "Node.js", "PostgreSQL"],
    media: { type: "placeholder", alt: "" },
  },
]

export const copy: Record<Locale, Copy> = {
  en: {
    localeName: "English",
    meta: {
      title: "Castagnaro Digital — Web, mobile and API development",
      description:
        "We design and build web platforms, mobile applications and RESTful APIs with a focus on scalable, secure delivery.",
    },
    nav: {
      services: "Services",
      clients: "Clients",
      work: "Projects",
      developer: "Developer",
      theme: "Theme",
      lightTheme: "Light theme",
      darkTheme: "Dark theme",
      language: "Language",
      menu: "Menu",
      close: "Close",
      skipToContent: "Skip to content",
    },
    cta: {
      talk: "Talk to me",
      whatsappMessage:
        "Hello Felipe, I found Castagnaro Digital and I would like to talk about a project.",
      viewProjects: "See projects",
      email: "Send an email",
    },
    hero: {
      eyebrow: "Software studio — Brazil, working worldwide",
      title: "Software built to hold up in production.",
      lead: "We design and build web platforms, mobile applications and RESTful APIs. Every delivery starts with the data model and the failure cases, not the mockup.",
      support:
        "Senior full-stack delivery: PHP and Laravel, C# and .NET, Vue.js and React — with security reviewed as part of the build.",
      networkLabel: "Animated diagram of a connected software platform",
    },
    services: {
      eyebrow: "What we do",
      title: "Four kinds of work, one delivery standard.",
      lead: "Scoped engagements or ongoing capacity, always with the same expectations around tests, review and handover.",
      items: [
        {
          id: "web",
          index: "01",
          title: "Web platforms",
          description:
            "Product interfaces, dashboards and internal systems — from the first data model to the last empty state.",
          meta: "React · Vue.js · TypeScript",
        },
        {
          id: "apps",
          index: "02",
          title: "Mobile applications",
          description:
            "Cross-platform apps that stay usable offline and reconcile cleanly with the systems behind them.",
          meta: ".NET MAUI · React Native",
        },
        {
          id: "apis",
          index: "03",
          title: "RESTful APIs",
          description:
            "Documented, versioned services with predictable contracts, sensible rate limits and real observability.",
          meta: "Laravel · .NET · PHP",
        },
        {
          id: "security",
          index: "04",
          title: "Security review",
          description:
            "Threat modelling and hardening for authentication, authorization and data flows before launch.",
          meta: "Auth · Hardening · Bug bounty",
        },
      ],
    },
    clients: {
      eyebrow: "Clients",
      title: "Teams that ship with us.",
      lead: "Long-running partnerships where the work is measured by what reaches production.",
      visits: "Visit site",
      contributionLabel: "Contribution",
      items: [
        {
          id: "nissei",
          name: "Nissei",
          sector: "Retail and distribution",
          region: "Brazil",
          summary:
            "Large-scale retail and distribution operation serving customers and franchisees across Brazil.",
          contribution:
            "Integration work and platform features connecting commerce systems with day-to-day operations.",
          url: "https://nissei.com/br/",
        },
        {
          id: "shipsmart",
          name: "ShipSmart",
          sector: "Logistics technology",
          region: "Global",
          summary:
            "Logistics technology platform coordinating shipping, warehousing and fulfilment for growing brands.",
          contribution:
            "Service and API development supporting logistics workflows and customer-facing tools.",
          url: "https://shipsmart.global/",
        },
      ],
    },
    work: {
      eyebrow: "Projects",
      title: "Selected work.",
      lead: "Each case carries the scope, the stack and the outcome that mattered to the client.",
      sampleBadge: "Sample entry",
      sampleNote:
        "These cards are placeholders so the section is ready for your real case studies — swap them for project data from your backend at any time.",
      stackLabel: "Stack",
      items: projects,
    },
    developer: {
      eyebrow: "Developer",
      name: "Felipe Castagnaro de Carvalho",
      role: "Full Stack Developer",
      bio: [
        "Full Stack Developer with experience in PHP, Laravel, C#, .NET, Vue.js and React. I work on developing web, mobile applications, and RESTful APIs, with a focus on scalable and secure solutions.",
        "Information security enthusiast with active participation in Bug Bounty programs.",
      ],
      stackLabel: "Working stack",
      stack: [
        "PHP",
        "Laravel",
        "C#",
        ".NET",
        "Vue.js",
        "React",
        "TypeScript",
        "RESTful APIs",
        "PostgreSQL",
      ],
      security: {
        title: "Security by default",
        body: "Authentication, authorization and input handling are reviewed as part of the build, informed by ongoing bug bounty work.",
      },
      availability: "Available for new work",
    },
    closing: {
      title: "Have a system that needs to be built, or fixed?",
      lead: "Send a short description of the problem. You will get an honest read on scope, timeline and what it takes to ship it well.",
      primary: "Talk to me on WhatsApp",
      whatsappHint: "Direct line, replies during business hours (BRT).",
      emailHint: "Prefer email? Write to",
    },
    footer: {
      tagline: "Web platforms, mobile applications and RESTful APIs.",
      rights: "All rights reserved.",
      builtWith: "Built and maintained by Castagnaro Digital.",
    },
  },
  es: {
    localeName: "Español",
    meta: {
      title: "Castagnaro Digital — Desarrollo web, móvil y APIs",
      description:
        "Diseñamos y construimos plataformas web, aplicaciones móviles y APIs RESTful con foco en soluciones escalables y seguras.",
    },
    nav: {
      services: "Servicios",
      clients: "Clientes",
      work: "Proyectos",
      developer: "Desarrollador",
      theme: "Tema",
      lightTheme: "Tema claro",
      darkTheme: "Tema oscuro",
      language: "Idioma",
      menu: "Menú",
      close: "Cerrar",
      skipToContent: "Ir al contenido",
    },
    cta: {
      talk: "Habla conmigo",
      whatsappMessage:
        "Hola Felipe, encontré Castagnaro Digital y me gustaría conversar sobre un proyecto.",
      viewProjects: "Ver proyectos",
      email: "Enviar un correo",
    },
    hero: {
      eyebrow: "Estudio de software — Brasil, trabajando en todo el mundo",
      title: "Software hecho para aguantar en producción.",
      lead: "Diseñamos y construimos plataformas web, aplicaciones móviles y APIs RESTful. Cada entrega empieza por el modelo de datos y los casos de fallo, no por el mockup.",
      support:
        "Entrega full stack senior: PHP y Laravel, C# y .NET, Vue.js y React — con la seguridad revisada durante la construcción.",
      networkLabel: "Diagrama animado de una plataforma de software conectada",
    },
    services: {
      eyebrow: "Qué hacemos",
      title: "Cuatro tipos de trabajo, un mismo estándar de entrega.",
      lead: "Proyectos acotados o capacidad continua, siempre con las mismas exigencias de pruebas, revisión y traspaso.",
      items: [
        {
          id: "web",
          index: "01",
          title: "Plataformas web",
          description:
            "Interfaces de producto, paneles e sistemas internos: del primer modelo de datos al último estado vacío.",
          meta: "React · Vue.js · TypeScript",
        },
        {
          id: "apps",
          index: "02",
          title: "Aplicaciones móviles",
          description:
            "Apps multiplataforma que siguen siendo útiles sin conexión y se sincronizan bien con los sistemas detrás.",
          meta: ".NET MAUI · React Native",
        },
        {
          id: "apis",
          index: "03",
          title: "APIs RESTful",
          description:
            "Servicios documentados y versionados, con contratos previsibles, límites de uso sensatos y observabilidad real.",
          meta: "Laravel · .NET · PHP",
        },
        {
          id: "security",
          index: "04",
          title: "Revisión de seguridad",
          description:
            "Modelado de amenazas y endurecimiento de autenticación, autorización y flujos de datos antes del lanzamiento.",
          meta: "Auth · Hardening · Bug bounty",
        },
      ],
    },
    clients: {
      eyebrow: "Clientes",
      title: "Equipos que entregan con nosotros.",
      lead: "Colaboraciones de largo plazo donde el trabajo se mide por lo que llega a producción.",
      visits: "Ver sitio",
      contributionLabel: "Contribución",
      items: [
        {
          id: "nissei",
          name: "Nissei",
          sector: "Comercio y distribución",
          region: "Brasil",
          summary:
            "Operación de comercio y distribución a gran escala que atiende a clientes y franquiciados en todo Brasil.",
          contribution:
            "Integraciones y funcionalidades de plataforma que conectan los sistemas de comercio con la operación diaria.",
          url: "https://nissei.com/br/",
        },
        {
          id: "shipsmart",
          name: "ShipSmart",
          sector: "Tecnología logística",
          region: "Global",
          summary:
            "Plataforma de tecnología logística que coordina envíos, almacenamiento y cumplimiento para marcas en crecimiento.",
          contribution:
            "Desarrollo de servicios y APIs que sostienen los flujos logísticos y las herramientas de cliente.",
          url: "https://shipsmart.global/",
        },
      ],
    },
    work: {
      eyebrow: "Proyectos",
      title: "Trabajos seleccionados.",
      lead: "Cada caso reúne el alcance, el stack y el resultado que importaba al cliente.",
      sampleBadge: "Ejemplo",
      sampleNote:
        "Estas tarjetas son marcadores de posición para que la sección ya esté lista para tus casos reales: reemplázalas por datos de tu backend cuando quieras.",
      stackLabel: "Stack",
      items: projects,
    },
    developer: {
      eyebrow: "Desarrollador",
      name: "Felipe Castagnaro de Carvalho",
      role: "Full Stack Developer",
      bio: [
        "Full Stack Developer con experiencia en PHP, Laravel, C#, .NET, Vue.js y React. Trabajo en el desarrollo de aplicaciones web, móviles y APIs RESTful, con foco en soluciones escalables y seguras.",
        "Entusiasta de la seguridad de la información con participación activa en programas de Bug Bounty.",
      ],
      stackLabel: "Stack de trabajo",
      stack: [
        "PHP",
        "Laravel",
        "C#",
        ".NET",
        "Vue.js",
        "React",
        "TypeScript",
        "APIs RESTful",
        "PostgreSQL",
      ],
      security: {
        title: "Seguridad por defecto",
        body: "La autenticación, la autorización y el tratamiento de datos se revisan durante la construcción, con base en el trabajo continuo en bug bounty.",
      },
      availability: "Disponible para nuevos proyectos",
    },
    closing: {
      title: "¿Tienes un sistema por construir o por arreglar?",
      lead: "Envía una descripción breve del problema. Recibirás una lectura honesta del alcance, los plazos y lo que hace falta para entregarlo bien.",
      primary: "Habla conmigo por WhatsApp",
      whatsappHint: "Línea directa, respuestas en horario comercial (BRT).",
      emailHint: "¿Prefieres correo? Escribe a",
    },
    footer: {
      tagline: "Plataformas web, aplicaciones móviles y APIs RESTful.",
      rights: "Todos los derechos reservados.",
      builtWith: "Creado y mantenido por Castagnaro Digital.",
    },
  },
  pt: {
    localeName: "Português",
    meta: {
      title: "Castagnaro Digital — Desenvolvimento web, mobile e APIs",
      description:
        "Criamos plataformas web, aplicativos mobile e APIs RESTful com foco em soluções escaláveis e seguras.",
    },
    nav: {
      services: "Serviços",
      clients: "Clientes",
      work: "Projetos",
      developer: "Desenvolvedor",
      theme: "Tema",
      lightTheme: "Tema claro",
      darkTheme: "Tema escuro",
      language: "Idioma",
      menu: "Menu",
      close: "Fechar",
      skipToContent: "Ir para o conteúdo",
    },
    cta: {
      talk: "Fale comigo",
      whatsappMessage:
        "Olá Felipe, encontrei a Castagnaro Digital e gostaria de conversar sobre um projeto.",
      viewProjects: "Ver projetos",
      email: "Enviar e-mail",
    },
    hero: {
      eyebrow: "Estúdio de software — Brasil, atendendo o mundo",
      title: "Software feito para aguentar produção.",
      lead: "Criamos plataformas web, aplicativos mobile e APIs RESTful. Cada entrega começa pelo modelo de dados e pelos casos de falha, não pelo mockup.",
      support:
        "Entrega full stack sênior: PHP e Laravel, C# e .NET, Vue.js e React — com segurança revisada durante a construção.",
      networkLabel: "Diagrama animado de uma plataforma de software conectada",
    },
    services: {
      eyebrow: "O que fazemos",
      title: "Quatro tipos de trabalho, um padrão de entrega.",
      lead: "Projetos fechados ou capacidade contínua, sempre com as mesmas exigências de teste, revisão e transferência.",
      items: [
        {
          id: "web",
          index: "01",
          title: "Plataformas web",
          description:
            "Interfaces de produto, painéis e sistemas internos — do primeiro modelo de dados ao último estado vazio.",
          meta: "React · Vue.js · TypeScript",
        },
        {
          id: "apps",
          index: "02",
          title: "Aplicativos mobile",
          description:
            "Apps multiplataforma que continuam úteis sem conexão e sincronizam direito com os sistemas por trás.",
          meta: ".NET MAUI · React Native",
        },
        {
          id: "apis",
          index: "03",
          title: "APIs RESTful",
          description:
            "Serviços documentados e versionados, com contratos previsíveis, limites de uso sensatos e observabilidade real.",
          meta: "Laravel · .NET · PHP",
        },
        {
          id: "security",
          index: "04",
          title: "Revisão de segurança",
          description:
            "Modelagem de ameaças e endurecimento de autenticação, autorização e fluxos de dados antes do lançamento.",
          meta: "Auth · Hardening · Bug bounty",
        },
      ],
    },
    clients: {
      eyebrow: "Clientes",
      title: "Times que entregam com a gente.",
      lead: "Parcerias de longo prazo em que o trabalho é medido pelo que chega à produção.",
      visits: "Ver site",
      contributionLabel: "Contribuição",
      items: [
        {
          id: "nissei",
          name: "Nissei",
          sector: "Varejo e distribuição",
          region: "Brasil",
          summary:
            "Operação de varejo e distribuição em grande escala, atendendo clientes e franqueados em todo o Brasil.",
          contribution:
            "Integrações e funcionalidades de plataforma que conectam os sistemas de comércio à operação diária.",
          url: "https://nissei.com/br/",
        },
        {
          id: "shipsmart",
          name: "ShipSmart",
          sector: "Tecnologia logística",
          region: "Global",
          summary:
            "Plataforma de tecnologia logística que coordena envios, armazenagem e fulfillment para marcas em crescimento.",
          contribution:
            "Desenvolvimento de serviços e APIs que sustentam os fluxos logísticos e as ferramentas do cliente.",
          url: "https://shipsmart.global/",
        },
      ],
    },
    work: {
      eyebrow: "Projetos",
      title: "Trabalhos selecionados.",
      lead: "Cada caso reúne o escopo, a stack e o resultado que importava para o cliente.",
      sampleBadge: "Exemplo",
      sampleNote:
        "Estes cartões são espaços reservados para que a seção já esteja pronta para seus casos reais — troque por dados do seu backend quando quiser.",
      stackLabel: "Stack",
      items: projects,
    },
    developer: {
      eyebrow: "Desenvolvedor",
      name: "Felipe Castagnaro de Carvalho",
      role: "Full Stack Developer",
      bio: [
        "Full Stack Developer com experiência em PHP, Laravel, C#, .NET, Vue.js e React. Atuo no desenvolvimento de aplicações web, mobile e APIs RESTful, com foco em soluções escaláveis e seguras.",
        "Entusiasta de segurança da informação, com participação ativa em programas de Bug Bounty.",
      ],
      stackLabel: "Stack de trabalho",
      stack: [
        "PHP",
        "Laravel",
        "C#",
        ".NET",
        "Vue.js",
        "React",
        "TypeScript",
        "APIs RESTful",
        "PostgreSQL",
      ],
      security: {
        title: "Segurança por padrão",
        body: "Autenticação, autorização e tratamento de dados são revisados durante a construção, com base no trabalho contínuo em bug bounty.",
      },
      availability: "Disponível para novos projetos",
    },
    closing: {
      title: "Tem um sistema para construir ou para consertar?",
      lead: "Envie uma descrição curta do problema. Você recebe uma leitura honesta de escopo, prazo e do que é preciso para entregar bem.",
      primary: "Fale comigo no WhatsApp",
      whatsappHint: "Linha direta, respostas em horário comercial (BRT).",
      emailHint: "Prefere e-mail? Escreva para",
    },
    footer: {
      tagline: "Plataformas web, aplicativos mobile e APIs RESTful.",
      rights: "Todos os direitos reservados.",
      builtWith: "Criado e mantido pela Castagnaro Digital.",
    },
  },
}

export function inferLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return "en"

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=")
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    if (tag.startsWith("pt")) return "pt"
    if (tag.startsWith("es")) return "es"
    if (tag.startsWith("en")) return "en"
  }

  return "en"
}
