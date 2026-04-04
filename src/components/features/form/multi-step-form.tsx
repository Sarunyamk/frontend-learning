'use client';

import { FormCheckboxGroup } from '@/components/shared/forms/form-checkbox-group';
import { FormRadioGroup } from '@/components/shared/forms/form-radio-group';
import { FormSelect } from '@/components/shared/forms/form-select';
import { FormTextField } from '@/components/shared/forms/form-text-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import {
  ACTIVITY_OPTIONS,
  GENDER_OPTIONS,
  ROLE_OPTIONS,
  STEP_FIELDS,
  STEPS,
} from '@/constants/form.constant';
import { StepTransition } from '@/components/shared/framer-motion/step-transition';
import {
  multiStepFormSchema,
  type MultiStepFormInput,
} from '@/lib/schemas/multi-step-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPending, startTransition] = useTransition();

  const form = useForm<MultiStepFormInput>({
    resolver: zodResolver(multiStepFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      role: undefined,
      gender: undefined,
      activities: [],
    },
    mode: 'all',
  });

  const progressValue = ((currentStep + 1) / STEPS.length) * 100;

  async function handleNext() {
    const fields = STEP_FIELDS[currentStep];
    const isValid = await form.trigger(fields);
    if (isValid) setCurrentStep((prev) => prev + 1);
  }

  function handleBack() {
    setCurrentStep((prev) => prev - 1);
  }

  function onSubmit() {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      form.reset();
      setCurrentStep(0);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            {STEPS.map((step, index) => (
              <span
                key={step.title}
                className={
                  index <= currentStep ? 'font-medium text-foreground' : ''
                }
              >
                {step.title}
              </span>
            ))}
          </div>
          <Progress value={progressValue} />
        </div>

        <StepTransition stepKey={currentStep} className="space-y-4">
          {/* Step 0: Personal Info */}
          {currentStep === 0 && (
            <>
              <FormTextField
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="John"
              />
              <FormTextField
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Doe"
              />
              <FormTextField
                control={form.control}
                name="email"
                type="email"
                label="Email"
                placeholder="john@example.com"
              />
            </>
          )}

          {/* Step 1: Address */}
          {currentStep === 1 && (
            <>
              <FormTextField
                control={form.control}
                name="address"
                label="Address"
                placeholder="123 Main St"
              />
              <FormTextField
                control={form.control}
                name="city"
                label="City"
                placeholder="New York"
              />
              <FormTextField
                control={form.control}
                name="zipCode"
                label="Zip Code"
                placeholder="10001"
              />
            </>
          )}

          {/* Step 2: Preferences */}
          {currentStep === 2 && (
            <>
              <FormSelect
                control={form.control}
                name="role"
                label="Role"
                placeholder="Select a role"
                options={ROLE_OPTIONS}
              />

              <FormRadioGroup
                control={form.control}
                name="gender"
                label="Gender"
                options={GENDER_OPTIONS}
              />

              <FormCheckboxGroup
                control={form.control}
                name="activities"
                label="Activities"
                options={ACTIVITY_OPTIONS}
              />
            </>
          )}
        </StepTransition>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
