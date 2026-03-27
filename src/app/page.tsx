import { HeroSection } from '@/components/home/hero-section';
import { FeatureSection } from '@/components/home/feature-section';
import { homeMetadata } from '@/lib/seo/home-metadata';

export const metadata = homeMetadata;

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeatureSection />
    </main>
  );
}
