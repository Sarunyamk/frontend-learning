'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { QuizPlayer } from '@/types/socket.type';

type QuizLobbyProps = {
  roomCode: string;
  players: QuizPlayer[];
  isHost: boolean;
  onStart: () => void;
  onLeave: () => void;
};

export function QuizLobby({ roomCode, players, isHost, onStart, onLeave }: QuizLobbyProps) {
  const canStart = isHost && players.length >= 2;

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Room Code</CardTitle>
        <p className="font-mono text-4xl font-bold tracking-widest text-primary">
          {roomCode}
        </p>
        <p className="text-sm text-muted-foreground">
          แชร์ Room Code นี้ให้เพื่อน (เปิด tab ใหม่แล้ว Join)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Player list */}
        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">
            Players ({players.length}/8)
          </h3>
          <ul className="space-y-1">
            {players.map((player) => (
              <li key={player.nickname} className="flex items-center gap-2 text-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                <span>{player.nickname}</span>
                {player.isHost && (
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                    Host
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          {isHost ? (
            <Button className="w-full" onClick={onStart} disabled={!canStart}>
              {canStart ? 'Start Game' : `Need ${2 - players.length} more player(s)`}
            </Button>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              Waiting for host to start the game...
            </p>
          )}
          <Button variant="outline" className="w-full" onClick={onLeave}>
            Leave Room
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
