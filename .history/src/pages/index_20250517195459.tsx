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

const STOCKS_LIST = ['HAL', 'GRSE', 'MSFT', 'AMZN', 'META', 'TSLA', 'NFLX', 'NVDA', 'ADBE', 'INTC'];

// Manual stock exchange info
const STOCK_EXCHANGE_MAP: Record<string, string> = {
  HAL: 'NYSE',
  GRSE: 'NYSE',
  MSFT: 'NASDAQ',
  AMZN: 'NASDAQ',
  META: 'NASDAQ',
  TSLA: 'NASDAQ',
  NFLX: 'NASDAQ',
  NVDA: 'NASDAQ',
  ADBE: 'NASDAQ',
  INTC: 'NASDAQ',
};

export default function StockDashboard() {
  const [stocks, setStocks] = useState<StockWithUserData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/route');
      const json = await res.json();
      if (json.success) {
        // Filter & add manual data and defaults for purchasePrice and quantity
        const dataWithUserFields = STOCKS_LIST.map((symbol) => {
          const stock = json.data.find((s: StockData) => s.symbol === symbol);
          return {
            symbol,
            cmp: stock ? stock.cmp : 0,
            peRatio: stock ? stock.peRatio : 0,
            earnings: stock ? stock.earnings : 0,
            purchasePrice: 0,
            quantity: 0,
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

  // Handle user input changes for purchase price and quantity
  const handleInputChange = (
    symbol: string,
    field: 'purchasePrice' | 'quantity',
    value: string
  ) => {
    const valNum = Number(value);
    setStocks((prev) =>
      prev.map((stock) =>
        stock.symbol === symbol
          ? { ...stock, [field]: isNaN(valNum) ? 0 : valNum }
          : stock
      )
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">📈 Real-Time Stock Dashboard</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 text-left text-sm sm:text-base">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border border-gray-300">Stock Name</th>
                <th className="p-2 border border-gray-300">CMP (₹)</th>
                <th className="p-2 border border-gray-300">P/E Ratio</th>
                <th className="p-2 border border-gray-300">Earnings</th>
                <th className="p-2 border border-gray-300">Purchase Price (₹)</th>
                <th className="p-2 border border-gray-300">Quantity</th>
                <th className="p-2 border border-gray-300">Investment (₹)</th>
                <th className="p-2 border border-gray-300">Present Value (₹)</th>
                <th className="p-2 border border-gray-300">Gain/Loss (₹)</th>
                <th className="p-2 border border-gray-300">Exchange</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => {
                const investment = stock.purchasePrice * stock.quantity;
                const presentValue = stock.cmp * stock.quantity;
                const gainLoss = presentValue - investment;
                return (
                  <tr key={stock.symbol} className="even:bg-gray-50">
                    <td className="p-2 border border-gray-300 font-semibold">{stock.symbol}</td>
                    <td className="p-2 border border-gray-300">₹{stock.cmp.toFixed(2)}</td>
                    <td className="p-2 border border-gray-300">{stock.peRatio.toFixed(2)}</td>
                    <td className="p-2 border border-gray-300">{stock.earnings.toFixed(2)}</td>

                    {/* User input fields */}
                    <td className="p-2 border border-gray-300">
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        value={stock.purchasePrice}
                        onChange={(e) =>
                          handleInputChange(stock.symbol, 'purchasePrice', e.target.value)
                        }
                      />
                    </td>
                    <td className="p-2 border border-gray-300">
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        value={stock.quantity}
                        onChange={(e) =>
                          handleInputChange(stock.symbol, 'quantity', e.target.value)
                        }
                      />
                    </td>

                    {/* Calculated fields */}
                    <td className="p-2 border border-gray-300">₹{investment.toFixed(2)}</td>
                    <td className="p-2 border border-gray-300">₹{presentValue.toFixed(2)}</td>
                    <td
                      className={`p-2 border border-gray-300 font-semibold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                      ₹{gainLoss.toFixed(2)}
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
