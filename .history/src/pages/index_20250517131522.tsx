'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex justify-between px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-200 shadow-sm items-center">
        <div className="flex items-center">
          <button
            className="md:hidden mr-3 text-gray-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-gray-900 font-semibold text-xl md:text-2xl">Stock Portfolio Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden md:block hover:text-blue-600 text-gray-700 transition-colors">
            Refresh
          </button>
          <div className="hidden md:block bg-gray-200 h-6 w-px"></div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 overflow-hidden rounded-full border border-gray-200">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-gray-900 text-sm font-semibold">John Doe</span>
              <span className="text-gray-500 text-xs">Admin</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}