'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormTextField } from '@/components/shared/forms/form-text-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import {
  quizCreateSchema,
  quizJoinSchema,
  type QuizCreateInput,
  type QuizJoinInput,
} from '@/lib/schemas/quiz-join.schema';

type QuizEntryProps = {
  onCreateRoom: (nickname: string) => void;
  onJoinRoom: (code: string, nickname: string) => void;
  disabled: boolean;
};

export function QuizEntry({ onCreateRoom, onJoinRoom, disabled }: QuizEntryProps) {
  const [mode, setMode] = useState<'select' | 'create' | 'join'>('select');

  if (mode === 'create') {
    return (
      <CreateRoomForm
        onSubmit={onCreateRoom}
        onBack={() => setMode('select')}
        disabled={disabled}
      />
    );
  }

  if (mode === 'join') {
    return (
      <JoinRoomForm
        onSubmit={onJoinRoom}
        onBack={() => setMode('select')}
        disabled={disabled}
      />
    );
  }

  // Select mode
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Mini Kahoot Quiz</CardTitle>
        <CardDescription>
          สร้างห้องใหม่ หรือ เข้าห้องเพื่อนด้วย Room Code
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full" onClick={() => setMode('create')} disabled={disabled}>
          Create Room
        </Button>
        <Button className="w-full" variant="outline" onClick={() => setMode('join')} disabled={disabled}>
          Join Room
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Tip: เปิด 2 tabs — tab แรก Create, tab สอง Join ด้วย Room Code เดียวกัน
        </p>
      </CardContent>
    </Card>
  );
}

// ===== Sub-forms =====

function CreateRoomForm({
  onSubmit,
  onBack,
  disabled,
}: {
  onSubmit: (nickname: string) => void;
  onBack: () => void;
  disabled: boolean;
}) {
  const form = useForm<QuizCreateInput>({
    resolver: zodResolver(quizCreateSchema),
    defaultValues: { nickname: '' },
    mode: 'all',
  });

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Create Room</CardTitle>
        <CardDescription>คุณจะเป็น Host ของห้องนี้</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => onSubmit(data.nickname))} className="space-y-4">
            <FormTextField
              control={form.control}
              name="nickname"
              label="Nickname"
              placeholder="e.g. Alice"
            />
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={disabled || !form.formState.isValid}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function JoinRoomForm({
  onSubmit,
  onBack,
  disabled,
}: {
  onSubmit: (code: string, nickname: string) => void;
  onBack: () => void;
  disabled: boolean;
}) {
  const form = useForm<QuizJoinInput>({
    resolver: zodResolver(quizJoinSchema),
    defaultValues: { code: '', nickname: '' },
    mode: 'all',
  });

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Join Room</CardTitle>
        <CardDescription>กรอก Room Code ที่ได้จาก Host</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => onSubmit(data.code, data.nickname))} className="space-y-4">
            <FormTextField
              control={form.control}
              name="code"
              label="Room Code"
              placeholder="e.g. ABC123"
            />
            <FormTextField
              control={form.control}
              name="nickname"
              label="Nickname"
              placeholder="e.g. Bob"
            />
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={disabled || !form.formState.isValid}>
                Join
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
