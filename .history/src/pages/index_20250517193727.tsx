"use client";

import React, { useState, useEffect } from "react";

interface PortfolioStock {
  stockName: string;
  purchasePrice: number;
  quantity: number;
  nseBse: string;
  cmp?: number;
  peRatio?: number;
  latestEarnings?: number | string;
  investment?: number;
  presentValue?: number;
  gainLoss?: number;
  portfolioPercent?: string;
}

const baseDummyData: PortfolioStock[] = [
  { stockName: "Reliance Industries", purchasePrice: 2500, quantity: 10, nseBse: "NSE" },
  { stockName: "Tata Motors", purchasePrice: 450, quantity: 15, nseBse: "BSE" },
  { stockName: "Infosys", purchasePrice: 1400, quantity: 20, nseBse: "NSE" },
  { stockName: "HDFC Bank", purchasePrice: 1500, quantity: 12, nseBse: "BSE" },
  { stockName: "ICICI Bank", purchasePrice: 700, quantity: 18, nseBse: "NSE" },
  { stockName: "Wipro", purchasePrice: 400, quantity: 25, nseBse: "NSE" },
  { stockName: "L&T", purchasePrice: 2000, quantity: 8, nseBse: "BSE" },
  { stockName: "Maruti Suzuki", purchasePrice: 8000, quantity: 5, nseBse: "NSE" },
  { stockName: "Axis Bank", purchasePrice: 650, quantity: 22, nseBse: "BSE" },
  { stockName: "Bharti Airtel", purchasePrice: 600, quantity: 30, nseBse: "NSE" },
];

export default function Home() {
  const [stockData, setStockData] = useState<PortfolioStock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/stocks");
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const backendStocks: { symbol: string; cmp: number; peRatio: number; earnings: number }[] =
          await res.json();

        const updated = baseDummyData.map((item) => {
          const backendMatch = backendStocks.find(
            (b) => b.symbol.toLowerCase() === item.stockName.toLowerCase()
          );

          return {
            ...item,
            cmp: backendMatch?.cmp ?? 0,
            peRatio: backendMatch?.peRatio ?? 0,
            latestEarnings: backendMatch?.earnings ?? "N/A",
          };
        });

        setStockData(updated);
      } catch (err: any) {
        setError(err.message || "Failed to fetch stock data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-gray-600">Loading data...</div>;
  }

  if (error) {
    return (
      <div className="p-6 max-w-md mx-auto mt-10 bg-red-100 border border-red-400 text-red-700 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong.</h2>
        <p className="mb-4">{error}</p>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
          onClick={() => {
            setError(null);
            setLoading(true);
            setStockData([]);
            // Trigger re-fetch:
            fetch("/api/stocks")
              .then(async (res) => {
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                const backendStocks = await res.json();
                const updated = baseDummyData.map((item) => {
                  const backendMatch = backendStocks.find(
                    (b: any) => b.symbol.toLowerCase() === item.stockName.toLowerCase()
                  );
                  return {
                    ...item,
                    cmp: backendMatch?.cmp ?? 0,
                    peRatio: backendMatch?.peRatio ?? 0,
                    latestEarnings: backendMatch?.earnings ?? "N/A",
                  };
                });
                setStockData(updated);
                setLoading(false);
              })
              .catch((e) => {
                setError(e.message);
                setLoading(false);
              });
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const totalInvestment = stockData.reduce(
    (sum, stock) => sum + stock.purchasePrice * stock.quantity,
    0
  );

  const dataWithCalculations = stockData.map((stock) => {
    const investment = stock.purchasePrice * stock.quantity;
    const presentValue = (stock.cmp ?? 0) * stock.quantity;
    const gainLoss = presentValue - investment;
    const portfolioPercent = (investment / totalInvestment) * 100;

    return {
      ...stock,
      investment,
      presentValue,
      gainLoss,
      portfolioPercent: portfolioPercent.toFixed(2) + "%",
    };
  });

  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Stock Name</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Purchase Price</th>
            <th className="border border-gray-300 px-4 py-2 text-right">CMP</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Quantity</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Investment</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Present Value</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Gain/Loss</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Portfolio %</th>
            <th className="border border-gray-300 px-4 py-2 text-left">NSE/BSE</th>
            <th className="border border-gray-300 px-4 py-2 text-right">PE Ratio</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Latest Earnings</th>
          </tr>
        </thead>
        <tbody>
          {dataWithCalculations.map((stock, idx) => (
            <tr key={idx} className="even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{stock.stockName}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{stock.purchasePrice.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{stock.cmp?.toFixed(2) ?? "N/A"}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{stock.quantity}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{stock.investment?.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{stock.presentValue?.toFixed(2)}</td>
              <td
                className="border border-gray-300 px-4 py-2 text-right"
                style={{ color: stock.gainLoss && stock.gainLoss >= 0 ? "green" : "red" }}
              >
                {stock.gainLoss?.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right">{stock.portfolioPercent}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.nseBse}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{stock.peRatio?.toFixed(2) ?? "N/A"}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{stock.latestEarnings ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
