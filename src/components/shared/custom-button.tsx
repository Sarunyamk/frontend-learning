import { Button, type buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';

type CustomButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    icon?: LucideIcon;
    label?: string;
    asChild?: boolean;
  };

export function CustomButton({
  icon: Icon,
  label,
  className,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <Button className={cn('gap-2', className)} {...props}>
      {Icon && <Icon className="size-4" />}
      {label && <span>{label}</span>}
      {children}
    </Button>
  );
}
