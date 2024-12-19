"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Robot from "./Robot";
import Button from "./Button";
import { GoArrowUpRight } from "react-icons/go";

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  const handleModelLoad = () => {
    setTimeout(() => {
      setLoading(false); 
    }, 300);
  };

  useEffect(() => {
    const marqueeElement = marqueeRef.current;

    if (loading) return; // Avoid running animation when still loading

    if (marqueeElement) {
      marqueeElement.innerHTML += marqueeElement.innerHTML;
      const contentWidth = marqueeElement.scrollWidth / 2;

      gsap.fromTo(
        "#marquee",
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 3,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        "#hero",
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          delay: 2, 
          ease: "power4.out",
        }
      );

      gsap.delayedCall(5, () => {
        gsap.to(marqueeElement, {
          x: -contentWidth,
          duration: contentWidth / 100,
          repeat: -1,
          ease: "linear",
        });
      });
    }
  }, [loading]);

  return (
    <div className="relative h-screen overflow-hidden bg-white transition-colors duration-500">
      {loading && (
        <div className="h-screen w-screen absolute bg-gradient-to-r from-blue-100 to-green-100 inset-0 flex justify-center items-center z-50">
          <div className="loader"></div> {/* Full-screen loader */}
        </div>
      )}
      <Robot onLoad={handleModelLoad} /> {/* Pass the onLoad handler to Robot */}

      {!loading && (
        <div className="absolute left-0 bottom-36 md:top-36" id="hero">
          <div className="px-5 sm:px-10">
          <h1 className="special-font hero-heading">
  reim<b>a</b>gi<b>n</b>e
</h1>
            <p className="mb-5 max-w-64 font-robert-regular">
              Discover AI-powered robotics <br /> Shape the future of automation.
            </p>
            <Button
              id="explore-ai"
              title="Explore AI"
              leftIcon={<GoArrowUpRight aria-label="Arrow Icon" />}
              containerClass="flex-center gap-1 hover:scale-105 transition-transform"
            />
          </div>
        </div>
      )}

      {/* Marquee container */}
      <div
        id="marquee"
        className="absolute bottom-0 w-full h-20 bg-slate-100 overflow-hidden transition-colors duration-500"
      >
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap transition-colors opacity-75 duration-500 tracking-wide uppercase font-zentry text-[3rem] italic"
        >
          <span className="mx-6">
            Building Tomorrow&apos;s R<b>o</b>bots
          </span>
          <span className="mx-6">Innovate with Robo-AI</span>
          <span className="mx-6">Automation for the Future</span>
          <span className="mx-6">Experience Next-Gen Robotics</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
