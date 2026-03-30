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
