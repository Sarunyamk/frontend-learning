'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { SOCKET_NAMESPACE, QUIZ_EVENT } from '@/constants/socket.constant';
import { useSocket } from '@/hooks/useSocket';
import { ConnectionStatus } from '@/components/features/socket/connection-status';
import { QuizEntry } from './quiz-entry';
import { QuizLobby } from './quiz-lobby';
import { QuizCountdown } from './quiz-countdown';
import { QuizQuestion } from './quiz-question';
import { QuizAnswerResult } from './quiz-answer-result';
import { QuizScoreboard } from './quiz-scoreboard';
import { QuizFinished } from './quiz-finished';
import type {
  QuizPlayer,
  RoomCreatedPayload,
  PlayerJoinedPayload,
  SocketErrorPayload,
  QuestionPayload,
  AnswerResultPayload,
  ScoreboardEntry,
  GameEndPayload,
} from '@/types/socket.type';

// UI states for the quiz flow
type QuizPhase = 'ENTRY' | 'LOBBY' | 'COUNTDOWN' | 'QUESTION' | 'ANSWER_REVEAL' | 'SCOREBOARD' | 'FINISHED';

type QuizUIState = {
  phase: QuizPhase;
  roomCode: string;
  nickname: string;
  isHost: boolean;
  players: QuizPlayer[];
  countdownSeconds: number;
  question: QuestionPayload | null;
  selectedChoice: number | null;
  answerResult: AnswerResultPayload | null;
  scoreboard: ScoreboardEntry[];
  winner: ScoreboardEntry | null;
};

const INITIAL_STATE: QuizUIState = {
  phase: 'ENTRY',
  roomCode: '',
  nickname: '',
  isHost: false,
  players: [],
  countdownSeconds: 0,
  question: null,
  selectedChoice: null,
  answerResult: null,
  scoreboard: [],
  winner: null,
};

export function QuizContainer() {
  const { getSocket, isConnected } = useSocket(SOCKET_NAMESPACE.QUIZ);
  const [state, setState] = useState<QuizUIState>(INITIAL_STATE);
  const [error, setError] = useState<string | null>(null);

  // Ref to store pending nickname (written in event handler, read in socket callback)
  const pendingNicknameRef = useRef('');
  const pendingIsHostRef = useRef(false);

  // Listen for socket events
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleRoomCreated = (data: RoomCreatedPayload) => {
      setState((prev) => ({
        ...prev,
        phase: 'LOBBY',
        roomCode: data.code,
        players: data.players,
        isHost: pendingIsHostRef.current,
        nickname: pendingNicknameRef.current,
      }));
    };

    const handlePlayerJoined = (data: PlayerJoinedPayload) => {
      setState((prev) => {
        // If still in ENTRY, this means I just joined someone else's room
        if (prev.phase === 'ENTRY') {
          return {
            ...prev,
            phase: 'LOBBY',
            players: data.players,
            isHost: false,
            nickname: pendingNicknameRef.current,
          };
        }
        return { ...prev, players: data.players };
      });
    };

    const handlePlayerLeft = (data: { nickname: string }) => {
      setState((prev) => ({
        ...prev,
        players: prev.players.filter((p) => p.nickname !== data.nickname),
      }));
    };

    const handleCountdown = (data: { seconds: number }) => {
      setState((prev) => ({ ...prev, phase: 'COUNTDOWN', countdownSeconds: data.seconds }));
    };

    const handleQuestion = (data: QuestionPayload) => {
      setState((prev) => ({ ...prev, phase: 'QUESTION', question: data, selectedChoice: null }));
    };

    const handleAnswerResult = (data: AnswerResultPayload) => {
      setState((prev) => ({ ...prev, phase: 'ANSWER_REVEAL', answerResult: data }));
    };

    const handleScoreboard = (data: ScoreboardEntry[]) => {
      setState((prev) => ({ ...prev, phase: 'SCOREBOARD', scoreboard: data }));
    };

    const handleGameEnd = (data: GameEndPayload) => {
      setState((prev) => ({
        ...prev,
        phase: 'FINISHED',
        scoreboard: data.scoreboard,
        winner: data.winner,
      }));
    };

    const handleError = (data: SocketErrorPayload) => {
      setError(data.message);
    };

    socket.on(QUIZ_EVENT.ROOM_CREATED, handleRoomCreated);
    socket.on(QUIZ_EVENT.PLAYER_JOINED, handlePlayerJoined);
    socket.on(QUIZ_EVENT.PLAYER_LEFT, handlePlayerLeft);
    socket.on(QUIZ_EVENT.COUNTDOWN, handleCountdown);
    socket.on(QUIZ_EVENT.QUESTION, handleQuestion);
    socket.on(QUIZ_EVENT.ANSWER_RESULT, handleAnswerResult);
    socket.on(QUIZ_EVENT.SCOREBOARD, handleScoreboard);
    socket.on(QUIZ_EVENT.GAME_END, handleGameEnd);
    socket.on(QUIZ_EVENT.ERROR, handleError);

    return () => {
      socket.off(QUIZ_EVENT.ROOM_CREATED, handleRoomCreated);
      socket.off(QUIZ_EVENT.PLAYER_JOINED, handlePlayerJoined);
      socket.off(QUIZ_EVENT.PLAYER_LEFT, handlePlayerLeft);
      socket.off(QUIZ_EVENT.COUNTDOWN, handleCountdown);
      socket.off(QUIZ_EVENT.QUESTION, handleQuestion);
      socket.off(QUIZ_EVENT.ANSWER_RESULT, handleAnswerResult);
      socket.off(QUIZ_EVENT.SCOREBOARD, handleScoreboard);
      socket.off(QUIZ_EVENT.GAME_END, handleGameEnd);
      socket.off(QUIZ_EVENT.ERROR, handleError);
    };
  }, [getSocket, isConnected]);

  const handleCreate = useCallback((nickname: string) => {
    const socket = getSocket();
    if (!socket) return;
    setError(null);
    pendingNicknameRef.current = nickname;
    pendingIsHostRef.current = true;
    socket.emit(QUIZ_EVENT.CREATE_ROOM, { nickname });
  }, [getSocket]);

  const handleJoin = useCallback((code: string, nickname: string) => {
    const socket = getSocket();
    if (!socket) return;
    setError(null);
    pendingNicknameRef.current = nickname;
    pendingIsHostRef.current = false;
    socket.emit(QUIZ_EVENT.JOIN_ROOM, { code, nickname });
  }, [getSocket]);

  const handleStartGame = useCallback(() => {
    const socket = getSocket();
    if (!socket) return;
    setError(null);
    socket.emit(QUIZ_EVENT.START_GAME);
  }, [getSocket]);

  const handleSubmitAnswer = useCallback((choiceIndex: number) => {
    const socket = getSocket();
    if (!socket) return;
    setState((prev) => ({ ...prev, selectedChoice: choiceIndex }));
    socket.emit(QUIZ_EVENT.SUBMIT_ANSWER, { choiceIndex });
  }, [getSocket]);

  const handleLeave = useCallback(() => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit(QUIZ_EVENT.LEAVE_ROOM);
    setState(INITIAL_STATE);
    setError(null);
  }, [getSocket]);

  const handlePlayAgain = useCallback(() => {
    setState(INITIAL_STATE);
    setError(null);
  }, []);

  return (
    <div className="space-y-4">
      <ConnectionStatus isConnected={isConnected} />

      {error && <p className="text-sm text-destructive">{error}</p>}

      {state.phase === 'ENTRY' && (
        <QuizEntry
          onCreateRoom={handleCreate}
          onJoinRoom={handleJoin}
          disabled={!isConnected}
        />
      )}

      {state.phase === 'LOBBY' && (
        <QuizLobby
          roomCode={state.roomCode}
          players={state.players}
          isHost={state.isHost}
          onStart={handleStartGame}
          onLeave={handleLeave}
        />
      )}

      {state.phase === 'COUNTDOWN' && (
        <QuizCountdown seconds={state.countdownSeconds} />
      )}

      {state.phase === 'QUESTION' && state.question && (
        <QuizQuestion
          question={state.question}
          selectedChoice={state.selectedChoice}
          onSubmitAnswer={handleSubmitAnswer}
        />
      )}

      {state.phase === 'ANSWER_REVEAL' && state.answerResult && state.question && (
        <QuizAnswerResult
          result={state.answerResult}
          nickname={state.nickname}
          choices={state.question.choices}
        />
      )}

      {state.phase === 'SCOREBOARD' && (
        <QuizScoreboard
          scoreboard={state.scoreboard}
          nickname={state.nickname}
        />
      )}

      {state.phase === 'FINISHED' && (
        <QuizFinished
          scoreboard={state.scoreboard}
          winner={state.winner}
          nickname={state.nickname}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}
