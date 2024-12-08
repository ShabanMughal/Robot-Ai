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
      const scrollHeight = (window.innerHeight * frames.current.maxIndex) / 300; // Adjust to your preference
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
          duration: 1,
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
    <div className="relative bg-black" id="programs">
      <div className="pb-8 flex flex-col items-center gap-5">
        <h2
          ref={titleRef}
          className="font-general pt-16 text-sm uppercase md:text-[10px] text-white"
        >
          Welcome to the future of AI
        </h2>
      </div>

      <div className="parent relative w-full" style={{ height: '100vh' }}>
        <div className="w-full h-screen">
          <canvas ref={canvasRef} className="w-full h-screen"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Programs;
