'use client';

type QuizCountdownProps = {
  seconds: number;
};

export function QuizCountdown({ seconds }: QuizCountdownProps) {
  // SVG circle countdown
  const size = 160;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // 3 seconds total countdown, offset based on current second
  const progress = seconds / 3;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg className="absolute inset-0" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/30"
          />
        </svg>
        {/* Animated circle */}
        <svg
          className="absolute inset-0 -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="text-primary transition-all duration-1000 ease-linear"
          />
        </svg>
        {/* Number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold text-foreground">{seconds}</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Get ready!</p>
    </div>
  );
}
