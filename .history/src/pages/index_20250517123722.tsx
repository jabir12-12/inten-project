import React from 'react';
import Image from 'next/image';
export default function Home() {
  return (
    <div className='bg-white w-screen h-screen flex flex-col'>
      {/* header */}
      <div className='  justify-between px-6 py-4 bg-white border-b border-[#EAECF0] shadow-2xl -border-bottom flex flex-row items-center'>
        <h1 className='text-[#1D2939] font-semibold text-2xl'>Stock Portfolio Dashboard</h1>
        <div className='flex flex-row items-center gap-4'>
          <h1>Refresh</h1>
          <div className='bg-[#EAECF0] h-2 w-1'></div>
          <Image
            src='/images/Ellipse 1534 (6).svg'
            alt='notification'
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
}
