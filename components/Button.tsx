'use client'; 
import { ReactNode } from 'react'

interface ButtonProps{
  title: string,
  id: string,
  leftIcon?: ReactNode  // Using ReactNode allows for any JSX element (e.g., icons)
  containerClass?: string

}


const Button = ({title, id, leftIcon, containerClass}: ButtonProps) => {
  return (
  <button id={id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-black px-7 py-3 text-white ${containerClass}`}>
   {leftIcon}
   <span className='relative inline-flex overflow-hidden font-general text-xs uppercase'>
    <div>{title}</div>
   </span>
  </button>
  )
}

export default Button
