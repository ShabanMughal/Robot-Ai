'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Robot from './Robot'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import Navbar from './Navbar'

const Hero = () => {
  const marqueeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const marqueeElement = marqueeRef.current
    if (marqueeElement) {
      marqueeElement.innerHTML += marqueeElement.innerHTML
      const contentWidth = marqueeElement.scrollWidth / 2

      gsap.fromTo(
        '#marquee',
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 4.5,
          ease: 'power4.out',
        }
      )

      gsap.fromTo(
        '#hero',
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          delay: 4,
          ease: 'power4.out',
        }
      )

      gsap.delayedCall(6, () => {
        gsap.to(marqueeElement, {
          x: -contentWidth,
          duration: contentWidth / 100, // Dynamic duration
          repeat: -1,
          ease: 'linear',
        })
      })
    }
  }, [])

  return (
    <div className="relative h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 overflow-hidden">
      <Navbar />
      <Robot />

      <div className="absolute left-0 top-36" id="hero">
        <div className="px-5 sm:px-10">
          <h1 className="special-font hero-heading text-blue-200">
            reim<b>a</b>gine
          </h1>
          <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
            Discover AI-powered robotics <br /> Shape the future{' '}
          </p>
          <Button
            id="download-app"
            title="Download App"
            leftIcon={<TiLocationArrow aria-label="Location Icon" />}
            containerClass="flex-center gap-1 hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* Marquee container */}
      <div
        id="marquee"
        className="absolute bottom-0 w-full h-20 bg-black overflow-hidden"
      >
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap text-gray-300 tracking-wide uppercase font-zentry text-[3rem] italic"
        >
          <span className="mx-6">Building Tomorrow&apos;s R<b>o</b>bots</span>
          <span className="mx-6">Innovate with Robo-AI</span>
          <span className="mx-6">Automation for the Future</span>
          <span className="mx-6">Experience Next-Gen Robotics</span>
        </div>
      </div>
    </div>
  )
}

export default Hero
