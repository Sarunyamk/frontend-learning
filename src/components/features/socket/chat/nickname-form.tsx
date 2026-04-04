'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormTextField } from '@/components/shared/forms/form-text-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { chatJoinSchema, type ChatJoinInput } from '@/lib/schemas/chat-join.schema';

type NicknameFormProps = {
  onJoin: (roomId: string, nickname: string) => void;
  disabled: boolean;
};

export function NicknameForm({ onJoin, disabled }: NicknameFormProps) {
  const form = useForm<ChatJoinInput>({
    resolver: zodResolver(chatJoinSchema),
    defaultValues: { roomId: 'test-room', nickname: '' },
    mode: 'all',
  });

  function onSubmit(data: ChatJoinInput) {
    onJoin(data.roomId, data.nickname);
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Join Chat Room</CardTitle>
        <CardDescription>
          เปิด 2 tabs ในเบราว์เซอร์ กรอก Room ID เดียวกัน ใช้ชื่อต่างกัน เพื่อทดสอบแชท real-time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormTextField
              control={form.control}
              name="roomId"
              label="Room ID"
              placeholder="e.g. test-room"
              description="ใครกรอก Room ID เดียวกันจะเข้าห้องเดียวกัน"
            />

            <FormTextField
              control={form.control}
              name="nickname"
              label="Nickname"
              placeholder="e.g. Alice"
            />

            <Button
              type="submit"
              className="w-full"
              disabled={disabled || !form.formState.isValid}
            >
              Join Room
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
