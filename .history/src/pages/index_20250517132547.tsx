'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function Home() {

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex justify-between px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-200 shadow-sm items-center">
        <div className="flex items-center">
          <h1 className="text-gray-900 font-semibold text-xl md:text-2xl">Stock Portfolio Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden md:block hover:text-blue-600 text-gray-700 transition-colors">
            Refresh
          </button>
          <div className="hidden md:block bg-gray-200 h-6 w-px"></div>
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer rounded-md px-2 py-1 hover:bg-gray-100  transition-colors">
            <div className="h-8 w-8 md:h-10 md:w-10 overflow-hidden rounded-full border border-gray-200">
              <Image
                src="/images/Ellipse 1534 (6).svg"
                alt="User profile"
                className="h-full w-full object-cover"
                width={40}
                height={40}
              />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-gray-900 text-sm font-semibold">John Doe</span>
              <span className="text-gray-500 text-xs">Admin</span>
            </div>
            <Image
              src="/images/Frame (21).svg"
              alt="User profile"
              width={24}
              height={24}
            />
          </div>
        </div>
      </header>
    </div>
  );
}