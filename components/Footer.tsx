'use client';
import React from 'react'
import Button from './Button';

const Footer = () => {
  return (
    <div className='bg-white flex justify-between items-center p-5 px-[100px]'>
      <div className=''>
        <p className='text-xl'>&copy; 2024 ReImagine. All rights reserved.</p>
      </div>
      <div className='flex gap-20'>
      <form action="" className='flex gap-5'>
      <div className="relative group form-input">
              <input
                type="text"
                placeholder="Your email for newsletter"
                className="w-[20vw] px-4 py-2 bg-transparent border-b border-gray-500 dark:text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </div>

            <Button title="Submit" id="submit-btn" />
      </form>
      </div>
    </div>
  )
}

export default Footer
