# Rasoi Royal — Fine Indian Cuisine Website

A luxury Indian restaurant website built with Next.js 14, Framer Motion, GSAP, and Lenis.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript** — fully typed
- **Tailwind CSS** — utility styles
- **GSAP + ScrollTrigger** — scroll animations
- **Framer Motion** — component animations & micro-interactions
- **Lenis** — buttery smooth scrolling
- **Playfair Display** — royal serif display font
- **Jost** — clean modern body font

## Pages
| Route | Description |
|---|---|
| `/` | Homepage — Hero, Menu Preview, Offers, Testimonials, CTA |
| `/menu` | Full menu with category tabs, diet filters (Veg/Non-Veg/Vegan/GF), search |
| `/winery` | Drinks & wine list with animated wave hero, 3D-feel cards |
| `/about` | 4-section About — story, mission, timeline, team with hover interactions |
| `/contact` | Reservation form, hours, narrative map, Spice Quest mini-game |

## Content Editing
- **Restaurant info** → `src/lib/config.ts`
- **Menu items** → `src/lib/menuData.ts`
- **SEO** → `src/app/layout.tsx` + `src/lib/config.ts`

## Design System
- Colours defined in `src/app/globals.css` (CSS custom properties)
- Gold: `#c9932a` · Crimson: `#8b1a1a` · Saffron: `#e85d04` · Emerald: `#1a5c3a`
- Background: `#faf8f3` (warm parchment)
- Typography: Playfair Display (headings) + Jost (body)
