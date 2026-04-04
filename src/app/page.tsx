import { FeatureSection } from '@/components/home/feature-section';
import { HeroSection } from '@/components/home/hero-section';
import { FloatingParticles } from '@/components/shared/animation/floating-particles';
import { homeMetadata } from '@/lib/seo/home-metadata';
import { getEducationalJsonLd, getWebsiteJsonLd } from '@/lib/seo/json-ld';

export const metadata = homeMetadata;

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([getWebsiteJsonLd(), getEducationalJsonLd()]),
        }}
      />
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
