export type Particle = {
  id: number;
  position: number;
  size: number;
  offset: number;
};

export type ScrollBarOrientation = 'vertical' | 'horizontal';

export type OrientationConfig = {
  scaleProperty: 'scaleY' | 'scaleX';
  transformOrigin: string;
  fixedBarClasses: string;
  stickyBarClasses: string;
  particleAnchorClass: string;
  particlePositionKey: 'top' | 'left';
  particleDriftKey: 'x' | 'y';
  gradientDirection: string;
  getContainerSize: (el: HTMLElement | null) => number;
  getWindowSize: () => number;
};

export const ORIENTATION_CONFIG: Record<
  ScrollBarOrientation,
  OrientationConfig
> = {
  vertical: {
    scaleProperty: 'scaleY',
    transformOrigin: 'top',
    fixedBarClasses: 'top-0 right-0 bottom-0 w-2 rounded-full',
    stickyBarClasses: 'top-0 float-right h-full w-2 rounded-full',
    particleAnchorClass: 'right-0.5',
    particlePositionKey: 'top',
    particleDriftKey: 'x',
    gradientDirection: '180deg',
    getContainerSize: (el) => el?.clientHeight ?? 0,
    getWindowSize: () => window.innerHeight,
  },
  horizontal: {
    scaleProperty: 'scaleX',
    transformOrigin: 'left',
    fixedBarClasses: 'top-0 left-0 right-0 h-1.5 rounded-full',
    stickyBarClasses: 'top-0 h-1.5 rounded-full w-full',
    particleAnchorClass: 'top-0',
    particlePositionKey: 'left',
    particleDriftKey: 'y',
    gradientDirection: '90deg',
    getContainerSize: (el) => el?.clientWidth ?? 0,
    getWindowSize: () => window.innerWidth,
  },
};

let idCounter = 0;

export function createParticles(
  progress: number,
  containerSize: number,
): Particle[] {
  const position = progress * containerSize;
  const count = Math.floor(Math.random() * 2) + 1;

  return Array.from({ length: count }, () => ({
    id: ++idCounter,
    position,
    size: Math.random() * 6 + 4,
    offset: (Math.random() - 0.5) * 40,
  }));
}
