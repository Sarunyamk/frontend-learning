import { ColumnFade } from '@/components/framer-motion/fade';
import Link from 'next/link';
import { ROUTES } from '@/constants/route.constant';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8">
        <ColumnFade delay={0}>
          <div className="text-7xl md:text-8xl mb-6 animate-bounce">🚀</div>
        </ColumnFade>

        <ColumnFade delay={0.1}>
          <h1 className="text-5xl md:text-6xl font-bold">Page Not Found</h1>
        </ColumnFade>

        <ColumnFade delay={0.2}>
          <p className="">
            The page you are looking for may have been moved, renamed, or does
            not exist.
          </p>
        </ColumnFade>

        <ColumnFade delay={0.3}>
          <Link
            href={ROUTES.HOME}
            className="inline-block rounded-lg px-6 py-3 transition hover:underline"
          >
            Back to Home
          </Link>
        </ColumnFade>
      </div>
    </div>
  );
}
