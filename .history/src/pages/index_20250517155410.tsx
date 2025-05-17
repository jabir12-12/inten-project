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

const Investedvalue = [
  { name: "Tata Motors", sector: "Automobile", visitors: 100000, percentage: 10, fill: "#FF6384" },
  { name: "Reliance", sector: "Energy", visitors: 150000, percentage: 15, fill: "#36A2EB" },
  { name: "Infosys", sector: "IT", visitors: 200000, percentage: 20, fill: "#FFCE56" },
  { name: "HDFC", sector: "Finance", visitors: 80000, percentage: 8, fill: "#4BC0C0" },
  { name: "ITC", sector: "FMCG", visitors: 120000, percentage: 12, fill: "#9966FF" },
  { name: "Airtel", sector: "Telecom", visitors: 70000, percentage: 7, fill: "#FF9F40" },
  { name: "Maruti", sector: "Automobile", visitors: 130000, percentage: 13, fill: "#FFCD56" },
  { name: "ICICI", sector: "Finance", visitors: 60000, percentage: 6, fill: "#4D5360" },
  { name: "Asian Paints", sector: "Chemicals", visitors: 90000, percentage: 9, fill: "#C9CBCF" },
  { name: "SBI", sector: "Finance", visitors: 90000, percentage: 9, fill: "#B2FF66" },
];




// Calculate total invested amount
const totalInvested = Investedvalue.reduce((sum, stock) => sum + stock.visitors, 0);

// Prepare data with percentage for Pie chart
const pieChartFormattedData = Investedvalue.map((stock) => ({
  name: stock.name,
  visitors: stock.visitors,
  fill: stock.fill,
  percentage: ((stock.visitors / totalInvested) * 100).toFixed(2),
}));

const CustomPieTooltip: React.FC<PieTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const {
      name,
      value,
      payload: { fill, visitors },
    } = payload[0];

    return (
      <div
        className="flex flex-row items-center justify-between w-40"
        style={{
          backgroundColor: 'white',
          border: '1px solid #EAECF0',
          borderRadius: '8px',
          padding: '10px',
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div className="flex flex-row items-center">
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: fill,
            marginRight: '8px'
          }} />
          <p className="flex items-center text-sm font-semibold text-[#667085]">{name}</p>
        </div>
        <p className="text-[0.938rem] font-semibold text-[#1D2939]">
          ₹{(visitors ?? value ?? 0).toLocaleString("en-IN")}
        </p>
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
  const barChartData = [
    {
      name: "Finance",
      invested: 200000,
      current: 240000, // green
    },
    {
      name: "Auto",
      invested: 180000,
      current: 160000, // red
    },
    {
      name: "IT",
      invested: 220000,
      current: 250000, // green
    },
    {
      name: "FMCG",
      invested: 150000,
      current: 150000, // same (neutral)
    },
    {
      name: "Telecom",
      invested: 170000,
      current: 165000, // red
    },
  ];


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
              <h1 className="text-gray-900 font-semibold text-xl md:text-2xl">Invested Value</h1>
              <span className="text-gray-500 text-sm">
                Note: This analysis shows each stock you have invested in, categorized by different sectors of your invested value.
              </span>
            </div>
            <ResponsiveContainer width="50%" height={300} className="flex">
              <PieChart>
                <Tooltip content={<CustomPieTooltip />} cursor={false} />
                <Pie
                  data={pieChartFormattedData}
                  dataKey="visitors"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={120}
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
              <h1 className="text-gray-900 font-semibold text-xl md:text-2xl">Current Value</h1>
              <span className="text-gray-500 text-sm">
                Note: This analysis shows the current value of each stock you have invested in, categorized by different sectors of your current value.
              </span>
            </div>
            <ResponsiveContainer width="50%" height={300} className="flex">
              <PieChart>
                <Tooltip content={<CustomPieTooltip />} cursor={false} />
                <Pie
                  data={pieChartFormattedData}
                  dataKey="visitors"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={120}
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
        </div>
        <div className='flex flex-col gap-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm '>
          <h1 className="text-gray-900 font-semibold text-xl md:text-2xl">Invested Value by Sector</h1>
          <ResponsiveContainer width="90%" height={300}>
            <BarChart
              data={barChartData}
              barGap={5}
              barCategoryGap="30%"
              margin={{ right: 20, left: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
              <XAxis
                dataKey="name"
                fontFamily="poppins"
                fontSize={14}
                fontWeight={400}
                fill="#667085"
              />
              <YAxis
                domain={[0, 'dataMax']}
                fontFamily="poppins"
                fontSize={14}
                fontWeight={400}
                fill="#667085"
              />
              <Tooltip
                formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`}
              />
              <Legend wrapperStyle={{ display: 'none' }} />

              {/* Invested: Always Gray */}
              <Bar dataKey="invested" name="Invested" fill="#9012FF" barSize={20} />

              {/* Current: Dynamic Color */}
              <Bar
                dataKey="current"
                name="Current Value"
                barSize={20}
                fill="#1D2939"
                shape={(props: any) => {
                  const { x, y, width, height, payload } = props;
                  const fill = payload.current >= payload.invested ? "#17B26A" : "#F04438";
                  return <rect x={x} y={y} width={width} height={height} fill={fill} />;
                }}
              />

              {/* Gain/Loss: Difference Bar */}
              <Bar
                dataKey={(entry) => Math.abs(entry.current - entry.invested)}
                name="Gain/Loss"
                barSize={20}
                shape={(props: any) => {
                  const { x, y, width, height, payload } = props;
                  const fill = payload.current >= payload.invested ? "#17B26A" : "#F04438";
                  return <rect x={x} y={y} width={width} height={height} fill={fill} />;
                }}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>


      </div>
    </div>


  );
}