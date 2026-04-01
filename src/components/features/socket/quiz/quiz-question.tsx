'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { QuestionPayload } from '@/types/socket.type';

const CHOICE_COLORS = [
  'bg-red-500 hover:bg-red-600 text-white',
  'bg-blue-500 hover:bg-blue-600 text-white',
  'bg-yellow-500 hover:bg-yellow-600 text-white',
  'bg-green-500 hover:bg-green-600 text-white',
] as const;

type QuizQuestionProps = {
  question: QuestionPayload;
  selectedChoice: number | null;
  onSubmitAnswer: (choiceIndex: number) => void;
};

export function QuizQuestion({ question, selectedChoice, onSubmitAnswer }: QuizQuestionProps) {
  return (
    <QuizQuestionInner
      key={question.index}
      question={question}
      selectedChoice={selectedChoice}
      onSubmitAnswer={onSubmitAnswer}
    />
  );
}

/** Inner component — key={question.index} resets state when question changes */
function QuizQuestionInner({ question, selectedChoice, onSubmitAnswer }: QuizQuestionProps) {
  const [timeLeft, setTimeLeft] = useState(question.timeLimit);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = (timeLeft / question.timeLimit) * 100;
  const hasAnswered = selectedChoice !== null;

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader className="space-y-3">
        {/* Timer bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Question {question.index + 1}/{question.total}</span>
            <span>{timeLeft}s</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Question text */}
        <CardTitle className="text-lg leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Choices grid 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          {question.choices.map((choice, index) => {
            const isSelected = selectedChoice === index;
            const colorClass = CHOICE_COLORS[index % CHOICE_COLORS.length];

            return (
              <Button
                key={index}
                onClick={() => onSubmitAnswer(index)}
                disabled={hasAnswered}
                className={`h-auto min-h-16 whitespace-normal p-4 text-sm font-medium ${
                  isSelected
                    ? 'ring-4 ring-foreground/50'
                    : hasAnswered
                      ? 'opacity-50'
                      : ''
                } ${colorClass}`}
              >
                {choice}
              </Button>
            );
          })}
        </div>

        {hasAnswered && (
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Answer submitted! Waiting for others...
          </p>
        )}
      </CardContent>
    </Card>
  );
}
