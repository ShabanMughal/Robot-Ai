"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
      <div className="relative z-10 flex size-full flex-col p-5 text-gray-100">
        <div className="flex justify-between">
          <h1 className="bento-title special-font text-white">{title}</h1>
          <div
            className={`flex justify-center items-center w-10 h-10 rounded-lg ${bgColor}`}
          >
            <img src={src} alt="icon" className="w-5" />
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3">
          {listData.map((item, index) => (
            <h1 key={index} className="flex items-center text-white">
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
      title: "AI-Powered Robotics",
      description: [
        "1. Autonomous decision-making",
        "2. Real-time environment adaptation",
        "3. Human-like interaction and learning",
      ],
      image: "images/feature-3.jpg",
    },
    {
      title: "Machine Learning for Robots",
      description: [
        "1. Predictive behavior models",
        "2. Self-improvement algorithms",
        "3. Seamless integration with IoT",
      ],
      image: "https://images.deepai.org/art-image/5cf46b39478e4716a736ec53c77521b1/a-futuristic-machine-learning-robot-surrounde_r6NWy3s.jpg",
    },
    {
      title: "Robotic Process Automation (RPA)",
      description: [
        "1. Task automation for businesses",
        "2. Intelligent data handling",
        "3. Enhanced productivity through AI",
      ],
      image: "https://images.deepai.org/art-image/3efd06fbc1cf4f70a45779f33c6ac927/a-cutting-edge-robot-representing-robotic-pro_2qBB3YB.jpg",
    },
  ];

  return (
    <div className="min-h-screen relative bg-black">
      <div className="pb-8 flex flex-col items-center gap-5">
        <h2 className="font-general pt-16 text-lg uppercase text-white">
          Welcome to the Future of Robotics
        </h2>

        <div className="container mx-auto px-3 md:px-10">
          <div className="px-5 py-10 text-center">
            <p className="text-4xl text-blue-50 font-robert-medium">
              AI-Driven Robot Technologies
            </p>
            <p className="max-x-md font-circular-web text-lg  text-blue-50 opacity-50 mt-10">
              Experience cutting-edge robotics with AI capabilities that enhance
              productivity, decision-making, and automation in various
              industries.
            </p>
          </div>

          {/* Hover Card */}
          <div className="flex flex-col md:flex-row w-full gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                onMouseEnter={() => handleCardClick(index)}
                className={`relative flex justify-between bg-body items-center bento-tilt_1 rounded-lg overflow-hidden px-4 md:px-16 
        ${
          activeIndex === index
            ? "w-full md:w-[80%] opacity-100"
            : "w-full md:w-[10%] opacity-50"
        }
        ${
          activeIndex === index
            ? "h-[50vh] md:h-[70vh]"
            : "md:h-[70vh] h-[10vh] opacity-50"
        }`}
                style={{ transition: "height 0.7s ease, width 0.7s ease" }}
              >
                {activeIndex === index && (
                  <>
                    <div>
                      <h2
                        className={`z-10 text-white text-2xl font-robert-medium card-${index}`}
                      >
                        {card.title}
                      </h2>
                      <ul
                        className={`z-10 text-white text-sm mt-4 font-general space-y-2 card-${index}`}
                      >
                        {card.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <img
                        className={`w-[300px] h-[300px] object-cover md:block hidden rounded-xl card-${index}`}
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

          <div className="flex md:flex-row flex-col justify-center gap-5 mt-10 w-full">
            <BentoTilt className="bento-tilt_1">
              <BentoCard
                src="/logo.svg"
                title={
                  <>
                    <b>AI</b> Bot
                  </>
                }
                bgColor="bg-blue-600"
                listData={[
                  "Autonomous decisions",
                  "Natural language processing",
                  "Real-time learning",
                ]}
                description="An intelligent AI bot designed to assist with real-time problem-solving, automate routine tasks, and enhancing productivity."
              />
            </BentoTilt>
            <BentoTilt className="bento-tilt_1">
              <BentoCard
                src="/logo.svg"
                title={
                  <>
                    <b>Robot</b>{" "}
                  </>
                }
                bgColor="bg-blue-700"
                listData={[
                  "Task automation",
                  "Data processing",
                  "Human-robot collaboration",
                ]}
                description="A robot assistant powered by AI, designed to improve workplace efficiency and support a wide range of tasks."
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1">
              <BentoCard
                src="/logo.svg"
                title={
                  <>
                    <b>RPA</b>
                  </>
                }
                bgColor="bg-teal-500"
                listData={[
                  "Seamless automation",
                  "AI-driven insights",
                  "Cross-platform support",
                ]}
                description="AI-powered RPA system to automate business processes, optimizing workflows and boosting productivity."
              />
            </BentoTilt>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
