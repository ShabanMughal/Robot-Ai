"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
 
gsap.registerPlugin(ScrollTrigger);

type BentoCardProps = {
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
  title,
  bgColor,
  listData,
  description,
}) => {
  return (
    <div className={`relative size-full bg-slate-200 p-5`}>
      <div className="relative z-10 flex  size-full flex-col p-5 ">
        <div className="flex justify-between">
          <h1 className="bento-title special-font ">{title}</h1>
          <div
            className={`flex justify-center items-center w-10 h-10 rounded-lg ${bgColor}`}
          >
            
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><polygon fill="#fff" points="38.831 15.118 38.823 9.905 29.203 3.617 29.203 7.639 35.548 11.817 35.553 15.019 32.605 17.015 30.594 15.548 30.594 13.063 27.317 10.821 27.317 15.344 22.122 18.532 22.113 26.952 18.44 29.02 16.554 27.543 16.554 25.105 18.786 23.576 18.786 23.556 18.786 19.783 14.769 22.471 11.698 20.473 8.893 22.31 13.277 25.311 13.277 27.154 10.117 29.291 6.894 27.109 6.894 19.848 11.679 16.608 11.684 13.492 17.82 17.445 22.978 14.011 19.834 12.177 17.776 13.564 13.294 10.6 18.349 7.654 22.727 10.22 22.727 6.393 18.354 3.828 8.411 9.625 8.404 14.84 3.617 18.082 3.617 28.874 8.404 32.116 8.411 37.332 18.032 43.617 18.032 39.598 11.686 35.42 11.681 32.218 14.629 30.222 16.64 31.689 16.64 34.174 19.917 36.416 19.917 31.892 25.186 28.705 25.245 20.285 28.795 18.217 30.68 19.694 30.68 22.131 28.448 23.661 28.448 23.68 28.448 27.454 32.465 24.765 35.536 26.764 38.341 24.927 33.958 21.923 33.958 20.083 37.117 17.946 40.34 20.128 40.34 27.389 35.556 30.629 35.551 33.744 29.414 29.79 24.256 33.201 27.401 35.033 29.459 33.672 33.941 36.636 28.886 39.583 24.507 37.016 24.507 40.842 28.881 43.406 38.823 37.612 38.831 32.396 43.617 29.154 43.617 18.361"/></svg>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3">
          {listData.map((item, index) => (
            <h1 key={index} className="flex items-center ">
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
    <div className="min-h-screen relative bg-gradient-to-r from-blue-100 to-green-100">
      <div className="pb-8 flex flex-col items-center gap-5">
        <h2 className="font-general pt-16 text-lg uppercase ">
          Welcome to the Future of Robotics
        </h2>

        <div className="container mx-auto px-3 md:px-10">
          <div className="px-5 py-10 text-center">
            <p className="text-4xl font-robert-medium">
              AI-Driven Robot <span className="bg-gradient-to-r from-[#4795E4] to-[#3ABAD7] bg-clip-text text-transparent">Technologies</span>
            </p>
            <p className="max-x-md font-circular-web text-lg opacity-75 mt-10">
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
                className={`relative flex justify-between gap-10 bg-gradient-to-r to-[#3ABAD7] from-[#4795E4] text-white items-center bento-tilt_1 rounded-lg overflow-hidden px-4 md:px-16 
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
                        className={`z-10 text-2xl font-robert-medium card-${index}`}
                      >
                        {card.title}
                      </h2>
                      <ul
                        className={`z-10 text-sm mt-4 font-general space-y-2 card-${index}`}
                      >
                        {card.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <img
                        className={`w-[400px] h-[300px] object-cover md:block hidden rounded-xl card-${index}`}
                        src={card.image}
                        alt={card.title}
                      />
                    </div>
                    <div className="absolute bottom-10 flex gap-3 w-full">
                      {cards.map((_, barIndex) => (
                        <div
                          key={barIndex}
                          className="relative w-10 h-[3px] bg-slate-400 overflow-hidden rounded-full"
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
