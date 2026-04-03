'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { showToast } from '@/components/shared/show-toast';

export function ConfirmDialogPreview() {
  const [openDefault, setOpenDefault] = useState(false);
  const [openDestructive, setOpenDestructive] = useState(false);
  const [openAsync, setOpenAsync] = useState(false);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button size="sm" variant="outline" onClick={() => setOpenDefault(true)}>
        Confirm Action
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setOpenDestructive(true)}
      >
        Delete Item
      </Button>
      <Button size="sm" variant="outline" onClick={() => setOpenAsync(true)}>
        Async Confirm
      </Button>

      <ConfirmDialog
        open={openDefault}
        onOpenChange={setOpenDefault}
        title="ยืนยันการดำเนินการ?"
        description="คุณต้องการดำเนินการนี้หรือไม่"
        onConfirm={() =>
          showToast({ type: 'success', title: 'ดำเนินการสำเร็จ' })
        }
      />

      <ConfirmDialog
        open={openDestructive}
        onOpenChange={setOpenDestructive}
        title="ลบรายการนี้?"
        description="เมื่อลบแล้วจะไม่สามารถกู้คืนได้"
        variant="destructive"
        confirmText="ลบเลย"
        onConfirm={() =>
          showToast({ type: 'success', title: 'ลบรายการสำเร็จ' })
        }
      />

      <ConfirmDialog
        open={openAsync}
        onOpenChange={setOpenAsync}
        title="บันทึกข้อมูล?"
        description="ระบบจะบันทึกการเปลี่ยนแปลงทั้งหมด"
        confirmText="บันทึก"
        onConfirm={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          showToast({ type: 'success', title: 'บันทึกสำเร็จ' });
        }}
      />
    </div>
  );
}
