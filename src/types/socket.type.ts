// ===== Chat Types (match backend chat.type.ts) =====

export type ChatUser = {
  id: string;
  nickname: string;
  joinedAt: string; // ISO string (Date serialized from server)
};

export type ChatMessage = {
  id: string;
  roomId: string;
  userId: string;
  nickname: string;
  content: string;
  timestamp: string; // ISO string
};

// Client → Server
export type ChatJoinRoomPayload = {
  roomId: string;
  nickname: string;
};

export type ChatSendMessagePayload = {
  roomId: string;
  content: string;
};

// ===== Stock Types (match backend stock.type.ts) =====

export type StockData = {
  symbol: string;
  name: string;
  price: number;
  previousPrice: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  timestamp: string; // ISO string
};

// Client → Server
export type StockSubscribePayload = {
  symbols: string[];
};

// ===== Quiz Types (match backend quiz.type.ts) =====

export const GAME_STATE = {
  LOBBY: 'LOBBY',
  COUNTDOWN: 'COUNTDOWN',
  QUESTION: 'QUESTION',
  ANSWER_REVEAL: 'ANSWER_REVEAL',
  SCOREBOARD: 'SCOREBOARD',
  FINISHED: 'FINISHED',
} as const;

export type GameState = (typeof GAME_STATE)[keyof typeof GAME_STATE];

export type QuizPlayer = {
  nickname: string;
  isHost: boolean;
};

// Server → Client
export type QuestionPayload = {
  index: number;
  total: number;
  question: string;
  choices: string[];
  timeLimit: number;
};

export type PlayerResult = {
  nickname: string;
  choiceIndex: number | null;
  isCorrect: boolean;
  scoreGained: number;
  totalScore: number;
};

export type AnswerResultPayload = {
  correctIndex: number;
  players: PlayerResult[];
};

export type ScoreboardEntry = {
  nickname: string;
  score: number;
  rank: number;
};

export type GameEndPayload = {
  scoreboard: ScoreboardEntry[];
  winner: ScoreboardEntry | null;
};

// Server → Client (room events)
export type RoomCreatedPayload = {
  code: string;
  players: QuizPlayer[];
};

export type PlayerJoinedPayload = {
  nickname: string;
  players: QuizPlayer[];
};

// ===== Socket Error =====

export type SocketErrorPayload = {
  message: string;
};
