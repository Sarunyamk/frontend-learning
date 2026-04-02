'use client';

import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

const PROBLEMS = [
  {
    icon: AlertTriangle,
    label: 'Typo ใน env key',
    detail: 'process.env.APIURL (ขาด _) → undefined → crash ตอน runtime',
  },
  {
    icon: ShieldAlert,
    label: 'ลืมใส่ env ใน production',
    detail: 'app พังหลัง deploy — ไม่รู้จนกว่า user จะเข้า',
  },
  {
    icon: AlertTriangle,
    label: 'ไม่มี autocomplete',
    detail: 'เดา key name → ต้องเปิด .env ดูทุกครั้ง',
  },
] as const;

const SOLUTIONS = [
  { label: 'Zod schema', detail: 'validate ครบทุก key ตอน startup' },
  { label: 'Type safety', detail: 'autocomplete + compile-time error' },
  { label: 'Fail fast', detail: 'พังตอน build/start ไม่ใช่ตอน user ใช้งาน' },
] as const;

export function EnvOverviewPreview() {
  return (
    <div className="space-y-4 text-sm">
      <div className="space-y-2">
        <p className="font-medium text-destructive">
          ปัญหาถ้าไม่ validate env
        </p>
        <ul className="space-y-2">
          {PROBLEMS.map((item) => (
            <li key={item.label} className="flex items-start gap-2">
              <item.icon className="mt-0.5 size-4 shrink-0 text-destructive" />
              <div>
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground"> — {item.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <p className="font-medium text-emerald-600 dark:text-emerald-400">
          Zod validation แก้ปัญหาทั้งหมด
        </p>
        <ul className="space-y-2">
          {SOLUTIONS.map((item) => (
            <li key={item.label} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <div>
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground"> — {item.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
