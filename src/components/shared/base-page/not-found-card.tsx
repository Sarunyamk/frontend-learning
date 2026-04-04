import { ColumnFade } from '@/components/shared/framer-motion/fade';
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
}
