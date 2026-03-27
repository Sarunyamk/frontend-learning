# Next.js Template

A production-ready Next.js template with authentication (NextAuth.js), theme switching, Framer Motion animations, and Zod environment validation.

## Tech Stack

- **Next.js 16** + TypeScript
- **NextAuth.js v5** (Credentials provider + JWT strategy)
- **Tailwind CSS 4** + **shadcn/ui** + **Radix UI**
- **Framer Motion** animations
- **Zod** environment validation (server & client)
- **React Hook Form** + Zod resolvers
- **next-themes** dark/light mode
- **pnpm** package manager

## Getting Started

### 1. Clone

```bash
git clone <repo-url> my-project
cd my-project
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
NODE_ENV=development

API_URL="http://localhost:4000/api"

NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 4. Run

```bash
pnpm dev
```

App: `http://localhost:3000`

## Project Structure

```
src/
├── @types/                          # Type augmentation (next-auth)
├── app/
│   ├── api/auth/[...nextauth]/      # NextAuth API route
│   ├── layout.tsx                   # Root layout (Header, Footer, ThemeProvider)
│   ├── page.tsx                     # Home page
│   ├── not-found.tsx                # 404 page
│   ├── robots.ts                    # SEO robots.txt
│   └── sitemap.ts                   # SEO sitemap
├── components/
│   ├── framer-motion/               # Animation wrappers (Fade, Dropdown)
│   ├── layout/                      # Header, Footer, MobileNav
│   ├── theme/                       # ThemeProvider, ThemeToggle
│   └── ui/                          # shadcn/ui components (Button, etc.)
├── constants/
│   ├── important.constant.ts        # BASE_URL, LOGO_URL, GA_ID
│   ├── navigation.constant.ts       # NAV_ITEMS
│   ├── role.constant.ts             # USER_ROLE, UserRole type
│   └── route.constant.ts            # ROUTES
├── hooks/
│   └── useScroll.ts                 # Scroll detection hook
├── lib/
│   ├── auth/                        # NextAuth config + getCurrentUser helper
│   ├── env/                         # Zod env validation (server & client)
│   ├── framer-motion/               # Animation variants
│   ├── git-buildtime.ts             # Build time utility
│   └── utils.ts                     # cn() utility
└── proxy.ts                         # Next.js 16 proxy (replaces middleware)
```

## Built-in Features

### Authentication (NextAuth.js v5)

Pre-configured with Credentials provider and JWT strategy. Includes token refresh logic and role-based user type.

- Login page: `/admin/login`
- Session strategy: JWT (7-day max age)
- Type-safe session with custom fields (`role`, `accessToken`, `error`)

### Environment Validation

Split into server and client schemas using Zod. Server env is guarded with `server-only` to prevent client-side access.

```typescript
// Server-only (cannot import in Client Components)
import { serverEnv } from '@/lib/env/env.server';

// Client-safe (works everywhere)
import { clientEnv } from '@/lib/env/env.client';
```

### Theme (Dark/Light Mode)

Uses `next-themes` with a `ThemeProvider` wrapper and a `ThemeToggle` component.

### Proxy (Next.js 16 Middleware Replacement)

`src/proxy.ts` replaces the traditional `middleware.ts`. Add your redirect, rewrite, auth guard, or CSP header logic here.

### Framer Motion Animations

Ready-to-use animation components:

- `<Fade>` — fade-in on scroll
- `<Dropdown>` — animated dropdown

### Role Constants

```typescript
import { USER_ROLE, isSuperAdmin } from '@/constants/role.constant';

// USER_ROLE.ADMIN | USER_ROLE.SUPER_ADMIN
```

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Development with hot reload |
| `pnpm build` | Build for production (includes build time stamp) |
| `pnpm start` | Start production server |
| `pnpm lint` | Lint with ESLint |
