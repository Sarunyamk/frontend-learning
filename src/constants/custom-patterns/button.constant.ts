export type ButtonPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const BUTTON_PATTERNS: readonly ButtonPattern[] = [
  {
    key: 'basic',
    title: 'CustomButton',
    description:
      'Wrapper รอบ shadcn Button — รับ icon, label, children, onClick ผ่านได้หมด',
    code: `// components/shared/custom-button.tsx
import { Button, type buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';

type CustomButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    icon?: LucideIcon;
    label?: string;
    asChild?: boolean;
  };

export function CustomButton({
  icon: Icon,
  label,
  className,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <Button className={cn('gap-2', className)} {...props}>
      {Icon && <Icon className="size-4" />}
      {label && <span>{label}</span>}
      {children}
    </Button>
  );
}`,
  },
  {
    key: 'basic-usage',
    title: 'CustomButton — Usage',
    description: 'ตัวอย่างการใช้งานจริง: icon+label, variant+className, children',
    code: `import { CustomButton } from '@/components/shared/custom-button';
import { Save, Settings, Check, Copy } from 'lucide-react';

// 1. icon + label — ใช้งานง่ายสุด
<CustomButton icon={Save} label="Save" onClick={() => handleSave()} />

// 2. variant + className — ปรับ style ได้เหมือน shadcn Button
<CustomButton
  icon={Settings}
  label="Settings"
  variant="outline"
  className="rounded-full"
  onClick={() => openSettings()}
/>

// 3. children — ใช้เมื่อต้องการ custom content (เช่น icon สลับ)
<CustomButton variant="outline" size="sm" onClick={handleCopy}>
  {copied ? (
    <Check className="size-4 text-green-500" />
  ) : (
    <Copy className="size-4" />
  )}
  {copied ? 'Copied!' : 'Copy'}
</CustomButton>`,
  },
  {
    key: 'gradient',
    title: 'Gradient Hover',
    description: 'ปุ่ม gradient ที่เปลี่ยนทิศทางเมื่อ hover',
    code: `<Button
  className="bg-linear-to-r from-purple-500 to-pink-500
    text-white transition-all duration-300
    hover:from-pink-500 hover:to-purple-500
    hover:shadow-lg hover:shadow-purple-500/25"
>
  Gradient Button
</Button>`,
  },
  {
    key: 'icon-arrow',
    title: 'Arrow Slide',
    description: 'icon เลื่อนไปทางขวาเมื่อ hover',
    code: `<Button className="group">
  <span>Next Step</span>
  <ArrowRight
    className="ml-2 size-4 transition-transform
      group-hover:translate-x-1"
  />
</Button>`,
  },
  {
    key: 'icon-download',
    title: 'Download Bounce',
    description: 'icon เด้งลงเมื่อ hover',
    code: `<Button variant="outline" className="group">
  <Download
    className="mr-2 size-4 transition-transform
      group-hover:translate-y-0.5"
  />
  <span>Download</span>
</Button>`,
  },
  {
    key: 'icon-rotate',
    title: 'Rotate Icon',
    description: 'icon หมุน 90 องศาเมื่อ hover',
    code: `<Button variant="secondary" className="group">
  <Plus
    className="mr-2 size-4 transition-transform
      group-hover:rotate-90"
  />
  <span>Add Item</span>
</Button>`,
  },
  {
    key: 'loading',
    title: 'Loading Button',
    description:
      'ปุ่มที่แสดง spinner ขณะ loading — disable ป้องกัน double click',
    code: `const [loading, setLoading] = useState(false);

async function handleClick() {
  setLoading(true);
  await new Promise((r) => setTimeout(r, 2000));
  setLoading(false);
}

<Button onClick={handleClick} disabled={loading}>
  {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
  {loading ? 'Saving...' : 'Save Changes'}
</Button>`,
  },
  {
    key: 'shimmer',
    title: 'Shimmer Effect',
    description: 'ปุ่มที่มี shimmer วิ่งผ่านเมื่อ hover — ใช้ CSS pseudo-element',
    code: `<Button
  className="relative overflow-hidden
    before:pointer-events-none before:absolute
    before:inset-y-0 before:-left-1/3 before:w-1/3
    before:-skew-x-12 before:-translate-x-full
    before:bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.6)_50%,transparent_80%)]
    before:transition-transform before:duration-1000
    before:ease-in-out hover:before:translate-x-[400%]"
>
  Shimmer Button
</Button>`,
  },
  {
    key: 'magnetic',
    title: 'Magnetic Hover',
    description:
      'ปุ่มที่เคลื่อนตาม cursor เมื่อ hover — ใช้ onMouseMove + transform',
    code: `const [position, setPosition] = useState({ x: 0, y: 0 });

function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  setPosition({
    x: (e.clientX - rect.left - rect.width / 2) * 0.3,
    y: (e.clientY - rect.top - rect.height / 2) * 0.3,
  });
}

<Button
  onMouseMove={handleMouseMove}
  onMouseLeave={() => setPosition({ x: 0, y: 0 })}
  style={{
    transform: \`translate(\${position.x}px, \${position.y}px)\`,
    transition: 'transform 0.2s ease-out',
  }}
>
  Magnetic
</Button>`,
  },
  {
    key: 'glow',
    title: 'Glow on Hover',
    description: 'เรืองแสงเมื่อ hover — ใช้ box-shadow หลายชั้น',
    code: `<Button
  className="border-primary bg-transparent text-primary
    transition-shadow duration-300
    hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5),0_0_30px_rgba(var(--primary-rgb),0.3)]"
  variant="outline"
>
  Glow Button
</Button>`,
  },
  {
    key: 'neon',
    title: 'Neon Always-on',
    description: 'เรืองแสงตลอดเวลา + สว่างขึ้นเมื่อ hover',
    code: `<Button
  className="border-green-400 bg-transparent text-green-400
    shadow-[0_0_10px_rgba(74,222,128,0.4),0_0_20px_rgba(74,222,128,0.2)]
    transition-shadow duration-300
    hover:shadow-[0_0_20px_rgba(74,222,128,0.6),0_0_40px_rgba(74,222,128,0.3)]"
  variant="outline"
>
  Neon Button
</Button>`,
  },
  {
    key: 'copy',
    title: 'Copy Button',
    description: 'ปุ่ม copy ที่เปลี่ยน icon เป็น check เมื่อ copy สำเร็จ',
    code: `const [copied, setCopied] = useState(false);

async function handleCopy() {
  await navigator.clipboard.writeText('Copied text!');
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
}

<Button
  onClick={handleCopy}
  variant="outline"
  size="sm"
>
  {copied ? (
    <Check className="mr-2 size-4 text-green-500" />
  ) : (
    <Copy className="mr-2 size-4" />
  )}
  {copied ? 'Copied!' : 'Copy'}
</Button>`,
  },
  {
    key: 'social-google',
    title: 'Google',
    description: 'Google brand color #4285F4',
    code: `<Button className="bg-[#4285F4] text-white hover:bg-[#3367D6]">
  <GoogleIcon className="mr-2 size-4" />
  Continue with Google
</Button>`,
  },
  {
    key: 'social-github',
    title: 'GitHub',
    description: 'GitHub brand — dark/light mode aware',
    code: `<Button
  className="bg-[#24292F] text-white hover:bg-[#1B1F23]
    dark:bg-white dark:text-[#24292F] dark:hover:bg-gray-200"
>
  <GitHubIcon className="mr-2 size-4" />
  Continue with GitHub
</Button>`,
  },
  {
    key: 'social-facebook',
    title: 'Facebook',
    description: 'Facebook brand color #1877F2',
    code: `<Button className="bg-[#1877F2] text-white hover:bg-[#0C63D4]">
  <FacebookIcon className="mr-2 size-4" />
  Continue with Facebook
</Button>`,
  },
] as const;
