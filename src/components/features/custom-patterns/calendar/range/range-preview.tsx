'use client';

import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { DateRangePicker } from '@/components/shared/date-range-picker';

export function DateRangePreview() {
  const [range, setRange] = useState<DateRange>();

  return (
    <div className="w-full max-w-sm space-y-3">
      <DateRangePicker
        value={range}
        onChange={setRange}
        placeholder="เลือกช่วงวันที่"
      />
      {range?.from && range?.to && (
        <p className="text-sm text-muted-foreground">
          {range.from.toLocaleDateString('th-TH')} –{' '}
          {range.to.toLocaleDateString('th-TH')}
        </p>
      )}
    </div>
  );
}
