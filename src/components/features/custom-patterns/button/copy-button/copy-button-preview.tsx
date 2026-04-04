'use client';

import { useState } from 'react';
import { CustomButton } from '@/components/shared/ui-primitives/custom-button';
import { Check, Copy } from 'lucide-react';

export function CopyButtonPreview() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText('Hello from Copy Button!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <CustomButton onClick={handleCopy} variant="outline" size="sm">
      {copied ? (
        <Check className="size-4 text-green-500" />
      ) : (
        <Copy className="size-4" />
      )}
      {copied ? 'Copied!' : 'Copy'}
    </CustomButton>
  );
}
