'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type MessageInputProps = {
  onSend: (content: string) => void;
  disabled: boolean;
};

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = content.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 border-t p-3">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
        disabled={disabled}
        autoFocus
      />
      <Button type="submit" disabled={disabled || !content.trim()}>
        Send
      </Button>
    </form>
  );
}
