'use client';
import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import gsap from 'gsap';
import { TiLocationArrow } from 'react-icons/ti';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

type BentoCardProps = {
  src: string;
  title: React.ReactNode;
  description?: string;
  button: boolean;
};

type BentoTiltProps = {
  children: React.ReactNode;
  className?: string;
};

const BentoTilt: React.FC<BentoTiltProps> = ({ children, className = '' }) => {
  const [transform, setTransform] = useState('');
  const itemRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;
    setTransform(newTransform);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
    >
      {children}
    </div>
  );
};

const BentoCard: React.FC<BentoCardProps> = ({ src, title, description, button }) => {
  return (
    <div className="relative size-full">
      <img
        src={src}
        
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 dark:text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
          {button && (
            <div className="flex justify-between mt-5">
              <Button
                title="Enter"
                id="button"
                leftIcon={<TiLocationArrow aria-label="Location Icon" />}
                containerClass="!bg-blue-500 flex-center gap-1 hover:scale-105 transition-transform"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Feature: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

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
    <div className="min-h-screen relative bg-black trasnit duration-500" id="features">
      <div className="pb-8 flex flex-col items-center gap-5">
        <h2
          ref={titleRef}
          className="font-general pt-16 text-sm uppercase md:text-[10px] text-white"
        >
          Welcome to the future of AI
        </h2>

        <div className="container mx-auto px-3 md:px-10">
          <div className="px-5 py-10">
            <p className="font-circular-web text-lg text-blue-50 font-robert-medium">
              Into the Metagame Layer  
            </p>
            <p className="max-x-md font-circular-web text-lg text-blue-50 opacity-50">
              Immerse yourself in a rich and ever-expanding universe where a vibrant
              array of products converge into an interconnected overlay experience in
              your world.
            </p>
          </div>
          {/* continue from here */}
          <div className='flex justify-center gap-5'>
            <div className='bg-blue-400 h-[70vh] w-[80vw] rounded-lg flex items-center justify-center'>
              
              <div>
                <h1>Code modren</h1>
                <ul>
                  <li>language learning</li>
                  <li>language learning</li>
                  <li>language learning</li>
                </ul>

              </div>
              <div>
                <img src="https://api.deepai.org/job-view-file/2ae63d9c-82a6-4431-a773-9fcdad9b309c/outputs/output.jpg?art-image=true" alt="" className='w-[300px]' />
             
              </div>
            </div>
            <div className='bg-blue-400 h-[70vh] w-[10vw] rounded-lg'>
            </div>
            <div className='bg-blue-400 h-[70vh] w-[10vw] rounded-lg'>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-7 mt-10">
            <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
              <BentoCard
                src="images/feature-1.jpg"
                title={
                  <>
                    zig<b>m</b>a
                  </>
                }
                description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
                button={false}
              />
            </BentoTilt>
            <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
              <BentoCard
                src="images/8677850c-e8ce-4691-bfea-5166a105c620.jpg"
                title={
                  <>
                    n<b>e</b>xus
                  </>
                }
                description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
                button={true}
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
              <BentoCard
                src="images/feature-3.jpg"
                title={
                  <>
                    az<b>u</b>xl
                  </>
                }
                description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
                button={true}
              />
            </BentoTilt>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
