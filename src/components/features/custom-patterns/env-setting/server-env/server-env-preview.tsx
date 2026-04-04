'use client';

import { Lock, Server, ShieldCheck } from 'lucide-react';

const KEY_POINTS = [
  {
    icon: Lock,
    label: "import 'server-only'",
    detail:
      'Client Component import ไฟล์นี้ → build error ทันที ป้องกัน secret leak',
  },
  {
    icon: Server,
    label: 'process.exit(1)',
    detail:
      'fail fast ตอน startup — ไม่ใช่ตอน user เข้าหน้า (ใช้ได้เฉพาะ server)',
  },
  {
    icon: ShieldCheck,
    label: 'z.prettifyError()',
    detail: 'แสดง error message อ่านง่าย — บอกชัดว่า key ไหนผิด/ขาด',
  },
] as const;

const ENV_FIELDS = [
  { key: 'API_URL', type: 'string (url)', desc: 'Backend API endpoint' },
  {
    key: 'AUTH_SECRET',
    type: 'string (min 10)',
    desc: 'Secret สำหรับ sign JWT/session',
  },
  {
    key: 'NODE_ENV',
    type: 'enum + default',
    desc: 'development | production | test',
  },
] as const;

export function ServerEnvPreview() {
  return (
    <div className="space-y-4 text-sm">
      <div className="space-y-2">
        <p className="font-medium text-foreground">Key Points</p>
        <ul className="space-y-2">
          {KEY_POINTS.map((item) => (
            <li key={item.label} className="flex items-start gap-2">
              <item.icon className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  {item.label}
                </code>
                <span className="text-muted-foreground"> — {item.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <p className="font-medium text-foreground">
          Schema Fields (ตัวอย่างในโปรเจคนี้)
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="pb-2 pr-4 font-medium">Key</th>
                <th className="pb-2 pr-4 font-medium">Validation</th>
                <th className="pb-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ENV_FIELDS.map((field) => (
                <tr key={field.key}>
                  <td className="py-2 pr-4">
                    <code className="rounded bg-muted px-1.5 py-0.5">
                      {field.key}
                    </code>
                  </td>
                  <td className="py-2 pr-4 text-muted-foreground">
                    {field.type}
                  </td>
                  <td className="py-2 text-muted-foreground">{field.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
