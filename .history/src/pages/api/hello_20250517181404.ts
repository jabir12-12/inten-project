// /app/api/stocks/route.ts
import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

const SYMBOLS = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'META', 'TSLA', 'NFLX', 'NVDA', 'ADBE', 'INTC'];

export async function GET() {
  try {
    const quotes = await yahooFinance.quote(SYMBOLS);

    const data = (Array.isArray(quotes) ? quotes : [quotes]).map((quote) => ({
      symbol: quote.symbol,
      cmp: quote.regularMarketPrice ?? 0,
      peRatio: quote.trailingPE ?? 0,
      earnings: quote.epsTrailingTwelveMonths ?? 0,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
