'use client';
import React, { useEffect, useState } from 'react';

interface StockData {
  symbol: string;
  cmp: number;
  peRatio: number;
  earnings: number;
}

interface StockWithUserData extends StockData {
  purchasePrice: number;
  quantity: number;
  exchange: string;
}

const STOCKS_LIST = ['HAL', 'TOP', 'MSFT', 'AMZN', 'META', 'TSLA', 'NFLX', 'NVDA', 'ADBE', 'INTC'];

// Manual stock exchange info
const STOCK_EXCHANGE_MAP: Record<string, string> = {
  HAL: 'NYSE',
  TOP: 'NYSE',
  MSFT: 'NASDAQ',
  AMZN: 'NASDAQ',
  META: 'NASDAQ',
  TSLA: 'NASDAQ',
  NFLX: 'NASDAQ',
  NVDA: 'NASDAQ',
  ADBE: 'NASDAQ',
  INTC: 'NASDAQ',
};

// Hardcoded purchase prices for each stock
const PURCHASE_PRICE_MAP: Record<string, number> = {
  HAL: 10,
  TOP: 1,
  MSFT: 300,
  AMZN: 200,
  META: 650,
  TSLA: 350,
  NFLX: 500,
  NVDA: 120,
  ADBE: 50,
  INTC: 15,
};

// Hardcoded quantities for each stock
const QUANTITY_MAP: Record<string, number> = {
  HAL: 10,
  TOP: 5,
  MSFT: 8,
  AMZN: 2,
  META: 7,
  TSLA: 3,
  NFLX: 4,
  NVDA: 6,
  ADBE: 9,
  INTC: 12,
};

export default function StockDashboard() {
  const [stocks, setStocks] = useState<StockWithUserData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/route');
      const json = await res.json();
      if (json.success) {
        // Assign hardcoded purchasePrice and quantity values
        const dataWithUserFields = STOCKS_LIST.map((symbol) => {
          const stock = json.data.find((s: StockData) => s.symbol === symbol);
          return {
            symbol,
            cmp: stock ? stock.cmp : 0,
            peRatio: stock ? stock.peRatio : 0,
            earnings: stock ? stock.earnings : 0,
            purchasePrice: PURCHASE_PRICE_MAP[symbol] || 0,
            quantity: QUANTITY_MAP[symbol] || 0,
            exchange: STOCK_EXCHANGE_MAP[symbol] || 'Unknown',
          };
        });
        setStocks(dataWithUserFields);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">📈 Real-Time Stock Dashboard</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-[#EAECF0] text-left text-sm sm:text-base rounded-lg">
            <thead className="bg-[#F7F8FB] text-[#667085]">
              <tr>
                <th className="p-2 border border-gray-300">Stock Name</th>
                <th className="p-2 border border-gray-300">CMP ($)</th>
                <th className="p-2 border border-gray-300">P/E Ratio</th>
                <th className="p-2 border border-gray-300">Earnings</th>
                <th className="p-2 border border-gray-300">Purchase Price ($)</th>
                <th className="p-2 border border-gray-300">Quantity</th>
                <th className="p-2 border border-gray-300">Investment ($)</th>
                <th className="p-2 border border-gray-300">Present Value ($)</th>
                <th className="p-2 border border-gray-300">Gain/Loss ($)</th>
                <th className="p-2 border border-gray-300">Exchange</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => {
                const investment = stock.purchasePrice * stock.quantity;
                const presentValue = stock.cmp * stock.quantity;
                const gainLoss = presentValue - investment;
                return (
                  <tr key={stock.symbol} className="bg-white">
                    <td className="p-2 border border-gray-300 font-semibold">{stock.symbol}</td>
                    <td className="p-2 border border-gray-300">${stock.cmp.toFixed(2)}</td>
                    <td className="p-2 border border-gray-300">{stock.peRatio.toFixed(2)}</td>
                    <td className="p-2 border border-gray-300">{stock.earnings.toFixed(2)}</td>

                    {/* Display hardcoded purchasePrice and quantity as text */}
                    <td className="p-2 border border-gray-300">{stock.purchasePrice}</td>
                    <td className="p-2 border border-gray-300">{stock.quantity}</td>

                    {/* Calculated fields */}
                    <td className="p-2 border border-gray-300">${investment.toFixed(2)}</td>
                    <td className="p-2 border border-gray-300">${presentValue.toFixed(2)}</td>
                    <td
                      className={`p-2 border border-gray-300 font-semibold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                      ${gainLoss.toFixed(2)}
                    </td>

                    <td className="p-2 border border-gray-300">{stock.exchange}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
