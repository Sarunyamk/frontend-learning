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

**Parked (ทำทีหลัง)**

- [x] Form Patterns (Basic, Multi-step, Dynamic, Upload) — done
- [ ] i18n (Path-based /th /en)
- [ ] Testing Playground (Vitest, RTL)
- [ ] Data Fetching Patterns (SSR/SSG/ISR/Client/Streaming)
