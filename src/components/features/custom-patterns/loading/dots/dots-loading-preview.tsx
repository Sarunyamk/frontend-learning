'use client';

export function DotsLoadingPreview() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-10">
      {/* 1. Bouncing Dots */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="size-3 animate-bounce rounded-full bg-primary"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">Bounce</span>
      </div>

      {/* 2. Pulse Dots */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="size-3 animate-pulse rounded-full bg-primary"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">Pulse</span>
      </div>

      {/* 3. Wave Dots */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-end gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-primary"
              style={{
                height: '24px',
                animation: 'wave 1s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">Wave</span>
      </div>
    </div>
  );
}
