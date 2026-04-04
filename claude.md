# example-next.md — Next.js App Router Template

> **สำหรับ AI Agent:** อ่านไฟล์นี้ก่อนทำงานทุกครั้ง — ไฟล์นี้คือ generic template สำหรับ Next.js project
> **Project-specific rules + business logic** อยู่ใน `CLAUDE.md`

---

## 0. Agent Workflow (ทำทุก session — ห้ามข้าม)

### Phase 1: Onboarding (อ่านตามลำดับก่อนเริ่มงาน)

```
1. CLAUDE.md   — spec, architecture, rules ของ project นี้
2. progress.md — task list + section status
3. share.md    — reusable utilities / components / hooks catalog (ห้ามสร้างซ้ำ)
4. style.md    — theme, design tokens, animation style
5. product.md - business logic , detail
```

### .md File System (ต้องมีทุก project)

| ไฟล์ | หน้าที่ | อัปเดตเมื่อ |
|------|---------|------------|
| `CLAUDE.md` | Spec, architecture, business rules | เปลี่ยน architecture หรือ add major feature |
| `progress.md` | Task list, section status | ทุก session |
| `share.md` | Reusable catalog (utility/component/hook) | เมื่อสร้าง reusable ใหม่ |
| `style.md` | Theme, tokens, design guide | เมื่อเปลี่ยนสีหรือ design system |
| `product.md` | Business context, ข้อมูลบริษัท, กลุ่มลูกค้า, scope ของธุรกิจ | เมื่อเปลี่ยน business requirement หรือ scope |

### Phase 2: Before Coding

```
1. ตรวจ progress.md → งานที่ค้างอยู่คืออะไร เริ่มจากตรงนั้น
2. ตรวจ share.md → ถ้ามีไฟล์/component ที่สร้างแล้ว ให้ใช้ ห้ามสร้างซ้ำ
3. ตรวจ style.md → ใช้ token และ design pattern ที่กำหนดไว้
4. lock data schema ก่อนเขียน UI เสมอ (Content Schema First)
5. ตรวจ Server/Client boundary → component ที่กำลังสร้างเป็น Server หรือ Client
```

### Phase 3: Before Ending (ทำทุกข้อก่อนถือว่าจบงาน)

**Senior Code Review — ตรวจสอบ:**
```
1. Performance  — Server/Client boundary ถูกต้อง, ไม่มี unnecessary Client component
2. SEO          — ทุก page มี metadata, ไม่มี component block SEO
3. Data         — ไม่มี hardcode data ใน JSX, ใช้ constant/i18n เสมอ
4. Best Practice— Type safety, semantic token, reuse pattern, no any
```

**Build / Lint / Test:**
```
pnpm build  → ต้องผ่าน 0 errors
pnpm lint   → ต้องผ่าน 0 errors
pnpm test   → ต้องผ่านทุก test (ถ้ามี)
```

**Update .md files:**
```
progress.md — tasks ที่ทำเสร็จ + งานถัดไป
share.md    — ถ้าสร้าง utility/component ใหม่ที่ reuse ได้
style.md    — ถ้าเพิ่ม token หรือ design pattern ใหม่
CLAUDE.md   — ถ้าเปลี่ยน architecture หรือ add major feature
```

---

## A. Agent Role & Engineering Philosophy

> **[FIXED]** — ใช้เหมือนกันทุก project

### A.1 User Context

```
ผู้ใช้งาน: Developer ที่กำลังสร้าง production Next.js site
Agent role: Senior Frontend Developer + Mentor
```

Agent ต้องทำดังนี้ทุกครั้ง:
- **อธิบาย Why** — เหตุผลของการตัดสินใจด้าน architecture ทุกครั้ง
- **ใช้ Technical Terminology** ที่ถูกต้อง พร้อม brief explanation เมื่อ concept ซับซ้อน
- **ชี้ Design Patterns** — Server Component, RSC data flow, composition pattern
- **เสนอ Trade-offs** — ข้อดี/ข้อเสีย/ความเสี่ยง ให้ developer ตัดสินใจเองได้

### A.2 Engineering Mindset

```
Priority: Safety > Maintainability > Performance > Brevity
```

- เลือก approach ที่ **ปลอดภัยที่สุด** ก่อนเสมอ
- คิดถึง **SEO impact** ทุกครั้งที่เพิ่ม Client component
- คิดถึง **reuse** — "section นี้ใช้ซ้ำในหน้าอื่นได้ไหม?"
- คิดถึง **maintainability** — "ถ้าต้องเปลี่ยน data source แก้ที่ไหน?"
- ถ้ามี shortcut ที่เสี่ยง → อธิบายความเสี่ยงก่อน อย่าทำแบบเงียบๆ

### A.3 Documentation = Source of Truth

```
.md files คือ Single Source of Truth ของ project
Agent ทุกตัวต้องอ่านก่อนทำงาน และอัปเดตเมื่อมีการเปลี่ยนแปลง
```

### A.4 Live Documentation (ดึง docs สด — ห้ามเดา API)

> Tech stack versions อยู่ใน Section 2 — ส่วนนี้เป็น llms.txt links สำหรับ fetch docs สด

**Next.js (App Router)**
```
https://nextjs.org/llms.txt
→ ครอบคลุม: Server Components, App Router API, generateMetadata, cache, Turbopack, upgrade guides
→ ใช้เมื่อ: ไม่แน่ใจ API ของ Next.js, เจอ behavior ผิดปกติ, ใช้ feature ที่เพิ่งมาใหม่
```

**shadcn/ui**
```
https://ui.shadcn.com/llms.txt
→ ครอบคลุม: component API, theming, CLI, composition pattern, form integration
→ ใช้เมื่อ: เพิ่ม component ใหม่, ไม่แน่ใจ props/variant, ตรวจ accessibility
```

**กฎ:**
```
✅ fetch llms.txt เมื่อไม่มั่นใจ API — ดีกว่าเดาแล้วผิด
✅ ดูเฉพาะ section ที่เกี่ยวข้อง — ไม่ต้องอ่านทั้งไฟล์
✅ ใช้ข้อมูลจาก llms.txt แทน training data เสมอ ถ้า conflict กัน
❌ ห้าม hardcode API ที่อาจ deprecated แล้ว
❌ ห้ามเขียน workaround โดยไม่ตรวจ docs ก่อน
```

---

## 1. Project Overview

> — ดูใน `product.md`

### 1.1 Business Context

```
[อธิบายว่า project นี้คืออะไร เช่น:
- Corporate website สำหรับบริษัทผู้ผลิต
- เน้น SEO เพื่อดึง B2B leads
- Static content / เนื้อหาจริงเท่านั้น]
```

### 1.2 Project Goal

```
[อธิบาย scope เช่น:
- Pages: Home, About, Product/Industry, Contact
- Features: i18n (TH/EN), Dark/Light theme, Framer Motion animation
- Non-goals: e-commerce, login, backend]
```

### 1.3 Status

```
Stack: Next.js [version] App Router
Package manager: pnpm
ดู progress.md สำหรับ step ปัจจุบัน
```

---

## 2. Tech Stack

```
Package Manager : pnpm
Language        : TypeScript (strict mode — no `any`)
Framework       : Next.js 16 App Router
Styling         : Tailwind CSS v4 (semantic token only)
UI Components   : shadcn/ui + Radix UI
Animation       : Framer Motion
Slider          : Swiper
Map             : Leaflet              [ลบถ้าไม่ใช้]
Theme           : next-themes
State           : Zustand หรือ redux    [UI interaction เท่านั้น — ห้ามเก็บ data/SEO]
Icons           : Lucide React
Forms           : react-hook-form + @hookform/resolvers + zod  [เพิ่มถ้ามี form]
Auth            : Auth.js v5 (NextAuth)  [เพิ่มถ้ามี auth — ดู Section 8]
ORM             : Prisma     [เพิ่มถ้าเชื่อม DB — ใช้กับ auth adapter]
i18n            : Path-based (/th, /en)  [ลบถ้าไม่ใช้]
Testing         :  **[FILL IN per project]**
```

**pnpm scripts:**
```bash
pnpm dev        → development server
pnpm build      → production build (ต้องผ่านก่อน commit)
pnpm lint       → ESLint check (ต้องผ่านก่อน commit)
pnpm start      → production server
pnpm test       → unit tests
pnpm test:watch → watch mode
pnpm test:cov   → coverage report
```

---

## 3. Architecture Rules (บังคับ — ห้ามละเมิด)

### 3.1 Server vs Client Boundary

**กฎหลัก:**

| Component | ไฟล์ | หน้าที่ |
|-----------|------|---------|
| **Page** | `page.tsx` | Server — fetch data, compose sections |
| **Layout** | `layout.tsx` | Server — wrap pages, load dictionary |
| **Section (Server)** | `*Section.tsx` | Server — รับ data prop, ส่ง plain object ให้ Client |
| **Section (Client)** | `*Client.tsx` | Client — animation, interaction, icon render |
| **Hook** | `use*.ts` | Client เท่านั้น — ต้องมี `'use client'` |

**Data Flow:**
```
Page (Server)
  ↓ ส่ง plain object เท่านั้น (string, number, array, Record)
Section Server Component
  ↓ ส่ง plain object ต่อ
Client Component (animation / interaction)
```


### 3.2 TypeScript Rules

```typescript
// ✅ CORRECT — explicit type ทุก function
- ทุกอันมี type ชัดเจน แยกเป็น folder types ของแต่ละ feature หรือ section ถ้าเป็น type props
สามารถ เรียกใช้ที่ page นั้นได้ แต่ถ้าสามารถ reuse ได้ ก็ แยกไปเป็น file เพื่อ reuse
```

### 3.3 No Hardcoded Constants

```typescript
// ห้าม hardcode string/number literals ที่ใช้ซ้ำหลายที่ ควรประกาศ type ชัดเจน
// ใช้ as const object เป็น single source of truth

// ❌ WRONG — hardcode string กระจายทั่วโค้ด
role: 'ADMIN'
if (status === 'ACTIVE')
requiredRole: 'SUPER_ADMIN'

// ✅ CORRECT — ใช้ constant object
role: USER_ROLE.ADMIN
if (status === STATUS.ACTIVE)
requiredRole: USER_ROLE.SUPER_ADMIN

// Pattern: object → type → array (derive ทุกอย่างจาก object เดียว)
export const USER_ROLE = {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
// → 'ADMIN' | 'SUPER_ADMIN'

// สำหรับ zod z.enum() ที่ต้องการ tuple
export const USER_ROLES = Object.values(USER_ROLE) as [UserRole, ...UserRole[]];

```

**ทำไม:**
- เปลี่ยนค่า? แก้ที่เดียวใน object — type + array + helper อัพเดทอัตโนมัติ
- Typo-safe: `USER_ROLE.ADMN` → TypeScript error ทันที, `'ADMN'` → พังตอน runtime
- Autocomplete: พิมพ์ `USER_ROLE.` แล้ว IDE แนะนำค่าทั้งหมด

### 3.4 File / Folder Convention

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts          # Auth.js route handler [เพิ่มถ้ามี auth]
│   ├── features/
│   │   ├── layout.tsx          # Features layout — Sidebar wrapper
│   │   ├── loading.tsx         # Features loading UI
│   │   ├── page.tsx            # Features index page
│   │   ├── custom-patterns/    # Custom patterns feature + sub-pages
│   │   ├── forms/              # Form patterns feature + sub-pages
│   │   ├── framer-motion/      # Framer Motion feature + sub-pages
│   │   ├── next-auth/          # NextAuth feature + sub-pages (has own layout.tsx)
│   │   ├── payment/            # Payment simulation feature
│   │   ├── socket/             # Socket.io feature + sub-pages
│   │   └── tailwind/           # Tailwind feature + sub-pages
│   ├── error.tsx               # Client — Error boundary
│   ├── global-error.tsx        # Client — Root error boundary
│   ├── layout.tsx              # Root layout — ThemeProvider + SessionProvider
│   ├── loading.tsx             # Root loading UI
│   ├── not-found.tsx           # 404 page
│   ├── page.tsx                # Home page
│   ├── sitemap.ts              # Auto-generated SEO
│   └── robots.ts               # Auto-generated SEO
├── components/
│   ├── features/               # Feature-specific components
│   │   ├── [feature]/          # แต่ละ feature มี folder ของตัวเอง
│   │   └── custom-patterns/    # Custom patterns sub-features
│   ├── home/                   # Home page components (hero, feature-card, carousel)
│   ├── layout/                 # Header, Footer, MobileNav
│   ├── sidebar/                # Sidebar navigation components
│   ├── shared/
│   │   ├── ui-primitives/      # CustomButton, NavLink, showToast, LoadingScreen, PatternCard, FeatureBreadcrumb, FeatureSubItems
│   │   ├── framer-motion/      # Reusable motion wrappers (ColumnFade, Stagger, StepTransition, Dropdown)
│   │   ├── forms/              # Form components + DataTable, Pagination, DatePicker
│   │   ├── dialog-overlay/     # ConfirmDialog, AlertMessage, FormDialog, InfoSheet
│   │   ├── animation/          # GradientMesh, FloatingParticles, InfiniteScroll, UnifiedScrollBar
│   │   ├── swiper/             # SwiperCarousel, ThumbnailGallery, AtmosphereCarousel
│   │   ├── cursor/             # PageNeonCursor, CursorCustom
│   │   └── base-page/          # ErrorCard, NotFoundCard
│   ├── tailwind/               # CodeBlockShiki, CopyButton
│   ├── theme/                  # ThemeProvider, ThemeToggle
│   └── ui/                     # shadcn/ui primitives
├── constants/                  # Routes, nav, config — no logic, no mock
├── data/                       # Real static data — no logic
├── hooks/                      # Client-only hooks (ต้องมี 'use client')
├── i18n/                       # Dictionary + SEO per locale
├── lib/
│   ├── utils.ts                # cn() utility
│   ├── locale.ts               # Locale helpers
│   ├── auth.ts                 # Auth.js v5 config [เพิ่มถ้ามี auth]
│   ├── framer-motion/          # Motion presets (ห้ามสร้างใน component)
│   ├── seo/                    # Metadata + JSON-LD factories
│   └── api/                    #  **[FILL IN per project]**  Data fetching layer (เตรียม backend)
├── services/                   #  **[FILL IN per project]**  Business logic abstraction (เตรียม backend)
├── types/                      # TypeScript types + interfaces
│   └── next-auth.d.ts          # Auth.js type extension [เพิ่มถ้ามี auth]
└── utils/                      # Pure helper functions (ไม่มี side effects)

proxy.ts                    # Root middleware (auth + i18n + CSP) — อยู่ข้าง src/
```

**Naming:**

| สิ่ง | Convention | ตัวอย่าง |
|-----|-----------|---------|
| ไฟล์ component | PascalCase | `HeroSection.tsx` |
| ไฟล์ utility | kebab-case | `locale.ts`, `array-set.helper.ts` |
| ไฟล์ hook | usePrefix + camelCase | `useScroll.ts` |
| Component name | PascalCase + Named export | `export function HeroSection` |
| Utility function | camelCase | `getLocalizedPath()` |
| Constant | SCREAMING_SNAKE_CASE | `DEFAULT_LOCALE` |
| Type/Interface | PascalCase | `NavItem`, `Locale` |
| Zod schema | camelCase + Schema suffix | `contactSchema` |

---

## 4. Next.js Performance

> **[FIXED]** — หลักการสำคัญทุก project ต้องทำ

### 4.1 Server Components First

```
✅ Default: ทุก component เป็น Server
✅ Client เฉพาะเมื่อ: useState / useEffect / event handler / browser API / animation
❌ ห้าม 'use client' โดยไม่มีเหตุผล — ทุก Client component เพิ่ม JS bundle ทำ SEO แย่ลง
```

**Rule of thumb:**
```
Page       → Server (เสมอ)
Layout     → Server (เสมอ)
Section    → Server wrapper + Client เล็กๆ สำหรับ interaction
Data fetch → Server เสมอ — ห้าม useEffect fetch ใน Client
SEO        → Server เสมอ — ห้าม metadata ใน useState / Zustand
```

### 4.2 Image Optimization

```typescript
import Image from 'next/image'; // ✅ ใช้เสมอ — ห้าม <img>

// Above the fold (hero, logo) — ใส่ priority
<Image
  src="/hero.jpg"
  alt="descriptive alt text"  // ❌ ห้ามว่าง — SEO + accessibility
  width={1920}
  height={1080}
  priority                     // ✅ ป้องกัน LCP penalty
  sizes="100vw"
/>

// Below the fold — lazy load + blur placeholder
<Image
  src={item.src}
  alt={item.alt}
  fill                          // ✅ ถ้า container มี position:relative
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

**next.config.ts — remote images:**
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'example.com' }, **[FILL IN per project]**
  ],
},
```

### 4.3 Font Loading

```typescript
// ✅ CORRECT — next/font ใน root layout.tsx (Server Component)
// ❌ WRONG — @import ใน CSS → block render, ไม่ optimize
// @import url('https://fonts.googleapis.com/...');
```

### 4.4 Lazy Loading: Suspense vs next/dynamic

> **ใช้ให้ถูกกรณี — มีสองแบบ purpose ต่างกัน**

#### แบบ 1: `React.Suspense` — สำหรับ Server Components (Streaming)

ใช้เมื่อ: component ต้องทำ async operation (fetch data) และต้องการ streaming

```typescript
- ✅ page.tsx — ใช้ Suspense ครอบ async Server Component


#### แบบ 2: `next/dynamic` — สำหรับ Client Components ที่ใช้ Browser API

ใช้เมื่อ: library ต้องการ `window` / `document` หรือ component หนักที่ไม่ต้องการ SSR

- ❌ ห้าม import browser-only library โดยตรงใน Server Component
import L from 'leaflet'; // ❌ ReferenceError: window is not defined
```

#### สรุปการเลือกใช้

| กรณี | วิธีที่ถูกต้อง |
|------|--------------|
| Server Component ที่ fetch data ช้า | `React.Suspense` + skeleton |
| Client Component ที่ใช้ browser API | `next/dynamic` + `ssr: false` |
| Client Component ทั่วไปที่หนัก | `next/dynamic` (ไม่ต้อง ssr:false) |
| ไม่มีเหตุผลพิเศษ | ไม่ต้อง lazy load |

### 4.5 Metadata & generateMetadata()

```typescript
- ✅ ทุก page.tsx ต้องมี generateMetadata

- lib/seo/page-metadata.ts — pattern
```

### 4.6 JSON-LD Structured Data

```typescript
- ✅ inject ใน page.tsx (Server) — Google อ่านได้เต็มที่
```

### 4.7 Sitemap & Robots

```typescript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['th', 'en'];
  const routes = ['/', '/about', '/contact'];

  return locales.flatMap(locale =>
    routes.map(route => ({
      url: `${BASE_URL}/${locale}${route === '/' ? '' : route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '/' ? 1 : 0.8,
    }))
  );
}

// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
```

### 4.8 Backend Readiness (Server Action → REST API)

> **หลักการ:** แยก data layer ออกจาก UI ตั้งแต่แรก เพื่อ switch ได้โดยไม่แตะ component

#### Data Abstraction Layer Pattern

```typescript
- ✅ CORRECT — สร้าง abstraction function ใน lib/api/ หรือ services/
- lib/api/products.ts (data abstraction) ควรมี fallback constant data กรณี server error
```

#### Server Actions (ใช้สำหรับ form / mutation)

```typescript
- ✅ CORRECT — Server Action ใน separate file
- ❌ ห้ามเขียน business logic ใน Server Action โดยตรง
- → extract ออกมาเป็น service function เพื่อ reuse และ test ได้
```

#### กฎ Backend Readiness

```
✅ data อยู่ใน constants/ / data/ — ไม่ hardcode ใน JSX
✅ fetch logic แยกออกมาเป็น function เสมอ (lib/api/ หรือ services/)
✅ component รับ data เป็น prop — ไม่รู้ว่า data มาจากไหน
✅ Server Action ไว้ใน app/actions/ — ไม่ฝังใน component
✅ เตรียม types/interfaces ก่อน — ใช้ร่วมกันระหว่าง static และ API
✅ Auth adapter เตรียมไว้ล่วงหน้า — เลือก Prisma/Drizzle adapter ใน auth.ts
   → เมื่อ switch ไป NestJS: เปลี่ยน adapter + session strategy ที่เดียว
   → Component ไม่ต้องแตะ — ยังคงใช้ auth() / useSession() เหมือนเดิม

❌ ห้าม hardcode data ใน JSX / component
❌ ห้าม fetch ใน useEffect (SEO เสีย)
❌ ห้าม business logic ใน Server Action โดยตรง
❌ ห้าม mix data source (บางที่ constant บางที่ fetch)
```

---

## 5. SEO + Data Constants Strategy

### 5.1 Single Source of Truth สำหรับ Data

```
กฎ: data ที่ใช้หลายหน้า → ต้องเป็น constant หรือ shared data ที่เดียว

✅ หลักการ:
- src/constants/     → config, routes, nav items (ไม่มี content)
- src/data/          → real business data (product, company, trust facts)
- src/i18n/          → localized text เท่านั้น — ไม่เก็บ business logic

❌ ห้าม:
- duplicate data ใน i18n และ constants
- hardcode keyword ใน metadata factory
- inline data object ใน component
```

### 5.2 SEO Keywords จาก Constant

```typescript
- ✅ CORRECT — keywords มาจาก constant เสมอ
- lib/seo/home-metadata.ts
export function getHomeMetadata(locale: Locale): Metadata {
  return {
    keywords: mergeKeywords(BASE_KEYWORDS[locale], HOME_KEYWORDS[locale]),
    // ✅ ใช้ mergeKeywords() dedup อัตโนมัติ
  };
}

// ❌ WRONG — inline keywords ใน metadata
keywords: ['คำหลัก', 'อีกคำ', ...] // ❌ ซ้ำกับ page อื่น ไม่รู้
```

### 5.3 Data Schema = UI + SEO + JSON-LD

```typescript
- แยก ออกมาเป็น file ไม่กองไว้หน้าเดียว
```

### 5.4 Content Schema First (กฎเหล็ก)

```
ก่อน build section ใหม่ — ทำตามลำดับนี้เสมอ:

1. กำหนด data type/interface
2. วาง real data ใน constants/ หรือ data/
3. ตรวจว่า schema ใช้กับ SEO + JSON-LD ได้
4. เขียน i18n text (ถ้ามี)
5. ค่อย build UI component

❌ ห้ามออกแบบ UI ก่อน — แล้วค่อยยัด data ทีหลัง
❌ ห้าม UI เปลี่ยน shape ของ data เพื่อตัวเอง
```

---

## 6. i18n Strategy


### 6.1 Routing

```
/th/[page]  → Thai
/en/[page]  → English
/           → redirect to DEFAULT_LOCALE

src/app/[locale]/layout.tsx  — validate locale → notFound() ถ้า invalid
```

### 6.2 Dictionary Pattern กรณีใช้หลายภาษา หรือ multiple language

> กำหนด dictionary structure, getDictionary() function, และวิธี import ใน Server Component
> รวมถึง type safety ของ dictionary keys

**[FILL IN per project]**


---

## 7. Middleware Patterns

> Next.js 16 ใช้ `proxy.ts` แทน `middleware.ts` (Next.js < 16 ยังใช้ `middleware.ts`)

### 7.1 Middleware Basics

```typescript
// proxy.ts — อยู่ที่ project root (ข้าง src/)
// Next.js 16+ รองรับแค่ proxy.ts ไฟล์เดียว — ห้ามมีหลายไฟล์
// (Next.js < 16 ใช้ middleware.ts แทน)

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // ทำแค่: redirect / rewrite / set header
  // ห้าม: heavy logic, DB query, complex computation
  return NextResponse.next();
}

// ✅ matcher — กำหนดว่า middleware ทำงานกับ path ไหน
export const config = {
  matcher: [
    // ✅ match ทุก path ยกเว้น static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
```

### 7.2 i18n Redirect Middleware

> ตรวจ pathname → ถ้าไม่มี locale prefix → redirect ไป DEFAULT_LOCALE
> ใช้ LOCALES constant จาก app — ห้าม hardcode

**[FILL IN per project]**

### 7.3 Auth Guard Middleware

> ตรวจ protected paths (เช่น /admin/*) → ถ้าไม่มี session → redirect ไป login
> ดู Section 8 สำหรับ Auth.js v5 config เต็มรูปแบบ

**[FILL IN per project]**

### 7.4 Combining Middleware (Auth + i18n + CSP)

> **Pattern สำคัญ:** Next.js มี proxy.ts ได้แค่ไฟล์เดียว — ต้อง chain logic ใน function เดียว

```typescript

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
```

### 7.5 CSP Headers

```typescript

// ✅ nonce ต้องส่งให้ component ผ่าน header
// อ่านค่าใน Server Component ด้วย headers()
```

### 7.6 กฎ Middleware

```
✅ matcher: ต้อง exclude /_next/static, /_next/image, /favicon.ico เสมอ
✅ middleware ทำแค่ redirect / rewrite / set header — ห้ามทำ heavy logic
✅ auth check → redirect ไป login page (ไม่ใช่ return 401 JSON ใน page route)
✅ i18n redirect → ใช้ LOCALES constant เดียวกับ app
✅ เรียงลำดับ: CSP → i18n → Auth (ให้ auth ตรวจหลัง locale fix)

❌ ห้าม fetch data ใน middleware (ช้า — ทำใน Server Component)
❌ ห้าม business logic ใน middleware — ย้ายไป Server Component หรือ API
❌ ห้าม middleware ซ้อน middleware (Next.js รองรับแค่ไฟล์เดียว)
❌ ห้าม hardcode locale ใน middleware — ใช้ LOCALES constant
```

---

## 8. Auth.js v5 (NextAuth)

>  **[FILL IN per project]**  — เพิ่มเมื่อ project มี auth requirement
> Auth.js v5 ยังเป็น beta — ถ้าไม่แน่ใจ API → fetch docs ก่อนเสมอ

### 8.1 Installation & Environment Variables

```bash
pnpm add next-auth@beta
```

```env
# === Server (ห้าม expose ใน client) ===
API_URL=""
AUTH_SECRET=""
AUTH_URL=""

# === Client (NEXT_PUBLIC_ prefix) ===
NEXT_PUBLIC_BASE_URL=""

```

### 8.2 Core Config (`lib/auth.ts`)

 **[FILL IN per project]**

### 8.3 Route Handler

```typescript
// src/app/api/auth/[...nextauth]/route.ts
// ✅ แค่ re-export — ไม่ต้องเขียน logic ที่นี่
export { GET, POST } from '@/lib/auth';
```

### 8.4 Session in Server Components

```typescript
// ✅ CORRECT — ใช้ auth() ใน Server Component (async function)
import { redirect } from 'next/navigation';
import { auth } from './auth';

/**
 * Get authenticated admin user from session.
 * Redirects to /admin/login if not authenticated or token expired.
 * Use in Server Components and Server Actions inside /admin routes.
 */
export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user || session.error === 'RefreshTokenError') {
    redirect('/admin/login');
  }

  return session.user;
}

```

### 8.5 Session in Client Components

```typescript
// ✅ Step 1: SessionProvider ใน Root Layout
// src/app/layout.tsx (Server Component)
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="th" suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

// ✅ Step 2: useSession() ใน Client Component
'use client';
import { useSession } from 'next-auth/react';

export function UserAvatar() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <Skeleton className="h-8 w-8 rounded-full" />;
  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{session.user.name}</span>
    </div>
  );
}

// ❌ WRONG — useSession() ใน Server Component
// Server Component ไม่มี React context — ใช้ auth() แทน
```

### 8.6 Sign In / Sign Out Patterns

```typescript
// ✅ Server Action pattern สำหรับ Sign In
- ระวังเรื่อง signIn signOut Server รู้ แต่ client ไม่รู้ ควรวิเคราะให้ดี
```

### 8.7 Role-Based Access Control (RBAC)

> กำหนด role constants (as const object), middleware/helper ตรวจ role,
> และ pattern สำหรับ conditional UI ตาม role (Server-side verify เสมอ)

**[FILL IN per project]**

### 8.8 Protected API Routes

> ใช้ auth() ใน Route Handler → return 401 ถ้าไม่มี session
> ตรวจ role ก่อนทำ mutation

**[FILL IN per project]**

### 8.9 Database Adapter Pattern

> เลือก adapter (Prisma/Drizzle) สำหรับ session storage ใน DB
> ถ้าใช้ external API (NestJS) → ไม่ต้องใช้ adapter (ดู 8.12)

**[FILL IN per project]**

### 8.10 Type Extension

```typescript
// src/types/next-auth.d.ts
import type { DefaultSession, DefaultUser } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';
import type { UserRole } from './auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: UserRole;
  }
}
```

### 8.11 Integration with i18n

> Auth routes (/admin) อาจไม่มี locale prefix — กำหนด strategy ว่า
> protected routes ใช้ i18n หรือไม่ และ redirect path หลัง login/logout

**[FILL IN per project]**

### 8.12 Credentials + External API (NestJS Backend)

> **Pattern:** ใช้เมื่อ auth logic อยู่ฝั่ง backend ไม่ใช่ในฐานข้อมูลของ Next.js
> **ไม่ต้องใช้ adapter** — JWT strategy + external API
> กำหนด: Credentials provider, jwt/session callbacks, token refresh logic

**[FILL IN per project]**

**สำคัญ:**
- `accessToken` เก็บใน JWT cookie (httpOnly) — ปลอดภัย
- Auto refresh ทำใน `jwt` callback — ไม่ต้องจัดการฝั่ง Client
- `session.error = 'RefreshTokenError'` → ใช้ตรวจใน middleware/page เพื่อ force logout
- `session.user.accessToken` ใช้ส่งกลับไป backend เป็น Bearer token

### 8.13 กฎ Auth

```
✅ auth() ใน Server Component เป็น default — ไม่ต้อง prop drill session
✅ useSession() เฉพาะ Client ที่ต้อง react ต่อ session change
✅ sensitive data (role, email) → ตรวจฝั่ง Server เสมอ ไม่พึ่ง Client
✅ signIn/signOut ใช้ Server Action — ไม่ fetch เอง
✅ adapter เลือกตั้งแต่แรก — เปลี่ยนทีหลังยาก (ถ้าใช้ external API → ไม่ต้อง adapter)
✅ type extension ใน types/next-auth.d.ts — ให้ TypeScript รู้จัก role/custom fields
✅ error handling ใน credentials authorize — return null ถ้า invalid, ห้าม throw
✅ auto refresh token ใน jwt callback — ไม่ต้องจัดการฝั่ง Client

❌ ห้าม expose token/secret ใน Client component
❌ ห้าม trust role จาก Client (ต้อง verify ฝั่ง Server)
❌ ห้าม store session ใน Zustand / localStorage
❌ ห้าม custom JWT logic ถ้า Auth.js callbacks ทำได้อยู่แล้ว
❌ ห้าม getServerSession() — นั่นคือ v4 API, v5 ใช้ auth()
❌ ห้าม redirect ไป /login โดยไม่มี locale prefix (ถ้ามี i18n — ยกเว้น /admin routes ที่ไม่มี locale)
```

---

## 9. Error Handling

> **[FIXED]** — ทุก project ต้องมี error boundary
> ควรทำ pattern ที่ reuse ใช้ได้ทุก catch ที่มีการดักจับ Error แล้ว reuse ใช้

### 9.1 `error.tsx` Pattern

> Client Component ('use client') ที่รับ { error, reset } props
> แสดง user-friendly message + reset button สำหรับ retry
> ห้าม show raw error.message ใน production

**[FILL IN per project]**

### 9.2 `global-error.tsx` Pattern

> จับ error จาก root layout — ต้องมี <html><body> ครบเพราะ layout พัง
> ใช้เป็น last resort เท่านั้น — ทุก route ควรมี error.tsx ของตัวเอง

**[FILL IN per project]**

### 9.3 `not-found.tsx` Pattern

> locale-aware 404 page — แสดงข้อความตาม locale ปัจจุบัน
> มี link กลับ home page ด้วย getLocalizedPath()

**[FILL IN per project]**

### 9.4 `loading.tsx` Pattern

```typescript
// app/[locale]/loading.tsx — Automatic Suspense boundary
// Next.js จะ wrap page ด้วย <Suspense fallback={<Loading />}> อัตโนมัติ

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* ✅ Skeleton ที่ match layout จริง — ไม่ใช่แค่ spinner */}
      <div className="space-y-4">
        <div className="h-8 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 9.5 Error Boundaries Composition

```
การทำงาน:
- error.tsx จับ error ของ page.tsx ในโฟลเดอร์เดียวกัน + child routes
- ไม่จับ error ของ layout.tsx ในระดับเดียวกัน (ต้องใช้ parent error.tsx)
- global-error.tsx จับ error ของ root layout.tsx

โครงสร้างที่แนะนำ:
app/
├── global-error.tsx          # จับ root layout error
├── [locale]/
│   ├── error.tsx             # จับ error ทุก page ใน [locale]
│   ├── loading.tsx           # loading สำหรับทุก page
│   ├── not-found.tsx         # 404
│   ├── (auth)/               # Route group — ไม่สร้าง URL segment
│   │   ├── error.tsx         # จับ error เฉพาะ auth pages
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   └── (dashboard)/
│       ├── error.tsx         # จับ error เฉพาะ dashboard
│       ├── loading.tsx       # loading เฉพาะ dashboard
│       └── dashboard/page.tsx
```


### กฎ Error Handling

```
✅ ทุก route group ต้องมี error.tsx
✅ error.tsx ต้องเป็น 'use client' เสมอ
✅ ใช้ reset() ให้ user retry ได้
✅ log error ไปที่ monitoring service — ห้ามแค่ console.error ใน production
✅ not-found.tsx ต้อง locale-aware (ถ้ามี i18n)
✅ loading.tsx ใช้ skeleton ที่ match layout จริง — ไม่ใช่แค่ spinner
✅ Server Action return { success, error?, data? } — ไม่ throw

❌ ห้าม error.tsx เป็น Server Component
❌ ห้าม swallow error โดยไม่ log
❌ ห้าม show raw error.message ใน production (security risk)
❌ ห้าม global-error.tsx เป็น fallback เดียว — ต้องมี error.tsx ใน route ด้วย
❌ ห้าม throw ใน Server Action โดยไม่ catch — ทำให้ UX แย่
```

---

## 10. Caching & Revalidation (ISR)

### 10.1 Static vs Dynamic Rendering

```
Default: Static (build time) — เร็วที่สุด, SEO ดีที่สุด

Dynamic triggers (ถ้าใช้สิ่งเหล่านี้ → page กลายเป็น dynamic อัตโนมัติ):
- cookies()
- headers()
- searchParams
- fetch() with { cache: 'no-store' }
- export const dynamic = 'force-dynamic'

✅ กฎ: Default to static → opt-in dynamic เฉพาะที่จำเป็น
```


### 10.2 `revalidate` Export (ISR)

> export const revalidate = 3600 ใน page.tsx → rebuild ทุก 1 ชั่วโมง
> ใช้สำหรับ page ที่ data เปลี่ยนเป็นระยะ (blog, product list)

### 10.3 `fetch()` Cache Options

> fetch() ใน Next.js มี cache options: force-cache (default), no-store, next.revalidate, next.tags
> เลือกตาม use case — default static เสมอ

### 10.4 `cache()` — Request Deduplication

> cache() เป็น request-scoped — dedup fetch ใน request เดียวกัน (เช่น layout + page ใช้ data เดียวกัน)
> ไม่ persist ข้าม request — ใช้ unstable_cache ถ้าต้อง persist

### 10.5 `unstable_cache` — Persistent Data Cache

```typescript
import { unstable_cache } from 'next/cache';

// ✅ Persistent cache ข้าม requests — เหมาะสำหรับ heavy query
// ⚠️ API อาจเปลี่ยน (prefix unstable_) — ตรวจ docs ก่อนใช้
```

### 10.6 On-Demand Revalidation

```typescript
// ✅ Revalidate by path — เมื่อ content เปลี่ยน

// ✅ Route Handler สำหรับ webhook (CMS, external service)
// app/api/revalidate/route.ts
// ❌ WRONG — revalidatePath('/') เพื่อ revalidate ทุกอย่าง
revalidatePath('/'); // ❌ blast radius ใหญ่เกินไป
// ✅ ใช้ tags สำหรับ targeted revalidation
```

### 10.7 กฎ Caching

```
✅ default to static — Next.js static = เร็วที่สุด, ถูกที่สุด, SEO ดีที่สุด
✅ ใช้ revalidate สำหรับ data ที่เปลี่ยนเป็นระยะ (blog, products)
✅ ใช้ tags สำหรับ on-demand revalidation ที่แม่นยำ
✅ cache() สำหรับ dedup ใน request เดียวกัน (เช่น layout + page ใช้ data เดียวกัน)
✅ unstable_cache สำหรับ heavy query ที่ต้อง persist ข้าม request

❌ ห้าม no-store ทุก fetch — สูญเสีย static optimization
❌ ห้าม revalidate: 0 (เท่ากับ dynamic) — ใช้ dynamic = 'force-dynamic' ถ้าต้องการจริง
❌ ห้าม cache data ที่ sensitive (user-specific) ใน shared cache
❌ ห้าม revalidatePath('/') เพื่อ revalidate ทุกอย่าง — ใช้ tags แทน
❌ ห้ามสับสน cache() กับ unstable_cache — คนละ scope (request vs persistent)
```

---

## 11. Theme System

### 11.1 Semantic Token Only

```typescript
// ✅ CORRECT — ใช้ semantic token เสมอ
<div className="bg-brand-500 text-brand-100">
<button className="bg-background text-foreground">

// ❌ WRONG — ห้าม hardcode สีทุกรูปแบบ
<div className="bg-red-500">          // ❌ Tailwind color
<div style={{ color: '#C40C0C' }}>    // ❌ hex
<div className="bg-[#C40C0C]">        // ❌ arbitrary

// Token ต้อง defined ใน global.css / tailwind.config — เปลี่ยนที่เดียว เปลี่ยนทั้ง project
// ดู style.md สำหรับ token ทั้งหมดของ project นี้
```

### 11.2 Dark/Light Theme

> ThemeProvider (next-themes) ต้องอยู่ใน Root Layout ด้วย attribute="class"
> ใช้ suppressHydrationWarning บน <html> เพื่อป้องกัน hydration mismatch
> dark: prefix ใน Tailwind จะ activate ตาม class บน <html>

---

## 12. Hook Discipline

— ลด unnecessary re-render และ side effects

### 12.1 useEffect — ใช้เท่าที่จำเป็น

> ใช้สำหรับ: browser API subscription, event listener, external library init
> ห้ามใช้สำหรับ: derive state จาก props (ใช้ useMemo), fetch data (ใช้ Server Component)
> ห้ามใช้สำหรับ: transform data ที่ render ได้ทันที

### 12.2 useMemo — Expensive Computation

```typescript
- ✅ ใช้ useMemo เมื่อ:
- 1. Computation หนัก (filter/sort array ใหญ่)
- 2. Object/array ที่เป็น dependency ของ useEffect ✅ stable reference
- ห้าม useMemo กับ computation ง่ายๆ — overhead เกินจำเป็น
```

### 12.3 useCallback — Stable Function Reference

```typescript
- ✅ ใช้ useCallback เมื่อ:
- 1. function ส่งเป็น prop ให้ memo'd component ไม่ recreate ทุก render
- 2. function อยู่ใน dependency array ของ useEffect stable reference
- ❌ ห้าม useCallback กับ function ที่ไม่ได้ส่งเป็น prop
```

### 12.4 Dependency Array Rules

```typescript
// ✅ ระบุ dependency ครบเสมอ
- ❌ ห้าม empty [] ถ้า effect ใช้ค่าจาก outside
- ❌ ห้าม eslint-disable-next-line react-hooks/exhaustive-deps โดยไม่มีเหตุผลชัดเจน
- → ถ้า lint บอก missing deps → fix เหตุผลจริง อย่า suppress
```

---

## 13. Forms

— ใช้ react-hook-form + zod + shadcn เสมอ

### 13.1 Schema First Pattern

```typescript
// src/lib/schemas/contact.schema.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร'),
  email: z.string().min(1, 'กรุณากรอกอีเมล').email('รูปแบบอีเมลไม่ถูกต้อง'),
  message: z.string().min(10, 'กรุณากรอกข้อความอย่างน้อย 10 ตัวอักษร'),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

### 13.2 Form Component Pattern (shadcn + Controller + useTransition)
- อ่านการใช้ได้ใน https://ui.shadcn.com/llms.txt

### 13.3 Server Action Pattern (typed data — ไม่ใช่ FormData)

> Server Action รับ typed object จาก useForm — ไม่ใช่ FormData
> return { success, error?, data? } — ไม่ throw
> แยกไฟล์ไว้ใน app/actions/ หรือ lib/actions/

**[FILL IN per project]**

### 13.4 กฎ Forms

```
✅ zod schema = source of truth → แยกไฟล์ใน src/lib/schemas/
✅ zodResolver เสมอ — ไม่ validate ใน component เอง
✅ error message มาจาก schema — ไม่ hardcode ใน JSX
✅ useTransition สำหรับ loading state (ไม่ใช่ isSubmitting)
✅ Controller + shadcn Input — ไม่ใช่ register + native input
✅ Server Action รับ typed data — ไม่ใช่ FormData
✅ setError('root', ...) สำหรับ server-side errors
✅ UI ใช้ shadcn components (Button, Input, Alert) — ห้ามเขียน HTML เอง
✅ แยก form เป็น component ต่างหาก (ไม่กองในหน้า page)

❌ ห้าม useState สำหรับ form fields
❌ ห้าม onChange handler เขียนเอง
❌ ห้าม useActionState + FormData (ใช้ useForm + useTransition แทน)
❌ ห้าม inline schema ใน component (แยกไฟล์ src/lib/schemas/)
❌ ห้ามสร้าง UI component เอง ถ้า shadcn มีให้ (ต้อง install ผ่าน CLI)
```

---

## 14. Environment Validation (Zod)

> **[FIXED]** — validate env ด้วย zod เมื่อ app start

### Server Env (`src/lib/env.ts`)

### Client Env (`src/lib/env.client.ts`)

### กฎ Env Validation

```
✅ แยก server env (มี 'server-only' guard) กับ client env (NEXT_PUBLIC_)
✅ ใช้ z.default() สำหรับค่า fallback
✅ ใช้ z.prettifyError() + process.exit(1) — fail fast ถ้า env ผิด
✅ import serverEnv / clientEnv แทน process.env โดยตรง
✅ .env = config หลัก, .env.local = Vercel deploy overrides เท่านั้น

❌ ห้าม import env.ts (server-only) ใน client components หรือ Edge runtime
❌ ห้าม validate AUTH_SECRET ใน client env (ไม่มีใน client bundle)
❌ ห้ามใช้ process.env.XXX ตรง (ยกเว้น Edge middleware ที่ใช้ server-only ไม่ได้)
```

---

## 15. UI & Motion Discipline

### 15.0 shadcn/ui — กฎบังคับ

```
✅ ใช้ shadcn/ui เป็น UI library หลัก (Button, Input, Label, Alert, Sonner, etc.)
✅ ติดตั้งผ่าน CLI: pnpm dlx shadcn@latest add <component>
✅ Toast/notification ใช้ Sonner (shadcn wrapper) — มี animation ในตัว
✅ components.json ต้อง config ก่อนใช้ shadcn
✅ แยก component เป็นสัดส่วน — ไม่กองโค้ดทั้งหมดในหน้าเดียว
✅ สร้าง reusable wrappers ได้ (เช่น Field, FieldGroup, FieldLabel, FieldError)

❌ ห้ามสร้าง UI component เอง ถ้า shadcn มีให้แล้ว
❌ ห้ามใช้ native <input>, <button>, <label> โดยตรง — ใช้ shadcn components
❌ ห้ามเขียน CSS class ยาว ๆ ใน JSX ซ้ำหลายที่ — ใช้ shadcn component + cn()
```

### 15.1 cn() สำหรับ Conditional Class

> ใช้ cn() (clsx + tailwind-merge) สำหรับ conditional className
> ป้องกัน class conflict เช่น bg-red-500 กับ bg-blue-500 → tailwind-merge เลือกตัวหลัง

### 15.2 Motion Presets (ห้ามสร้างใหม่ใน component)

> กำหนด motion variants ไว้ใน lib/framer-motion/ เป็น shared presets
> เช่น fadeIn, slideUp, staggerContainer — component import ไปใช้
> ห้ามสร้าง variant ใหม่ใน component โดยตรง


### 15.3 Animation Guidelines

```
✅ whileInView + once: true สำหรับ scroll-triggered
✅ stagger delay: 0, 0.1, 0.2, 0.3... สำหรับ grid items
✅ ease: 'easeOut' เป็น default
✅ duration: 0.4–0.8s (ห้ามเกิน 1s)
❌ ห้าม animation บน above-the-fold hero ที่ทำให้ user รอนาน
❌ ห้าม motion ที่ distract จาก content
```

---

## 16. Testing

### 16.1 กฎ

```
ต้องมี unit test:
✅ ทุก function ใน lib/ และ utils/ (locale helpers, seo factories, etc.)
✅ ทุก custom hook (renderHook)
✅ ทุก zod schema (validate valid + invalid cases)
✅ Data transformation functions

ไม่บังคับ (แต่แนะนำสำหรับ business logic สำคัญ):
- Component tests (เฉพาะที่มี logic ซับซ้อน)
- Integration tests (form submit flow)
```


## 17. Build & Checks

> **[FIXED]**

**ก่อน commit ทุกครั้ง:**
```bash
pnpm build  # TypeScript + bundle check
pnpm lint   # ESLint
pnpm test   # Unit tests
```

**Manual checks:**
```
✅ Mobile: 375px, 768px, 1024px, 1280px
✅ Dark mode ทุก page
✅ ทั้ง /th และ /en render ถูกต้อง
✅ ไม่มี hydration error ใน console
✅ Image alt ครบทุกรูป (SEO + accessibility)
✅ Link ไม่มี broken
✅ Form validation ทำงาน (ถ้ามี form)
✅ Auth flow ทำงาน: login → redirect → session → logout (ถ้ามี auth)
✅ Protected routes redirect ไป login เมื่อไม่ได้ login (ถ้ามี auth)
```

---

## 18. Common Mistakes (อย่าทำซ้ำ)

- เพิ่มเมื่อพบ mistake ใหม่ในโปรเจกต์

```
❌ ส่ง ReactNode / icon JSX จาก Server → Client
   → serialization error / hydration mismatch
   ✅ ส่ง iconKey string → map ใน Client ด้วย ICON_MAP

❌ hardcode locale ใน

❌ hardcode สี: bg-red-500, text-[#C40C0C], style={{ color: '#C40C0C' }}
   → ไม่ respond ต่อ theme change ✅ semantic token: bg-brand-500

❌ ใช้ any type

❌ 'use client' ที่ layout/page/section wrapper
   → ทุก child กลายเป็น Client → JS bundle ใหญ่ → SEO แย่ แยก interaction เป็น *Client.tsx ชิ้นเล็กๆ

❌ fetch data ใน useEffect Google ไม่เห็น content fetch ใน Server Component

❌ สร้าง component/utility ใหม่โดยไม่ตรวจ share.md อ่าน share.md ก่อนเสมอ

❌ show raw error.message ใน production
   → อาจ leak internal info (stack trace, DB error)
   ✅ show generic message + log detail ไปที่ monitoring service

❌ ใช้ { cache: 'no-store' } ทุก fetch
   → สูญเสีย static optimization ทั้งหมด
   ✅ default static → opt-in dynamic เฉพาะที่จำเป็น

❌ revalidate: 0 แทน dynamic
   → confusing, same effect as no-store แต่ไม่ชัดเจน
   ✅ ใช้ export const dynamic = 'force-dynamic' ถ้าต้อง dynamic ทั้ง page

```

---

## Notes / Decisions

(บันทึก architecture decisions, trade-offs, ปัญหาที่เจอ และวิธีแก้)
````
