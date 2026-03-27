'use client';

import { motion } from 'framer-motion';
import {
  CreditCard,
  Radio,
  Palette,
  Shield,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  CreditCard,
  Radio,
  Palette,
  Shield,
  Sparkles,
};

type FeatureCardProps = {
  label: string;
  description: string;
  icon: string;
  path: string;
  index: number;
};

export function FeatureCard({
  label,
  description,
  icon,
  path,
  index,
}: FeatureCardProps) {
  const Icon = ICON_MAP[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
    >
      <Link
        href={path}
        className="group flex h-full flex-col gap-4 rounded-xl border bg-card p-6 transition-colors hover:border-primary/50"
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="size-5 text-primary" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-card-foreground">
            {label}
          </h3>
        </div>
        <p className="flex-1 text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center gap-1 text-sm font-medium text-primary">
          <span>Learn more</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}
