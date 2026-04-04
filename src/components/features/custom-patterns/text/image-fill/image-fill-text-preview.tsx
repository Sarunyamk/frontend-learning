'use client';

import { TextImageFill } from '@/components/shared/ui-primitives/text-image-fill';
import { TEXT_IMAGE } from '@/constants/image/text-image.constant';

export function ImageFillTextPreview() {
  return (
    <div className="flex min-h-30 items-center justify-center">
      <TextImageFill
        text="ADVENTURE"
        imageSrc={TEXT_IMAGE.textImageFill}
        className="text-5xl font-black tracking-wider md:text-8xl"
      />
    </div>
  );
}
