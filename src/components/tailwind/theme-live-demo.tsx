'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ThemeToggle } from '../theme/theme-toggle';

export function ThemeLiveDemo() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Live Demo</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          กดปุ่ม toggle แล้วดูทุก element เปลี่ยนสีทันที — ใช้ CSS variable
          เดียวกันทั้งหมด
        </p>
      </div>

      {/* Toggle */}
      <div className="flex items-center gap-3">
        <ThemeToggle /> <span>Click เพื่อเปลี่ยน theme</span>
      </div>

      {/* Preview card */}
      <Card>
        <CardHeader>
          <CardTitle>Preview Card</CardTitle>
          <CardDescription>
            ทุก element ใช้ semantic token — เปลี่ยน theme ไม่ต้องแก้ code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>

          {/* Text samples */}
          <div className="space-y-1 rounded-lg border border-border p-4">
            <p className="text-foreground">text-foreground — ตัวอักษรหลัก</p>
            <p className="text-muted-foreground">
              text-muted-foreground — ตัวอักษรรอง
            </p>
            <p className="text-primary">text-primary — สีหลัก</p>
            <p className="text-destructive">text-destructive — สี error</p>
          </div>

          {/* Backgrounds */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-lg border border-border bg-background p-3 text-center text-xs">
              bg-background
            </div>
            <div className="rounded-lg bg-muted p-3 text-center text-xs">
              bg-muted
            </div>
            <div className="rounded-lg bg-accent p-3 text-center text-xs">
              bg-accent
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center text-xs">
              bg-card
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
