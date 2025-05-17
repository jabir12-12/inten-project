'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { RefreshCw, } from "lucide-react";
export default function Home() {
  const [loading, setLoading] = useState(false)

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
      <div className="flex-1 px-4 py-6">
        <div className="flex flex-wrap gap-4 justify-between">
          {[
            "Total Invested Value",
            "Current Value",
            "Total Gains/Loss Value",
            "Total Portfolio Percentage"
          ].map((label, index) => (
            <button
              key={index}
              className="flex flex-1 min-w-[240px] p-4 flex-col gap-2 border border-gray-200 rounded-lg bg-white 
                       transition-all duration-300 ease-in-out
                             hover:shadow-[0_0_0_4px_rgba(158,119,237,0.12),0_1px_2px_0_rgba(16,24,40,0.05)]
                        hover:border-[#D6BBFB]
                       hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="text-gray-500 text-sm">{label}</span>
              <span className="text-gray-900 text-2xl font-semibold">
                $12,345.67
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>


  );
}