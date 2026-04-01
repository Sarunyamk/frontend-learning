import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';

import { CustomButton } from '@/components/shared/custom-button';
import { PatternCard } from '../pattern-card';

const GRADIENT_EXAMPLES = [
  {
    key: 'purple-pink',
    label: 'Purple → Pink',
    className:
      'bg-linear-to-r from-purple-500 to-pink-500 text-white transition-all duration-300 hover:from-pink-500 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/25',
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
    key: 'cyan-blue',
    label: 'Cyan → Blue',
    className:
      'bg-linear-to-r from-cyan-500 to-blue-500 text-white transition-all duration-300 hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-blue-500/25',
    code: `<Button
  className="bg-linear-to-r from-cyan-500 to-blue-500
    text-white transition-all duration-300
    hover:from-blue-500 hover:to-cyan-500
    hover:shadow-lg hover:shadow-blue-500/25"
>
  Ocean
</Button>`,
  },
  {
    key: 'amber-red',
    label: 'Amber → Red',
    className:
      'bg-linear-to-r from-amber-500 to-red-500 text-white transition-all duration-300 hover:from-red-500 hover:to-amber-500 hover:shadow-lg hover:shadow-red-500/25',
    code: `<Button
  className="bg-linear-to-r from-amber-500 to-red-500
    text-white transition-all duration-300
    hover:from-red-500 hover:to-amber-500
    hover:shadow-lg hover:shadow-red-500/25"
>
  Sunset
</Button>`,
  },
  {
    key: 'gradient-slide',
    label: 'Gradient Slide-in',
    className:
      'group relative overflow-hidden border-2 border-foreground bg-transparent text-foreground before:absolute before:inset-0 before:translate-x-full before:bg-linear-to-r before:from-purple-500 before:to-pink-500 before:transition-transform before:duration-500 before:ease-out hover:before:translate-x-0 hover:text-white hover:border-transparent',
    code: `<Button
  variant="outline"
  className="group relative overflow-hidden
    border-2 border-foreground bg-transparent text-foreground
    before:absolute before:inset-0 before:translate-x-full
    before:bg-linear-to-r before:from-purple-500 before:to-pink-500
    before:transition-transform before:duration-500 before:ease-out
    hover:before:translate-x-0 hover:text-white
    hover:border-transparent"
>
  <span className="relative z-10">GET IN TOUCH</span>
</Button>`,
  },
] as const;

export function GradientButtons() {
  return (
    <section className="rounded-lg border bg-card p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Gradient Hover
        </h2>
        <p className="text-sm text-muted-foreground">
          ปุ่ม gradient ที่เปลี่ยนทิศทางเมื่อ hover
        </p>
      </div>
      <div className="mx-auto grid items-start gap-4 max-w-xl">
        {GRADIENT_EXAMPLES.map((example) => (
          <PatternCard
            key={example.key}
            codeSlot={<CodeBlockShiki code={example.code} language="tsx" />}
          >
            <CustomButton className={example.className}>
              <span className="relative z-10">{example.label}</span>
            </CustomButton>
          </PatternCard>
        ))}
      </div>
    </section>
  );
}
