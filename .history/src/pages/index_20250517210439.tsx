'use client';
import { Spinner } from "@heroui/spinner";
import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { RefreshCw, } from "lucide-react";
import PieChartComponent from './components/piechart';
import BarChartComponent from './components/barchart';
import { toast, ToastContainer } from 'react-toastify';
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
  const investedValue = 11000;
  const currentValue = 9000;

  const gainLoss = currentValue - investedValue;
  const isGain = gainLoss >= 0;
  // this convert the text into Indian Rupee format
  const gainLossText = `₹${gainLoss.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  })}`;
  const fetchData = async (fromButton = false) => {
    setLoading(true); // optional: show loader on manual refresh
    try {
      const res = await fetch('/api/route');
      const json = await res.json();
      if (json.success) {
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
        if (fromButton) toast.success('Data is up to date!');
      } else {
        if (fromButton) toast.error('Failed to fetch data.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      if (fromButton) toast.error('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // called without true → no toast
    const interval = setInterval(() => fetchData(), 15000); // again, no toast
    return () => clearInterval(interval);
  }, []);

  return (


    <div className="bg-gray-50 min-h-screen flex flex-col ">
      {/* Header */}
      <header className="sticky top-0 z-10 flex justify-between px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-200 shadow-sm items-center">
        <div className="flex items-center">
          <h1 className="text-gray-900 font-semibold text-xl md:text-2xl">Stock Portfolio Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => fetchData(true)}
            className="flex items-center  text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md gap-2 cursor-pointer"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
          <div className="hidden md:block bg-gray-200 h-6 w-px"></div>
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer rounded-md px-2 py-1 hover:bg-[#E9E0FF] transition-colors">
            {/* Avatar: always visible */}
            <div className="h-8 w-8 md:h-10 md:w-10 overflow-hidden rounded-full border border-gray-200 shrink-0">
              <Image
                src="/images/Ellipse 1534 (6).svg"
                alt="User profile"
                className="h-full w-full object-cover"
                width={40}
                height={40}
              />
            </div>
            {/* Name and Role: hidden on small screens */}
            <div className="hidden md:flex flex-col min-w-[80px]">
              <span className="text-gray-900 text-sm font-semibold truncate">John Doe</span>
              <span className="text-gray-500 text-xs truncate">Admin</span>
            </div>
            {/* Dropdown Icon: visible always, aligned nicely */}
            <div className="flex items-center justify-center h-5 w-5">
              <Image
                src="/images/Frame (21).svg"
                alt="Dropdown icon"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </header>
      {/* Main  Body */}

      <div className="flex-1 px-4 py-6 overflow-auto flex flex-col gap-6 md:px-6">
        <div className="flex flex-wrap gap-4 justify-between">
          {/* Total Invested Value */}
          <button className="flex flex-1 min-w-[240px] p-4 flex-col gap-2 border border-gray-200 rounded-lg bg-white transition-all duration-300 ease-in-out hover:shadow-[0_4px_20px_rgba(255,182,193,0.5)] hover:border-[#D6BBFB] hover:scale-[1.03] active:scale-[0.98]">
            <span className="text-gray-500 text-sm">Total Invested Value</span>
            <span className="text-gray-900 text-2xl font-semibold">
              ₹{investedValue.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </span>
          </button>

          {/* Current Value */}
          <button className="flex flex-1 min-w-[240px] p-4 flex-col gap-2 border border-gray-200 rounded-lg bg-white transition-all duration-300 ease-in-out hover:shadow-[0_4px_20px_rgba(255,182,193,0.5)] hover:border-[#D6BBFB] hover:scale-[1.03] active:scale-[0.98]">
            <span className="text-gray-500 text-sm">Current Value</span>
            <span className="text-gray-900 text-2xl font-semibold">
              ₹{currentValue.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </span>
          </button>

          {/* Total Gain/Loss */}
          <button className="flex flex-1 min-w-[240px] p-4 flex-col gap-2 border border-gray-200 rounded-lg bg-white transition-all duration-300 ease-in-out hover:shadow-[0_4px_20px_rgba(255,182,193,0.5)] hover:border-[#D6BBFB] hover:scale-[1.03] active:scale-[0.98]">
            <span className="text-gray-500 text-sm">Total Gains/Loss Value</span>
            <span
              className={`text-2xl font-semibold ${isGain ? "text-green-600" : "text-red-500"}`}
            >
              {gainLossText}
            </span>
          </button>

          {/* Portfolio Percentage (optional placeholder) */}
          <button className="flex flex-1 min-w-[240px] p-4 flex-col gap-2 border border-gray-200 rounded-lg bg-white transition-all duration-300 ease-in-out hover:shadow-[0_4px_20px_rgba(255,182,193,0.5)] hover:border-[#D6BBFB] hover:scale-[1.03] active:scale-[0.98]">
            <span className="text-gray-500 text-sm">Total Portfolio Percentage</span>
            <span className={`text-2xl font-semibold ${currentValue >= investedValue ? 'text-green-600' : 'text-red-600'}`}>
              {((currentValue - investedValue) / investedValue * 100).toFixed(2)}%
            </span>
          </button>
        </div>
        <PieChartComponent />
        <div className="p-4 sm:p-6">
          {loading ? (
            <Spinner classNames={{ label: "text-foreground mt-4" }} label="Lande" variant="spinner" color="secondary" />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-[#EAECF0] text-left text-sm sm:text-base rounded-lg">
                <thead className="bg-[#F7F8FB] text-[#667085]">
                  <tr>
                    <th className="p-2 border border-gray-300">Stock Name</th>
                    <th className="p-2 border border-gray-300">Exchange</th>
                    <th className="p-2 border border-gray-300">Purchase Price ($)</th>
                    <th className="p-2 border border-gray-300">Quantity</th>
                    <th className="p-2 border border-gray-300">Investment ($)</th>
                    <th className="p-2 border border-gray-300">CMP ($)</th>
                    <th className="p-2 border border-gray-300">Present Value ($)</th>
                    <th className="p-2 border border-gray-300">Gain/Loss ($)</th>
                    <th className="p-2 border border-gray-300">P/E Ratio</th>
                    <th className="p-2 border border-gray-300">Earnings</th>
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
                        <td className="p-2 border border-gray-300">{stock.exchange}</td>
                        <td className="p-2 border border-gray-300">{stock.purchasePrice}</td>
                        <td className="p-2 border border-gray-300">{stock.quantity}</td>
                        <td className="p-2 border border-gray-300">${investment.toFixed(2)}</td>
                        <td className="p-2 border border-gray-300">${stock.cmp.toFixed(2)}</td>
                        <td className="p-2 border border-gray-300">${presentValue.toFixed(2)}</td>
                        <td
                          className={`p-2 border border-gray-300 font-semibold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                          ${gainLoss.toFixed(2)}
                        </td>
                        <td className="p-2 border border-gray-300">{stock.peRatio.toFixed(2)}</td>
                        <td className="p-2 border border-gray-300">{stock.earnings.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
          )}
        </div>
        <BarChartComponent />
      </div>
      <ToastContainer />
    </div>

  );
}