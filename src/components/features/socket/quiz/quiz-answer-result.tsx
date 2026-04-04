'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AnswerResultPayload } from '@/types/socket.type';

type QuizAnswerResultProps = {
  result: AnswerResultPayload;
  nickname: string;
  choices: string[];
};

export function QuizAnswerResult({ result, nickname, choices }: QuizAnswerResultProps) {
  const myResult = result.players.find((p) => p.nickname === nickname);

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center">
          {myResult?.isCorrect ? 'Correct!' : 'Wrong!'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Correct answer */}
        <div className="rounded-lg bg-green-500/10 p-3 text-center">
          <p className="text-xs text-muted-foreground">Correct answer</p>
          <p className="font-semibold text-green-600">
            {choices[result.correctIndex]}
          </p>
        </div>

        {/* My score */}
        {myResult && (
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">
              +{myResult.scoreGained}
            </p>
            <p className="text-sm text-muted-foreground">
              Total: {myResult.totalScore} pts
            </p>
          </div>
        )}

        {/* All players results */}
        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">Results</h3>
          <ul className="space-y-1">
            {result.players.map((player) => (
              <li key={player.nickname} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={player.isCorrect ? 'text-green-600' : 'text-red-600'}>
                    {player.isCorrect ? '✓' : '✗'}
                  </span>
                  <span className={player.nickname === nickname ? 'font-semibold' : ''}>
                    {player.nickname}
                  </span>
                </div>
                <span className="text-muted-foreground">+{player.scoreGained}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
