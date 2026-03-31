'use client';

import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useCallback, useState } from 'react';

export function CopyBadge({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleCopy}
      className="h-auto gap-1 px-2 py-0.5 font-mono text-xs"
    >
      {text}
      {copied ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <Copy className="h-3 w-3 opacity-50" />
      )}
    </Button>
  );
}
