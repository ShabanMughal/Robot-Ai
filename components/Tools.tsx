'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaGithub, FaGoogle, FaApple, FaMicrosoft, FaAmazon, FaRobot, FaBrain, FaCode, FaCar, FaHospital, FaShoppingCart, FaGamepad, FaUniversity, FaMoneyBill, FaCamera, FaMusic, FaCloud, FaSlack } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

type AnimateCardProps = {
  icon: React.ReactNode,
  platform: string,
  containerClass?: string,
};
const AnimCard: React.FC<AnimateCardProps>=({ icon, platform, containerClass})=>{

  return(
    <>
   <div className={`relative w-[200px] h-[350px] cursor-pointer bg-zinc-500 rounded-lg flex flex-col justify-center items-center py-5 group overflow-hidden ${containerClass}`}>
  {/* Background */}
  <div className="absolute inset-0 bg-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

  {/* Heading */}
  <h2 className="absolute top-[-50px] text-white font-bold group-hover:top-5 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
  Build together with
  </h2>

  {/* Icon */}
  <div className="text-5xl text-white z-10">
  {icon}
  </div>

  {/* Paragraph */}
  <p className="absolute bottom-[-50px] text-white font-bold group-hover:bottom-5 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
   {platform}
  </p>
  
</div>    
    </>
  )
}

const Tools: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const motionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    const motionElement = motionRef.current;
    const cardsElement = cardsRef.current;
    
    if (motionElement && cardsElement) {
      const cardsHeight = cardsElement.offsetHeight;
  
      // Pin the "Developers in Motion" div until halfway through the cards section
      ScrollTrigger.create({
        trigger: cardsElement,
        start: 'top center', 
        end: `top+=${(cardsHeight / 2) -50}`,
        pin: motionElement, 
        pinSpacing: false,
        scrub: true, 
      });
  
      // Fade out the motion element
      gsap.to(motionElement, {
        opacity: 0, 
        duration: 1,
        filter: "blur(10px)",
        scrollTrigger: {
          trigger: cardsElement,
          start: "top 30%", 
          end: "top top",
          scrub: true,
        },
      });
    }
  }, []);

  useEffect(() => {

    const pinElements = document.querySelectorAll('.trigger');
    const pinElements2 = document.querySelectorAll('.trigger-2');


    console.log('Pin elements:', pinElements);

    pinElements.forEach((pinElement) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: pinElement, // Element to trigger the scroll animation
          start: 'top 10%', // Start the animation when 40% of the page has been scrolled
          end: '+=260', // Scroll through a distance of 800px
          pin: pinElement, // Pin the element
          pinSpacing: false, // Allow space for the pinned element
          scrub: 1, 
        },
      })
    });
    pinElements2.forEach((pinElement) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: pinElement, // Element to trigger the scroll animation
          start: 'top 10%', // Start the animation when 40% of the page has been scrolled
          end: '+=130', // Scroll through a distance of 800px
          pin: pinElement, // Pin the element
          scrub: 1, 
        },
      })
    });
  }, []);

  return (
    <div className="relative bg-black duration-500 transition-colors" id="programs">
      <div className="pb-8 flex flex-col items-center gap-5">
        <h2
          ref={titleRef}
          className="font-general pt-16 text-md uppercase md:text-[20px] text-white"
        >
          Enter the Age of Intelligent Machines
        </h2>
      </div>
      <div className="px-5 py-12">
        <p className="font-circular-web text-lg text-blue-50">AI Programs at Your Service</p>
        <p className="max-x-md font-robert text-lg text-blue-50 opacity-50">
          Dive into a world where AI doesn&apos;t just respond—it evolves. With capabilities to <strong>Analyze</strong> vast data streams, <strong>Generate</strong> innovative ideas, <strong>Fix</strong> complex problems, and <strong>Adapt</strong> in real time, these intelligent systems are shaping the future. Prepare for a reality where technology isn&apos;t just a tool, but a partner in progress, transforming industries and enhancing lives.
        </p>
      </div>

      {/* devin animation section */}
      <div className='relative'>
      <div className='text-center' ref={motionRef}>
        <h1 className="special-font hero-heading text-white"><b>a</b>ble to w<b>o</b>rk<br /> with h<b>u</b>ndr<b>e</b>ds of t<b>00</b>ls</h1>
      </div>
      <div className='flex gap-5 justify-center z-20' ref={cardsRef}>
        <div className='flex flex-col gap-3 trigger'>
          <AnimCard platform='Educational AI' icon={<FaUniversity />} />
          <AnimCard platform='Finance AI' icon={<FaMoneyBill />}  containerClass='!h-[200px]' />
          <AnimCard platform='Photography AI' icon={<FaCamera />} />
          </div>
        <div className='mt-[10%] flex flex-col gap-3 trigger-2'>
          <AnimCard platform='Code Analysis AI' icon={<FaCode />} />
          <AnimCard platform='Robotics AI' icon={<FaRobot />} containerClass='!h-[200px]' />
          <AnimCard platform='Gaming AI' icon={<FaGamepad />} />
          </div>
        <div className='mt-[20%] flex flex-col gap-3 trigger-3'>
          <AnimCard platform='OpenAI' icon={<FaBrain />} containerClass='!h-[200px]' />
          <AnimCard platform='Amazon AWS' icon={<FaAmazon />} />
          <AnimCard platform='Microsoft Azure' icon={<FaMicrosoft />} containerClass='!h-[200px]' />
          </div>
        <div className='mt-[20%] flex flex-col gap-3 trigger-3'>
          <AnimCard platform='GitHub Copilot' icon={<FaGithub />} containerClass='!h-[200px]' />
          <AnimCard platform='Apple Siri' icon={<FaApple />} />
          <AnimCard platform='Google Bard' icon={<FaGoogle />} containerClass='!h-[200px]' />
          </div>
        <div className='mt-[10%] flex flex-col gap-3 trigger-2'>
          <AnimCard platform='E-commerce AI' icon={<FaShoppingCart />} />
          <AnimCard platform='Healthcare AI' icon={<FaHospital />} containerClass='!h-[200px]' />
          <AnimCard platform='Tesla Autopilot' icon={<FaCar />} />
          </div>
        <div className='flex flex-col gap-3 trigger'>
          <AnimCard platform='Music AI' icon={<FaMusic />} />
          <AnimCard platform='Cloud AI' icon={<FaCloud  />}  containerClass='!h-[200px]' />
          <AnimCard platform='Slack Automation' icon={<FaSlack />} />
          </div>
      </div>
      </div>

      <div>
        <div className="flex flex-col items-center gap-5 pt-5 px-14 pb-16 mt-[200px]">
          <div className="flex flex-col items-center gap-5">
            <h3 className="font-general text-2xl text-white">
              AI Programs at Your Service
            </h3>
            <p className="text-sm text-white">
              Dive into a world where AI doesn&apos;t just respond—it evolves. With capabilities to analyze vast data streams, generate innovative ideas, fix complex problems, and adapt in real time, these intelligent systems are shaping the future. Prepare for a reality where technology isn&apos;t just a tool, but a partner in progress, transforming industries and enhancing lives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
