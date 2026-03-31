'use client';

import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { useCallback, useState } from 'react';

type CodeBlockProps = {
  code: string;
  language?: string;
  className?: string;
};

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className={cn('group relative', className)}>
      {language && (
        <span className="absolute left-3 top-2 text-xs text-muted-foreground/60">
          {language}
        </span>
      )}
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md p-1.5 text-muted-foreground/60 opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
      <pre
        className={cn(
          'overflow-x-auto rounded-lg bg-muted p-4 text-sm leading-relaxed',
          language && 'pt-8',
        )}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
