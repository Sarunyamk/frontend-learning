import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { UnifiedScrollBar } from '@/components/shared/animation/unified-scroll-bar';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { fontVariables } from '@/lib/fonts';
import { BASE_METADATA } from '@/lib/seo/seo.constant';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = BASE_METADATA;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      suppressHydrationWarning
      className={`${fontVariables} h-full antialiased`}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <Header />
            <main className="min-h-screen pt-20">
              {children}
            </main>
            <Footer />
            <UnifiedScrollBar features={{ bubbles: true, gradient: false }} />
            <Toaster richColors position="top-right" />
            <SpeedInsights />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
