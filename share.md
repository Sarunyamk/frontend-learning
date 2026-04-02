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
| `FeatureBreadcrumb` | `src/components/shared/feature-breadcrumb.tsx` | Server | Breadcrumb สำหรับ feature pages — รับ `category: FeatureCategoryConfig`, render Home → Features → [Label] |
| `FeatureSubItems` | `src/components/shared/feature-sub-items.tsx` | Server | Sub-item cards + Coming soon badge — รับ `items: readonly FeatureItem[]` |
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
| `PatternCard` | `src/components/shared/pattern-card.tsx` | Client | Collapsible card — live demo + code (codeSlot). ใช้ใน custom-patterns ทุกหน้า |
| `LoadingScreen` | `src/components/shared/loading-screen.tsx` | Server | Full-page overlay + backdrop blur + Loader2 spinner + "Loading..." — ไม่มี props, import ไปใช้ใน loading.tsx ได้เลย |
| `showToast` | `src/components/shared/show-toast.tsx` | Function | Reusable toast function — showToast({ type, title, description }). Types: success/error/warning/info. ใช้ sonner + richColors |
| `NavLink` | `src/components/shared/nav-link.tsx` | Client | Reusable nav link — wrap Next.js Link + usePathname() auto-detect isActive. Props: variant (default/underline/highlight/animated), icon (LucideIcon), exact |
| `ConfirmDialog` | `src/components/shared/confirm-dialog.tsx` | Client | Reusable confirm dialog — async loading, destructive variant. Props: open, onOpenChange, title, description, onConfirm, variant, confirmText, cancelText |
| `FormDialog` | `src/components/shared/form-dialog.tsx` | Client | Dialog wrapper สำหรับ form — รับ children เป็น form content. Props: open, onOpenChange, title, description, children |
| `InfoSheet` | `src/components/shared/info-sheet.tsx` | Client | Side panel — filter, settings, detail view. Props: open, onOpenChange, title, description, side (left/right/top/bottom), children |
| `AlertMessage` | `src/components/shared/alert-message.tsx` | Client | Force-acknowledge dialog — ไม่มี Cancel. Props: open, onOpenChange, title, description, onConfirm, confirmText |
| `Pagination` | `src/components/shared/pagination.tsx` | Client | Reusable pagination — page numbers, ellipsis, prev/next. Props: currentPage, totalPages, onPageChange, siblings? |
| `LoadMoreButton` | `src/components/shared/load-more-button.tsx` | Client | Load more button — auto spinner + hide เมื่อหมด. Props: onLoadMore, loading?, hasMore?, loadingText?, children? |
| `InfiniteScroll` | `src/components/shared/infinite-scroll.tsx` | Client | Auto-load wrapper — IntersectionObserver. Props: onLoadMore, loading?, hasMore?, threshold?, children |
| `DatePicker` | `src/components/shared/date-picker.tsx` | Client | Reusable date picker — Popover + Calendar + date-fns format. Props: value?, onChange, placeholder?, disabled?, className? |
| `DateRangePicker` | `src/components/shared/date-range-picker.tsx` | Client | Reusable date range picker — Calendar mode="range" + 2 months. Props: value? (DateRange), onChange, placeholder?, disabled?, className? |
| `ErrorCard` | `src/components/shared/error-card.tsx` | Client | Reusable error card — ColumnFade stagger + shake icon + title + description + Retry button + statusCode. Props: title?, description?, statusCode?, onRetry?, className? |
| `NotFoundCard` | `src/components/shared/not-found-card.tsx` | Server | Reusable 404 — ColumnFade stagger + bounce emoji + title + description + back link. Props: title?, description?, backHref?, backLabel?, className? |
| `DataTable` | `src/components/shared/data-table.tsx` | Client | Generic data table — map Column<T>[] + data → shadcn Table. Props: columns, data, emptyMessage?, className?, renderRow? |

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
| `sortByField()` | `src/utils/sort-by-field.ts` | Pure sort helper — sortByField(items, config), SortConfig<T>, SortDirection |
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
| `shake` | `framer-motion.ts` | Scale 0.8→1 + rotate shake (±10°) — สำหรับ error icon |
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
| `LOADING_PATTERNS` | `src/constants/custom-patterns/loading.constant.ts` | Loading pattern data (key, title, description, code) — 6 patterns (spinner, skeleton, dots, progress, fancy, lottie) |
| `TOAST_PATTERNS` | `src/constants/custom-patterns/toast.constant.ts` | Toast pattern data (key, title, description, code) — 5 patterns (showToast, usage, action, promise, custom) |
| `NAV_LINK_PATTERNS` | `src/constants/custom-patterns/nav-link.constant.ts` | Nav link pattern data (key, title, description, code) — 5 patterns (source, basic-icon, underline, highlight, animated) |
| `ENV_SETTING_PATTERNS` | `src/constants/custom-patterns/env-setting.constant.ts` | Env setting pattern data (key, title, description, code) — 5 patterns (overview, server-env, client-env, dotenv-structure, type-safe-usage) |
| `MODAL_PATTERNS` | `src/constants/custom-patterns/modal.constant.ts` | Modal pattern data (key, title, description, code) — 4 patterns (confirm-dialog, form-dialog, info-sheet, alert-message) |
| `PAGINATION_PATTERNS` | `src/constants/custom-patterns/pagination.constant.ts` | Pagination pattern data (key, title, description, code) — 8 entries: 4 patterns × source+usage (basic-pagination, with-size, load-more, infinite-scroll) |
| `CALENDAR_PATTERNS` | `src/constants/custom-patterns/calendar.constant.ts` | Calendar pattern data (key, title, description, code) — 10 entries: 5 patterns × source+usage (single, range, two-dates, month-year, with-time) |
| `ERROR_PATTERNS` | `src/constants/custom-patterns/error.constant.ts` | Error pattern data (key, title, description, code) — 6 entries: 3 patterns × source+usage (error-card, status-code, global-error) |
| `NOT_FOUND_PATTERNS` | `src/constants/custom-patterns/not-found.constant.ts` | Not found pattern data (key, title, description, code) — 2 entries: 1 pattern × source+usage (not-found-card) |
| `TABLE_ACTION_PATTERNS` | `src/constants/custom-patterns/table-action.constant.ts` | Table action pattern data (key, title, description, code) — 12 entries: 6 patterns × source+usage (basic-table, column-search, row-actions, sortable-columns, row-selection, expandable-rows) |
| `CODE_SHIKI_SETUP_STEPS` | `src/constants/custom-patterns/code-shiki.constant.ts` | Shiki setup steps (step, title, description, code, language) — 5 steps: install → highlighter → component → copy button → global CSS |
| `CODE_SHIKI_HOW_IT_WORKS` | `src/constants/custom-patterns/code-shiki.constant.ts` | How it works data — flow (data flow diagram), responsive (alternative CSS), themes (recommended themes) |
| `CODE_SHIKI_USAGE_EXAMPLES` | `src/constants/custom-patterns/code-shiki.constant.ts` | Usage examples (key, title, description, code, language) — 5 examples: basic, PatternCard, constant, languages, warnings |
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
