'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SecondRobot from './SecondRobot';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <div className="relative h-full bg-gradient-to-r from-blue-100 to-green-100 transition-colors duration-500" id="contact">
      {/* Section Title */}
      <div className="md:pb-8 flex flex-col items-center gap-5">
        <h2
          ref={titleRef}
          className="font-general pt-16 text-sm uppercase md:text-[20px] text-center"
        >
          Contact Us for More Information
        </h2>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row items-center justify-center px-5 py-12 gap-2 md:gap-10">
        <div className="w-full md:w-1/2 text-center">
          <h1 className="text-2xl font-bold">Connect with us</h1>
          <p className="mt-4 text-lg">Have questions or need more information? Click the button below to send us an email.</p>
          
          {/* Mailto Button */}
          <a
            href="mailto:your-email@example.com?subject=Inquiry&body=Hello, I would like to know more about your services."
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all"
          >
            Send Email
          </a>
        </div>

        {/* 3D Model Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <SecondRobot />
          <div className="absolute w-[150px] h-10 bg-gradient-to-r from-blue-100 to-green-100 right-5 bottom-5"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
