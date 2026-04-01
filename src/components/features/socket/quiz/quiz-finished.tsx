'use client';

import { Button } from '@/components/ui/button';
import { QuizScoreboard } from './quiz-scoreboard';
import type { ScoreboardEntry } from '@/types/socket.type';

type QuizFinishedProps = {
  scoreboard: ScoreboardEntry[];
  winner: ScoreboardEntry | null;
  nickname: string;
  onPlayAgain: () => void;
};

export function QuizFinished({ scoreboard, winner, nickname, onPlayAgain }: QuizFinishedProps) {
  return (
    <div className="space-y-6">
      {/* Winner announcement */}
      {winner && (
        <div className="py-4 text-center">
          <p className="text-4xl">🏆</p>
          <p className="mt-2 text-xl font-bold text-foreground">{winner.nickname} wins!</p>
          <p className="text-sm text-muted-foreground">{winner.score} points</p>
        </div>
      )}

      {/* Final scoreboard */}
      <QuizScoreboard scoreboard={scoreboard} nickname={nickname} title="Final Results" />

      {/* Play again */}
      <div className="text-center">
        <Button onClick={onPlayAgain}>Play Again</Button>
      </div>
    </div>
  );
}
