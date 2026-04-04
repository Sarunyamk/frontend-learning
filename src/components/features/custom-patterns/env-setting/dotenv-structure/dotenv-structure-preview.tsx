'use client';

import { FileText, GitBranch, ShieldAlert } from 'lucide-react';

const FILES = [
  {
    name: '.env',
    priority: 3,
    gitignore: false,
    desc: 'ค่า default ทุก environment — commit ได้',
  },
  {
    name: '.env.local',
    priority: 1,
    gitignore: true,
    desc: 'Secret + override — ห้าม commit!',
  },
  {
    name: '.env.development',
    priority: 2,
    gitignore: false,
    desc: 'Override เฉพาะ dev mode',
  },
  {
    name: '.env.production',
    priority: 2,
    gitignore: false,
    desc: 'Override เฉพาะ production',
  },
  {
    name: '.env.example',
    priority: null,
    gitignore: false,
    desc: 'Template สำหรับ team — commit ได้',
  },
] as const;

export function DotenvStructurePreview() {
  return (
    <div className="space-y-4 text-sm">
      {/* Priority table */}
      <div className="space-y-2">
        <p className="font-medium text-foreground">
          Priority (สูง → ต่ำ)
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="pb-2 pr-3 font-medium">#</th>
                <th className="pb-2 pr-3 font-medium">File</th>
                <th className="pb-2 pr-3 font-medium">Git</th>
                <th className="pb-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {FILES.map((file) => (
                <tr key={file.name}>
                  <td className="py-2 pr-3 text-muted-foreground">
                    {file.priority ?? '-'}
                  </td>
                  <td className="py-2 pr-3">
                    <div className="flex items-center gap-1.5">
                      <FileText className="size-3.5 shrink-0 text-primary" />
                      <code className="rounded bg-muted px-1.5 py-0.5">
                        {file.name}
                      </code>
                    </div>
                  </td>
                  <td className="py-2 pr-3">
                    {file.gitignore ? (
                      <span className="inline-flex items-center gap-1 text-destructive">
                        <ShieldAlert className="size-3" />
                        gitignore
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <GitBranch className="size-3" />
                        commit
                      </span>
                    )}
                  </td>
                  <td className="py-2 text-muted-foreground">{file.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Override example */}
      <div className="rounded-lg border bg-muted/50 p-3">
        <p className="mb-1 text-xs font-medium text-foreground">
          Override ทำงานยังไง?
        </p>
        <code className="block whitespace-pre-wrap text-xs text-muted-foreground">
          {`.env         → API_URL=http://localhost:3001
.env.local   → API_URL=https://staging.example.com

ผลลัพธ์: API_URL = "https://staging.example.com"
(.env.local override .env)`}
        </code>
      </div>
    </div>
  );
}
