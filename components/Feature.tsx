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
  bgColor: string;
  listData: string[];
  description?: string;
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
    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
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

const BentoCard: React.FC<BentoCardProps> = ({
  src,
  title,
  bgColor,
  listData,
  description,
}) => {
  return (
    <div className={`relative size-full p-5`}>
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div className="flex justify-between">
          <h1 className="bento-title special-font">{title}</h1>
          <div className={`flex justify-center items-center w-10 h-10 rounded-lg ${bgColor}`}>
            <img src={src} alt="icon" className="w-5" />
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3">
          {listData.map((item, index) => (
            <h1 key={index} className="flex items-center">
              <div className={`w-3 h-3 ${bgColor} rounded-full mr-2`}></div>
              <span>{item}</span>
            </h1>
          ))}
        </div>
        {description && <p className="mt-4 text-sm">{description}</p>}
      </div>
    </div>
  );
};

const Feature: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    gsap.fromTo(
      `.card-${activeIndex}`,
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
      }
    );
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
              Immerse yourself in a rich and ever-expanding universe where a
              vibrant array of products converge into an interconnected overlay
              experience in your world.
            </p>
          </div>

          {/* Hover Card */}
          <div className="flex w-full gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                onMouseEnter={() => handleCardClick(index)}
                className={`relative flex justify-between bg-blue-400 items-center transition-all duration-700 ease rounded-lg overflow-hidden px-16 ${
                  activeIndex === index
                    ? "w-[80%] opacity-100"
                    : "w-[10%] opacity-50"
                } h-[70vh]`}
              >
                {activeIndex === index && (
                  <>
                    <div>
                      <h2
                        className={`z-10 text-white text-2xl font-bold card-${index}`}
                      >
                        {card.title}
                      </h2>
                      <ul
                        className={`z-10 text-white text-sm mt-4 space-y-2 card-${index}`}
                      >
                        {card.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <img
                        className={`w-[300px] h-[300px] object-cover card-${index}`}
                        src={card.image}
                        alt={card.title}
                      />
                    </div>

                    <div className="absolute bottom-10 flex gap-3 w-full">
                      {cards.map((_, barIndex) => (
                        <div
                          key={barIndex}
                          className="relative w-10 h-[3px] bg-gray-500 overflow-hidden rounded-full"
                        >
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

          <div className="flex justify-center gap-5 mt-10 w-full">
            <BentoTilt className="bento-tilt_1">
              <BentoCard
                src="/logo.svg"
                title={
                  <>
                    <b>zigm</b>a
                  </>
                }
                bgColor="bg-blue-500" // Example background color
                listData={["Feature 1", "Feature 2", "Feature 3"]}
              />
            </BentoTilt>
            <BentoTilt className="bento-tilt_1">
              <BentoCard
                src="/logo.svg"
                title={
                  <>
                    <b>nex</b>us
                  </>
                }
                bgColor="bg-blue-700"
                listData={["Gamified interaction", "Web3 Communities"]}
                description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1">
              <BentoCard
                src="/logo.svg"
                title={
                  <>
                    <b>az</b>uxl
                  </>
                }
                bgColor="bg-blue-800"
                listData={["AI Agent", "Enhanced gameplay"]}
                description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
              />
            </BentoTilt>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
