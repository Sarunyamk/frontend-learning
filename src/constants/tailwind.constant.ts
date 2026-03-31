// ===== Color Format Comparison =====

export type ColorFormatExample = {
  format: string;
  value: string;
  pros: string;
  cons: string;
};

export const COLOR_FORMAT_EXAMPLES: readonly ColorFormatExample[] = [
  {
    format: 'oklch',
    value: 'oklch(0.87 0.15 150)',
    pros: 'Perceptually uniform, ปรับ lightness ได้สม่ำเสมอ, รองรับ wide gamut',
    cons: 'ยังใหม่, อ่านค่าสียาก',
  },
  {
    format: 'hsl',
    value: 'hsl(150, 60%, 50%)',
    pros: 'อ่านง่าย, ปรับ hue/saturation/lightness สะดวก',
    cons: 'ไม่ perceptually uniform, gamut แคบกว่า oklch',
  },
  {
    format: 'hex',
    value: '#4ade80',
    pros: 'สั้น, ใช้กันแพร่หลาย, copy จาก Figma ได้เลย',
    cons: 'อ่านค่าสียาก, ไม่รองรับ opacity syntax, gamut แคบ',
  },
  {
    format: 'rgb',
    value: 'rgb(74, 222, 128)',
    pros: 'รองรับทุก browser, ค่าตรงกับ design tool',
    cons: 'อ่านยาก, ไม่ intuitive ในการปรับสี',
  },
] as const;

// ===== Gradient Examples (@utility pattern) =====

export type GradientExample = {
  name: string;
  description: string;
  cssVar: string;
  utilityCode: string;
  usageClass: string;
};

export const GRADIENT_EXAMPLES: readonly GradientExample[] = [
  {
    name: 'Linear (บน → ล่าง)',
    description: 'ไล่สีจากบนลงล่าง — ใช้กับ hero, card background',
    cssVar: '--brandGD-100: linear-gradient(180deg, var(--brand-50, #e8f5e9), var(--brand-100));',
    utilityCode: `@utility bg-brandGD-100 {
  background: var(--brandGD-100);
}`,
    usageClass: 'bg-brandGD-100',
  },
  {
    name: 'Linear (ซ้าย → ขวา)',
    description: 'ไล่สีจากซ้ายไปขวา — ใช้กับ banner, divider',
    cssVar: '--brandGD-200: linear-gradient(90deg, var(--primary), var(--accent));',
    utilityCode: `@utility bg-brandGD-200 {
  background: var(--brandGD-200);
}`,
    usageClass: 'bg-brandGD-200',
  },
  {
    name: 'Diagonal',
    description: 'ไล่สีแนวทแยง — ใช้กับ feature card, badge',
    cssVar: '--brandGD-300: linear-gradient(135deg, var(--primary), var(--secondary));',
    utilityCode: `@utility bg-brandGD-300 {
  background: var(--brandGD-300);
}`,
    usageClass: 'bg-brandGD-300',
  },
  {
    name: '3 สี (multi-stop)',
    description: 'ไล่ 3 สี — ใช้กับ header gradient, progress bar',
    cssVar: '--brandGD-400: linear-gradient(90deg, var(--chart-1), var(--chart-3), var(--chart-5));',
    utilityCode: `@utility bg-brandGD-400 {
  background: var(--brandGD-400);
}`,
    usageClass: 'bg-brandGD-400',
  },
  {
    name: 'Radial',
    description: 'ไล่สีจากจุดศูนย์กลาง — ใช้กับ spotlight, glow effect',
    cssVar: '--brandGD-500: radial-gradient(circle, var(--primary), transparent 70%);',
    utilityCode: `@utility bg-brandGD-500 {
  background: var(--brandGD-500);
}`,
    usageClass: 'bg-brandGD-500',
  },
  {
    name: 'Glass effect',
    description: 'พื้นหลังโปร่งแสง + blur — ใช้กับ navbar, modal overlay',
    cssVar: '/* ไม่ต้องใช้ CSS variable */',
    utilityCode: `@utility bg-glass {
  background: oklch(from var(--background) l c h / 50%);
  backdrop-filter: blur(12px);
  border: 1px solid oklch(from var(--border) l c h / 50%);
}`,
    usageClass: 'bg-glass',
  },
] as const;

// ===== @utility Setup Step =====

export const UTILITY_SETUP_STEP = {
  step: 4,
  title: 'สร้าง Custom Utility ด้วย @utility',
  description: 'Tailwind v4 ใช้ @utility สำหรับสร้าง class ใหม่ที่ทำงานเหมือน built-in — ใช้กับ gradient, component base, complex styles',
  code: `/* globals.css */

/* Step 1: กำหนด gradient ใน :root / .dark */
:root {
  --brandGD-200: linear-gradient(180deg, var(--brand-50, #e8f5e9), var(--brand-100));
}
.dark {
  --brandGD-200: linear-gradient(180deg, var(--brand-50, #1a3a1a), var(--brand-100));
}

/* Step 2: สร้าง @utility — ใช้เป็น class ได้เลย */
@utility bg-brandGD-200 {
  background: var(--brandGD-200);
}

/* ตัวอย่างอื่น */
@utility text-gradient {
  background: linear-gradient(90deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@utility bg-glass {
  background: oklch(from var(--background) l c h / 50%);
  backdrop-filter: blur(12px);
}`,
  usage: `{/* ใช้ใน JSX เหมือน class ปกติ */}
<div className="bg-brandGD-200">Gradient Card</div>
<h1 className="text-gradient">Gradient Text</h1>
<nav className="bg-glass">Glass Navbar</nav>`,
} as const;

// ===== Setup Steps (for tutorial) =====

export const TOKEN_SETUP_STEPS = [
  {
    step: 1,
    title: 'กำหนด CSS Variable ใน globals.css',
    description: 'ประกาศค่าสีใน :root (light) และ .dark (dark mode) โดยใช้ color format ที่ต้องการ',
    code: `:root {
  --brand-100: oklch(84.678% 0.20046 128.108);
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
}

.dark {
  --brand-100: oklch(49.171% 0.12749 129.403);
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
}`,
  },
  {
    step: 2,
    title: 'Register ใน @theme inline',
    description: 'บอก Tailwind ให้รู้จัก CSS variable เป็น class ที่ใช้ได้ เช่น bg-brand-100, text-primary',
    code: `@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-brand-100: var(--brand-100);

  /* pattern: --color-{name}: var(--{css-var}); */
  /* ผลลัพธ์: ใช้ bg-{name}, text-{name}, border-{name} ได้ */
}`,
  },
  {
    step: 3,
    title: 'ใช้ใน Component',
    description: 'ใช้ Tailwind class ที่ register แล้วได้เลย — สีจะเปลี่ยนตาม theme อัตโนมัติ',
    code: `{/* ✅ ใช้ semantic token */}
<div className="bg-background text-foreground">
  <h1 className="text-primary">Hello</h1>
  <p className="text-muted-foreground">Subtitle</p>
  <button className="bg-brand-100">Custom Brand</button>
</div>

{/* ❌ ห้าม hardcode สี */}
<div className="bg-white text-black">
<div className="bg-[#C40C0C]">
<div style={{ color: '#C40C0C' }}>`,
  },
] as const;

export const THEME_SETUP_STEPS = [
  {
    step: 1,
    title: 'Install next-themes',
    description: 'Library สำหรับจัดการ dark/light mode ใน Next.js — เก็บ preference ใน localStorage อัตโนมัติ',
    code: `pnpm add next-themes`,
  },
  {
    step: 2,
    title: 'เพิ่ม @custom-variant ใน globals.css',
    description: 'บอก Tailwind v4 ว่า dark: prefix ให้ดูจาก class บน parent (ไม่ใช่ prefers-color-scheme)',
    code: `/* globals.css */
@import 'tailwindcss';

@custom-variant dark (&:is(.dark *));`,
  },
  {
    step: 3,
    title: 'สร้าง ThemeProvider wrapper',
    description: 'Client component ที่ครอบ next-themes provider — ใส่ attribute="class" เพื่อให้ toggle ด้วย class',
    code: `// components/theme/theme-provider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}`,
  },
  {
    step: 4,
    title: 'ใส่ ThemeProvider ใน Root Layout',
    description: 'ครอบ children ด้วย ThemeProvider + suppressHydrationWarning บน <html> เพื่อป้องกัน hydration mismatch',
    code: `// app/layout.tsx
import { ThemeProvider } from '@/components/theme/theme-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`,
  },
  {
    step: 5,
    title: 'สร้าง ThemeToggle button',
    description: 'Client component ที่ใช้ useTheme() เพื่อ toggle dark/light — ใช้ mounted state ป้องกัน hydration mismatch',
    code: `// components/theme/theme-toggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}`,
  },
] as const;
