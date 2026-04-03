export type ToastPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const TOAST_PATTERNS: readonly ToastPattern[] = [
  {
    key: 'show-toast',
    title: 'showToast — Reusable Function',
    description:
      'Function เดียว ส่ง type (success/error/warning/info) → icon + สี เปลี่ยนอัตโนมัติ',
    code: `// components/shared/show-toast.tsx
import { toast } from 'sonner';
import {
  CheckCircle, XCircle, AlertTriangle, Info,
  type LucideIcon,
} from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

type ShowToastOptions = {
  type: ToastType;
  title: string;
  description?: string;
};

const TOAST_CONFIG: Record<
  ToastType,
  { icon: LucideIcon; method: keyof typeof toast }
> = {
  success: { icon: CheckCircle, method: 'success' },
  error: { icon: XCircle, method: 'error' },
  warning: { icon: AlertTriangle, method: 'warning' },
  info: { icon: Info, method: 'info' },
};

export function showToast({ type, title, description }: ShowToastOptions) {
  const config = TOAST_CONFIG[type];
  const method = toast[config.method] as typeof toast.success;
  method(title, { description });
}`,
  },
  {
    key: 'show-toast-usage',
    title: 'showToast — Usage',
    description:
      'ตัวอย่างการเรียกใช้ showToast ใน Client component',
    code: `'use client';
import { showToast } from '@/components/shared/show-toast';

// Success
showToast({
  type: 'success',
  title: 'Saved!',
  description: 'บันทึกข้อมูลเรียบร้อย',
});

// Error
showToast({
  type: 'error',
  title: 'Error',
  description: 'เกิดข้อผิดพลาด กรุณาลองใหม่',
});

// Warning
showToast({
  type: 'warning',
  title: 'Warning',
  description: 'ข้อมูลอาจไม่ครบถ้วน',
});

// Info
showToast({
  type: 'info',
  title: 'Info',
  description: 'มีอัปเดตใหม่พร้อมใช้งาน',
});`,
  },
  {
    key: 'action',
    title: 'Toast with Action',
    description:
      'toast มีปุ่ม action — เช่น Undo, Retry ให้ user กดตอบโต้ได้',
    code: `'use client';
import { toast } from 'sonner';

// Toast with Undo action
toast('Item deleted', {
  description: 'The item has been removed.',
  action: {
    label: 'Undo',
    onClick: () => {
      // restore item logic
      toast.success('Item restored');
    },
  },
});

// Toast with Retry action
toast.error('Failed to save', {
  description: 'Network error occurred.',
  action: {
    label: 'Retry',
    onClick: () => {
      // retry logic
      toast.promise(saveData(), {
        loading: 'Retrying...',
        success: 'Saved!',
        error: 'Failed again',
      });
    },
  },
});`,
  },
  {
    key: 'promise',
    title: 'Promise Toast',
    description:
      'toast.promise() — แสดง loading → success/error อัตโนมัติตาม async result',
    code: `'use client';
import { toast } from 'sonner';

// จำลอง async function
async function saveData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { name: 'Sonner' };
}

// ใช้ toast.promise — จัดการ 3 states อัตโนมัติ
toast.promise(saveData(), {
  loading: 'Saving...',
  success: (data) => \`\${data.name} has been saved!\`,
  error: 'Failed to save',
});

// Tips:
// - loading state แสดง spinner icon อัตโนมัติ (จาก Toaster config)
// - success/error เปลี่ยน icon + สีตาม richColors
// - ใช้กับ fetch, form submit, หรือ async operation ใดก็ได้`,
  },
  {
    key: 'custom',
    title: 'Custom Toast',
    description:
      'toast() ใส่ JSX custom — ออกแบบ content เองได้ทั้งหมด',
    code: `'use client';
import { toast } from 'sonner';

// Custom JSX toast
toast.custom((id) => (
  <div className="flex items-center gap-3 rounded-lg border bg-card
    p-4 shadow-lg">
    <div className="flex size-10 items-center justify-center
      rounded-full bg-primary/10">
      <span className="text-lg">🎉</span>
    </div>
    <div className="flex-1">
      <p className="text-sm font-semibold text-foreground">
        Welcome back!
      </p>
      <p className="text-xs text-muted-foreground">
        You have 3 new notifications
      </p>
    </div>
    <button
      onClick={() => toast.dismiss(id)}
      className="text-xs text-muted-foreground hover:text-foreground"
    >
      Dismiss
    </button>
  </div>
));`,
  },
] as const;
