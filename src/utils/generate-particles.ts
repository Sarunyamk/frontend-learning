export type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

export function generateParticles(
  count: number,
  sizeRange: [number, number],
  speedRange: [number, number],
): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
    duration: speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]),
    delay: Math.random() * -20,
  }));
}
