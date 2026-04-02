export type CalendarPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const CALENDAR_PATTERNS: readonly CalendarPattern[] = [
  // ─────────────────────────────────────────────
  // 1. Single Date Picker — source + usage
  // ─────────────────────────────────────────────
  {
    key: 'single',
    title: 'DatePicker',
    description:
      'Reusable date picker — Popover + Calendar + date-fns format รวมเป็นชิ้นเดียว',
    code: `// ============================================
// src/components/shared/date-picker.tsx
// ============================================
'use client';

import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type DatePickerProps = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function DatePicker({
  value,
  onChange,
  placeholder = 'เลือกวันที่',
  disabled = false,
  className,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="size-4" />
          {value
            ? format(value, 'PPP', { locale: th })
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          defaultMonth={value}
        />
      </PopoverContent>
    </Popover>
  );
}`,
  },
  {
    key: 'single-usage',
    title: 'DatePicker — Usage',
    description: 'ตัวอย่างการใช้งาน: state เดียว และใช้กับ react-hook-form',
    code: `import { useState } from 'react';
import { DatePicker } from '@/components/shared/date-picker';

// ============================================
// 1. ใช้กับ useState — ง่ายสุด
// ============================================
function BirthdayForm() {
  const [date, setDate] = useState<Date>();

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      placeholder="เลือกวันเกิด"
    />
  );
}

// ============================================
// 2. ใช้กับ react-hook-form (Controller)
// ============================================
import { Controller, useForm } from 'react-hook-form';

function EventForm() {
  const { control } = useForm<{ eventDate: Date }>();

  return (
    <Controller
      control={control}
      name="eventDate"
      render={({ field }) => (
        <DatePicker
          value={field.value}
          onChange={field.onChange}
          placeholder="เลือกวันจัดงาน"
        />
      )}
    />
  );
}`,
  },

  // ─────────────────────────────────────────────
  // 2. Date Range — source + usage
  // ─────────────────────────────────────────────
  {
    key: 'range',
    title: 'DateRangePicker',
    description:
      'Reusable date range picker — Calendar mode="range" + 2 เดือนเคียงกัน',
    code: `// ============================================
// src/components/shared/date-range-picker.tsx
// ============================================
'use client';

import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type DateRangePickerProps = {
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function DateRangePicker({
  value,
  onChange,
  placeholder = 'เลือกช่วงวันที่',
  disabled = false,
  className,
}: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value?.from && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="size-4" />
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, 'P', { locale: th })}
                {' – '}
                {format(value.to, 'P', { locale: th })}
              </>
            ) : (
              format(value.from, 'PPP', { locale: th })
            )
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          defaultMonth={value?.from}
        />
      </PopoverContent>
    </Popover>
  );
}`,
  },
  {
    key: 'range-usage',
    title: 'DateRangePicker — Usage',
    description: 'ตัวอย่าง: filter ช่วงวันที่ และใช้กับ API query',
    code: `import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { DateRangePicker } from '@/components/shared/date-range-picker';

// ============================================
// 1. ใช้กับ useState — filter ข้อมูล
// ============================================
function ReportFilter() {
  const [range, setRange] = useState<DateRange>();

  return (
    <DateRangePicker
      value={range}
      onChange={setRange}
      placeholder="เลือกช่วงวันที่"
    />
  );
}

// ============================================
// 2. ใช้จริง — ส่ง range ไป API
// ============================================
const { data } = await getReport({
  from: range?.from?.toISOString(),
  to: range?.to?.toISOString(),
});`,
  },

  // ─────────────────────────────────────────────
  // 3. Two Separate Dates — composition
  // ─────────────────────────────────────────────
  {
    key: 'two-dates',
    title: 'Two Separate Dates',
    description:
      'ใช้ DatePicker 2 ตัวแยก start/end — เหมาะกับ booking form ที่ต้องแสดง 2 ช่องแยก',
    code: `// ============================================
// Compose: DatePicker x 2 (ไม่แยก component)
// layout ต่าง project ไม่เหมือนกัน
// ============================================
'use client';

import { useState } from 'react';
import { DatePicker } from '@/components/shared/date-picker';

function BookingForm() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          วันเข้าพัก
        </label>
        <DatePicker
          value={checkIn}
          onChange={setCheckIn}
          placeholder="เลือกวัน Check-in"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">
          วันออก
        </label>
        <DatePicker
          value={checkOut}
          onChange={setCheckOut}
          placeholder="เลือกวัน Check-out"
        />
      </div>
    </div>
  );
}`,
  },
  {
    key: 'two-dates-usage',
    title: 'Two Separate Dates — Usage',
    description: 'ตัวอย่าง: validation start < end และแสดงจำนวนวัน',
    code: `import { useState } from 'react';
import { differenceInDays } from 'date-fns';
import { DatePicker } from '@/components/shared/date-picker';

// ============================================
// Validation: checkOut ต้องหลัง checkIn
// ============================================
function BookingFormWithValidation() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  const nights =
    checkIn && checkOut
      ? differenceInDays(checkOut, checkIn)
      : 0;

  function handleCheckInChange(date: Date | undefined) {
    setCheckIn(date);
    // reset checkOut ถ้าเลือกวันหลัง checkIn ปัจจุบัน
    if (date && checkOut && date >= checkOut) {
      setCheckOut(undefined);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <DatePicker
          value={checkIn}
          onChange={handleCheckInChange}
          placeholder="Check-in"
        />
        <DatePicker
          value={checkOut}
          onChange={setCheckOut}
          placeholder="Check-out"
        />
      </div>
      {nights > 0 && (
        <p className="text-sm text-muted-foreground">
          {nights} คืน
        </p>
      )}
    </div>
  );
}`,
  },

  // ─────────────────────────────────────────────
  // 4. Month/Year Picker — composition
  // ─────────────────────────────────────────────
  {
    key: 'month-year',
    title: 'Month / Year Picker',
    description:
      'เลือกเดือน/ปีด้วย dropdown — เหมาะกับ report filter, birth date ที่ต้องเลื่อนหลายปี',
    code: `// ============================================
// ใช้ Calendar captionLayout="dropdown" ของ shadcn
// รองรับ dropdown เดือน + ปี ในตัว
// ============================================
'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type MonthYearPickerProps = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  fromYear?: number;
  toYear?: number;
  placeholder?: string;
  className?: string;
};

function MonthYearPicker({
  value,
  onChange,
  fromYear = 1950,
  toYear = new Date().getFullYear(),
  placeholder = 'เลือกวันที่',
  className,
}: MonthYearPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="size-4" />
          {value
            ? format(value, 'PPP', { locale: th })
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          defaultMonth={value}
          captionLayout="dropdown"
          startMonth={new Date(fromYear, 0)}
          endMonth={new Date(toYear, 11)}
        />
      </PopoverContent>
    </Popover>
  );
}`,
  },
  {
    key: 'month-year-usage',
    title: 'Month / Year Picker — Usage',
    description: 'ตัวอย่าง: เลือกวันเกิด (ย้อนหลายปี) และ report filter เลือกแค่เดือน',
    code: `import { useState } from 'react';

// ============================================
// 1. วันเกิด — ย้อนได้ถึง 1950
// ============================================
function BirthdateField() {
  const [date, setDate] = useState<Date>();

  return (
    <MonthYearPicker
      value={date}
      onChange={setDate}
      fromYear={1950}
      toYear={new Date().getFullYear()}
      placeholder="เลือกวันเกิด"
    />
  );
}

// ============================================
// 2. Report filter — เลือกเดือน/ปี แล้วส่ง API
// ============================================
function ReportMonthFilter() {
  const [date, setDate] = useState<Date>();

  // ส่งแค่ month + year ไป API
  const month = date ? date.getMonth() + 1 : undefined;
  const year = date ? date.getFullYear() : undefined;

  return (
    <MonthYearPicker
      value={date}
      onChange={setDate}
      fromYear={2020}
      placeholder="เลือกเดือน"
    />
  );
}`,
  },

  // ─────────────────────────────────────────────
  // 5. With Time Picker — composition
  // ─────────────────────────────────────────────
  {
    key: 'with-time',
    title: 'Date + Time Picker',
    description:
      'Compose DatePicker + Input type="time" — เหมาะกับ event form, appointment',
    code: `// ============================================
// Compose: Calendar + time input
// ============================================
'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type DateTimePickerProps = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
};

function DateTimePicker({
  value,
  onChange,
  placeholder = 'เลือกวันและเวลา',
  className,
}: DateTimePickerProps) {
  const timeValue = value
    ? format(value, 'HH:mm')
    : '';

  function handleDateChange(date: Date | undefined) {
    if (!date) return onChange(undefined);
    // เก็บเวลาเดิมไว้
    if (value) {
      date.setHours(value.getHours(), value.getMinutes());
    }
    onChange(date);
  }

  function handleTimeChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const [hours, minutes] = e.target.value
      .split(':')
      .map(Number);
    const updated = value ? new Date(value) : new Date();
    updated.setHours(hours, minutes);
    onChange(updated);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="size-4" />
          {value
            ? format(value, 'PPP HH:mm', { locale: th })
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDateChange}
          defaultMonth={value}
        />
        <div className="border-t px-3 py-2">
          <Input
            type="time"
            value={timeValue}
            onChange={handleTimeChange}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}`,
  },
  {
    key: 'with-time-usage',
    title: 'Date + Time Picker — Usage',
    description: 'ตัวอย่าง: สร้าง event และ appointment booking',
    code: `import { useState } from 'react';

// ============================================
// 1. สร้าง Event — เลือกวัน + เวลา
// ============================================
function CreateEventForm() {
  const [dateTime, setDateTime] = useState<Date>();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        วันและเวลาจัดงาน
      </label>
      <DateTimePicker
        value={dateTime}
        onChange={setDateTime}
        placeholder="เลือกวันและเวลา"
      />
      {dateTime && (
        <p className="text-sm text-muted-foreground">
          ISO: {dateTime.toISOString()}
        </p>
      )}
    </div>
  );
}

// ============================================
// 2. ใช้จริง — ส่ง ISO string ไป API
// ============================================
const payload = {
  title: 'Meeting',
  startAt: dateTime?.toISOString(),
};

await createEvent(payload);`,
  },
] as const;
