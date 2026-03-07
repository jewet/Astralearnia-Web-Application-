# Astralearnia — Next.js + TypeScript

> Engineering Intelligence. Empowering Minds.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Bricolage Grotesque (display) + Plus Jakarta Sans (body) + JetBrains Mono
- **Runtime**: Node.js 18+

---

## 📁 Project Structure

```
astralearnia/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (fonts, metadata, Navbar, Footer)
│   ├── globals.css             # Global styles + design system tokens
│   ├── page.tsx                # Homepage
│   ├── technologies/
│   │   └── page.tsx            # Technologies division page
│   ├── institute/
│   │   └── page.tsx            # Institute division page
│   ├── contact/
│   │   └── page.tsx            # Contact + demo request page
│   ├── solutions/
│   │   └── [slug]/page.tsx     # Dynamic solution pages (to be created)
│   └── blog/
│       └── [slug]/page.tsx     # Dynamic blog pages (to be created)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav with scroll detection
│   │   └── Footer.tsx          # Full footer with columns + socials
│   ├── sections/
│   │   ├── HeroSection.tsx     # Hero with Canvas neural network animation
│   │   ├── DivisionBridge.tsx  # Technologies vs Institute portal cards
│   │   ├── SolutionsGrid.tsx   # 6-card solutions grid
│   │   ├── ProductsSection.tsx # Drag-to-scroll horizontal product cards
│   │   ├── ApiSection.tsx      # Dark API code block section
│   │   └── FinalCTA.tsx        # Global CTA footer section
│   └── ui/
│       ├── Button.tsx          # Multi-variant button (primary/secondary/ghost/outline)
│       ├── Badge.tsx           # Colored badge with optional pulse dot
│       ├── SectionLabel.tsx    # Labeled section header with line
│       └── Cursor.tsx          # Custom cursor with ring lag effect
│
├── lib/
│   ├── constants.ts            # All site data (solutions, products, blog posts, etc.)
│   └── utils.ts                # cn() + helper utilities
│
├── types/
│   └── index.ts                # TypeScript interfaces for all data models
│
├── public/                     # Static assets
├── tailwind.config.ts          # Full design system config
├── tsconfig.json               # TypeScript strict config with path aliases
├── next.config.mjs             # Next.js config
└── package.json                # All dependencies
```

---

## 🎨 Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `void` | `#03050A` | Page background |
| `abyss` | `#070B14` | Section backgrounds |
| `deep` | `#0B1120` | Card backgrounds |
| `azure` | `#2563EB` | Technologies accent |
| `violet` | `#7C3AED` | Institute accent |
| `ice` | `#06B6D4` | Highlight / labels |

### Fonts
- **Bricolage Grotesque** — Display, headings (H1–H3)
- **Plus Jakarta Sans** — Body, UI text, labels
- **JetBrains Mono** — Code blocks, API documentation

### Spacing
- Section vertical padding: `120px`
- Section horizontal padding: `72px` (desktop)
- Card padding: `40–56px`

---

## ⚡ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type check
npm run type-check

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📄 Pages Built

| Page | Route | Status |
|------|-------|--------|
| Homepage | `/` | ✅ Complete |
| Technologies | `/technologies` | ✅ Complete |
| Institute | `/institute` | ✅ Complete |
| Contact | `/contact` | ✅ Complete |
| Solutions (Dynamic) | `/solutions/[slug]` | 🔨 In progress |
| Products | `/products` | 🔨 In progress |
| Blog | `/blog` | 🔨 In progress |
| API Docs | `/api-docs` | 🔨 In progress |
| Pricing | `/pricing` | 📋 Planned |

---

## 🌍 Deployment

**Recommended**: Vercel (zero-config Next.js deployment)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Environment Variables** (create `.env.local`):
```env
NEXT_PUBLIC_SITE_URL=https://astralearnia.com
RESEND_API_KEY=your_key_here        # For contact form emails
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX     # Google Analytics (optional)
```

---

## 🔜 Phase 2 Additions

- [ ] Framer Motion scroll-triggered animations
- [ ] Solution individual pages with full sales funnel
- [ ] Blog with MDX support
- [ ] API documentation page
- [ ] Dashboard app (`app.astralearnia.com`) — separate repo
- [ ] Node.js API backend (Express/Fastify)
- [ ] CMS integration (Sanity or Contentlayer)
- [ ] Authentication (NextAuth.js)

---

## 📞 Target: 50 Global Clients Monthly

Every design decision was made with conversion in mind:
- Clear division architecture (no confusion)
- CTA on every 2 sections
- Answers: What? Who? Why? How to buy?
- Premium brand positioning from first impression

---

*Astralearnia Technologies © 2025*
