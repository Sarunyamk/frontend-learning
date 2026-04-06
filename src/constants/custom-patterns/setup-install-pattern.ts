import { CodeSection } from '@/types/share-code-section.type';

export const BUTTON_INSTALL_SECTIONS: readonly CodeSection[] = [
  {
    title: 'Install shadcn/ui',
    description: 'ติดตั้ง library สำหรับ component',
    language: 'bash',
    code: `pnpm dlx shadcn@latest add button`,
  },
];
export const TOAST_INSTALL_SECTIONS: readonly CodeSection[] = [
  {
    title: '1. Install shadcn/ui',
    description: 'ติดตั้ง library สำหรับ toast (sonner)',
    language: 'bash',
    code: `pnpm dlx shadcn@latest add sonner`,
  },
  {
    title: '2. Add Toaster to Root Layout',
    description: 'เพิ่ม Toaster component ใน RootLayout ของแอป',
    language: 'tsx',
    code: `import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <main className="min-h-screen pt-20">{children}</main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}`,
  },
];
