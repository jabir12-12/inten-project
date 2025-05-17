'use client';
import React from 'react';
import Image from 'next/image';
export default function Home() {
  return (
    <div className="bg-white w-full h-screen flex flex-col">
      {/* header */}
      <div className="flex justify-between px-6 py-4 bg-white border-b border-[#EAECF0] shadow-sm items-center w-full">
        <h1 className="text-[#1D2939] font-semibold text-2xl">Stock Portfolio Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="hover:text-blue-500 transition-colors">Refresh</button>
          <div className="bg-[#EAECF0] h-6 w-[1.5px]"></div>
          <div className="relative w-6 h-6">
            <div className='flex flex-row gap-2'>
              <Image
                src="/images/Ellipse1534-2.png"
                alt="User profile"
                width={24}
                height={24}
                className="rounded-full"
              />
              <div className='flex flex-col justify-center'>
                <span className="text-[#1D2939] text-sm font-semibold">John Doe</span>
                <span className="text-[#667085] text-xs">Admin</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main content area placeholder */}
      <div className="flex-1 p-6">
        <p className="text-gray-500">Dashboard content goes here...</p>
      </div>
    </div>
  );
}