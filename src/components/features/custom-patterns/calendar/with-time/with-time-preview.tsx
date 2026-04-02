'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function WithTimePreview() {
  const [dateTime, setDateTime] = useState<Date>();

  const timeValue = dateTime ? format(dateTime, 'HH:mm') : '';

  function handleDateChange(date: Date | undefined) {
    if (!date) return setDateTime(undefined);
    if (dateTime) {
      date.setHours(dateTime.getHours(), dateTime.getMinutes());
    }
    setDateTime(date);
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const updated = dateTime ? new Date(dateTime) : new Date();
    updated.setHours(hours, minutes);
    setDateTime(updated);
  }

  return (
    <div className="w-full max-w-xs space-y-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !dateTime && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="size-4" />
            {dateTime
              ? format(dateTime, 'PPP HH:mm', { locale: th })
              : 'เลือกวันและเวลา'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateTime}
            onSelect={handleDateChange}
            defaultMonth={dateTime}
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
      {dateTime && (
        <p className="text-sm text-muted-foreground">
          ISO: {dateTime.toISOString()}
        </p>
      )}
    </div>
  );
}
