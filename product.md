# Product — Learning Fullstack

## Business Context

โปรเจคนี้สร้างขึ้นเพื่อ **เรียนรู้ Next.js 16 + TypeScript** แบบ full best practice
เป็น Learning Hub ที่รวม feature ตัวอย่างหลากหลาย แต่ละ feature มีจุดประสงค์เพื่อการศึกษา
RULE และ Structure ทั้งหมดเป็นไปตาม `claude.md`

- **Frontend**: Next.js 16 App Router
- **Backend**: NestJS (focus frontend ก่อน)
- **Non-goals**: ไม่ใช่ production app, ไม่มี real users

---

## Project Goal

สร้าง web app ที่มี:
- **Home Page** — บอกจุดประสงค์ + feature cards เป็น entry point
- **Sidebar Navigation** — แยกหมวดหมู่ feature แต่ละตัว
- **Feature Pages** — แต่ละ feature มีหน้าตัวอย่างที่เรียนรู้ได้

---

## Feature List

### 1. Home Page + Sidebar Navigation
- หน้าแรก: Hero section + Feature category cards (3-5 การ์ด)
- Sidebar: แยกหมวดหมู่ feature พร้อม sub-items
- Responsive: mobile drawer sidebar, card grid 1→2→3 columns
- **Route**: `/` (home), `/features/*` (sidebar)

### 2. Payment Simulation (Stripe vs Omise)
- จำลองการชำระเงินเปรียบเทียบ 2 providers
- **Flow**: เลือกสินค้า → ใส่ตะกร้า → เลือก provider (Stripe/Omise) → หน้าชำระเงิน → ผลลัพธ์
- **หน้าที่จะมี**: Product list, Cart/Checkout, Payment form, Success/Failure
- **เรียนรู้**: Server Actions, Stripe Elements vs Omise.js, webhook handling, error states
- **Tech**: `@stripe/stripe-js`, Omise.js, Server Actions, zod validation
- **Route**: `/features/payment`, `/features/payment/stripe`, `/features/payment/omise`

### 3. Socket.io Real-time
- เรียนรู้ WebSocket กับ Next.js — 3 use cases
- **หน้าที่จะมี**:
  - Chat room (real-time messaging) — join/leave room, broadcast messages
  - Stock ticker (real-time price updates) — subscribe/unsubscribe, mock price generator
  - Mini Kahoot Quiz (multiplayer game) — create/join room, countdown timer, scoring with time bonus, scoreboard
- **เรียนรู้**: socket.io-client setup, connection management, reconnection, event-based communication, namespaced gateways, room-based broadcasting, game state management
- **Tech**: `socket.io-client`, custom hook `useSocket`, NestJS backend (Socket.io gateway)
- **Note**: ต้อง setup NestJS backend ด้วย (WebSocket gateway) — all state in-memory, no DB needed
- **Route**: `/features/socket`, `/features/socket/chat`, `/features/socket/stock`, `/features/socket/quiz`

### 4. Tailwind Deep Dive
- เรียนรู้ design system และ theming อย่างลึก
- **หน้าที่จะมี**: Token showcase (แสดง semantic tokens + copy code), Theme playground (switch live), Component gallery (shadcn/ui)
- **เรียนรู้**: CSS custom properties, Tailwind v4 @theme, semantic tokens vs hardcoded colors, dark mode strategy
- **Tech**: Tailwind CSS v4, next-themes, CSS variables
- **Route**: `/features/tailwind`, `/features/tailwind/tokens`, `/features/tailwind/themes`

### 5. NextAuth Deep Dive
- เรียนรู้ authentication patterns ทั้งหมด
- **หน้าที่จะมี**: Login (Credentials), Google OAuth, Protected page, Role-based page, Session info page
- **เรียนรู้**: Auth.js v5 config, OAuth providers, JWT vs session, middleware protection, RBAC, token refresh
- **Tech**: Auth.js v5, Google OAuth, NestJS backend (auth API)
- **Route**: `/features/next-auth`, `/features/next-auth/setup`, `/features/next-auth/google-oauth`

### 6. Framer Motion Showcase
- เรียนรู้ animation patterns สำหรับ production
- **หน้าที่มี**: Animation Examples (8 presets + live demo), Scroll Animations (whileInView + stagger), Page Transitions (AnimatePresence + exit)
- **เรียนรู้**: Framer Motion variants, AnimatePresence, whileInView, stagger, exit animations, reusable components (ColumnFade, StaggerContainer, StepTransition)
- **Tech**: Framer Motion, motion presets จาก `lib/framer-motion/`
- **Route**: `/features/framer-motion`, `/features/framer-motion/examples`, `/features/framer-motion/scroll`, `/features/framer-motion/transitions`

### 7. Data Fetching Patterns (เสนอเพิ่ม)
- เปรียบเทียบ data fetching ทุกแบบของ Next.js
- **หน้าที่จะมี**: SSR page, SSG page, ISR page, Client fetch page (React Query/SWR), Streaming page (Suspense)
- **เรียนรู้**: เมื่อไหร่ใช้แบบไหน, caching strategy, revalidation, loading states
- **Tech**: Next.js App Router, React Suspense, unstable_cache, revalidateTag

### 8. Form Patterns
- เรียนรู้ form ที่ถูกวิธีกับ Next.js
- **หน้าที่มี**: Basic form, Multi-step form (AnimatePresence), Dynamic fields, File upload (AnimatePresence), Ready to Use (reusable components)
- **เรียนรู้**: react-hook-form + zod, Server Actions, useTransition, error handling, reusable form components
- **Tech**: react-hook-form, zod, shadcn/ui form components, Server Actions

### 9. i18n — Internationalization (เสนอเพิ่ม)
- เรียนรู้ multi-language routing
- **หน้าที่จะมี**: /th/* และ /en/* path-based routing, Language switcher, Dictionary pattern, SEO per locale
- **เรียนรู้**: Path-based i18n, proxy redirect, dictionary pattern, locale-aware SEO
- **Tech**: Next.js proxy.ts, custom dictionary pattern

### 10. Testing Playground (เสนอเพิ่ม)
- เรียนรู้ testing strategies
- **หน้าที่จะมี**: Unit test examples, Component test examples, Hook test examples, Integration test examples
- **เรียนรู้**: Vitest, React Testing Library, testing patterns, mocking
- **Tech**: Vitest, @testing-library/react, msw (API mocking)

---

## หลักการสำคัญ

- **Best practice & best performance** ตาม skill ของแต่ละ dependency
- **Clean code** — แยกการทำงานชัดเจน ไม่ปนกัน
- **Easy to maintain & learn** — โค้ดอ่านง่าย เรียนรู้ได้
- **Frontend first** — focus frontend (Next.js) ก่อน, backend (NestJS) ทำทีหลัง

---

## ลำดับการทำ (Priority)

| # | Feature | เหตุผล |
|---|---------|--------|
| 1 | Home Page + Sidebar | entry point พื้นฐานที่ต้องมีก่อน |
| 2 | Form Patterns | zod + react-hook-form ติดตั้งไว้แล้ว พร้อมใช้ |
| 3 | Data Fetching Patterns | หัวใจของ Next.js learning |
| 4 | Tailwind Deep Dive | ทำให้ UI สวยงามสำหรับ features ถัดไป |
| 5 | Payment Simulation | feature หลักตาม scope เดิม |
| 6 | NextAuth Deep Dive | ต่อยอดจาก auth ที่มีอยู่ |
| 7 | Socket.io | real-time feature (ต้องมี backend) |
| 8 | Framer Motion Showcase | ต่อยอดจาก animation ที่มีอยู่ |
| 9 | i18n | path-based routing |
| 10 | Testing | testing strategies |
