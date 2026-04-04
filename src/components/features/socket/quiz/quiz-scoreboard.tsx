'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ScoreboardEntry } from '@/types/socket.type';

const RANK_STYLES: Record<number, string> = {
  1: 'text-yellow-500',
  2: 'text-gray-400',
  3: 'text-amber-700',
};

const RANK_BADGES: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
};

type QuizScoreboardProps = {
  scoreboard: ScoreboardEntry[];
  nickname: string;
  title?: string;
};

export function QuizScoreboard({ scoreboard, nickname, title = 'Scoreboard' }: QuizScoreboardProps) {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {scoreboard.map((entry) => {
            const rankStyle = RANK_STYLES[entry.rank] ?? 'text-muted-foreground';
            const badge = RANK_BADGES[entry.rank] ?? `#${entry.rank}`;
            const isMe = entry.nickname === nickname;

            return (
              <li
                key={entry.nickname}
                className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                  isMe ? 'bg-primary/10' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-lg ${rankStyle}`}>{badge}</span>
                  <span className={`text-sm ${isMe ? 'font-bold' : ''}`}>
                    {entry.nickname}
                    {isMe && <span className="ml-1 text-xs text-muted-foreground">(you)</span>}
                  </span>
                </div>
                <span className="font-mono text-sm font-semibold">{entry.score} pts</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
