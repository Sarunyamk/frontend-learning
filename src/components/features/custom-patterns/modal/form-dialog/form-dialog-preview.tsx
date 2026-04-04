'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { FormDialog } from '@/components/shared/dialog-overlay/form-dialog';
import { showToast } from '@/components/shared/ui-primitives/show-toast';

export function FormDialogPreview() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    showToast({
      type: 'success',
      title: 'บันทึกสำเร็จ',
      description: `Name: ${name}, Email: ${email}`,
    });
    setName('');
    setEmail('');
    setOpen(false);
  }

  return (
    <div className="flex justify-center">
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        Edit Profile
      </Button>

      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title="แก้ไขโปรไฟล์"
        description="อัปเดตข้อมูลส่วนตัวของคุณ"
      >
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="demo-name">ชื่อ</Label>
            <Input
              id="demo-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="กรอกชื่อ"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="demo-email">อีเมล</Label>
            <Input
              id="demo-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="กรอกอีเมล"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              ยกเลิก
            </Button>
            <Button type="submit">บันทึก</Button>
          </DialogFooter>
        </form>
      </FormDialog>
    </div>
  );
}
