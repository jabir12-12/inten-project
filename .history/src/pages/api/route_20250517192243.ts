import type { NextApiRequest, NextApiResponse } from 'next';
import yahooFinance from 'yahoo-finance2';

const SYMBOLS = ['HAL', 'GRSE', 'MSFT', 'AMZN', 'META', 'TSLA', 'NFLX', 'NVDA', 'ADBE', 'INTC'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const quotes = await yahooFinance.quote(SYMBOLS);

        const data = (Array.isArray(quotes) ? quotes : [quotes]).map((quote) => ({
            symbol: quote.symbol,
            cmp: quote.regularMarketPrice ?? 0,
            peRatio: quote.trailingPE ?? 0,
            earnings: quote.epsTrailingTwelveMonths ?? 0,
        }));

        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: (error as Error).message });
    }
}
