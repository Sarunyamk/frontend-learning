'use client';

import { loginAction } from '@/app/features/next-auth/login/actions';
import { FormTextField } from '@/components/forms/form-text-field';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { MOCK_USERS } from '@/constants/next-auth.constant';
import { loginSchema, type LoginInput } from '@/lib/schemas/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

export function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'all',
  });

  function onSubmit(data: LoginInput) {
    startTransition(async () => {
      const result = await loginAction(data);
      if (!result.success) {
        form.setError('root', { message: result.error });
        return;
      }
    });
  }

  function fillCredentials(email: string, password: string) {
    form.setValue('email', email, { shouldValidate: true });
    form.setValue('password', password, { shouldValidate: true });
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>Login to access protected features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mock credentials helper */}
        <div className="space-y-2 rounded-lg border border-dashed border-muted-foreground/30 p-3">
          <p className="text-xs font-medium text-muted-foreground">
            Demo Credentials (click to fill)
          </p>
          <div className="flex flex-wrap gap-2">
            {MOCK_USERS.map((user) => (
              <Button
                key={user.id}
                type="button"
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => fillCredentials(user.email, user.password)}
              >
                {user.name} ({user.role})
              </Button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {form.formState.errors.root && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Login form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormTextField
              control={form.control}
              name="email"
              label="Email"
              placeholder="admin@test.com"
              type="email"
            />
            <FormTextField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter password"
              type="password"
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
