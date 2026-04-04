// Symbols ที่ backend มี — ใช้ subscribe ตอน mount
export const STOCK_SYMBOLS = [
  'AAPL',
  'GOOGL',
  'MSFT',
  'AMZN',
  'TSLA',
  'NVDA',
] as const;

export type StockSymbol = (typeof STOCK_SYMBOLS)[number];
