import type { NextApiRequest, NextApiResponse } from 'next';
import yahooFinance from 'yahoo-finance2';

// ✅ Top 10 Indian Defense Stocks (NSE Tickers)
const SYMBOLS = [
    'BEL.NS',        // Bharat Electronics Ltd.
    'HAL.NS',        // Hindustan Aeronautics Ltd.
    'BDL.NS',        // Bharat Dynamics Ltd.
    'MAZDOCK.NS',    // Mazagon Dock Shipbuilders Ltd.
    'COCHINSHIP.NS', // Cochin Shipyard Ltd.
    'MIDHANI.NS',    // Mishra Dhatu Nigam Ltd.
    'SOLARINDS.NS',  // Solar Industries India Ltd.
    'ASTRAMICRO.NS', // Astra Microwave Products Ltd.
    'MTARTECH.NS',   // MTAR Technologies Ltd.
    'PARAS.NS'       // Paras Defence and Space Technologies Ltd.
];

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
