'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { clientEnv } from '@/lib/env/env.client';
import type { SocketNamespace } from '@/constants/socket.constant';

type UseSocketReturn = {
  /** ดึง socket instance ผ่าน function — ใช้ใน event handler / useEffect เท่านั้น */
  getSocket: () => Socket | null;
  isConnected: boolean;
};

/**
 * Reusable hook สำหรับ connect Socket.io namespace
 *
 * - auto-connect เมื่อ mount
 * - auto-disconnect เมื่อ unmount
 * - track connection status
 *
 * @example
 * ```tsx
 * const { getSocket, isConnected } = useSocket(SOCKET_NAMESPACE.CHAT);
 *
 * useEffect(() => {
 *   const socket = getSocket();
 *   if (!socket) return;
 *   socket.on('chat:message', (data) => { ... });
 *   return () => { socket.off('chat:message'); };
 * }, [getSocket, isConnected]);
 * ```
 */
export function useSocket(namespace: SocketNamespace): UseSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(`${clientEnv.NEXT_PUBLIC_SOCKET_URL}${namespace}`, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [namespace]);

  const getSocket = useCallback(() => socketRef.current, []);

  return { getSocket, isConnected };
}
