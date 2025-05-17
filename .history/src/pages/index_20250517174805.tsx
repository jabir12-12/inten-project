'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { RefreshCw, } from "lucide-react";
import PieChartComponent from './components/piechart';
import BarChartComponent from './components/barchart';
import { Column, useTable } from "react-table";

const dummyData = [
  {
    stockName: "Reliance Industries",
    purchasePrice: 2500,
    quantity: 10,
    nseBse: "NSE",
    cmp: 2700,
    peRatio: 25,
    latestEarnings: "Q1 2025",
  },
  {
    stockName: "Tata Motors",
    purchasePrice: 450,
    quantity: 15,
    nseBse: "BSE",
    cmp: 470,
    peRatio: 30,
    latestEarnings: "Q4 2024",
  },
  {
    stockName: "Infosys",
    purchasePrice: 1400,
    quantity: 20,
    nseBse: "NSE",
    cmp: 1500,
    peRatio: 28,
    latestEarnings: "Q1 2025",
  },
  {
    stockName: "HDFC Bank",
    purchasePrice: 1500,
    quantity: 12,
    nseBse: "BSE",
    cmp: 1600,
    peRatio: 22,
    latestEarnings: "Q4 2024",
  },
  {
    stockName: "ICICI Bank",
    purchasePrice: 700,
    quantity: 18,
    nseBse: "NSE",
    cmp: 720,
    peRatio: 24,
    latestEarnings: "Q1 2025",
  },
  {
    stockName: "Wipro",
    purchasePrice: 400,
    quantity: 25,
    nseBse: "NSE",
    cmp: 420,
    peRatio: 20,
    latestEarnings: "Q4 2024",
  },
  {
    stockName: "L&T",
    purchasePrice: 2000,
    quantity: 8,
    nseBse: "BSE",
    cmp: 2100,
    peRatio: 26,
    latestEarnings: "Q1 2025",
  },
  {
    stockName: "Maruti Suzuki",
    purchasePrice: 7000,
    quantity: 5,
    nseBse: "NSE",
    cmp: 7100,
    peRatio: 35,
    latestEarnings: "Q4 2024",
  },
  {
    stockName: "Axis Bank",
    purchasePrice: 650,
    quantity: 22,
    nseBse: "BSE",
    cmp: 670,
    peRatio: 27,
    latestEarnings: "Q1 2025",
  },
  {
    stockName: "Bharti Airtel",
    purchasePrice: 600,
    quantity: 30,
    nseBse: "NSE",
    cmp: 620,
    peRatio: 18,
    latestEarnings: "Q4 2024",
  },
];

// Calculate Investment, Present Value, Gain/Loss, and Portfolio % inside table data

export default function Home() {

  const [loading, setLoading] = useState(false)
  const investedValue = 11000;
  const currentValue = 9000;

  const gainLoss = currentValue - investedValue;
  const isGain = gainLoss >= 0;
  // this convert the text into Indian Rupee format
  const gainLossText = `₹${gainLoss.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  })}`;
  const totalInvestment = dummyData.reduce(
    (sum, stock) => sum + stock.purchasePrice * stock.quantity,
    0
  );

  const data = useMemo(() => {
    return dummyData.map((stock) => {
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
  }, [totalInvestment]);

  type TableDataType = {
    stockName: string;
    purchasePrice: number;
    quantity: number;
    investment: number;
    portfolioPercent: string;
    nseBse: string;
    cmp: number;
    presentValue: number;
    gainLoss: number;
    peRatio: number;
    latestEarnings: string;
  }

  const columns = useMemo<Column<TableDataType>[]>(
    () => [
      {
        Header: "Particulars (Stock Name)",
        accessor: "stockName",
      },
      {
        Header: "Purchase Price (₹)",
        accessor: "purchasePrice",
      },
      {
        Header: "Quantity (Qty)",
        accessor: "quantity",
      },
      {
        Header: "Investment (₹)",
        accessor: "investment",
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
        Header: "CMP (₹)",
        accessor: "cmp",
      },
      {
        Header: "Present Value (₹)",
        accessor: "presentValue",
      },
      {
        Header: "Gain/Loss (₹)",
        accessor: "gainLoss",
        Cell: ({ value }: { value: number }) => (
          <span style={{ color: value >= 0 ? "green" : "red" }}>
            {value.toFixed(2)}
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
  } = useTable({ columns, data });

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex justify-between px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-200 shadow-sm items-center">
        <div className="flex items-center">
          <h1 className="text-gray-900 font-semibold text-xl md:text-2xl">Stock Portfolio Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setLoading(true)}
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
              className={`text-2xl font-semibold ${isGain ? "text-green-600" : "text-red-500"
                }`}
            >
              {gainLossText}
            </span>
          </button>

          {/* Portfolio Percentage (optional placeholder) */}
          <button className="flex flex-1 min-w-[240px] p-4 flex-col gap-2 border border-gray-200 rounded-lg bg-white transition-all duration-300 ease-in-out hover:shadow-[0_4px_20px_rgba(255,182,193,0.5)] hover:border-[#D6BBFB] hover:scale-[1.03] active:scale-[0.98]">
            <span className="text-gray-500 text-sm">Total Portfolio Percentage</span>
            <span className={`text-2xl font-semibold ${currentValue >= investedValue ? 'text-green-600' : 'text-red-600'}`}>
              {(((currentValue - investedValue) / investedValue) * 100).toFixed(2)}%
            </span>
          </button>
        </div>
        <PieChartComponent />
        {/* React table */}
        <div className="overflow-x-auto rounded-lg bg-white text-[#667085] p-4 shadow">
          <table
            {...getTableProps()}
            className="min-w-full border-collapse"
            style={{ borderSpacing: 0 }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="text-left border-b border-gray-300 bg-[#F7F8FB]"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="py-2 px-4 text-sm md:text-base font-semibold"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="border-b border-gray-300 hover:bg-gray-100"
                    style={{ backgroundColor: "#F7F8FB", borderRadius: "0.5rem" }}
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="py-2 px-4 text-sm md:text-base"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <BarChartComponent />
      </div>
    </div>


  );
}