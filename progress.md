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
- [x] 3. NextAuth Deep Dive (OAuth, Protected, RBAC)
  - [x] **Step 1**: Constants & Routes — route.constant.ts, feature.constant.ts, next-auth.constant.ts
  - [x] **Step 2**: Update auth.ts — 2 mock users (ADMIN/SUPER_ADMIN) + pages.signIn + get-current-user.ts
  - [x] **Step 3**: Login Page + Server Action — login.schema.ts, actions.ts, login page, login-form component
  - [x] **Step 4**: Auth Demo Layout + Header — SessionProvider layout, auth-demo-header component
  - [x] **Step 5**: Proxy Guard — proxy.ts cookie-check guard for /protected
  - [x] **Step 6**: Auth Setup Page — tutorial walkthrough (Server component + constants)
  - [x] **Step 7**: Google OAuth Page — tutorial guide (Server component + constants)
  - [x] **Step 8**: Protected & RBAC Page — live demo (proxy guard + role check)
  - [x] **Step 9**: Session Info Page — live demo (server vs client session)
  - [x] **Step 10**: Update overview page + .md files

**Sprint 3 — Backend Integration**

- [ ] 4. Payment Simulation (Stripe/Omise)
  - [ ] Product list page — แสดงสินค้าจำลอง
  - [ ] Cart/Checkout page — สรุปรายการ + เลือก provider
  - [ ] Stripe integration — Stripe Elements, Server Action, webhook
  - [ ] Omise integration — Omise.js, Server Action, webhook
  - [ ] Success/Failure pages — ผลลัพธ์การชำระเงิน
  - [ ] Error states + loading UI
- [x] 5. Socket.io Real-time (Chat, Stock, Kahoot Quiz)
  > **Backend เสร็จแล้ว** (Phase 0-5 done) — ดู `backend/progress.md`
  > **Frontend เสร็จแล้ว** (Step 1-6 done)

  #### Step 1: Setup & Shared Infrastructure
  - [x] Install `socket.io-client`
  - [x] `constants/socket.constant.ts` — event names + namespaces (match backend ทุกค่า)
    - `SOCKET_NAMESPACE` — `/chat`, `/stock`, `/quiz`
    - `CHAT_EVENT`, `STOCK_EVENT`, `QUIZ_EVENT` — copy ค่าจาก backend ให้ตรงกัน
  - [x] `types/socket.type.ts` — shared types สำหรับ frontend (match backend types)
    - Chat: `ChatUser`, `ChatMessage`, payloads
    - Stock: `StockData`, payloads
    - Quiz: `QuizPlayer`, `GameState`, `QuestionPayload`, `AnswerResultPayload`, `ScoreboardEntry`
  - [x] `hooks/useSocket.ts` — reusable hook สำหรับ connect/disconnect
    - params: `namespace`
    - return: `{ getSocket, isConnected }`
    - auto-connect เมื่อ mount, auto-disconnect เมื่อ unmount
    - useCallback getter pattern (React 19 strict ref rules)
  - [x] `components/features/socket/connection-status.tsx` — Client component
    - แสดง dot สีเขียว/แดง + text (Connected/Disconnected)
    - reuse ได้ทุก demo page
  - [x] Update route.constant.ts — เพิ่ม `SOCKET_QUIZ` route
  - [x] Update feature.constant.ts — เพิ่ม Quiz item ใน socket category
  - [x] `.env` + `.env.example` + `env.client.ts` — เพิ่ม `NEXT_PUBLIC_SOCKET_URL`
  - [x] Build + Lint pass

  #### Step 2: Chat Demo Page
  - [x] `app/features/socket/chat/page.tsx` — Server page (metadata + breadcrumb + compose)
  - [x] `components/features/socket/chat/chat-room.tsx` — Client, main container
    - State: nickname form → joined room → chat view
    - จัดการ connect/disconnect + event listeners
  - [x] `components/features/socket/chat/nickname-form.tsx` — Client
    - Input nickname + room ID, default "test-room"
    - Tip: เปิด 2 tabs เพื่อทดสอบ
  - [x] `components/features/socket/chat/message-list.tsx` — Client
    - แสดง messages (scroll to bottom อัตโนมัติ)
    - แยกสี message ของตัวเอง (primary) vs คนอื่น (muted)
    - System message (user joined/left) — center text
  - [x] `components/features/socket/chat/message-input.tsx` — Client
    - Input + Send button, Enter key = send
  - [x] `components/features/socket/chat/user-list.tsx` — Client
    - แสดงรายชื่อ users ในห้อง (sidebar) + (you) badge
  - [x] Build + Lint pass

  #### Step 3: Stock Demo Page
  - [x] `app/features/socket/stock/page.tsx` — Server page (metadata + breadcrumb + compose)
  - [x] `components/features/socket/stock/stock-dashboard.tsx` — Client, main container
    - Connect `/stock`, subscribe all symbols on mount
    - Listen `stock:snapshot` + `stock:update`
  - [x] `components/features/socket/stock/stock-card.tsx` — Client
    - แสดง symbol, name, price, change, changePercent, high, low
    - สีเขียว/แดง ตาม change (+/-)
    - CSS keyframe flash animation (ไม่ใช้ ref — React 19 strict)
  - [x] `constants/stock.constant.ts` — STOCK_SYMBOLS array
  - [x] `globals.css` — `animate-flash-green` / `animate-flash-red` keyframes
  - [x] Grid layout responsive: 1 col → 2 col → 3 col
  - [x] Build + Lint pass

  #### Step 4: Quiz Demo Page (Lobby + Join)
  - [x] `app/features/socket/quiz/page.tsx` — Server page (metadata + breadcrumb + compose)
  - [x] `components/features/socket/quiz/quiz-container.tsx` — Client, main state machine
    - State: `ENTRY` → `LOBBY` → `COUNTDOWN` → `QUESTION` → `ANSWER_REVEAL` → `SCOREBOARD` → `FINISHED`
    - Single event listener hub, all game phases handled
    - useRef for pending nickname (React 19 compliant)
  - [x] `components/features/socket/quiz/quiz-entry.tsx` — Client
    - 3 modes: select → create (nickname) / join (code + nickname)
    - react-hook-form + zod validation
  - [x] `components/features/socket/quiz/quiz-lobby.tsx` — Client
    - Room Code ตัวใหญ่ (tracking-widest)
    - Player list + Host badge
    - Start button (≥2 players) / Waiting message
  - [x] `lib/schemas/quiz-join.schema.ts` — quizCreateSchema + quizJoinSchema
  - [x] Build + Lint pass

  #### Step 5: Quiz Demo Page (Game Play)
  - [x] `components/features/socket/quiz/quiz-countdown.tsx` — Client
    - SVG circle countdown animation + ตัวเลขตรงกลาง
    - stroke-dasharray progress ring
  - [x] `components/features/socket/quiz/quiz-question.tsx` — Client
    - คำถาม + 4 choices (grid 2x2, สี red/blue/yellow/green)
    - Progress bar นับถอยหลัง (timeLimit)
    - เลือกแล้ว disable + ring highlight + "Waiting for others..."
    - key={question.index} pattern (React 19 — reset timer per question)
  - [x] `components/features/socket/quiz/quiz-answer-result.tsx` — Client
    - Correct answer highlight (เขียว)
    - +scoreGained ตัวใหญ่ + total score
    - All players results (✓/✗)
  - [x] `components/features/socket/quiz/quiz-scoreboard.tsx` — Client
    - rank 1-3 badges (gold/silver/bronze emoji)
    - Highlight ตัวเอง (bg-primary/10 + "(you)")
    - Reuse ทั้ง mid-game + final (title prop)
  - [x] `components/features/socket/quiz/quiz-finished.tsx` — Client
    - Trophy + winner announcement
    - Final scoreboard (reuse QuizScoreboard)
    - Play Again button
  - [x] Updated quiz-container.tsx — replaced all placeholders with real components
  - [x] Build + Lint pass

  #### Step 6: Socket Overview Page + Polish
  - [x] Updated `app/features/socket/page.tsx` — tutorial section + readyPaths
  - [x] `components/features/socket/socket-tutorial.tsx` — Server component
    - Intro: Socket.io คืออะไร
    - Core Concepts: Namespace / Events / Rooms (3 cards)
    - Architecture diagram (code block)
    - Code snippets: useSocket hook, NestJS Gateway (copyable)
  - [x] `constants/socket-tutorial.constant.ts` — tutorial content data
  - [x] `route.constant.ts` — เพิ่ม `READY_SOCKET_PATHS`
  - [x] Build + Lint pass
  - [x] Update .md files

- [x] 6. Shiki Syntax Highlighting (replace CodeBlock)
  - [x] Install `shiki` + `server-only`
  - [x] `lib/shiki.ts` — server-only singleton, dual theme (github-light/dark), lazy langs
  - [x] `components/tailwind/copy-button.tsx` — extracted copy logic (Client)
  - [x] `components/tailwind/code-block-shiki.tsx` — async Server component, `dangerouslySetInnerHTML`
  - [x] `globals.css` — Shiki dual-theme CSS (toggle `--shiki-light`/`--shiki-dark` via `.dark` class)
  - [x] Migrated 8 Server component files → CodeBlockShiki
    - token-showcase, theme-setup-guide, auth-setup-content, google-oauth-content, socket-tutorial
    - protected-content (ลบ use client ที่ไม่จำเป็น), scroll-animations, form-ready-to-use
  - [x] Refactored 3 files — แยก Server/Client boundary เพื่อใช้ CodeBlockShiki
    - `animation-examples.tsx` → Server + `preset-card.tsx` (Client, codeSlot pattern)
    - `page-transitions.tsx` → Client (Live Demos only) + `transition-ready-to-use.tsx` (Server)
    - `session-content.tsx` → Server + `client-session-card.tsx` (Client, useSession only)
  - [x] `animation-ready-to-use.tsx` — แยก Ready to Use section จาก animation-examples (Server)
  - [x] CodeBlock ตัวเก่า (plain text) ไม่มีที่ใช้แล้ว — เก็บไว้เป็น fallback
  - [x] Build + Lint pass
  - [x] Update .md files

- [ ] 7. Custom Patterns (Reusable Component Showcase)
  > Copy-paste ready component patterns — ทุก variant มี live demo + code (CodeBlockShiki)
  > Three.js variants = coming soon (ข้ามไว้ก่อน)
  > Sidebar จัดเป็น 5 groups: Pages / UI Components / Navigation / Data Display / Setup Guides

  #### Phase 1 — Foundation + Quick wins (ไม่ต้องติดตั้ง lib เพิ่ม)

  **Step 0: Setup**
  - [x] `route.constant.ts` — เพิ่ม CUSTOM_PATTERNS routes ทั้งหมด (17 sub-pages)
  - [x] `feature.constant.ts` — เพิ่ม CUSTOM_PATTERNS category + grouped sub-items
  - [x] `app/features/custom-patterns/page.tsx` — Overview page (pattern grid + description)
  - [x] Build + Lint pass

  **Step 1: Button Patterns** (base: shadcn Button)
  - [x] `constants/custom-patterns/button.constant.ts` — pattern data (15 patterns)
  - [x] `components/features/custom-patterns/button/` — components (9 sections)
  - [x] `components/shared/custom-button.tsx` — reusable `CustomButton` (wrapper รอบ shadcn Button, รับ icon/label/children)
  - [x] `components/features/custom-patterns/button/pattern-card.tsx` — collapsible live demo + code card
  - [x] Variants: 1. CustomButton (icon+label+children) 2. Gradient hover 3. Icon + text with hover animation 4. Loading button (spinner) 5. Shimmer effect (diagonal sweep) 6. Magnetic hover 7. Glow/neon button 8. Copy button 9. Social buttons
  - [x] `app/features/custom-patterns/button/page.tsx` — Server page
  - [x] Build + Lint pass

  **Step 2: Loading Patterns** (base: CSS + Framer Motion + Lottie)
  - [x] `constants/custom-patterns/loading.constant.ts` — pattern data (6 variants)
  - [x] `components/features/custom-patterns/loading/` — 6 variant folders (spinner, skeleton, dots, progress, fancy, lottie)
  - [x] Variants: 1. Spinner (Lucide/SVG/Border) 2. Skeleton shimmer (card/list toggle) 3. Dots/pulse (bounce/pulse/wave) 4. Progress bar (auto-fill + reset) 5. Framer Motion fancy (orbit/wave/bounce) 6. Lottie loader (@lottiefiles/dotlottie-react)
  - [x] `app/features/custom-patterns/loading/page.tsx` — Server page (Static)
  - [x] `globals.css` — เพิ่ม @keyframes wave
  - [x] Install `@lottiefiles/dotlottie-react`
  - [x] Build + Lint pass

  **Step 3: Toast Patterns** (base: shadcn Sonner)
  - [x] Install `sonner` via shadcn + เพิ่ม `<Toaster richColors />` ใน root layout
  - [x] `components/shared/show-toast.tsx` — reusable function (showToast: success/error/warning/info)
  - [x] `constants/custom-patterns/toast.constant.ts` — pattern data (5 patterns)
  - [x] `components/features/custom-patterns/toast/` — 4 variant folders (toast-reuse, action, promise, custom)
  - [x] Variants: 1. showToast reusable (4 types) 2. Toast with Action (Undo/Retry) 3. Promise toast (loading → success/error) 4. Custom JSX toast
  - [x] `app/features/custom-patterns/toast/page.tsx` — Server page (Static)
  - [x] Build + Lint pass

  **Step 4: Nav Link Patterns** (base: Next.js Link + usePathname)
  - [x] `components/shared/nav-link.tsx` — reusable NavLink component (variant: default/underline/highlight/animated, icon, exact)
  - [x] `constants/custom-patterns/nav-link.constant.ts` — pattern data (5 patterns)
  - [x] `components/features/custom-patterns/nav-link/` — 5 variant folders (nav-link-source, basic-icon, active-underline, active-highlight, animated-underline)
  - [x] Variants: 1. NavLink source 2. Basic + Icon 3. Active Underline 4. Active BG Highlight 5. Animated Underline (CSS scaleX)
  - [x] `app/features/custom-patterns/nav-link/page.tsx` — Server page (Static)
  - [x] Build + Lint pass

  **Step 5: Env Setting** (base: Zod + server-only — โค้ดมีอยู่แล้ว)
  - [x] `constants/custom-patterns/env-setting.constant.ts` — tutorial data (5 patterns)
  - [x] `components/features/custom-patterns/env-setting/` — 5 section folders (env-overview, server-env, client-env, dotenv-structure, type-safe-usage)
  - [x] Variants: 1. Env Overview (ทำไมต้อง validate) 2. Server env (server-only + zod) 3. Client env (NEXT_PUBLIC gotcha) 4. .env file structure (priority table) 5. Type-safe usage (3 use cases)
  - [x] `app/features/custom-patterns/env-setting/page.tsx` — Server page (Static)
  - [x] Build + Lint pass

  #### Phase 2 — shadcn-heavy patterns

  **Step 6: Modal Patterns** (base: shadcn Dialog + Sheet + AlertDialog)
  - [x] `constants/custom-patterns/modal.constant.ts` — pattern data (4 patterns)
  - [x] `components/shared/` — reusable: ConfirmDialog, FormDialog, InfoSheet, AlertMessage
  - [x] `components/features/custom-patterns/modal/` — 4 sections (server wrapper + client preview)
  - [x] Variants: 1. ConfirmDialog (async loading + destructive) 2. FormDialog (children flexible) 3. InfoSheet (side panel) 4. AlertMessage (force acknowledge)
  - [x] `app/features/custom-patterns/modal/page.tsx` — Server page
  - [x] Build + Lint pass

  **Step 7: Pagination Patterns** (base: shadcn Pagination + Select)
  - [x] `constants/custom-patterns/pagination.constant.ts` — pattern data (4 patterns)
  - [x] `components/shared/` — reusable: Pagination, LoadMoreButton, InfiniteScroll
  - [x] `components/features/custom-patterns/pagination/` — 4 sections (server wrapper + client preview)
  - [x] Variants: 1. Basic pagination (ellipsis + prev/next) 2. With per-page selector 3. Load more button 4. Infinite scroll (IntersectionObserver)
  - [x] `app/features/custom-patterns/pagination/page.tsx` — Server page
  - [x] Build + Lint pass

  **Step 8: Calendar Patterns** (base: shadcn Calendar + date-fns)
  - [x] Install shadcn `calendar` + `popover` (→ react-day-picker + date-fns)
  - [x] `components/shared/date-picker.tsx` — reusable DatePicker (Popover + Calendar + date-fns format)
  - [x] `components/shared/date-range-picker.tsx` — reusable DateRangePicker (Calendar mode="range" + 2 months)
  - [x] `constants/custom-patterns/calendar.constant.ts` — pattern data (5 patterns × source+usage = 10 entries)
  - [x] `components/features/custom-patterns/calendar/` — 5 variant folders (single, range, two-dates, month-year, with-time)
  - [x] Variants: 1. Single date picker 2. Date range (เลือก start-end) 3. Two separate dates 4. Month/year picker (captionLayout="dropdown") 5. Date + time picker
  - [x] `app/features/custom-patterns/calendar/page.tsx` — Server page (Static)
  - [x] Build + Lint pass

  **Step 9: Table Action Patterns** (base: shadcn Table — manual) ✅
  - [x] Install shadcn `table` + `dropdown-menu`
  - [x] `components/shared/data-table.tsx` — reusable DataTable<T> (columns + data → shadcn Table, renderRow prop)
  - [x] `utils/sort-by-field.ts` — pure sort utility (sortByField, SortConfig, SortDirection)
  - [x] `constants/custom-patterns/table-action.constant.ts` — 12 entries (6 patterns × source+usage)
  - [x] `components/features/custom-patterns/table-action/` — 6 folders + _data/mock-users.ts
  - [x] Variants: 1. Basic DataTable + Pagination 2. Column search/filter (Input + Select) 3. Sortable columns (sortByField) 4. Expandable rows (renderRow + colSpan) 5. Row actions (DropdownMenu + ConfirmDialog + showToast) 6. Row selection + bulk actions (Checkbox + floating bar)
  - [x] `app/features/custom-patterns/table-action/page.tsx` — Server page (○ Static)
  - [x] Build + Lint pass

  **Step 10: Error Patterns** (base: shadcn Card + Button) ✅
  - [x] `components/shared/error-card.tsx` — reusable ErrorCard (ColumnFade stagger + shake icon + title, description, statusCode, onRetry)
  - [x] `lib/framer-motion/framer-motion.ts` — เพิ่ม `shake` variant (scale 0.8→1 + rotate ±10°)
  - [x] `constants/custom-patterns/error.constant.ts` — 6 entries (3 patterns × source+usage)
  - [x] `components/features/custom-patterns/error/` — 3 folders (error-card, status-code, global-error)
  - [x] Variants: 1. ErrorCard source+usage (animated — ColumnFade + shake) 2. Error + Status Code (401/403/500) 3. Global Error (error boundary hierarchy)
  - [x] Animated Error ถูกรวมเข้า ErrorCard แล้ว — ลบ animated folder ออก
  - [x] `app/features/custom-patterns/error/page.tsx` — Server page (○ Static)
  - [x] Build + Lint pass

  **Step 11: Not Found Patterns** (base: shadcn + Framer Motion) ✅
  - [x] `components/shared/not-found-card.tsx` — reusable NotFoundCard (title, description, backHref, backLabel)
  - [x] `constants/custom-patterns/not-found.constant.ts` — 4 entries (2 patterns × source+usage)
  - [x] `components/features/custom-patterns/not-found/` — 2 folders (not-found-card, animated)
  - [x] Variants: 1. NotFoundCard source+usage (ColumnFade stagger + bounce emoji) 2. Animated 404 (spring bounce number)
  - [x] `app/features/custom-patterns/not-found/page.tsx` — Server page (○ Static)
  - [x] Build + Lint pass

  #### Phase 3 — Layout patterns

  **Step 12: Header Patterns** (base: shadcn NavigationMenu)
  - [ ] `constants/custom-patterns/header.constant.ts` — pattern data
  - [ ] `components/features/custom-patterns/header/` — components
  - [ ] Variants: 1. Simple header 2. Sticky + blur on scroll 3. Header with mega menu 4. Header with search bar 5. Transparent → solid on scroll 6. Centered logo + side nav
  - [ ] `app/features/custom-patterns/header/page.tsx` — Server page
  - [ ] Build + Lint pass

  **Step 13: Mobile Nav Patterns** (base: shadcn Sheet + Framer Motion)
  - [ ] `constants/custom-patterns/mobile-nav.constant.ts` — pattern data
  - [ ] `components/features/custom-patterns/mobile-nav/` — components
  - [ ] Variants: 1. Hamburger slide-in 2. Bottom tab bar 3. Drawer (shadcn Sheet) 4. Full-screen overlay 5. Floating action menu
  - [ ] `app/features/custom-patterns/mobile-nav/page.tsx` — Server page
  - [ ] Build + Lint pass

  **Step 14: Code Shiki** (document สิ่งที่มีอยู่แล้ว) ✅
  - [x] `constants/custom-patterns/code-shiki.constant.ts` — 3 exports: SETUP_STEPS (5 steps), HOW_IT_WORKS (flow/responsive/themes), USAGE_EXAMPLES (5 examples)
  - [x] `components/features/custom-patterns/code-shiki/` — 3 components (Card-based, เหมือน tailwind/themes pattern)
    - `shiki-setup-steps.tsx` — Step 1-5: install → highlighter → component → copy button → global CSS
    - `shiki-how-it-works.tsx` — Data flow diagram + responsive theme alternative + themes แนะนำ
    - `shiki-usage-guide.tsx` — 5 ตัวอย่าง: basic, PatternCard, constant, languages, warnings
  - [x] `app/features/custom-patterns/code-shiki/page.tsx` — Server page (○ Static)
  - [x] Build + Lint pass

  **Step 15: Font Setting** (base: next/font — refactor โปรเจคก่อน แล้วค่อยทำ tutorial)
  - [ ] Refactor: แยก font config ออกเป็นไฟล์แยก
  - [ ] `constants/custom-patterns/font-setting.constant.ts` — tutorial data
  - [ ] `components/features/custom-patterns/font-setting/` — components
  - [ ] Variants: 1. next/font setup (separate file) 2. Google Fonts + local fonts 3. Font variable + Tailwind config 4. Multiple fonts (heading vs body)
  - [ ] `app/features/custom-patterns/font-setting/page.tsx` — Server page
  - [ ] Build + Lint pass

  #### Phase 4 — External libs

  **Step 16: Swiper Patterns** (base: Swiper.js — ต้อง install)
  - [ ] Install `swiper`
  - [ ] `constants/custom-patterns/swiper.constant.ts` — pattern data
  - [ ] `components/features/custom-patterns/swiper/` — components
  - [ ] Variants: 1. Basic carousel 2. Autoplay + pagination 3. Thumbnail gallery 4. Card carousel (peek sides) 5. Fade transition
  - [ ] `app/features/custom-patterns/swiper/page.tsx` — Server page
  - [ ] Build + Lint pass

  **Step 17: Update .md files + final review**
  - [ ] Update share.md — document ทุก new component/constant
  - [ ] Update progress.md — mark completed
  - [ ] Build + Lint pass

**Parked (ทำทีหลัง)**

- [x] Form Patterns (Basic, Multi-step, Dynamic, Upload) — done
- [ ] i18n (Path-based /th /en)
- [ ] Testing Playground (Vitest, RTL)
- [ ] Data Fetching Patterns (SSR/SSG/ISR/Client/Streaming)
