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
      const res = await fetch('/api/stocks');
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
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📈 Real-Time Stock Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border text-left text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Symbol</th>
              <th className="p-2 border">CMP (₹)</th>
              <th className="p-2 border">P/E Ratio</th>
              <th className="p-2 border">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.symbol}>
                <td className="p-2 border">{stock.symbol}</td>
                <td className="p-2 border">₹{stock.cmp}</td>
                <td className="p-2 border">{stock.peRatio}</td>
                <td className="p-2 border">{stock.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
