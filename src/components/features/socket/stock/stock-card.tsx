'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { StockData } from '@/types/socket.type';

type StockCardProps = {
  stock: StockData | null;
  symbol: string;
};

export function StockCard({ stock, symbol }: StockCardProps) {
  // Loading state
  if (!stock) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {symbol}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-8 w-24 animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    );
  }

  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const arrow = isPositive ? '▲' : '▼';

  // Flash: ใช้ previousPrice จาก backend + CSS animation
  // key = timestamp ทำให้ animation restart ทุกครั้งที่ราคาเปลี่ยน
  const priceUp = stock.price > stock.previousPrice;
  const priceDown = stock.price < stock.previousPrice;
  const flashClass = priceUp
    ? 'animate-flash-green'
    : priceDown
      ? 'animate-flash-red'
      : '';

  return (
    <Card key={stock.timestamp} className={flashClass}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {stock.symbol}
          </CardTitle>
          <span className="text-xs text-muted-foreground">{stock.name}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Price */}
        <p className="text-2xl font-bold tabular-nums text-foreground">
          ${stock.price.toFixed(2)}
        </p>

        {/* Change */}
        <div className={`flex items-center gap-2 text-sm font-medium ${changeColor}`}>
          <span>{arrow}</span>
          <span>{Math.abs(stock.change).toFixed(2)}</span>
          <span>({Math.abs(stock.changePercent).toFixed(2)}%)</span>
        </div>

        {/* High / Low */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>H: ${stock.high.toFixed(2)}</span>
          <span>L: ${stock.low.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
