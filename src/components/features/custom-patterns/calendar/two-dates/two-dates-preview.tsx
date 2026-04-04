'use client';

import { useState } from 'react';
import { differenceInDays } from 'date-fns';
import { DatePicker } from '@/components/shared/forms/date-picker';

export function TwoDatesPreview() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  const nights =
    checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;

  function handleCheckInChange(date: Date | undefined) {
    setCheckIn(date);
    if (date && checkOut && date >= checkOut) {
      setCheckOut(undefined);
    }
  }

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            วันเข้าพัก
          </label>
          <DatePicker
            value={checkIn}
            onChange={handleCheckInChange}
            placeholder="Check-in"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            วันออก
          </label>
          <DatePicker
            value={checkOut}
            onChange={setCheckOut}
            placeholder="Check-out"
          />
        </div>
      </div>
      {nights > 0 && (
        <p className="text-sm text-muted-foreground">{nights} คืน</p>
      )}
    </div>
  );
}
