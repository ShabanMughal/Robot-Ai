'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SecondRobot from './SecondRobot';
import Button from './Button';
import { FaLocationArrow } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const openLink = (url: string) => {
    window.open(url, "_blank");
  };
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
    <div className="relative h-full bg-blue-100 transition-colors duration-500 pb-10" id="contact">
      {/* Section Title */}
      <div className="flex flex-col items-center gap-5">
        <h2
          ref={titleRef}
          className="font-general pt-16 text-sm uppercase md:text-[20px]"
        >
          Contact Our AI Team
        </h2>
      </div>

      {/* Subtitle Section */}
      <div className="px-10 pt-10 text-center">
        <p className="text-4xl font-robert-medium">
          Let AI <span className="bg-gradient-to-r from-[#4795E4] to-[#3ABAD7] bg-clip-text text-transparent">Empower</span> Your Vision
        </p>
        <p className="font-circular-web text-lg opacity-75 mt-10">
          Engage with us to explore the boundless possibilities of AI integration. Whether it’s{' '}
          <strong>custom solutions</strong>, <strong>real-time problem solving</strong>, or{' '}
          <strong>cutting-edge innovation</strong>, our team is here to collaborate and create.
        </p>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row items-center justify-center px-5 py-12 gap-10 md:gap-16">
        {/* Left Section: Contact Details */}
        <div className="w-full md:w-1/2 space-y-6 px-16 pt-5">
          <h1 className="text-5xl font-bold font-robert text-gray-800">Connect with <span className="bg-gradient-to-r from-[#4795E4] to-[#3ABAD7] bg-clip-text text-transparent">Us</span></h1>
          <p className="text-lg text-gray-600 pb-10">
            Have questions or need detailed information? Feel free to reach out to us through email or our chatbot.
          </p>
          {/* Mailto Button */}
          <a
            href="mailto:thandermughal@gmail.com?subject=Inquiry&body=Hello, I would like to know more about your services."
          >
          <Button title={'Send Email'} id={'contact-btn'} leftIcon={<FaLocationArrow /> } containerClass='!w-[250px] hover:scale-105 !h-[50px]' />
       
          </a>
          {/* Social Media Links */}
          <div className="flex justify-center gap-5 items-center">
            <div className="relative flex flex-col items-center text-xl cursor-pointer group justify-center overflow-hidden text-blue-400" onClick={() => openLink("https://www.linkedin.com/in/shaban-mughal-27386a2a9/")}>
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
            <div className="relative flex flex-col items-center text-xl cursor-pointer group justify-center overflow-hidden text-blue-400"  onClick={() => openLink("https://x.com/Thandermughalyt")}>
                      {/* Upper Layer (Default Text and Icon) */}
                      <div className="group-hover:translate-y-[-100%] transition-transform duration-300 ease flex items-center space-x-2">
                        <span className="font-robert ">Twitter</span>
                         <span><GoArrowUpRight /></span>
                      </div>
                      {/* Lower Layer (Text and Icon on Hover) */}
                      <div className="absolute top-full group-hover:translate-y-[-100%] transition-transform duration-300 ease flex items-center space-x-2" >
                        <span className="font-robert ">Twitter</span>
                        <span><GoArrowUpRight /></span>
                      </div>
                    </div>
            <div className="relative flex flex-col items-center text-xl cursor-pointer group justify-center overflow-hidden text-blue-400"  onClick={() => openLink("https://github.com/ShabanMughal")}>
                      {/* Upper Layer (Default Text and Icon) */}
                      <div className="group-hover:translate-y-[-100%] transition-transform duration-300 ease flex items-center space-x-2">
                        <span className="font-robert ">Github</span>
                         <span><GoArrowUpRight /></span>
                      </div>
                      {/* Lower Layer (Text and Icon on Hover) */}
                      <div className="absolute top-full group-hover:translate-y-[-100%] transition-transform duration-300 ease flex items-center space-x-2">
                        <span className="font-robert ">Github</span>
                        <span><GoArrowUpRight /></span>
                      </div>
                    </div>
          </div>
        </div>

        {/* Right Section: 3D Model */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <SecondRobot />
          <div className="absolute w-[150px] h-10 bg-blue-100 right-5 bottom-5"></div>
        </div>
      </div>

      {/* Extra Content: Why Contact Us */}
      <div className="bg-white rounded-lg shadow-md px-6 py-8 mt-10 mx-5 md:mx-[200px]">
        <h3 className="text-2xl font-semibold text-center text-gray-800">Why Reach Out?</h3>
        <p className="mt-4 text-center text-gray-600">
          Our team of experts is dedicated to providing cutting-edge solutions. Whether you're curious about our AI capabilities, need assistance with our services, or want to collaborate on a groundbreaking project, we're here to help.
        </p>
      </div>
    </div>
  );
};

export default Contact;
