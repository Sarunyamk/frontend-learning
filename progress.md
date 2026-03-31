# Progress — Learning Fullstack

## Current Sprint: Feature Placeholder Pages

---

### Done
- [x] Project setup (Next.js 16, TypeScript strict, Tailwind v4, shadcn/ui)
- [x] Auth.js v5 config (Credentials provider, JWT strategy, token refresh, mock data)
- [x] Theme system (dark/light via next-themes + ThemeProvider + ThemeToggle)
- [x] Layout — Header (Server/Client split), Footer, MobileNav
- [x] Framer Motion animation presets (fadeUp, fadeIn, slideDown, slideLeft, slideRight, dropdown, slideInRight, stagger)
- [x] ColumnFade component (scroll-triggered animation wrapper)
- [x] Environment validation (Zod — server + client)
- [x] SEO basics (robots.ts, sitemap.ts)
- [x] Constants pattern (ROUTES, NAV_ITEMS, USER_ROLE)
- [x] Utility — cn() (clsx + tailwind-merge)
- [x] Custom hook — useScroll
- [x] Type extension — next-auth.d.ts
- [x] Documentation — claude.md, product.md

### In Progress
- [x] Documentation — progress.md, share.md, style.md, product.md updated
- [x] Home page (hero section + feature cards)
  - [x] HeroSection component (Server) — heading, description, CTA button
  - [x] FeatureCard component (Client) — animation, icon map, link
  - [x] feature.constant.ts — FEATURE_CATEGORIES data + types
  - [x] FeatureSection component (Server) — grid wrapper, map categories → cards
  - [x] page.tsx — compose HeroSection + FeatureSection
  - [x] home-metadata.ts — SEO metadata แยกไฟล์ (lib/seo/)
  - [x] FeatureCard ใช้ shared fadeUp preset แทน inline animation
  - [x] Build + Lint pass
  - [x] อัปเดต share.md + progress.md
- [x] Sidebar navigation (collapsible, responsive)
  - [x] shadcn/ui sidebar + collapsible installed
  - [x] Sidebar data — ใช้ FEATURE_CATEGORIES (มีอยู่แล้ว)
  - [x] AppSidebar component — shadcn Sidebar + SidebarContent + SidebarHeader
  - [x] SidebarItem component (Client) — Collapsible + SidebarMenu + active state (usePathname)
  - [x] app/features/layout.tsx — SidebarProvider + AppSidebar + SidebarInset + SidebarTrigger
  - [x] Mobile drawer — shadcn Sidebar จัดการอัตโนมัติ (Sheet on mobile)
  - [x] Responsive behavior — shadcn built-in (expanded desktop / drawer mobile)
  - [x] Build + Lint pass
- [ ] Features layout + placeholder pages
  - [x] app/features/page.tsx — overview page (FeatureCard grid, reuse FEATURE_CATEGORIES)
  - [x] **Data abstraction layer** — `lib/api/features.ts`
    - `getFeatureCategories()` — returns FEATURE_CATEGORIES (swap to API fetch ทีหลัง)
    - `getFeatureCategory(key)` — lookup single category
    - ทุก page/component ดึงข้อมูลจาก layer นี้ ไม่ import constants โดยตรง
    - `import 'server-only'` guard + TODO comment บอก swap pattern
  - [x] **shadcn Breadcrumb** — install + สร้าง `FeatureBreadcrumb` (Server component)
    - `components/features/feature-breadcrumb.tsx` — render: Home → Features → [Feature Label]
  - [x] **Metadata factory** — `lib/seo/features-metadata.ts`
    - `getFeatureMetadata(category)` — title/description/og มาจาก category ทั้งหมด
  - [x] **Placeholder pages** (5 หน้า — pattern เดียวกันทุกหน้า)
    - `app/features/payment/page.tsx`
    - `app/features/socket/page.tsx`
    - `app/features/tailwind/page.tsx`
    - `app/features/next-auth/page.tsx`
    - `app/features/framer-motion/page.tsx`
    - `components/features/feature-sub-items.tsx` — sub-item cards + coming soon badge (reuse ทุกหน้า)
  - [x] Build pass — ทุก feature page render เป็น Static (○)
- [x] Constants — feature.constant.ts, route update

### Backlog (Priority Order)

**Sprint 2 — Frontend Features (ไม่ต้องพึ่ง Backend)**

- [x] 1. Tailwind Deep Dive (Setup Tokens, Setup Themes)
  - [x] `constants/tailwind.constant.ts` — token data, color formats, gradient @utility examples, theme setup steps
  - [x] `components/tailwind/code-block.tsx` — reusable code snippet + copy button (Client)
  - [x] `components/tailwind/copy-badge.tsx` — reusable copy-to-clipboard badge (Client)
  - [x] `components/tailwind/token-showcase.tsx` — tutorial: CSS var → @theme inline → @utility (Server)
  - [x] `app/features/tailwind/tokens/page.tsx` — Server page
  - [x] `components/tailwind/theme-setup-guide.tsx` — tutorial: install → provider → toggle → CSS vars (Server)
  - [x] `components/tailwind/theme-live-demo.tsx` — live toggle + preview card (Client)
  - [x] `app/features/tailwind/themes/page.tsx` — Server page
  - [x] อัปเดต tailwind page (readyPaths) + .md files
- [x] 2. Framer Motion Showcase
  - [x] `constants/framer-motion.constant.ts` — ANIMATION_PRESETS (8), SCROLL_EXAMPLES (3), TRANSITION_EXAMPLES (3), READY_TO_USE_CODES, TRANSITION_READY_TO_USE_CODES
  - [x] `components/features/framer-motion/animation-examples.tsx` — Client, 8 preset cards + live demo + replay + Ready to Use (collapsible)
  - [x] `app/features/framer-motion/examples/page.tsx` — Server page
  - [x] `components/features/framer-motion/scroll-animations.tsx` — Client, whileInView demos (ColumnFade + StaggerContainer reuse) + Ready to Use
  - [x] `app/features/framer-motion/scroll/page.tsx` — Server page
  - [x] `components/features/framer-motion/page-transitions.tsx` — Client, 3 live demos (Tab/Step/Toggle) + Ready to Use + Used in Project links
  - [x] `app/features/framer-motion/transitions/page.tsx` — Server page
  - [x] `components/framer-motion/stagger.tsx` — StaggerContainer + StaggerItem reusable components
  - [x] `components/framer-motion/step-transition.tsx` — StepTransition reusable component (AnimatePresence + fadeSlide)
  - [x] ColumnFade เพิ่ม props: `once`, `amount`
  - [x] fadeSlide variant เพิ่มใน `lib/framer-motion/framer-motion.ts`
  - [x] multi-step-form.tsx — ใช้ StepTransition แทน instant swap
  - [x] image-dropzone.tsx — เพิ่ม AnimatePresence ให้ preview fade + scale
  - [x] readyPaths + routes + feature.constant อัปเดต
  - [x] `constants/form-ready-to-use.constant.ts` + `app/features/forms/ready-to-use/page.tsx` — Form Ready to Use page
  - [x] อัปเดต .md files
- [ ] 3. NextAuth Deep Dive (OAuth, Protected, RBAC)
  - [ ] Auth setup guide page — config walkthrough
  - [ ] Google OAuth page — OAuth flow demo
  - [ ] Protected page — middleware guard demo
  - [ ] Role-based page — RBAC demo (admin/user)
  - [ ] Session info page — แสดง session data

**Sprint 3 — Backend Integration**

- [ ] 4. Payment Simulation (Stripe/Omise)
  - [ ] Product list page — แสดงสินค้าจำลอง
  - [ ] Cart/Checkout page — สรุปรายการ + เลือก provider
  - [ ] Stripe integration — Stripe Elements, Server Action, webhook
  - [ ] Omise integration — Omise.js, Server Action, webhook
  - [ ] Success/Failure pages — ผลลัพธ์การชำระเงิน
  - [ ] Error states + loading UI
- [ ] 5. Socket.io Real-time (Chat, Stock)
  - [ ] useSocket custom hook — connection management, reconnection
  - [ ] Chat room page — real-time messaging UI
  - [ ] Stock ticker page — real-time price updates
  - [ ] NestJS WebSocket gateway (backend)
  - [ ] Optimistic UI + connection status indicator

**Parked (ทำทีหลัง)**

- [x] Form Patterns (Basic, Multi-step, Dynamic, Upload) — done
- [ ] i18n (Path-based /th /en)
- [ ] Testing Playground (Vitest, RTL)
- [ ] Data Fetching Patterns (SSR/SSG/ISR/Client/Streaming)
