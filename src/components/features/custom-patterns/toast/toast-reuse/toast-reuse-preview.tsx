'use client';

import { showToast } from '@/components/shared/show-toast';
import { Button } from '@/components/ui/button';

const DEMOS = [
  {
    type: 'success' as const,
    label: 'Success',
    title: 'Saved!',
    description: 'บันทึกข้อมูลเรียบร้อย',
  },
  {
    type: 'error' as const,
    label: 'Error',
    title: 'Error',
    description: 'เกิดข้อผิดพลาด กรุณาลองใหม่',
  },
  {
    type: 'warning' as const,
    label: 'Warning',
    title: 'Warning',
    description: 'ข้อมูลอาจไม่ครบถ้วน',
  },
  {
    type: 'info' as const,
    label: 'Info',
    title: 'Info',
    description: 'มีอัปเดตใหม่พร้อมใช้งาน',
  },
];

export function ToastReusePreview() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {DEMOS.map((demo) => (
        <Button
          key={demo.type}
          size="sm"
          variant="outline"
          onClick={() =>
            showToast({
              type: demo.type,
              title: demo.title,
              description: demo.description,
            })
          }
        >
          {demo.label}
        </Button>
      ))}
    </div>
  );
}
