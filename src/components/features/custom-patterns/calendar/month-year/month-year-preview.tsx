'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function MonthYearPreview() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="w-full max-w-xs space-y-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="size-4" />
            {date
              ? format(date, 'PPP', { locale: th })
              : 'เลือกวันเกิด'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            captionLayout="dropdown"
            startMonth={new Date(1950, 0)}
            endMonth={new Date(new Date().getFullYear(), 11)}
          />
        </PopoverContent>
      </Popover>
      {date && (
        <p className="text-sm text-muted-foreground">
          เลือก: {date.toLocaleDateString('th-TH', { dateStyle: 'long' })}
        </p>
      )}
    </div>
  );
}
