'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { InfoSheet } from '@/components/shared/info-sheet';

const DEMO_ORDER = {
  id: 'ORD-2024-001',
  status: 'สำเร็จ',
  items: [
    { name: 'MacBook Pro 14"', qty: 1, price: '69,900' },
    { name: 'Magic Mouse', qty: 1, price: '3,490' },
    { name: 'USB-C Hub', qty: 2, price: '1,290' },
  ],
  total: '75,970',
};

export function InfoSheetPreview() {
  const [openRight, setOpenRight] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button size="sm" variant="outline" onClick={() => setOpenRight(true)}>
        Order Detail (Right)
      </Button>
      <Button size="sm" variant="outline" onClick={() => setOpenLeft(true)}>
        Filter Panel (Left)
      </Button>

      <InfoSheet
        open={openRight}
        onOpenChange={setOpenRight}
        title="รายละเอียดออเดอร์"
        description={DEMO_ORDER.id}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">สถานะ</span>
            <Badge variant="secondary">{DEMO_ORDER.status}</Badge>
          </div>
          <Separator />
          <div className="space-y-3">
            {DEMO_ORDER.items.map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
                <span>
                  {item.name} x{item.qty}
                </span>
                <span className="font-medium">฿{item.price}</span>
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>รวมทั้งหมด</span>
            <span>฿{DEMO_ORDER.total}</span>
          </div>
        </div>
      </InfoSheet>

      <InfoSheet
        open={openLeft}
        onOpenChange={setOpenLeft}
        title="ตัวกรอง"
        description="กรองรายการตามเงื่อนไข"
        side="left"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">หมวดหมู่</p>
            <div className="flex flex-wrap gap-2">
              {['ทั้งหมด', 'อิเล็กทรอนิกส์', 'เสื้อผ้า', 'อาหาร'].map(
                (cat) => (
                  <Badge key={cat} variant="outline" className="cursor-pointer">
                    {cat}
                  </Badge>
                ),
              )}
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <p className="text-sm font-medium">สถานะ</p>
            <div className="flex flex-wrap gap-2">
              {['รอดำเนินการ', 'กำลังจัดส่ง', 'สำเร็จ', 'ยกเลิก'].map(
                (status) => (
                  <Badge
                    key={status}
                    variant="outline"
                    className="cursor-pointer"
                  >
                    {status}
                  </Badge>
                ),
              )}
            </div>
          </div>
        </div>
      </InfoSheet>
    </div>
  );
}
