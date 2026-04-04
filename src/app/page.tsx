import { FeatureSection } from '@/components/home/feature-section';
import { HeroSection } from '@/components/home/hero-section';
import { FloatingParticles } from '@/components/shared/animation/floating-particles';
import { homeMetadata } from '@/lib/seo/home-metadata';
export const metadata = homeMetadata;

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <FloatingParticles
        count={80}
        sizeRange={[3, 8]}
        opacity={0.9}
        speedRange={[4, 8]}
        particleClass='bg-floating-animation'
      />
      <HeroSection />
      <FeatureSection />
    </main>
  );
}
