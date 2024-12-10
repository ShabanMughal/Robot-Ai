import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiMoon, FiSun } from "react-icons/fi";

// Define the navigation items
const navItems = ["features", "tools", "programs", "about", "Contact"];

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<string>("light"); // State to manage theme

  // Define refs with the correct types
  const navContainer = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme); // Persist theme choice
    handleMouseEnter()
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

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
            <Image
              src="/logo.svg"
              width={10}
              height={10}
              alt="logo"
              className="w-10"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item}
                  onMouseEnter={handleMouseEnter}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn text-[#1C1C1E] dark:text-[#E5E5E5]"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Theme Toggle Button */}
            <button
              className={`relative z-10 w-fit ml-5 cursor-pointer overflow-hidden rounded-full btn transition-colors  px-7 py-3`}
              onClick={toggleTheme}
            >
              {/* Container for animations */}
              <div className="relative flex flex-col items-center justify-center overflow-hidden">
                {/* Upper Layer (Default Text and Icon) */}
                <div className=" transition-transform duration-300 ease flex items-center space-x-2">
                  <span className="font-general text-xs uppercase text-white">
                    {theme === "light" ? <FiSun /> : <FiMoon />}
                  </span>
                </div>
              </div>
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
