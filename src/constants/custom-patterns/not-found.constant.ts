export type NotFoundPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const NOT_FOUND_PATTERNS: readonly NotFoundPattern[] = [
  {
    key: 'not-found-card',
    title: 'NotFoundCard — Reusable Component',
    description:
      'Full-page 404 — ColumnFade stagger animation + bounce emoji + title + description + back link. ใช้ใน not-found.tsx ได้เลย',
    code: `// components/shared/not-found-card.tsx
import { ColumnFade } from '@/components/framer-motion/fade';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type NotFoundCardProps = {
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
};

export function NotFoundCard({
  title = 'Page Not Found',
  description = 'The page you are looking for may have been moved, renamed, or does not exist.',
  backHref = '/',
  backLabel = 'Back to Home',
  className,
}: NotFoundCardProps) {
  return (
    <div
      className={cn(
        'flex min-h-screen items-center justify-center',
        className
      )}
    >
      <div className="space-y-8 text-center">
        <ColumnFade delay={0}>
          <div className="mb-6 text-7xl md:text-8xl animate-bounce">🚀</div>
        </ColumnFade>

        <ColumnFade delay={0.1}>
          <h1 className="text-5xl font-bold md:text-6xl">{title}</h1>
        </ColumnFade>

        <ColumnFade delay={0.2}>
          <p>{description}</p>
        </ColumnFade>

        <ColumnFade delay={0.3}>
          <Link
            href={backHref}
            className="inline-block rounded-lg px-6 py-3 transition hover:underline"
          >
            {backLabel}
          </Link>
        </ColumnFade>
      </div>
    </div>
  );
}`,
  },
  {
    key: 'not-found-card-usage',
    title: 'NotFoundCard — Usage in not-found.tsx',
    description:
      'ตัวอย่างการใช้งานจริงใน Next.js not-found.tsx',
    code: `// app/not-found.tsx
// Next.js จะแสดงหน้านี้เมื่อเรียก notFound() หรือ URL ไม่ match route
import { NotFoundCard } from '@/components/shared/not-found-card';

export default function NotFound() {
  return (
    <NotFoundCard
      title="Page Not Found"
      description="The page you are looking for may have been moved, renamed, or does not exist."
      backHref="/"
      backLabel="Back to Home"
    />
  );
}

// ใช้ notFound() เพื่อ trigger หน้านี้:
// import { notFound } from 'next/navigation';
//
// export default async function ProductPage({ params }) {
//   const product = await getProduct(params.id);
//   if (!product) notFound(); // → แสดง not-found.tsx
//   return <ProductDetail product={product} />;
// }`,
  },
];
