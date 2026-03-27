import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/route.constant';

export function HeroSection() {
  return (
    <section className="flex flex-col items-center gap-6 px-4 py-20 text-center">
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Learning Fullstack
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        เรียนรู้ Next.js 16 + TypeScript แบบ best practice
        ผ่านตัวอย่าง feature จริง ตั้งแต่ Payment, Auth, Real-time ไปจนถึง Animation
      </p>
      <Button asChild size="lg">
        <Link href={ROUTES.FEATURES}>Explore Features</Link>
      </Button>
    </section>
  );
}
