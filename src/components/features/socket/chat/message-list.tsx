'use client';

import { useEffect, useRef } from 'react';
import type { ChatMessage } from '@/types/socket.type';

type MessageListProps = {
  messages: ChatMessage[];
  currentUserId: string | null;
};

export function MessageList({ messages, currentUserId }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 text-sm text-muted-foreground">
        No messages yet — say something!
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-2 overflow-y-auto p-4">
      {messages.map((msg) => {
        const isSystem = msg.userId === 'system';
        const isOwn = msg.userId === currentUserId;

        if (isSystem) {
          return (
            <p key={msg.id} className="text-center text-xs text-muted-foreground">
              {msg.content}
            </p>
          );
        }

        return (
          <div
            key={msg.id}
            className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}
          >
            <span className="mb-0.5 text-xs text-muted-foreground">
              {msg.nickname}
            </span>
            <div
              className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                isOwn
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              {msg.content}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
