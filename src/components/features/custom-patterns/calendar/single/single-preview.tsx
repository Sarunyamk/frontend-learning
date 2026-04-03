'use client';

import { useState } from 'react';
import { DatePicker } from '@/components/shared/date-picker';

export function SingleDatePreview() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="w-full max-w-xs space-y-3">
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="เลือกวันที่"
      />
      {date && (
        <p className="text-sm text-muted-foreground">
          เลือก: {date.toLocaleDateString('th-TH', { dateStyle: 'long' })}
        </p>
      )}
    </div>
  );
}
