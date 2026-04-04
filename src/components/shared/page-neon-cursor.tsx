'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

// Center circle (static) + 2 inner orbiting circles
const CENTER = { size: 30, opacity: 0.7, blur: 0, color: 'var(--cursor-1)' };

const INNER_ORBITS = [
  { size: 24, opacity: 0.8, blur: 0.5, color: 'var(--cursor-2)', radius: 22, duration: '2s' },
  { size: 18, opacity: 0.9, blur: 1, color: 'var(--cursor-3)', radius: 20, duration: '3s', reverse: true },
] as const;

const ORBIT_SIZES = [60, 80, 100] as const;
const ORBIT_DURATIONS = ['3s', '4s', '5s'] as const;
const CURSOR_OFFSET_Y = 20;

const ORBIT_COLORS = [
  'bg-cursor-orbit-1',
  'bg-cursor-orbit-2',
  'bg-cursor-orbit-3',
];

const ORBIT_COLOR_VALUES = [
  'var(--cursor-orbit-1)',
  'var(--cursor-orbit-2)',
  'var(--cursor-orbit-3)',
];

export function PageNeonCursor({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInside, setIsInside] = useState(false);
  const [isInPreview, setIsInPreview] = useState(false);

  // Single shared position — all circles follow the same spot
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 400, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 25 });

  const isClicked = useMotionValue(0);
  const isHovered = useMotionValue(0);

  const scale = useTransform(
    [isClicked, isHovered],
    ([clicked, hovered]: number[]) =>
      clicked ? 0.8 : hovered ? 1.2 : 1,
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const inPreview = !!(e.target as HTMLElement).closest('[data-cursor-zone]');
      setIsInPreview(inPreview);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY + CURSOR_OFFSET_Y);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onEnter = () => setIsInside(true);
    const onLeave = () => {
      setIsInside(false);
      isClicked.set(0);
      isHovered.set(0);
    };
    const onDown = () => isClicked.set(1);
    const onUp = () => isClicked.set(0);

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseup', onUp);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseup', onUp);
    };
  }, [handleMouseMove, isClicked, isHovered]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      const target = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, select, textarea',
      );
      isHovered.set(target ? 1 : 0);
    };
    el.addEventListener('mouseover', handler);
    return () => el.removeEventListener('mouseover', handler);
  }, [isHovered]);

  return (
    <div ref={containerRef} className="relative">
      {children}

      {/* Center circle — static, follows mouse */}
      {isInside && !isInPreview && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-50"
          style={{
            x: springX,
            y: springY,
            scale,
            borderRadius: '50%',
            width: CENTER.size,
            height: CENTER.size,
            marginLeft: -CENTER.size / 2,
            marginTop: -CENTER.size / 2,
            backgroundColor: CENTER.color,
            opacity: CENTER.opacity,
            boxShadow: `0 0 ${CENTER.size / 2}px ${CENTER.color}`,
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Inner orbiting circles — ม่วง + ส้ม หมุนรอบศูนย์กลาง */}
      {isInside && !isInPreview &&
        INNER_ORBITS.map((orbit, i) => (
          <motion.div
            key={`inner-orbit-${i}`}
            className="pointer-events-none fixed left-0 top-0 z-50"
            style={{
              x: springX,
              y: springY,
              width: orbit.radius * 2,
              height: orbit.radius * 2,
              marginLeft: -orbit.radius,
              marginTop: -orbit.radius,
            }}
          >
            <div
              className="absolute inset-0 animate-spin"
              style={{
                animationDuration: orbit.duration,
                animationDirection: 'reverse' in orbit && orbit.reverse ? 'reverse' : 'normal',
              }}
            >
              <div
                className="absolute left-1/2 top-0 rounded-full"
                style={{
                  width: orbit.size,
                  height: orbit.size,
                  marginLeft: -orbit.size / 2,
                  marginTop: -orbit.size / 2,
                  backgroundColor: orbit.color,
                  opacity: orbit.opacity,
                  filter: orbit.blur > 0 ? `blur(${orbit.blur}px)` : undefined,
                  boxShadow: `0 0 ${orbit.size / 2}px ${orbit.color}`,
                  mixBlendMode: 'screen',
                }}
              />
            </div>
          </motion.div>
        ))}

      {/* Orbiting dots */}
      {isInside && !isInPreview &&
        ORBIT_SIZES.map((orbitSize, i) => (
          <motion.div
            key={`orbit-${i}`}
            className="pointer-events-none fixed left-0 top-0 z-40"
            style={{
              x: springX,
              y: springY,
              width: orbitSize,
              height: orbitSize,
              marginLeft: -orbitSize / 2,
              marginTop: -orbitSize / 2,
              opacity: 0.6,
            }}
          >
            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: ORBIT_DURATIONS[i] }}
            >
              <div
                className={`absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${ORBIT_COLORS[i]}`}
                style={{
                  boxShadow: `0 0 10px 2px ${ORBIT_COLOR_VALUES[i]}`,
                  opacity: 0.8,
                }}
              />
            </div>
          </motion.div>
        ))}
    </div>
  );
}
