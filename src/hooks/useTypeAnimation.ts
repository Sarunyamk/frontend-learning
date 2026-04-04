'use client';

import { useEffect, useRef, useState } from 'react';

import type { TextSequenceItem } from '@/types/text.type';

type UseTypeAnimationOptions = {
  items: TextSequenceItem[];
  typingSpeed?: number;
  deletingSpeed?: number;
};

export function useTypeAnimation({
  items,
  typingSpeed = 50,
  deletingSpeed = 30,
}: UseTypeAnimationOptions) {
  const [displayText, setDisplayText] = useState('');
  const stateRef = useRef({
    index: 0,
    phase: 'typing' as 'typing' | 'waiting' | 'deleting',
    char: 0,
  });

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    const state = stateRef.current;
    state.index = 0;
    state.char = 0;
    state.phase = 'typing';

    const tick = () => {
      const current = items[state.index];
      if (!current) return;

      if (state.phase === 'typing') {
        state.char += 1;
        setDisplayText(current.text.slice(0, state.char));

        if (state.char >= current.text.length) {
          state.phase = 'waiting';
          timerId = setTimeout(tick, current.delay);
          return;
        }
        timerId = setTimeout(tick, typingSpeed);
        return;
      }

      if (state.phase === 'waiting') {
        state.phase = 'deleting';
        timerId = setTimeout(tick, deletingSpeed);
        return;
      }

      // deleting
      state.char -= 1;
      setDisplayText(current.text.slice(0, state.char));

      if (state.char <= 0) {
        state.index = (state.index + 1) % items.length;
        state.phase = 'typing';
        timerId = setTimeout(tick, typingSpeed);
        return;
      }
      timerId = setTimeout(tick, deletingSpeed);
    };

    // เริ่ม tick แรก — ไม่ต้อง setDisplayText('') เพราะ tick จะ set เอง
    timerId = setTimeout(tick, typingSpeed);

    return () => clearTimeout(timerId);
  }, [items, typingSpeed, deletingSpeed]);

  return displayText;
}
