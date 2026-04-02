// ===== Setup Steps =====

export type FontSettingSetupStep = {
  readonly step: number;
  readonly title: string;
  readonly description: string;
  readonly code: string;
  readonly language: string;
};

export const FONT_SETTING_SETUP_STEPS: readonly FontSettingSetupStep[] = [
  {
    step: 1,
    title: 'สร้าง Font Config (lib/fonts.ts)',
    description:
      'แยก font config ออกจาก layout — import จาก next/font/google, ตั้ง CSS variable + subsets, export fontVariables สำหรับใช้ใน layout',
    code: `// lib/fonts.ts
import { Geist, Geist_Mono, Prompt } from 'next/font/google';

// ─── Sans (body text — Latin) ───
export const geistSans = Geist({
  variable: '--font-geist-sans',  // CSS variable ที่ next/font สร้างให้
  subsets: ['latin'],              // โหลดเฉพาะ latin subset (เล็กกว่า)
});

// ─── Mono (code blocks) ───
export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// ─── Thai-friendly (body + heading) ───
export const prompt = Prompt({
  variable: '--font-prompt',
  subsets: ['latin', 'thai'],       // ต้องใส่ 'thai' ด้วย!
  weight: ['300', '400', '500', '600', '700'],  // เลือก weight ที่ใช้
});

// ─── Combined className สำหรับ <html> ───
// next/font สร้าง CSS variable ให้แต่ละ font
// ต้องใส่ทุกตัวบน <html> เพื่อให้ CSS variable ใช้ได้ทั้ง app
export const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  prompt.variable,
].join(' ');`,
    language: 'typescript',
  },
  {
    step: 2,
    title: 'ใส่ CSS Variable ใน Root Layout',
    description:
      'import fontVariables → ใส่เป็น className บน <html> — next/font จะ inject CSS variable ให้อัตโนมัติ ทุก component ใน app เข้าถึงได้',
    code: `// app/layout.tsx
import { fontVariables } from '@/lib/fonts';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={\`\${fontVariables} h-full antialiased\`}
      {/*
        fontVariables = "--font-geist-sans --font-geist-mono --font-prompt"
        next/font ใช้ className พิเศษที่ inject CSS variable:
          .<hash> { --font-geist-sans: 'Geist', sans-serif; }
          .<hash> { --font-geist-mono: 'Geist Mono', monospace; }
          .<hash> { --font-prompt: 'Prompt', sans-serif; }

        antialiased = font smoothing สำหรับ macOS/iOS
      */}
    >
      <body>{children}</body>
    </html>
  );
}

`,
    language: 'tsx',
  },
  {
    step: 3,
    title: 'Register Font ใน @theme inline (globals.css)',
    description:
      'Map CSS variable จาก next/font → Tailwind semantic token — เปลี่ยน font ทั้ง app ได้โดยแก้ที่นี่ที่เดียว',
    code: `/* globals.css */
@theme inline {
  /* ─── --font-sans: font หลักของทั้ง app ─── */
  /* Prompt ก่อน (รองรับไทย) → Geist Sans เป็น fallback */
  /* Tailwind class: font-sans (default ของทุก element) */
  --font-sans: var(--font-prompt), var(--font-geist-sans);

  /* ─── --font-mono: font สำหรับ code blocks ─── */
  /* Tailwind class: font-mono */
  --font-mono: var(--font-geist-mono);

  /* ─── --font-heading: font สำหรับ heading (h1-h6) ─── */
  /* ตอนนี้เหมือน --font-sans — แยกไว้เพราะถ้าวันหลัง */
  /* อยากเปลี่ยน heading เป็น font อื่น แก้ที่นี่ที่เดียว */
  /* Tailwind class: font-heading */
  --font-heading: var(--font-prompt), var(--font-geist-sans);
}

/* ─── ทำไม var() ซ้อน var()? ─── */
/* var(--font-prompt)       = CSS variable จาก next/font (Prompt font-family) */
/* var(--font-geist-sans)   = CSS variable จาก next/font (Geist font-family) */
/*                                                                             */
/* browser จะลอง Prompt ก่อน → ถ้าไม่มี glyph (เช่น icon) → ใช้ Geist Sans  */
/* เหมือนเขียน: font-family: 'Prompt', 'Geist', sans-serif;                  */`,
    language: 'css',
  },
  {
    step: 4,
    title: 'ใช้ Font ใน Component',
    description:
      'ใช้ Tailwind class font-sans / font-mono / font-heading — ไม่ต้อง hardcode font-family เอง',
    code: `// ─── font-sans (default — ไม่ต้องใส่ ถ้าไม่ได้เปลี่ยน) ───
<p>ข้อความภาษาไทย — ใช้ Prompt อัตโนมัติ</p>
<p>English text — Prompt first, fallback to Geist Sans</p>

// ─── font-mono (code blocks) ───
<code className="font-mono">const x = 1;</code>
<pre className="font-mono">npm install next</pre>

// ─── font-heading (heading) ───
<h1 className="font-heading text-3xl font-bold">
  หัวข้อหลัก
</h1>
<h2 className="font-heading text-xl font-semibold">
  หัวข้อรอง
</h2>

// ─── ใช้ CSS variable โดยตรง (กรณีพิเศษ) ───
// เช่นใน CodeBlockShiki ที่ต้อง target nested element
<div className="[&_code]:font-(family-name:--font-geist-mono)">
  {/* code ข้างในจะใช้ Geist Mono */}
</div>

// ─── ❌ ห้ามทำ ───
<p style={{ fontFamily: "'Prompt', sans-serif" }}>  {/* ❌ hardcode */}
<p className="font-['Prompt']">                      {/* ❌ arbitrary */}

// ─── ✅ ทำแบบนี้ ───
<p className="font-sans">   {/* ✅ semantic token */}
<p className="font-heading"> {/* ✅ semantic token */}`,
    language: 'tsx',
  },
];

// ===== How It Works =====

export const FONT_SETTING_HOW_IT_WORKS = {
  flow: `// ─── Data Flow ───
// next/font จัดการ font loading + optimization ให้ทั้งหมด

lib/fonts.ts
  │
  ├─ Geist({ variable: '--font-geist-sans' })
  ├─ Geist_Mono({ variable: '--font-geist-mono' })
  └─ Prompt({ variable: '--font-prompt' })
       │
       └─ export fontVariables = "hash1 hash2 hash3"
            │
layout.tsx   │
  │          │
  └─ <html className={fontVariables}>
       │
       ├─ next/font inject CSS:
       │    .hash1 { --font-geist-sans: 'Geist', sans-serif; }
       │    .hash2 { --font-geist-mono: 'Geist Mono', monospace; }
       │    .hash3 { --font-prompt: 'Prompt', sans-serif; }
       │
globals.css  │
  │          │
  └─ @theme inline {
       --font-sans: var(--font-prompt), var(--font-geist-sans);
       --font-mono: var(--font-geist-mono);
       --font-heading: var(--font-prompt), var(--font-geist-sans);
     }
       │
component    │
  │          │
  └─ <h1 className="font-heading">  →  font-family: 'Prompt', 'Geist'
     <p>  (default font-sans)        →  font-family: 'Prompt', 'Geist'
     <code className="font-mono">    →  font-family: 'Geist Mono'`,

  comparison: `// ─── next/font vs @import — ทำไมห้ามใช้ @import? ───

// ❌ @import — ช้า, block render, ไม่ optimize
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;700');
/* ปัญหา:
   1. Browser ต้อง download CSS → แล้วค่อย download font → 2 round trips
   2. Block render จนกว่า font จะโหลด → หน้าว่างนาน
   3. ไม่มี font subsetting → โหลดทุก glyph (ไฟล์ใหญ่)
   4. ไม่มี preload hint → browser ไม่รู้ล่วงหน้า
*/

// ✅ next/font — เร็ว, optimize, self-host
import { Prompt } from 'next/font/google';
/* ข้อดี:
   1. Self-host บน server เดียวกัน → ไม่ต้องไป Google CDN
   2. Automatic font subsetting → โหลดเฉพาะ glyph ที่ใช้
   3. Preload <link rel="preload"> inject อัตโนมัติ
   4. Zero layout shift (size-adjust CSS) → CLS = 0
   5. Build-time optimization → font ฝังใน .next/static/
*/`,

  semanticTokens: `// ─── Semantic Token Pattern ───
// แยก "font ตัวไหน" ออกจาก "ใช้ที่ไหน"

// Layer 1: Font Variable (จาก next/font)
// --font-prompt       → 'Prompt', sans-serif
// --font-geist-sans   → 'Geist', sans-serif
// --font-geist-mono   → 'Geist Mono', monospace

// Layer 2: Semantic Token (ใน @theme inline)
// --font-sans    → var(--font-prompt), var(--font-geist-sans)
// --font-mono    → var(--font-geist-mono)
// --font-heading → var(--font-prompt), var(--font-geist-sans)

// Layer 3: Tailwind Class (ใน component)
// font-sans, font-mono, font-heading

// ─── ข้อดี ─── //
// อยากเปลี่ยน heading เป็น Kanit?
// แก้ที่เดียว:
//   --font-heading: var(--font-kanit), var(--font-geist-sans);
// ทุก h1-h6 ที่ใช้ font-heading เปลี่ยนอัตโนมัติ

// อยากเปลี่ยน body text เป็น Inter?
// แก้ที่เดียว:
//   --font-sans: var(--font-inter);
// ทุก element เปลี่ยนอัตโนมัติ`,
} as const;

// ===== Usage Guide =====

export type FontSettingUsageExample = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
  readonly language: string;
};

export const FONT_SETTING_USAGE_EXAMPLES: readonly FontSettingUsageExample[] = [
  {
    key: 'usage-add-google-font',
    title: 'เพิ่ม Google Font ใหม่ (3 ขั้นตอน)',
    description: 'ตัวอย่าง: เพิ่ม Noto Sans Thai เป็น heading font',
    code: `// ─── Step 1: เพิ่มใน lib/fonts.ts ───
import { Noto_Sans_Thai } from 'next/font/google';

export const notoSansThai = Noto_Sans_Thai({
  variable: '--font-noto-thai',
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '700'],
});

// อัปเดต fontVariables
export const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  prompt.variable,
  notoSansThai.variable,  // ← เพิ่ม
].join(' ');

// ─── Step 2: register ใน globals.css ───
// @theme inline {
//   --font-heading: var(--font-noto-thai), var(--font-prompt);
// }

// ─── Step 3: ใช้ได้เลย ───
// <h1 className="font-heading">หัวข้อ Noto Sans Thai</h1>`,
    language: 'typescript',
  },
  {
    key: 'usage-multiple-fonts',
    title: 'ใช้หลาย Font ใน Page เดียว',
    description: 'ผสม font-sans / font-mono / font-heading ใน layout เดียวกัน',
    code: `export default function ArticlePage() {
  return (
    <article className="space-y-6">
      {/* Heading — font-heading (Prompt) */}
      <h1 className="font-heading text-3xl font-bold">
        วิธี Setup Font ใน Next.js
      </h1>

      {/* Body — font-sans (default, ไม่ต้องใส่ class) */}
      <p className="text-muted-foreground">
        บทความนี้อธิบายวิธีจัดการ font ใน Next.js App Router
        โดยใช้ next/font + Tailwind CSS semantic tokens
      </p>

      {/* Code — font-mono */}
      <pre className="rounded-lg bg-muted p-4 font-mono text-sm">
        pnpm add next
      </pre>

      {/* Mixed — badge ที่ใช้ mono font */}
      <div className="flex items-center gap-2">
        <span>ใช้คำสั่ง</span>
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
          fontVariables
        </code>
        <span>ใน layout</span>
      </div>
    </article>
  );
}`,
    language: 'tsx',
  },
  {
    key: 'usage-font-weight',
    title: 'Font Weight + Display Options',
    description: 'weight ที่ควร pre-load + display strategy สำหรับ production',
    code: `// ─── Weight: โหลดเฉพาะที่ใช้ ───
// ยิ่งโหลดมาก weight → file size ยิ่งใหญ่

// ✅ เลือกเฉพาะที่ใช้จริง
export const prompt = Prompt({
  variable: '--font-prompt',
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600', '700'],
  // 400 = ข้อความปกติ
  // 500 = medium (label, nav)
  // 600 = semibold (subheading)
  // 700 = bold (heading)
});

// ❌ อย่าโหลดทุก weight
weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
// → ไฟล์ใหญ่มาก โหลดช้า

// ─── Display Strategy ───
export const myFont = Prompt({
  // ...
  display: 'swap',
  // 'swap'     → แสดง fallback ทันที, swap เมื่อ font โหลดเสร็จ (แนะนำ)
  // 'block'    → ซ่อนข้อความจนกว่า font จะโหลด (อาจเห็นหน้าว่าง)
  // 'fallback' → เหมือน swap แต่ timeout สั้นกว่า
  // 'optional' → ใช้ font ก็ต่อเมื่อโหลดเสร็จเร็วมาก (connection เร็ว)
  //
  // next/font default = 'swap' ถ้าไม่ระบุ
});

// ─── Subsets: โหลดเฉพาะภาษาที่ใช้ ───
subsets: ['latin'],              // ภาษาอังกฤษเท่านั้น
subsets: ['latin', 'thai'],      // อังกฤษ + ไทย
subsets: ['latin', 'vietnamese'], // อังกฤษ + เวียดนาม
// ดู subsets ทั้งหมด: https://fonts.google.com → เลือก font → ดู subsets`,
    language: 'typescript',
  },
  {
    key: 'usage-warnings',
    title: 'สิ่งที่ต้องระวัง',
    description: 'ปัญหาที่เจอบ่อย + วิธีแก้',
    code: `// ⚠️ 1. Font ไม่ขึ้น — ลืมใส่ variable บน <html>
// ต้องมีทุก font variable ใน className ของ <html>
// ✅ className={\`\${fontVariables} ...\`}
// ❌ ลืมเพิ่ม font ใหม่ใน fontVariables array

// ⚠️ 2. ภาษาไทยไม่ขึ้น — ลืมใส่ 'thai' subset
// ✅ subsets: ['latin', 'thai']
// ❌ subsets: ['latin']  → ไทยจะใช้ fallback font

// ⚠️ 3. Font weight ไม่ตรง — ลืม pre-load weight นั้น
// ถ้าใช้ font-semibold (600) แต่ไม่ได้โหลด weight 600
// browser จะ "fake bold" ให้ → ดูไม่สวย
// ✅ weight: ['400', '600', '700']  → ระบุทุก weight ที่ใช้

// ⚠️ 4. ห้าม @import ใน CSS
// ❌ @import url('https://fonts.googleapis.com/...');
// ✅ import { Prompt } from 'next/font/google';
// เหตุผล: @import = 2 round trips, block render, ไม่ optimize

// ⚠️ 5. ห้าม hardcode font-family
// ❌ style={{ fontFamily: "'Prompt', sans-serif" }}
// ❌ className="font-['Prompt']"
// ✅ className="font-sans"  (semantic token)

// ⚠️ 6. next/font ใช้ได้แค่ใน Server Component
// font config (lib/fonts.ts) ถูก import ใน layout.tsx (Server)
// ไม่ต้องใช้ 'use client' — font variable inject ผ่าน className`,
    language: 'tsx',
  },
];
