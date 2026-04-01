import { highlightCode } from '@/lib/shiki';
import { cn } from '@/lib/utils';

import { CopyButton } from './copy-button';

type CodeBlockShikiProps = {
  code: string;
  language?: string;
  className?: string;
};

export async function CodeBlockShiki({
  code,
  language,
  className,
}: CodeBlockShikiProps) {
  const html = await highlightCode(code, language);

  return (
    <div className={cn('group relative', className)}>
      <CopyButton code={code} />
      <div
        className={cn(
          '[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed',
          '[&_code]:font-(family-name:--font-geist-mono)',
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
