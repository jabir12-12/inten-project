'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { RefreshCw, } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { PieChart, Pie, Cell } from 'recharts';

interface PieTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
}

const pieChartData = [
  { name: "Stock A", invested: 12000, fill: "#8884d8" },
  { name: "Stock B", invested: 15000, fill: "#82ca9d" },
  { name: "Stock C", invested: 8000, fill: "#ffc658" },
  { name: "Stock D", invested: 10000, fill: "#d0ed57" },
  { name: "Stock E", invested: 6000, fill: "#a4de6c" },
  { name: "Stock F", invested: 11000, fill: "#8dd1e1" },
  { name: "Stock G", invested: 5000, fill: "#83a6ed" },
  { name: "Stock H", invested: 7000, fill: "#d88884" },
  { name: "Stock I", invested: 9000, fill: "#ca829d" },
  { name: "Stock J", invested: 4000, fill: "#658ffc" },
];

// Calculate total invested amount
const totalInvested = pieChartData.reduce((sum, stock) => sum + stock.invested, 0);

// Prepare data with percentage for Pie chart
const pieChartFormattedData = pieChartData.map((stock) => ({
  name: stock.name,
  visitors: stock.invested,
  fill: stock.fill,
  percentage: ((stock.invested / totalInvested) * 100).toFixed(2),
}));

const CustomPieTooltip: React.FC<PieTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, visitors, fill, payload: originalPayload } = payload[0];
    return (
      <div
        className="flex flex-row items-center justify-between w-52"
        style={{
          backgroundColor: "white",
          border: "1px solid #EAECF0",
          borderRadius: "8px",
          padding: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex flex-row items-center">
          <span
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: fill,
              marginRight: "8px",
            }}
          />
          <p className="flex items-center text-sm font-semibold text-[#667085]">{name}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-[0.938rem] font-semibold text-[#1D2939]">
            ₹{visitors.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-gray-400">{originalPayload.percentage}% of total</p>
        </div>
      </div>
    );
  }
  return null;
};

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
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer rounded-md px-2 py-1 hover:bg-gray-100 transition-colors">
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
        <div className='flex flex-row w-full  items-center  gap-4 justify-between'>
          <div className='flex flex-col w-1/2 gap-4 order border-gray-200 rounded-lg p-4  bg-white shadow-sm'>
            <div className='flex flex-col gap-1'>
              <h1 className="text-gray-900 font-semibold text-xl md:text-2xl">Invested value</h1>
              <span className="text-gray-500 text-sm">Note: this Analyiss is each stock u have invested in the different sector of invested value</span>
            </div>
            <ResponsiveContainer width="80%" height={400} className="flex">
              <PieChart>
                <Tooltip content={<CustomPieTooltip />} cursor={false} />
                <Pie
                  data={pieChartFormattedData}
                  dataKey="visitors"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={150}
                  stroke="#FFFFFF"
                  strokeWidth={3}
                  paddingAngle={3}
                >
                  {pieChartFormattedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className='flex flex-col w-1/2 gap-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm'>
            <div className='flex flex-col gap-1'>
              <h1 className="text-gray-900 font-semibold text-xl md:text-2xl"> Current Value</h1>
              <span className="text-gray-500 text-sm">Note: this Analyiss is each stock u have invested in the different sector current value</span>
            </div>
          </div>

        </div>

      </div>
    </div>


  );
}