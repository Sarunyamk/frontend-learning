# Share — Reusable Catalog

> ห้ามสร้างซ้ำ — ตรวจที่นี่ก่อนเสมอ

---

## Components

### Layout & Navigation — โครงสร้างหลักของ app
| Component | Path | Type | เหมาะกับ |
|-----------|------|------|---------|
| `Header` | `src/components/layout/header.tsx` | Server | โครงสร้าง layout — ใช้ใน root layout เท่านั้น |
| `HeaderClient` | `src/components/layout/header-client.tsx` | Client | nav interaction ใน Header — ไม่ต้อง import เอง (Header ใช้อยู่แล้ว) |
| `Footer` | `src/components/layout/footer.tsx` | Server | โครงสร้าง layout — ใช้ใน root layout เท่านั้น |
| `MobileNav` | `src/components/layout/mobile-nav.tsx` | Client | Mobile slide-in nav — ไม่ต้อง import เอง (Header ใช้อยู่แล้ว) |
| `HeroSection` | `src/components/home/hero-section.tsx` | Server | Hero section เฉพาะ home page |
| `ThemeProvider` | `src/components/theme/theme-provider.tsx` | Client | next-themes wrapper — ใช้ใน root layout ครอบทั้ง app |
| `ThemeToggle` | `src/components/theme/theme-toggle.tsx` | Client | ปุ่ม dark/light toggle — ใส่ตรงไหนก็ได้ |

### UI Primitives — ใช้ได้ทุกที่ ทุกหน้า
| Component | Path | Type | เหมาะกับ |
|-----------|------|------|---------|
| `Button` | `src/components/ui/button.tsx` | Server | ปุ่มทุกชนิด — variant: default/outline/secondary/ghost/destructive/link, size: xs/sm/default/lg/icon |
| `CustomButton` | `src/components/shared/custom-button.tsx` | Server | ปุ่มที่มี icon + label — wrap shadcn Button + `gap-2` ในตัว, ใช้เมื่อต้องการ icon ข้างหน้า text |
| `NavLink` | `src/components/shared/nav-link.tsx` | Client | Link ที่ highlight active state อัตโนมัติ — ใช้แทน `<Link>` เมื่อต้องการ isActive styling |
| `showToast` | `src/components/shared/show-toast.tsx` | Function | แจ้งเตือน user — `showToast({ type: 'success', title, description })` ใช้หลัง save/delete/error |
| `LoadingScreen` | `src/components/shared/loading-screen.tsx` | Server | หน้า loading เต็มจอ — import ไปใช้ใน `loading.tsx` ได้เลย |

### Animation — ครอบ content เพื่อเพิ่ม motion
| Component | Path | Type | เหมาะกับ |
|-----------|------|------|---------|
| `ColumnFade` | `src/components/framer-motion/fade.tsx` | Client | ครอบ element ใดก็ได้ → fade in เมื่อ scroll เข้าจอ. รับ variant/delay/duration |
| `StaggerContainer` | `src/components/framer-motion/stagger.tsx` | Client | ครอบ list/grid → children fade in ทีละตัว. ใช้คู่กับ `StaggerItem` |
| `StaggerItem` | `src/components/framer-motion/stagger.tsx` | Client | child ของ `StaggerContainer` — แต่ละตัว fade in ตามลำดับ |
| `StepTransition` | `src/components/framer-motion/step-transition.tsx` | Client | slide transition ระหว่าง step/tab — ใช้เมื่อเปลี่ยน content แบบ animated |
| `AnimatedDropdown` | `src/components/framer-motion/dropdown.tsx` | Client | dropdown menu ที่มี animation — ใช้แทน native dropdown |

### Form — สร้าง form ด้วย react-hook-form + shadcn
| Component | Path | Type | เหมาะกับ |
|-----------|------|------|---------|
| `FormTextField` | `src/components/forms/form-text-field.tsx` | Client | input text/email/password — ใช้กับ `control` จาก useForm |
| `FormCheckboxGroup` | `src/components/forms/form-checkbox-group.tsx` | Client | กลุ่ม checkbox — ใช้เมื่อ user เลือกได้หลายตัว |
| `FormRadioGroup` | `src/components/forms/form-radio-group.tsx` | Client | กลุ่ม radio — ใช้เมื่อ user เลือกได้ตัวเดียว |
| `FormSelect` | `src/components/forms/form-select.tsx` | Client | dropdown select — ใช้เมื่อ options เยอะเกินไปสำหรับ radio |
| `ImageDropzone` | `src/components/forms/image-dropzone.tsx` | Client | upload รูป — drag & drop, preview, validate type/size |

### Dialog & Overlay — popup ถาม/แจ้ง user
| Component | Path | Type | เหมาะกับ |
|-----------|------|------|---------|
| `ConfirmDialog` | `src/components/shared/confirm-dialog.tsx` | Client | ถาม "ยืนยันไหม?" ก่อน delete/action — มี Cancel + Confirm |
| `AlertMessage` | `src/components/shared/alert-message.tsx` | Client | แจ้ง user แบบบังคับ acknowledge — มีแค่ OK ไม่มี Cancel |
| `FormDialog` | `src/components/shared/form-dialog.tsx` | Client | dialog ที่มี form ข้างใน — ใช้เมื่อต้องการ modal form (create/edit) |
| `InfoSheet` | `src/components/shared/info-sheet.tsx` | Client | side panel เลื่อนเข้ามา — ใช้สำหรับ filter, settings, detail view |

### Data Display — แสดงข้อมูล list/table/pagination
| Component | Path | Type | เหมาะกับ |
|-----------|------|------|---------|
| `DataTable` | `src/components/shared/data-table.tsx` | Client | ตาราง generic — ส่ง `columns` + `data` แสดงได้ทุก data type |
| `Pagination` | `src/components/shared/pagination.tsx` | Client | page numbers + prev/next — ใช้กับ table หรือ list ที่แบ่งหน้า |
| `LoadMoreButton` | `src/components/shared/load-more-button.tsx` | Client | ปุ่ม "Load more" — auto spinner + ซ่อนเมื่อหมด |
| `InfiniteScroll` | `src/components/shared/infinite-scroll.tsx` | Client | auto-load เมื่อ scroll ถึงล่าง — ครอบ list แล้ว load อัตโนมัติ |
| `DatePicker` | `src/components/shared/date-picker.tsx` | Client | เลือกวันที่ 1 วัน — Popover + Calendar |
| `DateRangePicker` | `src/components/shared/date-range-picker.tsx` | Client | เลือกช่วงวันที่ — Calendar 2 เดือน |
| `CodeBlockShiki` | `src/components/tailwind/code-block-shiki.tsx` | Server (async) | แสดง code + syntax highlight — ใช้ทุกที่ที่ต้องแสดง code snippet |
| `CopyButton` | `src/components/tailwind/copy-button.tsx` | Client | ปุ่ม copy — ใช้คู่กับ CodeBlockShiki หรือใส่ข้าง text ที่ต้อง copy |

### Error & Empty State — หน้า error/404
| Component | Path | Type | เหมาะกับ |
|-----------|------|------|---------|
| `ErrorCard` | `src/components/shared/error-card.tsx` | Client | แสดง error + Retry — ใช้ใน `error.tsx` หรือ component ที่ fetch ล้มเหลว |
| `NotFoundCard` | `src/components/shared/not-found-card.tsx` | Server | หน้า 404 — ใช้ใน `not-found.tsx` |

### Feature-specific — reuse ได้ แต่เฉพาะบาง context
| Component | Path | Type | เหมาะกับ |
|-----------|------|------|---------|
| `FeatureBreadcrumb` | `src/components/shared/feature-breadcrumb.tsx` | Server | breadcrumb สำหรับ feature pages — Home → Features → [Label] |
| `FeatureSubItems` | `src/components/shared/feature-sub-items.tsx` | Server | sub-item cards + coming soon badge — ใช้ในหน้า feature ที่มี sub-pages |
| `PatternCard` | `src/components/shared/pattern-card.tsx` | Client | card แบบพับได้ (live demo + View Code) — ใช้ในหน้า custom-patterns ทุกหน้า |

### Background — effect ระดับ section/page
| Component | Path | Type | เหมาะกับ |
|-----------|------|------|---------|
| `GradientMesh` | `src/components/shared/gradient-mesh.tsx` | Client | **Animated gradient blobs** — CSS keyframes, 0 KB extra JS. Parent ต้อง `relative overflow-hidden`, content ต้อง `relative z-10`. Props: blobCount, speed, blur, colors (CSS color), opacity |
| `FloatingParticles` | `src/components/shared/floating-particles.tsx` | Client | **Floating dots** — Framer Motion infinite animation. Parent ต้อง `relative overflow-hidden`, content ต้อง `relative z-10`. Props: count, sizeRange, speedRange (ตัวเลขสูง=ช้า), particleClass (Tailwind bg class), opacity, floatDistance |

### Scroll & Cursor — effect ระดับ page/layout
| Component | Path | Type | เหมาะกับ |
|-----------|------|------|---------|
| `UnifiedScrollBar` | `src/components/shared/unified-scroll-bar.tsx` | Client | **scroll progress bar** — ใส่ layout.tsx ทดแทน native scrollbar. มี bubbles + gradient option |
| `BubbleScrollIndicator` | `src/components/shared/bubble-scroll-indicator.tsx` | Client | (Legacy — demo เท่านั้น) scroll indicator ตัวเก่า ไม่มี performance fix |
| `PageNeonCursor` | `src/components/shared/page-neon-cursor.tsx` | Client | **Neon cursor full version** — ครอบเฉพาะบางหน้า (composition pattern). 3 circles + 5 orbits + `data-cursor-zone` |
| `CursorCustom` | `src/components/shared/cursor-custom.tsx` | Client | **Global lite cursor** — ใส่ layout.tsx ทั้งโปรเจค. 2 circles (dot + glow), mobile guard, reduced-motion check |

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
| `generateParticles()` | `src/utils/generate-particles.ts` | สร้าง particle data array (id, x, y, size, duration, delay) — ใช้กับ FloatingParticles |
| `getCurrentUser()` | `src/lib/auth/get-current-user.ts` | Get auth session (Server only), redirect ถ้าไม่ login |
| `highlightCode()` | `src/lib/shiki.ts` | Shiki syntax highlight (server-only singleton) — dual theme (github-light/dark) |
| `fontVariables` | `src/lib/fonts.ts` | Combined font CSS variable className — Geist Sans + Geist Mono + Prompt, ใช้ใน layout.tsx `<html>` |

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
| `FONT_SETTING_SETUP_STEPS` | `src/constants/custom-patterns/font-setting.constant.ts` | Font setup steps (step, title, description, code, language) — 5 steps: config → layout → globals.css → usage → local font |
| `FONT_SETTING_HOW_IT_WORKS` | `src/constants/custom-patterns/font-setting.constant.ts` | How it works data — flow (data flow diagram), comparison (next/font vs @import), semanticTokens (token pattern) |
| `FONT_SETTING_USAGE_EXAMPLES` | `src/constants/custom-patterns/font-setting.constant.ts` | Usage examples (key, title, description, code, language) — 4 examples: add Google Font, multiple fonts, weight/display, warnings |
| `CODE_SHIKI_SETUP_STEPS` | `src/constants/custom-patterns/code-shiki.constant.ts` | Shiki setup steps (step, title, description, code, language) — 5 steps: install → highlighter → component → copy button → global CSS |
| `CODE_SHIKI_HOW_IT_WORKS` | `src/constants/custom-patterns/code-shiki.constant.ts` | How it works data — flow (data flow diagram), responsive (alternative CSS), themes (recommended themes) |
| `CODE_SHIKI_USAGE_EXAMPLES` | `src/constants/custom-patterns/code-shiki.constant.ts` | Usage examples (key, title, description, code, language) — 5 examples: basic, PatternCard, constant, languages, warnings |
| `SCROLL_BAR_PATTERNS` | `src/constants/custom-patterns/scroll-bar.constant.ts` | Scroll bar animation pattern data (key, title, description, code) — 6 entries: 3 patterns × source+usage (scroll-progress, scroll-bubble, scroll-gradient) |
| `BACKGROUND_ANIMATION_PATTERNS` | `src/constants/custom-patterns/background-animation.constant.ts` | Background animation pattern data (key, title, description, code) — 4 entries: 2 patterns × source+usage (gradient-mesh, floating-particles) |
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
