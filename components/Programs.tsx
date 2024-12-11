'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Programs: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frames = useRef({ currentIndex: 0, maxIndex: 751 }); // Use `useRef` for `frames`
  const images = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let imageLoaded = 0;

    const preloadImages = () => {
      for (let i = 1; i <= frames.current.maxIndex + 1; i++) {
        const img = new Image();
        img.src = `/canvas/frame_${i.toString().padStart(4, '0')}.jpeg`;

        img.onload = () => {
          imageLoaded++;
          if (imageLoaded === frames.current.maxIndex + 1) {
            loadImage(frames.current.currentIndex);
            initScrollAnimation();
          }
        };

        images.current.push(img);
      }
    };

    const loadImage = (index: number) => {
      if (index >= 0 && index <= frames.current.maxIndex) {
        const img = images.current[index];
        if (!img) return;

        // Dynamically resize the canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
      }
    };

    

    const initScrollAnimation = () => {
      // Setting a fixed scroll height based on the number of frames and viewport height
      const scrollHeight = (window.innerHeight * frames.current.maxIndex) / 100; // Adjust to your preference
      ScrollTrigger.create({
        trigger: '.parent',
        start: 'top top',
        end: `+=${scrollHeight}`, // Limit the scroll area size
        scrub: 2,
        pin: true, // Pin the canvas during scroll
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.floor(progress * frames.current.maxIndex);
          loadImage(index);
        },
      });
    };

    preloadImages();

    // Cleanup ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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

  return (
    <div className="relative  bg-body duration-500 transition-colors" id="programs">
      <div className="pb-8 flex flex-col items-center gap-5">
        <h2
          ref={titleRef}
          className="font-general pt-16 text-md uppercase md:text-[20px] dark:text-white"
        >
          Enter the Age of Intelligent Machines
        </h2>
      </div>
      <div className='px-5 py-12'>
          <p className='font-circular-web text-lg dark:text-blue-50'>AI Programs at Your Service</p>
          <p className='max-x-md font-robert text-lg dark:text-blue-50 opacity-50'>
          Dive into a world where AI doesn&apos;t just respond—it evolves. With capabilities to <strong>Analyze</strong> vast data streams, <strong>Generate</strong> innovative ideas, <strong>Fix</strong> complex problems, and <strong>Adapt</strong> in real time, these intelligent systems are shaping the future. Prepare for a reality where technology isn&apos;t just a tool, but a partner in progress, transforming industries and enhancing lives.  </p>
          </div> 

      <div className="parent relative w-full" style={{ height: '100vh' }}>
        <div className="w-full h-screen">
          <canvas ref={canvasRef} className="w-full h-screen"></canvas>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center gap-5 pt-5 px-14 pb-16">
          <div className="flex flex-col items-center gap-5">
            <h3 className="font-general text-2xl dark:text-white">
              AI Programs at Your Service
            </h3>
            <p className="text-sm dark:text-white">
              Dive into a world where AI doesn&apos;t just respond—it evolves. With capabilities to analyze vast data streams, generate innovative ideas, fix complex problems, and adapt in real time, these intelligent systems are shaping the future. Prepare for a reality where technology isn&apos;t just a tool, but a partner in progress, transforming industries and enhancing lives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;
