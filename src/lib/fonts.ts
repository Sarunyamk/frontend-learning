import { Geist, Geist_Mono, Prompt } from 'next/font/google';

// ─── Sans (body text) ───
export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// ─── Mono (code blocks) ───
export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// ─── Thai-friendly (body + heading) ───
export const prompt = Prompt({
  variable: '--font-prompt',
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
});

// ─── Combined className สำหรับ <html> ───
export const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  prompt.variable,
].join(' ');
