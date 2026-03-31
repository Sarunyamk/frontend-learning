// ===== Token Data =====

export type TokenItem = {
  name: string;
  cssVar: string;
  tailwindClass: string;
  description: string;
};

export type TokenGroup = {
  title: string;
  description: string;
  tokens: readonly TokenItem[];
};

export const TOKEN_GROUPS: readonly TokenGroup[] = [
  {
    title: 'Base',
    description: 'Background และ foreground หลักของ app',
    tokens: [
      {
        name: 'Background',
        cssVar: '--background',
        tailwindClass: 'bg-background',
        description: 'พื้นหลังหลักของ app',
      },
      {
        name: 'Foreground',
        cssVar: '--foreground',
        tailwindClass: 'text-foreground',
        description: 'สีตัวอักษรหลัก',
      },
    ],
  },
  {
    title: 'Brand',
    description: 'สีแบรนด์ที่กำหนดเอง',
    tokens: [
      {
        name: 'Brand 100',
        cssVar: '--brand-100',
        tailwindClass: 'bg-brand-100',
        description: 'สีแบรนด์หลัก (custom token)',
      },
    ],
  },
  {
    title: 'Primary & Secondary',
    description: 'สีหลักสำหรับ CTA, ปุ่ม, link',
    tokens: [
      {
        name: 'Primary',
        cssVar: '--primary',
        tailwindClass: 'bg-primary',
        description: 'สีหลักของปุ่ม, link, CTA',
      },
      {
        name: 'Primary Foreground',
        cssVar: '--primary-foreground',
        tailwindClass: 'text-primary-foreground',
        description: 'สีตัวอักษรบน primary',
      },
      {
        name: 'Secondary',
        cssVar: '--secondary',
        tailwindClass: 'bg-secondary',
        description: 'สีรอง',
      },
      {
        name: 'Secondary Foreground',
        cssVar: '--secondary-foreground',
        tailwindClass: 'text-secondary-foreground',
        description: 'สีตัวอักษรบน secondary',
      },
    ],
  },
  {
    title: 'Muted & Accent',
    description: 'สีสำหรับ subtle UI elements',
    tokens: [
      {
        name: 'Muted',
        cssVar: '--muted',
        tailwindClass: 'bg-muted',
        description: 'พื้นหลัง subtle (disabled, placeholder)',
      },
      {
        name: 'Muted Foreground',
        cssVar: '--muted-foreground',
        tailwindClass: 'text-muted-foreground',
        description: 'ตัวอักษร subtle',
      },
      {
        name: 'Accent',
        cssVar: '--accent',
        tailwindClass: 'bg-accent',
        description: 'สี hover, active state',
      },
      {
        name: 'Accent Foreground',
        cssVar: '--accent-foreground',
        tailwindClass: 'text-accent-foreground',
        description: 'ตัวอักษรบน accent',
      },
    ],
  },
  {
    title: 'Card & Popover',
    description: 'สีสำหรับ elevated surfaces',
    tokens: [
      {
        name: 'Card',
        cssVar: '--card',
        tailwindClass: 'bg-card',
        description: 'พื้นหลัง card',
      },
      {
        name: 'Card Foreground',
        cssVar: '--card-foreground',
        tailwindClass: 'text-card-foreground',
        description: 'ตัวอักษรใน card',
      },
      {
        name: 'Popover',
        cssVar: '--popover',
        tailwindClass: 'bg-popover',
        description: 'พื้นหลัง dropdown, tooltip',
      },
      {
        name: 'Popover Foreground',
        cssVar: '--popover-foreground',
        tailwindClass: 'text-popover-foreground',
        description: 'ตัวอักษรใน popover',
      },
    ],
  },
  {
    title: 'Border & Input',
    description: 'สีเส้นขอบ, input, ring focus',
    tokens: [
      {
        name: 'Border',
        cssVar: '--border',
        tailwindClass: 'border-border',
        description: 'สีเส้นขอบทั่วไป',
      },
      {
        name: 'Input',
        cssVar: '--input',
        tailwindClass: 'border-input',
        description: 'สีเส้นขอบ input field',
      },
      {
        name: 'Ring',
        cssVar: '--ring',
        tailwindClass: 'ring-ring',
        description: 'สี focus ring',
      },
    ],
  },
  {
    title: 'Destructive',
    description: 'สีสำหรับ error, delete, warning',
    tokens: [
      {
        name: 'Destructive',
        cssVar: '--destructive',
        tailwindClass: 'bg-destructive',
        description: 'สี error, delete action',
      },
    ],
  },
  {
    title: 'Chart',
    description: 'สีสำหรับ charts, data visualization',
    tokens: [
      {
        name: 'Chart 1',
        cssVar: '--chart-1',
        tailwindClass: 'bg-chart-1',
        description: 'สี chart series 1',
      },
      {
        name: 'Chart 2',
        cssVar: '--chart-2',
        tailwindClass: 'bg-chart-2',
        description: 'สี chart series 2',
      },
      {
        name: 'Chart 3',
        cssVar: '--chart-3',
        tailwindClass: 'bg-chart-3',
        description: 'สี chart series 3',
      },
      {
        name: 'Chart 4',
        cssVar: '--chart-4',
        tailwindClass: 'bg-chart-4',
        description: 'สี chart series 4',
      },
      {
        name: 'Chart 5',
        cssVar: '--chart-5',
        tailwindClass: 'bg-chart-5',
        description: 'สี chart series 5',
      },
    ],
  },
] as const;

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

// ===== Gradient Examples =====

export type GradientExample = {
  name: string;
  className: string;
  code: string;
};

export const GRADIENT_EXAMPLES: readonly GradientExample[] = [
  {
    name: 'Linear (ซ้าย → ขวา)',
    className: 'bg-gradient-to-r from-primary to-accent',
    code: 'bg-gradient-to-r from-primary to-accent',
  },
  {
    name: 'Linear (บน → ล่าง)',
    className: 'bg-gradient-to-b from-blue-500 to-purple-600',
    code: 'bg-gradient-to-b from-blue-500 to-purple-600',
  },
  {
    name: '3 สี (via)',
    className: 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600',
    code: 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600',
  },
  {
    name: 'Radial',
    className: 'bg-[radial-gradient(circle,_theme(colors.primary)_0%,_transparent_70%)]',
    code: 'bg-[radial-gradient(circle,_theme(colors.primary)_0%,_transparent_70%)]',
  },
  {
    name: 'Conic',
    className: 'bg-[conic-gradient(from_0deg,_theme(colors.primary),_theme(colors.accent),_theme(colors.primary))]',
    code: 'bg-[conic-gradient(from_0deg,_theme(colors.primary),_theme(colors.accent),_theme(colors.primary))]',
  },
  {
    name: 'Glass effect',
    className: 'bg-background/50 backdrop-blur-md border border-border/50',
    code: 'bg-background/50 backdrop-blur-md border border-border/50',
  },
] as const;

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
