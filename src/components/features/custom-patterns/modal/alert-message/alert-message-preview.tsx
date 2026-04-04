'use client';

import { AlertMessage } from '@/components/shared/dialog-overlay/alert-message';
import { showToast } from '@/components/shared/ui-primitives/show-toast';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function AlertMessagePreview() {
  const [openSession, setOpenSession] = useState(false);
  const [openMaintenance, setOpenMaintenance] = useState(false);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button size="sm" variant="outline" onClick={() => setOpenSession(true)}>
        Session Expired
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setOpenMaintenance(true)}
      >
        Maintenance Notice
      </Button>

      <AlertMessage
        open={openSession}
        onOpenChange={setOpenSession}
        title="Session หมดอายุ"
        description="เซสชันของคุณหมดอายุแล้ว กรุณาเข้าสู่ระบบใหม่เพื่อดำเนินการต่อ"
        confirmText="ไปหน้า Login"
        onConfirm={() =>
          showToast({ type: 'info', title: 'Redirect to /login...' })
        }
      />

      <AlertMessage
        open={openMaintenance}
        onOpenChange={setOpenMaintenance}
        title="แจ้งปิดปรับปรุงระบบ"
        description="ระบบจะปิดปรับปรุงในวันที่ 5 เม.ย. 2026 เวลา 02:00 - 06:00 น. กรุณาบันทึกงานก่อนเวลาดังกล่าว"
        confirmText="รับทราบ"
      />
    </div>
  );
}
