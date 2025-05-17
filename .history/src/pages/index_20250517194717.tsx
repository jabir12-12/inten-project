'use client';
import React, { useEffect, useState } from 'react';

interface StockData {
  symbol: string;
  cmp: number;
  peRatio: number;
  earnings: number;
}

export default function StockDashboard() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/route');
      const json = await res.json();
      if (json.success) {
        setStocks(json.data);
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
          <table className="min-w-full table-auto border border-gray-300 text-left text-sm sm:text-base">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border border-gray-300">Symbol</th>
                <th className="p-2 border border-gray-300">CMP (₹)</th>
                <th className="p-2 border border-gray-300">P/E Ratio</th>
                <th className="p-2 border border-gray-300">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.symbol} className="even:bg-gray-50">
                  <td className="p-2 border border-gray-300">{stock.symbol}</td>
                  <td className="p-2 border border-gray-300">₹{stock.cmp}</td>
                  <td className="p-2 border border-gray-300">{stock.peRatio}</td>
                  <td className="p-2 border border-gray-300">{stock.earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

  );
}