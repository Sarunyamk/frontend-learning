# Share — Reusable Catalog

> ห้ามสร้างซ้ำ — ตรวจที่นี่ก่อนเสมอ

---

## Components

| Component | Path | Type | Description |
|-----------|------|------|-------------|
| `ColumnFade` | `src/components/framer-motion/fade.tsx` | Client | Scroll-triggered fade animation wrapper, รับ variant/delay/duration |
| `AnimatedDropdown` | `src/components/framer-motion/dropdown.tsx` | Client | Animated dropdown menu |
| `Button` | `src/components/ui/button.tsx` | Server | shadcn/ui button (variant: default/outline/secondary/ghost/destructive/link, size: xs/sm/default/lg/icon) |
| `Header` | `src/components/layout/header.tsx` | Server | Header wrapper (Server) |
| `HeaderClient` | `src/components/layout/header-client.tsx` | Client | Header interaction (nav, theme toggle, scroll effect) |
| `Footer` | `src/components/layout/footer.tsx` | Server | Footer |
| `MobileNav` | `src/components/layout/mobile-nav.tsx` | Client | Mobile slide-in navigation (from right) |
| `HeroSection` | `src/components/home/hero-section.tsx` | Server | Home hero — heading, description, CTA |
| `FeatureSection` | `src/components/home/feature-section.tsx` | Server | Feature grid wrapper — map FEATURE_CATEGORIES → FeatureCard |
| `FeatureCard` | `src/components/home/feature-card.tsx` | Client | Feature card — fadeUp animation, icon map, link |
| `FeatureBreadcrumb` | `src/components/features/feature-breadcrumb.tsx` | Server | Breadcrumb สำหรับ feature pages — รับ `category: FeatureCategoryConfig`, render Home → Features → [Label] |
| `FeatureSubItems` | `src/components/features/feature-sub-items.tsx` | Server | Sub-item cards + Coming soon badge — รับ `items: readonly FeatureItem[]` |
| `AppSidebar` | `src/components/sidebar/sidebar.tsx` | Server | shadcn Sidebar wrapper — map FEATURE_CATEGORIES → SidebarItem |
| `SidebarItem` | `src/components/sidebar/sidebar-item.tsx` | Client | Collapsible sidebar menu item — active state via usePathname |
| `ThemeProvider` | `src/components/theme/theme-provider.tsx` | Client | next-themes provider wrapper |
| `ThemeToggle` | `src/components/theme/theme-toggle.tsx` | Client | Dark/light mode toggle button |
| `FormTextField` | `src/components/forms/form-text-field.tsx` | Client | Reusable text input field — control, name, label, placeholder, type |
| `FormCheckboxGroup` | `src/components/forms/form-checkbox-group.tsx` | Client | Reusable checkbox group — control, name, label, options, columns |
| `FormRadioGroup` | `src/components/forms/form-radio-group.tsx` | Client | Reusable radio group — control, name, label, options, className |
| `FormSelect` | `src/components/forms/form-select.tsx` | Client | Reusable select dropdown — control, name, label, placeholder, options |
| `ImageDropzone` | `src/components/forms/image-dropzone.tsx` | Client | Reusable image upload — drag & drop, preview, remove, validate type/size. Props: value, onChange, multiple, maxFiles |
| `StaggerContainer` | `src/components/framer-motion/stagger.tsx` | Client | Stagger animation container — once, amount, className |
| `StaggerItem` | `src/components/framer-motion/stagger.tsx` | Client | Stagger animation child item — className |
| `StepTransition` | `src/components/framer-motion/step-transition.tsx` | Client | AnimatePresence + fadeSlide wrapper — stepKey, duration, className |
| `CodeBlockShiki` | `src/components/tailwind/code-block-shiki.tsx` | Server (async) | Shiki syntax highlighted code block. Props: code, language, className — ใช้แทน CodeBlock ลบออกไปแล้ว ใน Server components |
| `CopyButton` | `src/components/tailwind/copy-button.tsx` | Client | Copy-to-clipboard button (extracted from CodeBlock) — ใช้ใน CodeBlockShiki. Props: code |
| `AuthDemoHeader` | `src/components/features/next-auth/auth-demo-header.tsx` | Client | Auth demo header bar — session prop จาก server, login/logout button, role badge |
| `LoginForm` | `src/components/features/next-auth/login-form.tsx` | Client | Login form — react-hook-form + zod, demo credentials buttons, error display |
| `AuthSetupContent` | `src/components/features/next-auth/auth-setup-content.tsx` | Server | Auth setup tutorial — step-by-step code walkthrough |
| `GoogleOAuthContent` | `src/components/features/next-auth/google-oauth-content.tsx` | Server | Google OAuth tutorial — step-by-step guide + demo button |
| `GoogleOAuthDemo` | `src/components/features/next-auth/google-oauth-demo.tsx` | Client | Google Sign-in demo button — demo mode alert เมื่อยังไม่มี credentials |
| `ProtectedContent` | `src/components/features/next-auth/protected-content.tsx` | Server | Protected & RBAC demo — user info, super admin gate, code examples (CodeBlockShiki) |
| `SessionContent` | `src/components/features/next-auth/session-content.tsx` | Server | Server session card + code examples (CodeBlockShiki) |
| `ClientSessionCard` | `src/components/features/next-auth/client-session-card.tsx` | Client | Client session card — useSession() demo |
| `AnimationReadyToUse` | `src/components/features/framer-motion/animation-ready-to-use.tsx` | Server | Ready-to-use code section (Variant Presets, ColumnFade, Stagger) — CodeBlockShiki |
| `TransitionReadyToUse` | `src/components/features/framer-motion/transition-ready-to-use.tsx` | Server | Ready-to-use + Used in Project + Code Examples — CodeBlockShiki |
| `PresetCard` | `src/components/features/framer-motion/preset-card.tsx` | Client | Animation preset live demo — รับ codeSlot (Server JSX) จาก parent |
| `CustomButton` | `src/components/shared/custom-button.tsx` | Server | Wrapper รอบ shadcn Button — รับ icon (LucideIcon), label, children, className, variant, size + ทุก button props. มี `gap-2` ในตัว |
| `PatternCard` | `src/components/features/custom-patterns/button/pattern-card.tsx` | Client | Collapsible card — live demo + code (codeSlot). ใช้ใน custom-patterns ทุกหน้า |

---

## Hooks

| Hook | Path | Description |
|------|------|-------------|
| `useScroll` | `src/hooks/useScroll.ts` | Scroll position detection |

---

## Utilities

| Function | Path | Description |
|----------|------|-------------|
| `cn()` | `src/lib/utils.ts` | clsx + tailwind-merge สำหรับ conditional className |
| `getCurrentUser()` | `src/lib/auth/get-current-user.ts` | Get auth session (Server only), redirect ถ้าไม่ login |
| `highlightCode()` | `src/lib/shiki.ts` | Shiki syntax highlight (server-only singleton) — dual theme (github-light/dark) |

---

## Animation Presets (`src/lib/framer-motion/`)

| Variant | File | Description |
|---------|------|-------------|
| `fadeUp` | `framer-motion.ts` | Fade in + slide up (y: 50→0) |
| `fadeIn` | `framer-motion.ts` | Fade in only |
| `slideDown` | `framer-motion.ts` | Fade in + slide down (y: -50→0) |
| `slideLeft` | `framer-motion.ts` | Fade in + slide from right (x: 50→0) |
| `slideRight` | `framer-motion.ts` | Fade in + slide from left (x: -50→0) |
| `dropdown` | `framer-motion.ts` | Dropdown menu (y: -12→0, มี exit) |
| `slideInRight` | `framer-motion.ts` | Full slide from right (x: 100%→0, สำหรับ mobile nav) |
| `staggerContainer` | `framer-motion.ts` | Parent container สำหรับ stagger children (0.06s gap, 0.15s delay) |
| `staggerItem` | `framer-motion.ts` | Child item สำหรับ stagger (fade + slide from right) |
| `fadeSlide` | `framer-motion.ts` | Slide เข้าจากขวา ออกทางซ้าย (มี exit) — สำหรับ step/tab transitions |
| Header variants | `header.ts` | Header-specific animations |

---

## Constants

| Constant | Path | Description |
|----------|------|-------------|
| `ROUTES` | `src/constants/route.constant.ts` | Route paths (HOME, ABOUT, CONTACT) |
| `NAV_ITEMS` | `src/constants/navigation.constant.ts` | Navigation items (home, about, contact) |
| `USER_ROLE` | `src/constants/role.constant.ts` | User roles (ADMIN, SUPER_ADMIN) + `isSuperAdmin()` helper |
| `FEATURE_CATEGORIES` | `src/constants/feature.constant.ts` | Feature category configs (key, label, description, icon, path, items) |
| `BASE_URL`, `LOGO_URL` | `src/constants/important.constant.ts` | App-wide constants |
| `MEMBER_ROLE_OPTIONS` | `src/constants/form.constant.ts` | Member role options for dynamic form (developer, designer, manager, qa) |
| `ANIMATION_PRESETS` | `src/constants/framer-motion.constant.ts` | 8 animation preset examples (name, description, variantCode, usageCode) |
| `SCROLL_EXAMPLES` | `src/constants/framer-motion.constant.ts` | 3 scroll animation examples (whileInView, viewport, stagger) |
| `TRANSITION_EXAMPLES` | `src/constants/framer-motion.constant.ts` | 3 page transition examples (AnimatePresence, mode, variants) |
| `READY_TO_USE_CODES` | `src/constants/framer-motion.constant.ts` | Ready-to-use code: Variant Presets, ColumnFade, Stagger |
| `TRANSITION_READY_TO_USE_CODES` | `src/constants/framer-motion.constant.ts` | Ready-to-use code: fadeSlide, StepTransition |
| `FORM_READY_TO_USE_CODES` | `src/constants/form-ready-to-use.constant.ts` | Ready-to-use form components (5 items) |
| `READY_FRAMER_MOTION_PATHS` | `src/constants/route.constant.ts` | Ready paths for Framer Motion sub-pages |
| `READY_NEXT_AUTH_PATHS` | `src/constants/route.constant.ts` | Ready paths for NextAuth sub-pages |
| `MOCK_USERS` | `src/constants/next-auth.constant.ts` | 2 mock users (admin@test.com → ADMIN, super@test.com → SUPER_ADMIN) |
| `AUTH_SETUP_SECTIONS` | `src/constants/next-auth.constant.ts` | 7 code sections for auth setup tutorial |
| `GOOGLE_OAUTH_SECTIONS` | `src/constants/next-auth.constant.ts` | 4 code sections for Google OAuth tutorial |
| `PROTECTED_CODE_SECTIONS` | `src/constants/next-auth.constant.ts` | 3 code sections for proxy guard + RBAC examples |
| `SESSION_CODE_SECTIONS` | `src/constants/next-auth.constant.ts` | 3 code sections for server vs client session |
| `UPLOAD_TIPS` | `src/constants/image-tips.constant.ts` | Next.js file upload config tips (body size, remote images, API route, cloud storage) |
| `BUTTON_PATTERNS` | `src/constants/custom-patterns/button.constant.ts` | Button pattern data (key, title, description, code) — 15 patterns |
| `homeMetadata` | `src/lib/seo/home-metadata.ts` | Home page SEO metadata (title, description, openGraph) |
| `getFeatureMetadata()` | `src/lib/seo/features-metadata.ts` | Feature page metadata factory — รับ `FeatureCategoryConfig` คืน `Metadata` |

---

## Data Abstraction Layer (Backend Readiness)

> **Pattern:** ทุก page/component ดึงข้อมูลผ่าน layer นี้ — ไม่ import constants โดยตรง
> เมื่อมี backend: เปลี่ยนแค่ body ของ function ใน `lib/api/` โดยไม่แตะ component

| Function | Path | Description |
|----------|------|-------------|
| `getFeatureCategories()` | `src/lib/api/features.ts` | คืน FEATURE_CATEGORIES ทั้งหมด (พร้อม swap เป็น API fetch) |
| `getFeatureCategory(key)` | `src/lib/api/features.ts` | lookup FeatureCategoryConfig จาก key |

**Swap pattern:**
```ts
// ตอนนี้ (constant)
export async function getFeatureCategories() {
  return FEATURE_CATEGORIES; // swap บรรทัดนี้เป็น fetch('/api/features') เมื่อมี backend
}
```

---

## Environment Validation

| Module | Path | Description |
|--------|------|-------------|
| Server env | `src/lib/env/env.server.ts` | `API_URL`, `NODE_ENV` (server-only guard) |
| Client env | `src/lib/env/env.client.ts` | `NEXT_PUBLIC_BASE_URL` |
