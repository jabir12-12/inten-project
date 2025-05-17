'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sample stock data
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 198.45, change: 2.31, changePercent: 1.18 },
    { symbol: 'MSFT', name: 'Microsoft Corp', price: 415.28, change: -3.42, changePercent: -0.82 },
    { symbol: 'AMZN', name: 'Amazon.com', price: 180.76, change: 1.53, changePercent: 0.85 },
    { symbol: 'GOOGL', name: 'Alphabet Inc', price: 177.12, change: 0.89, changePercent: 0.51 },
    { symbol: 'META', name: 'Meta Platforms', price: 493.56, change: 5.23, changePercent: 1.07 },
  ];

  // Sample portfolio summary data
  const portfolioSummary = {
    totalValue: 152487.35,
    dailyChange: 1243.86,
    dailyChangePercent: 0.82,
    allocation: [
      { category: 'Technology', percentage: 45 },
      { category: 'Healthcare', percentage: 20 },
      { category: 'Consumer Goods', percentage: 15 },
      { category: 'Financial', percentage: 12 },
      { category: 'Other', percentage: 8 },
    ]
  };

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

      {/* Mobile sidebar menu */}
      <div className={`md:hidden fixed inset-0 z-20 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={() => setIsMenuOpen(false)}></div>
        <div className="relative bg-white w-64 h-full shadow-xl flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-gray-900 font-medium">John Doe</p>
                <p className="text-gray-500 text-sm">Admin</p>
              </div>
            </div>
            <button onClick={() => setIsMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
            <a href="#" className="flex items-center px-4 py-3 text-gray-900 bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Portfolio
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Analytics
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </a>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 overflow-y-auto h-screen">
          <nav className="mt-6">
            <a href="#" className="flex items-center px-4 py-3 text-gray-900 bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Portfolio
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Analytics
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </a>
          </nav>
        </aside>

        {/* Dashboard content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* Portfolio summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-sm font-medium text-gray-500 mb-2">Total Portfolio Value</h2>
              <p className="text-2xl font-bold text-gray-900">${portfolioSummary.totalValue.toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-sm font-medium text-gray-500 mb-2">Daily Change</h2>
              <p className={`text-2xl font-bold ${portfolioSummary.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(portfolioSummary.dailyChange).toLocaleString()}
                <span className="text-base ml-1">
                  ({portfolioSummary.dailyChange >= 0 ? '+' : '-'}{Math.abs(portfolioSummary.dailyChangePercent).toFixed(2)}%)
                </span>
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-sm font-medium text-gray-500 mb-2">Top Performing</h2>
              <p className="text-2xl font-bold text-gray-900">AAPL</p>
              <p className="text-sm text-green-600">+1.18% today</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-sm font-medium text-gray-500 mb-2">Worst Performing</h2>
              <p className="text-2xl font-bold text-gray-900">MSFT</p>
              <p className="text-sm text-red-600">-0.82% today</p>
            </div>
          </div>

          {/* Stock holdings */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Stock Holdings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Symbol</th>
                    <th className="px-6 py-3 text-left">Company</th>
                    <th className="px-6 py-3 text-right">Current Price</th>
                    <th className="px-6 py-3 text-right">Daily Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stocks.map((stock) => (
                    <tr key={stock.symbol} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{stock.symbol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{stock.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-right">${stock.price.toFixed(2)}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-right ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Portfolio allocation */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Portfolio Allocation</h2>
            </div>
            <div className="p-4">
              <div className="mb-4">
                {portfolioSummary.allocation.map((item) => (
                  <div key={item.category} className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.category}</span>
                      <span className="text-gray-700">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}