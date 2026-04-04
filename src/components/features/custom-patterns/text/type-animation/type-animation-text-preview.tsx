'use client';

import { TextTypeAnimation } from '@/components/shared/ui-primitives/text-type-animation';
import type { TextSequenceItem } from '@/types/text.type';

const DEMO_ITEMS: TextSequenceItem[] = [
  { text: 'The Best Platform', delay: 1000 },
  { text: 'The Best Education', delay: 2000 },
  { text: 'The Best Partner', delay: 2000 },
];

export function TypeAnimationTextPreview() {
  return (
    <div className="flex min-h-20 items-center justify-center">
      <TextTypeAnimation
        items={DEMO_ITEMS}
        typingSpeed={50}
        deletingSpeed={30}
        className="text-2xl font-bold text-primary md:text-3xl"
      />
    </div>
  );
}
