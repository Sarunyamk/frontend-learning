'use client';

import { TextAnimatedFill } from '@/components/shared/ui-primitives/text-animated-fill';
import {
  TEXT_IMAGE
} from '@/constants/image/text-image.constant';

export function AnimatedFillTextPreview() {
  return (
    <div className="flex min-h-30 items-center justify-center">
      <TextAnimatedFill
        text="OCEAN WAVE"
        imageSrc={TEXT_IMAGE.textImageAnimation}
        speed="slow"
        className="text-6xl font-black tracking-wider md:text-7xl"
      />
    </div>
  );
}
