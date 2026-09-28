# Portfolio

A single-page developer portfolio built with Next.js 16 (App Router), TypeScript,
Tailwind CSS v4 and Motion.

## Getting started

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```

## Making it yours

Almost everything you'll want to change lives in one file: **`src/config/site.ts`**.
Name, role, email, bio, stats, tech stack, projects, work history, social links and
the nav items are all defined there — the components read from it, so you shouldn't
need to touch JSX for normal edits.

A few things to update before you deploy:

| What | Where |
| --- | --- |
| Your name, role, email, location | `site.name`, `site.role`, `site.email`, `site.location` |
| Real domain (used for OG tags) | `site.url` — currently `https://example.com` |
| Résumé PDF | drop it at `public/resume.pdf`, or point `site.resumeUrl` at a hosted link |
| Social links | `site.socials` — the `href`s are placeholders |
| Projects | `site.projects` — placeholder projects, replace with your own |
| Work history | `site.experience` |

### Hero headline

`site.hero.accentWord` picks which word in `site.hero.headline` gets the gradient
treatment. The word has to actually appear in the headline for it to highlight.

### Project images

Each project has an `image` field, `null` by default, which renders a generated
gradient panel instead. To use a real screenshot, drop a 4:3 image in
`public/projects/` and set `image: "/projects/your-file.png"`.

### Colours

The palette is defined as Tailwind theme tokens at the top of `src/app/globals.css`:
`--color-ink` (background), `--color-chalk` / `--color-mist` / `--color-dim` (text),
and `--color-glow`, `--color-glow-cyan`, `--color-glow-pink` (the neon accents).
Change them there and the whole site follows.

## Structure

```
src/
  app/
    layout.tsx            metadata, fonts
    page.tsx              section order
    globals.css           theme tokens, keyframes, utilities
    icon.svg              favicon (monogram)
    opengraph-image.tsx   social share card, generated at build time
  components/
    navbar.tsx            floating nav, scroll-spy, mobile menu
    hero.tsx              headline reveal + scroll parallax
    stack-marquee.tsx     infinite scrolling tech rows
    about.tsx             bio, animated stat counters, expertise
    projects.tsx          featured + compact project grids
    project-card.tsx      3D-tilt cards
    experience.tsx        timeline with a scroll-linked spine
    contact.tsx           CTA + copy-to-clipboard email
    footer.tsx
    ui/                   reveal, spotlight-card, magnetic, cursor-glow,
                          scroll-progress, counter, aurora, section-heading
  config/site.ts          all content
  lib/utils.ts            cn() class helper
```

## Notes

- Every animation respects `prefers-reduced-motion` — entrances collapse to short
  fades, the cursor glow and magnetic buttons switch off entirely.
- The cursor glow is skipped on touch devices (`pointer: fine` only).
- Stat counters render their final value on the server, so the numbers are correct
  without JavaScript.
- `html` uses `overflow-x: clip` so the decorative background blurs can't widen the
  page or make mobile browsers zoom out.

## Deploying

Works on any Node host. For Vercel: push to a Git repo, import it, done — no
environment variables required. Set `site.url` to your real domain first so the
Open Graph tags resolve.
