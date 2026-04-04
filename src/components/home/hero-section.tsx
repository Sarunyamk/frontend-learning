import { Button } from '@/components/ui/button';
import { TEXT_IMAGE } from '@/constants/image/text-image.constant';
import { ROUTES } from '@/constants/route.constant';
import Link from 'next/link';
import { TextAnimatedFill } from '../shared/ui-primitives/text-animated-fill';

export function HeroSection() {
  return (
    <section className="flex flex-col items-center gap-6 px-4 py-20 text-center">
      <h1>
        <TextAnimatedFill
          text="MY LEARNING"
          imageSrc={TEXT_IMAGE.textImage}
          speed="slow"
          className="text-6xl font-black tracking-wider md:text-8xl"
        />
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        เรียนรู้ Next.js 16 + TypeScript แบบ best practice ผ่านตัวอย่าง feature
        จริง ตั้งแต่ Payment, Auth, Real-time ไปจนถึง Animation
      </p>
      <Button asChild size="lg">
        <Link href={ROUTES.FEATURES}>Explore Features</Link>
      </Button>
    </section>
  );
}
