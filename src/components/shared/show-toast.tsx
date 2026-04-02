import { toast } from 'sonner';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  type LucideIcon,
} from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

type ShowToastOptions = {
  type: ToastType;
  title: string;
  description?: string;
};

const TOAST_CONFIG: Record<ToastType, { icon: LucideIcon; method: keyof typeof toast }> = {
  success: { icon: CheckCircle, method: 'success' },
  error: { icon: XCircle, method: 'error' },
  warning: { icon: AlertTriangle, method: 'warning' },
  info: { icon: Info, method: 'info' },
};

export function showToast({ type, title, description }: ShowToastOptions) {
  const config = TOAST_CONFIG[type];
  const method = toast[config.method] as typeof toast.success;

  method(title, { description });
}
