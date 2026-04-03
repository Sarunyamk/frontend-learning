// ===== Setup Steps =====

export type CodeShikiSetupStep = {
  readonly step: number;
  readonly title: string;
  readonly description: string;
  readonly code: string;
  readonly language: string;
};

export const CODE_SHIKI_SETUP_STEPS: readonly CodeShikiSetupStep[] = [
  {
    step: 1,
    title: 'Install packages',
    description:
      'shiki = syntax highlighter (WASM-based, tree-shakable) / server-only = guard ป้องกัน import ใน Client Component',
    code: `pnpm add shiki server-only`,
    language: 'bash',
  },
  {
    step: 2,
    title: 'สร้าง Highlighter (lib/shiki.ts)',
    description:
      'Singleton pattern — createHighlighter() หนัก (โหลด WASM + themes + langs) ต้องสร้างครั้งเดียว cache ไว้ใน module scope',
    code: `// lib/shiki.ts
import 'server-only';

import { type Highlighter, createHighlighter } from 'shiki';

// ─── globalThis: ป้องกัน HMR สร้าง instance ซ้ำใน dev mode ───
// Next.js dev จะ re-execute module บ่อย → let ถูก reset เป็น null
// เก็บไว้ใน globalThis → instance เดิมยังอยู่แม้ module reload
// (Pattern เดียวกับ Prisma Client แนะนำ)
const globalForShiki = globalThis as typeof globalThis & {
  __shikiHighlighter?: Promise<Highlighter>;
};

let highlighterPromise: Promise<Highlighter> | null =
  globalForShiki.__shikiHighlighter ?? null;

function getHighlighter() {
  if (!highlighterPromise) {
    // เก็บ Promise ไว้ทั้ง module scope + globalThis
    highlighterPromise = globalForShiki.__shikiHighlighter = createHighlighter({
      // Dual theme → shiki สร้าง CSS variables ให้ทั้ง 2 themes
      themes: ['light-plus', 'dark-plus'],

      // Pre-load เฉพาะภาษาที่ใช้ — ลด bundle size
      // เพิ่มได้: 'python', 'go', 'sql', 'rust', 'yaml' ...
      langs: ['css', 'tsx', 'typescript', 'bash', 'html', 'json', 'javascript'],
    });
  }
  return highlighterPromise;
}

// ─── Export function สำหรับ Server Component ───
export async function highlightCode(
  code: string,
  language = 'text',
): Promise<string> {
  const highlighter = await getHighlighter();

  // fallback เป็น 'text' ถ้าภาษาไม่ได้ pre-load
  const validLangs = highlighter.getLoadedLanguages();
  const lang = validLangs.includes(language) ? language : 'text';

  return highlighter.codeToHtml(code, {
    lang,
    // dual theme → CSS variables: --shiki-light, --shiki-dark
    themes: { light: 'light-plus', dark: 'dark-plus' },
  });
}`,
    language: 'typescript',
  },
  {
    step: 3,
    title: 'สร้าง CodeBlockShiki Component',
    description:
      'Async Server Component — เรียก highlightCode() ฝั่ง server → ส่ง HTML สำเร็จรูปไป client (0 JS bundle สำหรับ syntax highlighting)',
    code: `// components/tailwind/code-block-shiki.tsx
// ✅ async Server Component — ไม่ต้อง 'use client'

import { highlightCode } from '@/lib/shiki';
import { cn } from '@/lib/utils';
import { CopyButton } from './copy-button';

type CodeBlockShikiProps = {
  code: string;
  language?: string;   // 'tsx' | 'typescript' | 'css' | 'bash' | ...
  className?: string;
};

export async function CodeBlockShiki({
  code, language, className,
}: CodeBlockShikiProps) {
  const html = await highlightCode(code, language);

  return (
    <div className={cn('group relative', className)}>
      {/* CopyButton = Client Component เล็กๆ */}
      <CopyButton code={code} />

      {/* shiki HTML output — ปลอดภัยเพราะ generate เอง */}
      <div
        className={cn(
          '[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-4',
          '[&_pre]:text-sm [&_pre]:leading-relaxed',
          '[&_code]:font-(family-name:--font-geist-mono)',
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}`,
    language: 'tsx',
  },
  {
    step: 4,
    title: 'สร้าง CopyButton (Client Component)',
    description:
      'ปุ่ม copy-to-clipboard — แยกเป็น Client Component เล็กๆ เพื่อไม่ให้ CodeBlockShiki ต้องเป็น Client ทั้งตัว',
    code: `// components/tailwind/copy-button.tsx
'use client';

import { Check, Copy } from 'lucide-react';
import { useCallback, useState } from 'react';
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from '@/components/ui/tooltip';

type CopyButtonProps = { code: string };

export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-2 top-2 z-10 cursor-pointer rounded-md p-1.5
            text-muted-foreground/60 opacity-0 transition-opacity
            hover:bg-muted hover:text-foreground group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied
            ? <Check className="h-4 w-4 text-green-500" />
            : <Copy className="h-4 w-4" />}
        </button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>{copied ? 'Copied!' : 'Copy'}</p>
      </TooltipContent>
    </Tooltip>
  );
}`,
    language: 'tsx',
  },
  {
    step: 5,
    title: 'เพิ่ม Global CSS (Force Dark Theme)',
    description:
      'shiki dual theme สร้าง CSS variables ทั้ง light + dark — override ให้ code block ใช้ dark theme เสมอ (อ่านง่ายกว่า)',
    code: `/* globals.css */

/* Shiki: force dark theme สำหรับ code blocks ทั้ง light & dark mode */
.shiki {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
}

.shiki span {
  color: var(--shiki-dark) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}`,
    language: 'css',
  },
];

// ===== How It Works =====

export const CODE_SHIKI_HOW_IT_WORKS = {
  flow: `// ─── Data Flow ───
// Server Component เท่านั้น — ไม่มี JS ส่งไป client สำหรับ highlighting

Page (Server)
  │
  ├─ <CodeBlockShiki code="..." language="tsx" />
  │    │
  │    ├─ highlightCode(code, 'tsx')     ← เรียก shiki บน server
  │    │    │
  │    │    └─ codeToHtml()              ← WASM-based tokenizer
  │    │         │
  │    │         └─ HTML string          ← พร้อม CSS variables
  │    │
  │    └─ <div dangerouslySetInnerHTML /> ← inject HTML
  │       + <CopyButton />               ← Client Component เล็กๆ
  │
  └─ Browser ได้รับ HTML สำเร็จรูป — 0 JS สำหรับ syntax highlighting`,

  responsive: `/* ─── Alternative: Responsive Theme (light/dark ตาม app) ─── */
/* ถ้าต้องการ code block เปลี่ยนสีตาม theme ของ app */
/* ลบ force dark CSS ออก แล้วใช้แบบนี้แทน: */

.shiki {
  color: var(--shiki-light);
  background-color: var(--shiki-light-bg);
}
.shiki span {
  color: var(--shiki-light);
  font-style: var(--shiki-light-font-style);
  font-weight: var(--shiki-light-font-weight);
  text-decoration: var(--shiki-light-text-decoration);
}

/* Dark mode — ใช้ html.dark selector (next-themes เพิ่ม class ให้) */
html.dark .shiki {
  color: var(--shiki-dark);
  background-color: var(--shiki-dark-bg);
}
html.dark .shiki span {
  color: var(--shiki-dark);
  font-style: var(--shiki-dark-font-style);
  font-weight: var(--shiki-dark-font-weight);
  text-decoration: var(--shiki-dark-text-decoration);
}`,

  themes: `# ─── Themes ที่แนะนำ ───
# shiki มี 50+ themes — เลือกคู่ light/dark ที่ชอบ

# VS Code (ใช้ใน project นี้)
light-plus / dark-plus

# GitHub
github-light / github-dark

# Popular dark themes
one-dark-pro / catppuccin-mocha / dracula / nord

# ดู themes ทั้งหมด:
# https://shiki.style/themes`,
} as const;

// ===== Usage Guide =====

export type CodeShikiUsageExample = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
  readonly language: string;
};

export const CODE_SHIKI_USAGE_EXAMPLES: readonly CodeShikiUsageExample[] = [
  {
    key: 'usage-basic',
    title: 'ใช้ตรงใน Server Component',
    description: 'วิธีง่ายที่สุด — import แล้วใส่ code string + language',
    code: `// app/example/page.tsx (Server Component)
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';

export default function ExamplePage() {
  const code = \`
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Count: {count}
    </button>
  );
}
\`.trim();

  return (
    <div className="space-y-4">
      <h1>Counter Example</h1>
      <CodeBlockShiki code={code} language="tsx" />
    </div>
  );
}`,
    language: 'tsx',
  },
  {
    key: 'usage-pattern-card',
    title: 'ใช้กับ PatternCard (collapsible)',
    description: 'Preview ด้านบน + กดดู code ด้านล่าง — เหมาะกับ showcase page',
    code: `import { PatternCard } from '@/components/shared/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';

export function MySection() {
  const code = \`export function Hello() {
  return <h1>Hello World</h1>;
}\`;

  return (
    <PatternCard
      codeSlot={<CodeBlockShiki code={code} language="tsx" />}
    >
      {/* children = preview area (ด้านบน) */}
      <p className="text-sm text-muted-foreground">
        Live preview here...
      </p>
    </PatternCard>
  );
}`,
    language: 'tsx',
  },
  {
    key: 'usage-constant',
    title: 'ใช้กับ Constant Data (แนะนำ)',
    description: 'เก็บ code snippets เป็น constant — จัดการเป็นระบบ, reuse ได้',
    code: `// ─── Step 1: สร้าง constant ───
// constants/my-patterns.constant.ts
export type MyPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const MY_PATTERNS: readonly MyPattern[] = [
  {
    key: 'example-1',
    title: 'Basic Example',
    description: 'ตัวอย่างพื้นฐาน',
    code: \`const greeting = 'Hello World';
console.log(greeting);\`,
  },
];

// ─── Step 2: ใช้ใน Section Component ───
// components/my-section.tsx
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { MY_PATTERNS } from '@/constants/my-patterns.constant';

const pattern = MY_PATTERNS.find((p) => p.key === 'example-1')!;

export function MySection() {
  return (
    <section>
      <h2>{pattern.title}</h2>
      <p>{pattern.description}</p>
      <CodeBlockShiki code={pattern.code} language="tsx" />
    </section>
  );
}`,
    language: 'tsx',
  },
  {
    key: 'usage-languages',
    title: 'Supported Languages + เพิ่มภาษาใหม่',
    description: 'ภาษาที่ pre-load ไว้ + วิธีเพิ่มภาษาใหม่ใน 2 ขั้นตอน',
    code: `// ─── Languages ที่ pre-load (ใช้ได้ทันที) ───
<CodeBlockShiki code="..." language="tsx" />        // React + TypeScript
<CodeBlockShiki code="..." language="typescript" />  // TypeScript (ไม่มี JSX)
<CodeBlockShiki code="..." language="javascript" />  // JavaScript
<CodeBlockShiki code="..." language="css" />          // CSS
<CodeBlockShiki code="..." language="html" />         // HTML
<CodeBlockShiki code="..." language="bash" />         // Shell commands
<CodeBlockShiki code="..." language="json" />         // JSON config
<CodeBlockShiki code="..." />                         // ไม่ระบุ = 'text' (no highlight)

// ─── เพิ่มภาษาใหม่ (2 ขั้นตอน) ───
// 1. เปิด lib/shiki.ts → เพิ่มใน langs array
langs: ['css', 'tsx', 'typescript', /* ... */, 'python', 'sql', 'go'],

// 2. ใช้ได้เลย
<CodeBlockShiki code={pythonCode} language="python" />`,
    language: 'tsx',
  },
  {
    key: 'usage-warnings',
    title: 'สิ่งที่ต้องระวัง',
    description: 'ข้อจำกัดของ async Server Component + escape backtick + server-only',
    code: `// ⚠️ 1. ใช้ใน Client Component โดยตรงไม่ได้
// CodeBlockShiki เป็น async Server Component
// → ใน Client Component จะ error

// ❌ WRONG
'use client';
export function MyClient() {
  return <CodeBlockShiki code="..." language="tsx" />;
  //      ^ Error: async Server Component ใน Client
}

// ✅ CORRECT — ครอบด้วย Suspense ใน parent Server Component
// page.tsx (Server Component)
import { Suspense } from 'react';
export default function Page() {
  return (
    <Suspense fallback={<div>Loading code...</div>}>
      <CodeBlockShiki code="..." language="tsx" />
    </Suspense>
  );
}

// ⚠️ 2. code string ที่มี backtick ต้อง escape
// ใน template literal: \\\`  (backslash + backtick)
const code = \`const name = \\\`hello\\\`;\`;

// ⚠️ 3. server-only guard
// import { highlightCode } from '@/lib/shiki';
// → ถ้า import ใน Client Component จะ build error ทันที
// → เป็น safety net ที่ดี!`,
    language: 'tsx',
  },
];
