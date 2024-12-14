"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TiLocationArrow } from "react-icons/ti";
import ScrollTrigger from "gsap/ScrollTrigger";
import Button from "./Button";

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

const BentoTilt: React.FC<BentoTiltProps> = ({ children, className = "" }) => {
  const [transform, setTransform] = useState("");
  const itemRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
    setTransform("");
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
        <h1 className="bento-title special-font">{title}</h1>
        {description && <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>}
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
  );
};

const Feature: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const startCardTransition = () => {
    setProgress(0);
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress >= 100) {
        clearInterval(interval);
      } else {
        currentProgress += 2;
        setProgress(currentProgress);
      }
    }, 230);
    return interval;
  };
  

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    animateCardContent();
  };

  const animateCardContent = () => {
    const timeline = gsap.timeline();
    timeline.to(".card-title", { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    timeline.to(".card-description", { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    timeline.to(".card-image", { opacity: 1, scale: 1, duration: 1, ease: "power3.out" });
  };

  useEffect(() => {
    const interval = startCardTransition();
    const cardSwitchInterval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
      setProgress(0);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(cardSwitchInterval);
    };
  }, [activeIndex]);

  const cards = [
    {
      title: "Data Engineering + Analysis",
      description: [
        "1. Data warehouse migrations",
        "2. ETL development",
        "3. Data cleaning and preprocessing",
      ],
      image: "https://via.placeholder.com/600x400",
    },
    {
      title: "AI Solutions",
      description: [
        "1. Custom AI Model Training",
        "2. Real-time Data Insights",
        "3. Predictive Analytics",
      ],
      image: "https://via.placeholder.com/600x400",
    },
    {
      title: "Web3 & Blockchain",
      description: [
        "1. Smart Contract Development",
        "2. Decentralized Applications",
        "3. Blockchain Integration",
      ],
      image: "https://via.placeholder.com/600x400",
    },
  ];

  return (
    <div className="min-h-screen relative bg-black">
      <div className="pb-8 flex flex-col items-center gap-5">
        <h2 className="font-general pt-16 text-sm uppercase md:text-[10px] text-white">
          Welcome to the future of AI
        </h2>

        <div className="container mx-auto px-3 md:px-10">
          <div className="px-5 py-10">
            <p className="font-circular-web text-lg text-blue-50 font-robert-medium">
              Into the Metagame Layer
            </p>
            <p className="max-x-md font-circular-web text-lg text-blue-50 opacity-50">
              Immerse yourself in a rich and ever-expanding universe where a vibrant array of products converge into an interconnected overlay experience in your world.
            </p>
          </div>

          <div className="flex w-full gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                onMouseEnter={() => handleCardClick(index)}
                className={`relative flex justify-between bg-blue-400 items-center transition-all duration-700 ease-in-out rounded-lg overflow-hidden px-16 ${
                  activeIndex === index ? "w-[80%] opacity-100" : "w-[10%] opacity-50"
                } h-[70vh]`}
              >
                {activeIndex === index && (
                  <>
                    <div>
                      <h2 className="z-10 text-white text-2xl font-bold card-title">{card.title}</h2>
                      <ul className="z-10 text-white text-sm mt-4 space-y-2 card-description">
                        {card.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <img className="w-[300px] h-[300px] object-cover card-image" src={card.image} alt={card.title} />
                    </div>

                    <div className="absolute bottom-10 flex gap-3 w-full">
                      {cards.map((_, barIndex) => (
                        <div key={barIndex} className="relative w-10 h-[3px] bg-gray-500 overflow-hidden rounded-full">
                          <div
                            className="absolute top-0 left-0 h-full bg-white transition-all duration-5000"
                            style={{
                              width: activeIndex === barIndex ? progress : "0%",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-7 mt-10">
            <BentoTilt className="bento-tilt_1">
              <BentoCard
                src="images/feature-1.jpg"
                title={<><b>zigm</b>a</>}
                description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
                button={false}
              />
            </BentoTilt>
            <BentoTilt className="bento-tilt_1">
              <BentoCard
                src="images/8677850c-e8ce-4691-bfea-5166a105c620.jpg"
                title={<><b>nex</b>us</>}
                description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
                button={true}
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1">
              <BentoCard
                src="images/feature-3.jpg"
                title={<><b>az</b>uxl</>}
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
