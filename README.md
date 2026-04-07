# Padmalaya Textiles

B2B e-commerce website for a terry towel manufacturer based in Solapur, India. Built for wholesale buyers and procurement teams to browse the product catalog and submit RFQ (request for quote) enquiries.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| Language | TypeScript |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Clerk (conditional — graceful degradation) |
| Email | Resend |
| Analytics | PostHog (conditional) |
| Error tracking | Sentry (conditional) |
| Animations | GSAP |
| Forms | React Hook Form + Zod |
| Deployment | Vercel (Mumbai region) |

---

## Features

- **Product catalog** — grid listing with detail pages, image galleries, and color swatches
- **Quote flow** — "Add to Quote" button on each product; quote chips surface in the contact/enquiry form
- **SessionStorage persistence** — quote state survives page navigation without requiring a login
- **Enquiry form** — submits to Supabase and triggers a confirmation email via Resend
- **Admin dashboard** — manage products and view/respond to enquiries (JWT-protected)
- **Clerk authentication** — sign-in/sign-up pages with conditional rendering; site degrades gracefully when keys are absent
- **Full SEO** — per-page metadata, `sitemap.ts`, `robots.ts`, JSON-LD structured data
- **PostHog analytics** — page views and product-view events (no-op when key is absent)
- **Sentry error tracking** — client and server error capture (no-op when DSN is absent)
- **Design system** — "Porcelain Canopy" theme: porcelain greens, forest/moss/pine accents, brass/gold highlights, Fraunces serif + Outfit sans-serif, glassmorphism + neumorphic surfaces

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm / pnpm / yarn

### Installation

```bash
git clone https://github.com/your-org/padmalaya-textiles.git
cd padmalaya-textiles
npm install
```

### Environment Setup

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env.local
```

Open `.env.local` and set the following variables:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in route (`/sign-in`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up route (`/sign-up`) |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog ingest host |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN |
| `SENTRY_AUTH_TOKEN` | Sentry auth token (for source maps) |
| `SENTRY_ORG` | Sentry org slug |
| `SENTRY_PROJECT` | Sentry project slug |
| `RESEND_API_KEY` | Resend API key for transactional email |

> Clerk, PostHog, and Sentry are all optional — the site runs without them.

### Database Setup

Apply the schema and seed data to your Supabase project:

```bash
# Schema
psql $DATABASE_URL < src/lib/supabase-schema.sql

# Seed (optional)
psql $DATABASE_URL < src/lib/supabase-seed.sql
```

Or paste the SQL files directly into the Supabase SQL editor.

---

## Development

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build locally
npm run lint     # ESLint
```

---

## Project Structure

```
src/
├── app/
│   ├── actions/          # Server actions (products, enquiries, admin)
│   ├── admin/            # Admin dashboard (products + enquiries CRUD)
│   ├── products/[slug]/  # Product detail pages
│   ├── sign-in/          # Clerk sign-in (catch-all)
│   ├── sign-up/          # Clerk sign-up (catch-all)
│   ├── robots.ts         # Dynamic robots.txt
│   ├── sitemap.ts        # Dynamic sitemap
│   ├── layout.tsx        # Root layout (providers, fonts, analytics)
│   └── page.tsx          # Homepage (Hero, Collection, Process, Mill, Contact)
├── components/
│   ├── admin/            # Admin UI components
│   ├── layout/           # Navbar, Footer
│   ├── providers/        # PostHog provider
│   ├── sections/         # Homepage sections
│   └── ui/               # Shared UI (buttons, gallery, quote chips)
├── context/
│   └── QuoteContext.tsx  # SessionStorage-backed quote state
├── hooks/                # Custom React hooks
└── lib/
    ├── supabase*.ts      # Supabase client, types, schema, seed
    ├── analytics.ts      # PostHog helpers
    ├── auth.ts           # JWT-based admin auth
    ├── design-tokens.ts  # Design system tokens
    ├── email-templates.ts# Transactional email HTML
    ├── resend.ts         # Resend client
    └── utils.ts          # Shared utilities
```

---

## Deployment

The project is configured for **Vercel** deployment.

1. Push to your GitHub repository.
2. Import the project in the [Vercel dashboard](https://vercel.com).
3. Set all environment variables from `.env.example` in **Project Settings → Environment Variables**.
4. Set the Vercel region to **Bombay (BOM1)** (Mumbai) for lowest latency to Indian users.
5. Deploy — Vercel auto-detects Next.js and runs `next build`.

> The `SENTRY_AUTH_TOKEN` is only needed at build time for uploading source maps. It does not need to be set in the runtime environment.

---

## License

MIT
