'use client';

import { useEffect, useState } from 'react';

import { SOCKET_NAMESPACE } from '@/constants/socket.constant';
import { CHAT_EVENT } from '@/constants/socket.constant';
import { useSocket } from '@/hooks/useSocket';
import { ConnectionStatus } from '@/components/features/socket/connection-status';
import { NicknameForm } from './nickname-form';
import { MessageList } from './message-list';
import { MessageInput } from './message-input';
import { UserList } from './user-list';
import type { ChatMessage, SocketErrorPayload } from '@/types/socket.type';

type ChatUser = {
  id: string;
  nickname: string;
};

type JoinedState = {
  roomId: string;
  nickname: string;
};

export function ChatRoom() {
  const { getSocket, isConnected } = useSocket(SOCKET_NAMESPACE.CHAT);
  const [joined, setJoined] = useState<JoinedState | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [socketId, setSocketId] = useState<string | null>(null);

  // Listen for socket events
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleMessage = (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleUserJoined = (data: { userId: string; nickname: string }) => {
      // Add system message
      setMessages((prev) => [
        ...prev,
        {
          id: `sys_${Date.now()}`,
          roomId: '',
          userId: 'system',
          nickname: 'System',
          content: `${data.nickname} joined the room`,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    const handleUserLeft = (data: { userId: string; nickname: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `sys_${Date.now()}`,
          roomId: '',
          userId: 'system',
          nickname: 'System',
          content: `${data.nickname} left the room`,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    const handleRoomUsers = (userList: ChatUser[]) => {
      setUsers(userList);
    };

    const handleError = (data: SocketErrorPayload) => {
      setError(data.message);
    };

    const handleConnect = () => {
      setSocketId(socket.id ?? null);
    };

    socket.on(CHAT_EVENT.MESSAGE, handleMessage);
    socket.on(CHAT_EVENT.USER_JOINED, handleUserJoined);
    socket.on(CHAT_EVENT.USER_LEFT, handleUserLeft);
    socket.on(CHAT_EVENT.ROOM_USERS, handleRoomUsers);
    socket.on(CHAT_EVENT.ERROR, handleError);
    socket.on('connect', handleConnect);

    // If already connected, set socket ID immediately
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off(CHAT_EVENT.MESSAGE, handleMessage);
      socket.off(CHAT_EVENT.USER_JOINED, handleUserJoined);
      socket.off(CHAT_EVENT.USER_LEFT, handleUserLeft);
      socket.off(CHAT_EVENT.ROOM_USERS, handleRoomUsers);
      socket.off(CHAT_EVENT.ERROR, handleError);
      socket.off('connect', handleConnect);
    };
  }, [getSocket, isConnected]);

  const handleJoin = (roomId: string, nickname: string) => {
    const socket = getSocket();
    if (!socket) return;

    setError(null);
    socket.emit(CHAT_EVENT.JOIN_ROOM, { roomId, nickname });
    setJoined({ roomId, nickname });
  };

  const handleSendMessage = (content: string) => {
    const socket = getSocket();
    if (!socket || !joined) return;

    socket.emit(CHAT_EVENT.SEND_MESSAGE, {
      roomId: joined.roomId,
      content,
    });
  };

  const handleLeave = () => {
    const socket = getSocket();
    if (!socket || !joined) return;

    socket.emit(CHAT_EVENT.LEAVE_ROOM, { roomId: joined.roomId });
    setJoined(null);
    setMessages([]);
    setUsers([]);
  };

  // Not joined yet — show nickname form
  if (!joined) {
    return (
      <div className="space-y-4">
        <ConnectionStatus isConnected={isConnected} />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        <NicknameForm onJoin={handleJoin} disabled={!isConnected} />
      </div>
    );
  }

  // Joined — show chat UI
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ConnectionStatus isConnected={isConnected} />
          <span className="text-sm text-muted-foreground">
            Room: <span className="font-mono font-semibold text-foreground">{joined.roomId}</span>
          </span>
        </div>
        <button
          onClick={handleLeave}
          className="text-sm text-muted-foreground underline hover:text-foreground"
        >
          Leave Room
        </button>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <div className="flex gap-4">
        {/* Messages area */}
        <div className="flex h-180 flex-1 flex-col rounded-lg border">
          <MessageList messages={messages} currentUserId={socketId} />
          <MessageInput onSend={handleSendMessage} disabled={!isConnected} />
        </div>

        {/* User list sidebar */}
        <UserList users={users} currentUserId={socketId} />
      </div>
    </div>
  );
}
