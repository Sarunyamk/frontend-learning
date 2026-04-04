'use client';

import { useEffect, useState } from 'react';

import { SOCKET_NAMESPACE, STOCK_EVENT } from '@/constants/socket.constant';
import { STOCK_SYMBOLS } from '@/constants/stock.constant';
import { useSocket } from '@/hooks/useSocket';
import { ConnectionStatus } from '@/components/features/socket/connection-status';
import { StockCard } from './stock-card';
import type { StockData, SocketErrorPayload } from '@/types/socket.type';

export function StockDashboard() {
  const { getSocket, isConnected } = useSocket(SOCKET_NAMESPACE.STOCK);
  const [stocks, setStocks] = useState<Map<string, StockData>>(new Map());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleSnapshot = (data: StockData[]) => {
      setStocks((prev) => {
        const next = new Map(prev);
        for (const stock of data) {
          next.set(stock.symbol, stock);
        }
        return next;
      });
    };

    const handleUpdate = (data: StockData) => {
      setStocks((prev) => {
        const next = new Map(prev);
        next.set(data.symbol, data);
        return next;
      });
    };

    const handleError = (data: SocketErrorPayload) => {
      setError(data.message);
    };

    socket.on(STOCK_EVENT.SNAPSHOT, handleSnapshot);
    socket.on(STOCK_EVENT.UPDATE, handleUpdate);
    socket.on(STOCK_EVENT.ERROR, handleError);

    // Subscribe ทุก symbol
    if (socket.connected) {
      socket.emit(STOCK_EVENT.SUBSCRIBE, { symbols: [...STOCK_SYMBOLS] });
    }

    socket.on('connect', () => {
      socket.emit(STOCK_EVENT.SUBSCRIBE, { symbols: [...STOCK_SYMBOLS] });
    });

    return () => {
      socket.off(STOCK_EVENT.SNAPSHOT, handleSnapshot);
      socket.off(STOCK_EVENT.UPDATE, handleUpdate);
      socket.off(STOCK_EVENT.ERROR, handleError);
    };
  }, [getSocket, isConnected]);

  return (
    <div className="space-y-4">
      <ConnectionStatus isConnected={isConnected} />

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STOCK_SYMBOLS.map((symbol) => (
          <StockCard key={symbol} stock={stocks.get(symbol) ?? null} symbol={symbol} />
        ))}
      </div>
    </div>
  );
}
