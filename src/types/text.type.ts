// ===== Text Type Animation =====

export type TextSequenceItem = {
  text: string;
  delay: number; // ms — รอหลังพิมพ์เสร็จ
};

export type TextTypeAnimationProps = {
  items: TextSequenceItem[];
  /** ความเร็วพิมพ์แต่ละตัวอักษร (ms) — default 50 */
  typingSpeed?: number;
  /** ความเร็วลบแต่ละตัวอักษร (ms) — default 30 */
  deletingSpeed?: number;
  /** แสดง cursor กะพริบ — default true */
  cursor?: boolean;
  className?: string;
};

// ===== Text Image Fill =====

export type TextImageFillProps = {
  text: string;
  imageSrc: string;
  className?: string;
};

// ===== Text Animated Fill =====

export type TextAnimatedFillSpeed = 'slow' | 'normal' | 'fast';

export type TextAnimatedFillProps = {
  text: string;
  imageSrc: string;
  /** ความเร็ว animation — default 'normal' */
  speed?: TextAnimatedFillSpeed;
  className?: string;
};
