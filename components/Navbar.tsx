import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Define the navigation items
const navItems = ["features", "tools", "programs", "about", "Contact"];

const Navbar: React.FC = () => {
  const [isAudio, setIsAudio] = useState(false);
  const [indicatorActive, setIndicatorActive] = useState(false);

  // Define refs with the correct types
  const navContainer = useRef<HTMLDivElement | null>(null);
  const audioElement = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    setIsAudio(!isAudio);
    setIndicatorActive(!indicatorActive);
  };
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isAudio && audioElement.current) {
      audioElement.current.play();
    } else if (audioElement.current) {
      audioElement.current.pause();
    }
  }, [isAudio]);

  const handleMouseEnter = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div
      ref={navContainer}
      className="absolute inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <audio ref={audioRef} src="/audio/robo.wav" preload="auto" />
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            
            <Image src="/logo.svg" width={10} height={10} alt="logo" className='w-10' />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item}
                  onMouseEnter={handleMouseEnter}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudio}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElement}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${
                    indicatorActive ? "active" : ""
                  }`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
