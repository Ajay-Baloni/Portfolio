/**
 * Single source of truth for every piece of copy on the site.
 * Edit this file to make it yours — no component changes needed.
 */

export const site = {
  name: "Ajay Baloni",
  /** Shown in the browser tab and OG image. */
  shortName: "Ajay",
  role: "Full-Stack Developer",
  location: "Mohali, Punjab",
  email: "ajaybaloni01@gmail.com",
  phone: "+91 89379 44046",
  /** Drop your PDF at public/resume.pdf, or point this at a hosted link. */
  resumeUrl: "/resume.pdf",
  /** Used for metadata + OG tags. Set this to your real domain before deploying. */
  url: "https://example.com",
  availability: "Open to full-stack roles",

  hero: {
    /** The word wrapped in the accent gradient. Must appear in `headline`. */
    accentWord: "production",
    headline: "I build production web apps, end to end.",
    subline:
      "Full-stack developer working in React, TypeScript, Node and PostgreSQL. I've spent the last two and a half years on a multi-tenant B2B SaaS HRMS — and built the AI pieces on top of it.",
  },

  about: {
    heading: "A full-stack developer who ships the whole feature.",
    paragraphs: [
      "I'm a full-stack developer. Most of my work has been on a production B2B SaaS HRMS — tenant-aware React frontends, Node and Express APIs, and the PostgreSQL schema underneath them, delivered end to end rather than handed off halfway.",
      "The parts I enjoy most are the ones that decide whether a product holds up: RESTful API design, SSO and JWT authentication, client-side encryption for sensitive fields, and performance work like code splitting, lazy loading and memoisation that users feel without ever naming.",
      "Lately I've been working with AI — building things with it and honing my skills as I go.",
    ],
  },

  /** Rendered as two scrolling marquee rows. Split roughly in half. */
  stack: [
    "React.js",
    "TypeScript",
    "JavaScript",
    "Redux",
    "Tailwind",
    "Vite",
    "Node.js",
    "NestJS",
    "Express.js",
    "PostgreSQL",
    "Prisma",
    "MongoDB",
    "Redis",
    "Docker",
    "AWS EC2",
    "GitHub Actions",
    "LangGraph",
    "Gemini API",
  ],

  /** What you actually do, grouped. Keep to 3 groups of 4-6 items. */
  expertise: [
    {
      title: "Frontend",
      description:
        "Responsive, tenant-aware React interfaces that stay fast as the feature set grows.",
      items: [
        "React.js & Redux",
        "TypeScript",
        "Tailwind & Bootstrap",
        "Vite",
        "Recharts dashboards",
      ],
    },
    {
      title: "Backend",
      description:
        "APIs, auth and data models built for multi-tenant production traffic.",
      items: [
        "Node.js & Express",
        "NestJS",
        "PostgreSQL & Prisma",
        "REST APIs & JWT",
        "MongoDB & Redis",
      ],
    },
    {
      title: "Cloud & AI",
      description:
        "Getting it deployed, observable — and, increasingly, able to reason.",
      items: [
        "Docker & AWS EC2",
        "GitHub Actions CI/CD",
        "Vercel, Render, Neon",
        "RAG pipelines & Gemini API",
        "LangGraph agents & MCP",
      ],
    },
  ],

  projects: [
    {
      title: "Webhook Gateway & Observability Dashboard",
      blurb:
        "A self-hosted webhook gateway with at-least-once delivery, built on a PostgreSQL job queue (SELECT … FOR UPDATE SKIP LOCKED) for safe concurrent processing — no Redis required. Exponential backoff with jitter, per-route retry policies, a dead-letter queue and one-click replay for anything that failed.",
      role: "Solo — backend, frontend, infra",
      year: "2025",
      tags: ["NestJS", "PostgreSQL", "React / Vite", "Prisma", "Docker Compose"],
      /** Any of these can be omitted and the link disappears. */
      liveUrl: null as string | null,
      repoUrl: "https://github.com/Ajay-Baloni/Webhook-Gateway",
      featured: true,
      /** Optional: drop a 16:9 image in /public and reference it here, e.g. "/projects/ledgerly.png" */
      image: null as string | null,
      highlights: [
        "HMAC-SHA256 constant-time signature verification",
        "Idempotency-key deduplication blocks duplicate events",
        "Real-time per-attempt delivery timelines",
      ],
    },
    {
      title: "Website Analytics Assistant",
      blurb:
        "An autonomous LangGraph agent that answers plain-English questions like \"why did sales drop yesterday?\" It runs a cyclic plan → investigate → evaluate → synthesise state machine, forming and testing hypotheses until it can name the affected segment with real numbers.",
      role: "Solo — agent, API, tracker",
      year: "2025",
      tags: ["LangGraph", "SQL", "Express.js", "SSE"],
      liveUrl: null as string | null,
      repoUrl: null as string | null,
      featured: true,
      image: null as string | null,
      highlights: [
        "Function-calling over parameterised SQL — every metric from real aggregates",
        "Custom state reducers, reflection-loop caps, MemorySaver checkpointing",
        "Drop-in JS tracker: page views, clicks, time-on-page, SPA routes",
      ],
    },
    {
      title: "AI Document Assistant",
      blurb:
        "An end-to-end RAG assistant for the HRMS, built independently: ingestion and retrieval APIs, Gemini integration, and pgvector semantic search over company-uploaded PDFs — plus the chat UI on top.",
      role: "Solo, at Vergado Technologies",
      year: "2025",
      tags: ["Gemini API", "pgvector", "Node.js", "PostgreSQL"],
      liveUrl: null as string | null,
      repoUrl: null as string | null,
      featured: false,
      image: null as string | null,
      highlights: [],
    },
    {
      title: "Multi-Tenant HRMS Platform",
      blurb:
        "A production B2B SaaS HRMS. Tenant-aware architecture lets features be configured per client across modules, with SSO, client-side encryption for sensitive fields, and document generation for payslips and reports.",
      role: "Full-stack engineer",
      year: "2024 — 2026",
      tags: ["React.js", "Node.js", "PostgreSQL", "Prisma", "JWT"],
      liveUrl: null as string | null,
      repoUrl: null as string | null,
      featured: false,
      image: null as string | null,
      highlights: [],
    },
  ],

  experience: [
    {
      company: "Vergado Technologies",
      role: "Full Stack Developer",
      period: "Jan 2024 — Jun 2026",
      location: "Mohali, Punjab",
      summary:
        "Full-stack engineer on a production B2B SaaS HRMS, delivering features end to end across Node.js, PostgreSQL and a React frontend. Built tenant-aware modules configurable per client, designed and consumed REST APIs, integrated SSO and client-side encryption for sensitive fields, and shipped an AI document assistant (RAG over pgvector with Gemini) on my own. Also built Recharts dashboards and client-side PDF/Excel/Word generation, and improved performance with code splitting, lazy loading and React.memo/useMemo/useCallback.",
      tags: [
        "React.js",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Prisma",
        "REST APIs",
        "JWT",
        "Gemini API",
      ],
    },
    {
      company: "THDC Institute of Hydro Power Engineering & Technology",
      role: "B.Tech, Computer Science",
      period: "2019 — 2023",
      location: "Tehri Garhwal, Uttarakhand",
      summary:
        "Bachelor of Technology in Computer Science, graduated 2023.",
      tags: ["Computer Science"],
    },
  ],

  socials: [
    {
      label: "GitHub",
      href: "https://github.com/Ajay-Baloni",
      handle: "@Ajay-Baloni",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ajay-baloni-47151125b/",
      handle: "in/ajay-baloni",
    },
    {
      label: "Email",
      href: "mailto:ajaybaloni01@gmail.com",
      handle: "ajaybaloni01@gmail.com",
    },
  ],

  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type Project = (typeof site.projects)[number];
export type Experience = (typeof site.experience)[number];
export type Social = (typeof site.socials)[number];
