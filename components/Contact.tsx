'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SecondRobot from './SecondRobot';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Animate the title
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

    // Animate form fields
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll<HTMLInputElement>('.form-input input');
      gsap.fromTo(
        inputs,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            end: 'top 60%',
          },
        }
      );
    }
  }, []);

  return (
    <div className="relative bg-black text-white" id="contact">
      {/* Section Title */}
      <div className="pb-8 flex flex-col items-center gap-5">
        <h2
          ref={titleRef}
          className="font-general pt-16 text-sm uppercase md:text-[20px] text-white"
        >
          Contact Us for More Information
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center px-5 py-12 gap-10">
        {/* Form Section */}
        <div className="w-full md:w-1/2">
          <form ref={formRef} className="flex flex-col gap-8">
            {/* Name Field */}
            <div className="relative group form-input">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 bg-transparent border-b border-gray-500 text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </div>
            {/* Message Field */}
            <div className="relative group form-input">
              <input
                type="text"
                placeholder="Your message..."
                className="w-full px-4 py-2 bg-transparent border-b border-gray-500 text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </div>
            {/* Submit Button */}
            <Button title="Submit" id="submit-btn" containerClass="!w-full !bg-blue-500" />
          </form>
        </div>

        {/* 3D Model Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <SecondRobot />
          <div className="absolute w-[150px] h-10 bg-black right-5 bottom-5"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
