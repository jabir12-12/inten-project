'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { RefreshCw } from "lucide-react";
import PieChartComponent from './components/piechart';
import BarChartComponent from './components/barchart';
import { Column, useTable } from "react-table";

// Interface for stock data coming from backend
interface StockData {
  symbol: string;
  cmp: number;
  peRatio: number;
  earnings: number;
}

// Extended interface for our portfolio data
interface PortfolioStock extends StockData {
  stockName: string;
  purchasePrice: number;
  quantity: number;
  nseBse: string;
  investment: number;
  presentValue: number;
  gainLoss: number;
  portfolioPercent: string;
  latestEarnings: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState<PortfolioStock[]>([]);
  const [investedValue, setInvestedValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  // Fetch data from backend
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/portfolio');
      const data = await response.json();

      // Process the data
      const processedData = processPortfolioData(data);
      setPortfolioData(processedData);

      // Calculate total values
      const totalInvested = processedData.reduce((sum, stock) => sum + stock.investment, 0);
      const totalCurrent = processedData.reduce((sum, stock) => sum + stock.presentValue, 0);

      setInvestedValue(totalInvested);
      setCurrentValue(totalCurrent);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Process the raw data from the backend
  const processPortfolioData = (data: any[]): PortfolioStock[] => {
    const totalInvestment = data.reduce(
      (sum, stock) => sum + (stock.purchasePrice * stock.quantity || 0),
      0
    );

    return data.map((stock) => {
      const investment = stock.purchasePrice * stock.quantity;
      const presentValue = stock.cmp * stock.quantity;
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
  };

  // Calculate gain/loss metrics
  const gainLoss = currentValue - investedValue;
  const isGain = gainLoss >= 0;
  const gainLossText = `₹${Math.abs(gainLoss).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  })}`;

  // Table columns configuration
  const columns = useMemo<Column<PortfolioStock>[]>(
    () => [
      {
        Header: "Stock Name",
        accessor: "stockName",
      },
      {
        Header: "Purchase Price (₹)",
        accessor: "purchasePrice",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Investment",
        accessor: "investment",
        Cell: ({ value }: { value: number }) => (
          `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
        ),
      },
      {
        Header: "Portfolio (%)",
        accessor: "portfolioPercent",
      },
      {
        Header: "NSE/BSE",
        accessor: "nseBse",
      },
      {
        Header: "CMP",
        accessor: "cmp",
        Cell: ({ value }: { value: number }) => (
          `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
        ),
      },
      {
        Header: "Present Value",
        accessor: "presentValue",
        Cell: ({ value }: { value: number }) => (
          `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
        ),
      },
      {
        Header: "Gain/Loss",
        accessor: "gainLoss",
        Cell: ({ value }: { value: number }) => (
          <span style={{ color: value >= 0 ? "green" : "red" }}>
            ₹{value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        ),
      },
      {
        Header: "P/E Ratio",
        accessor: "peRatio",
      },
      {
        Header: "Latest Earnings",
        accessor: "latestEarnings",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: portfolioData });

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex justify-between px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-200 shadow-sm items-center">
        <div className="flex items-center">
          <h1 className="text-gray-900 font-semibold text-xl md:text-2xl">Stock Portfolio Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={fetchPortfolioData}
            className="flex items-center text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md gap-2 cursor-pointer"
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

      {/* Main Body */}
      <div className="flex-1 px-4 py-6 overflow-auto flex flex-col gap-6 md:px-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <>
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
                  {isGain ? "+" : "-"}{gainLossText}
                </span>
              </button>

              {/* Portfolio Percentage */}
              <button className="flex flex-1 min-w-[240px] p-4 flex-col gap-2 border border-gray-200 rounded-lg bg-white transition-all duration-300 ease-in-out hover:shadow-[0_4px_20px_rgba(255,182,193,0.5)] hover:border-[#D6BBFB] hover:scale-[1.03] active:scale-[0.98]">
                <span className="text-gray-500 text-sm">Total Portfolio Percentage</span>
                <span className={`text-2xl font-semibold ${isGain ? 'text-green-600' : 'text-red-600'}`}>
                  {isGain ? "+" : ""}{((gainLoss / investedValue) * 100).toFixed(2)}%
                </span>
              </button>
            </div>

            {portfolioData.length === 0 && !loading && (
              <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow">
                <div className="text-center">
                  <p className="text-xl text-gray-600">No portfolio data available</p>
                  <button
                    onClick={fetchPortfolioData}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}