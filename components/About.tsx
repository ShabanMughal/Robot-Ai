'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [cursorImage, setCursorImage] = useState<string | null>(null); // State for dynamic image based on content
  const cursorRef = useRef<HTMLImageElement | null>(null);

  const AboutData = [
    {
      title: <>An<b>a</b>lyze <b>d</b>ata</>,
      description: 'Discover deep insights by analyzing massive data streams in real-time.',
      image: 'https://images.deepai.org/art-image/8ed07fb7c7ae4d08a36d4ff6a9bc8bdb/a-futuristic-data-analysis-scene-showcasing-a_iEzJQ1S.jpg',
    },
    {
      title: <>Ge<b>n</b>erate I<b>d</b>eas</>,
      description: 'Unlock creativity with AI-powered idea generation for any industry.',
      image: 'https://images.deepai.org/art-image/8292e9cc195842fcb23f5de53c164343/a-creative-and-innovative-workspace-filled-wi_IUc6SIk.jpg',
    },
    {
      title: <>Fi<b>x</b> Co<b>m</b>plex Pr<b>o</b>blems</>,
      description: "Solve intricate challenges by leveraging AI's problem-solving capabilities.",
      image: 'https://images.deepai.org/art-image/272fa0ef47d848b4888bf13204c2f7c4/a-futuristic-digital-environment-where-comple_9GfjUoi.jpg',
    },
    {
      title: <>Ad<b>a</b>pt i<b>n</b> Re<b>a</b>l-Ti<b>m</b>e</>,
      description: 'AI that evolves with real-time data, ensuring the best decision-making.',
      image: 'https://images.deepai.org/art-image/68ccea877aee4a5eb391fa4b5c1a6da5/a-futuristic-scene-showcasing-the-seamless-in_hcp5IT7.jpg',
    },
  ];

  useEffect(() => {
    // GSAP animation for the title
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
            start: 'top 90%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );
    }

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && cursorImage) {
        // Adjust the cursor position to follow mouse
        gsap.to(cursorRef.current, {
          x: e.clientX - cursorRef.current.width / 2, // Center image on mouse
          y: e.clientY - cursorRef.current.height / 2, // Center image on mouse
          duration: 0.2,
          ease: 'power4.out',
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorImage]); 

  return (
    <div className="relative bg-body" id="about">
      <div className="pb-8 flex flex-col items-center gap-5">
        {/* Sub-heading */}
        <h2
          ref={titleRef}
          className="font-general pt-16 text-sm uppercase md:text-[20px] text-white"
        >
          About reimagine ai system
        </h2>
      </div>

      <div className="px-5 py-12">
        <p className="font-circular-web text-lg text-blue-50">AI Programs at Your Service</p>
        <p className="max-x-md font-robert text-lg text-blue-50 opacity-50">
          Dive into a world where AI doesn&apos;t just respond—it evolves. With capabilities to{' '}
          <strong>Analyze</strong> vast data streams, <strong>Generate</strong> innovative ideas,{' '}
          <strong>Fix</strong> complex problems, and <strong>Adapt</strong> in real time, these
          intelligent systems are shaping the future. Prepare for a reality where technology isn&apos;t
          just a tool, but a partner in progress, transforming industries and enhancing lives.
        </p>
      </div>

      {/* Cursor Image */}
      {cursorImage && (
        <img
          ref={cursorRef}
          src={cursorImage}
          alt="Cursor Image"
          className="absolute pointer-events-none w-[250px] h-[250px] object-cover rounded-lg z-50"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      )}

      {/* List of AI Features */}
      <div className="flex flex-col py-12">
        {AboutData.map((feature, index) => (
          <div
            key={index}
            className="relative flex md:flex-row flex-col justify-between items-center border-b cursor-pointer py-5 px-10 group"
            onMouseEnter={() => setCursorImage(feature.image)}
            onMouseLeave={() => setCursorImage(null)}
          >
            <div className="absolute inset-0 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>

            <div className="w-[100%] z-10">
              <h3 className="font-zentry text-3xl md:text-6xl text-blue-50 font-zentry special-font">
                {feature.title}
              </h3>
            </div>
            <div className="w-[100%] z-10">
              <p className="font-circular-web text-md md:text-lg text-blue-50 opacity-50 md:text-end">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
