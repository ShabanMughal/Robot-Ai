'use client';
import React from 'react'
import { GoArrowUpRight } from "react-icons/go";

const Footer = () => {
  return (
    <div className='bg-body flex justify-between items-center p-5 px-[100px]'>
      <div className=''>
        <p className='text-xl'>&copy; 2024 ReImagine. All rights reserved.</p>
      </div>
      <div className='flex gap-20'>
      <div className="relative flex flex-col items-center text-xl cursor-pointer group justify-center overflow-hidden">
          {/* Upper Layer (Default Text and Icon) */}
          <div className="group-hover:translate-y-[-100%] transition-transform duration-300 ease flex items-center space-x-2">
            <span className="font-robert ">Linkedin</span>
             <span><GoArrowUpRight /></span>
          </div>
          {/* Lower Layer (Text and Icon on Hover) */}
          <div className="absolute top-full group-hover:translate-y-[-100%] transition-transform duration-300 ease flex items-center space-x-2">
            <span className="font-robert ">Linkedin</span>
            <span><GoArrowUpRight /></span>
          </div>
        </div>
      <div className="relative flex flex-col items-center text-xl cursor-pointer group justify-center overflow-hidden">
          {/* Upper Layer (Default Text and Icon) */}
          <div className="group-hover:translate-y-[-100%] transition-transform duration-300 ease flex items-center space-x-2">
            <span className="font-robert ">Wikipedia</span>
             <span><GoArrowUpRight /></span>
          </div>
          {/* Lower Layer (Text and Icon on Hover) */}
          <div className="absolute top-full group-hover:translate-y-[-100%] transition-transform duration-300 ease flex items-center space-x-2">
            <span className="font-robert ">Wikipedia</span>
            <span><GoArrowUpRight /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
