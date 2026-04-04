'use client';

import { useState } from 'react';
import { Check, Copy, Save, Settings } from 'lucide-react';
import { CustomButton } from '@/components/shared/ui-primitives/custom-button';

export function BasicButtonsPreview() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText('Hello from CustomButton!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-muted-foreground">
        1. icon + label
      </p>
      <div className="flex flex-wrap gap-2">
        <CustomButton icon={Save} label="Save" onClick={() => {}} />
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        2. variant + className
      </p>
      <div className="flex flex-wrap gap-2">
        <CustomButton
          icon={Settings}
          label="Settings"
          variant="outline"
          className="rounded-full"
          onClick={() => {}}
        />
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        3. children (icon สลับ)
      </p>
      <div className="flex flex-wrap gap-2">
        <CustomButton variant="outline" size="sm" onClick={handleCopy}>
          {copied ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <Copy className="size-4" />
          )}
          {copied ? 'Copied!' : 'Copy'}
        </CustomButton>
      </div>
    </div>
  );
}
