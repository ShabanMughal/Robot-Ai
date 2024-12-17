'use client'
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useWindowScroll } from 'react-use';
import gsap from "gsap";
import { FaBars } from "react-icons/fa";

// Define the navigation items
const navItems = ["features", "programs", "tools", "about", "Contact"];

const Navbar: React.FC = () => {

  // Define refs with the correct types
  const navContainer = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // State to toggle the menu
  // Destructure the current scroll position from useWindowScroll
  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    // Handle scroll behavior
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      if (navContainer.current) {
        navContainer.current.classList.remove('floating-nav');
      }
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      if (navContainer.current) {
        navContainer.current.classList.add('floating-nav');
      }
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      if (navContainer.current) {
        navContainer.current.classList.add('floating-nav');
      }
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    // Animate navbar visibility
    if (navContainer.current) {
      gsap.to(navContainer.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2
      });
    }
  }, [isNavVisible]);

  const handleMouseEnter = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        // Animate the menu sliding in from the right
        gsap.fromTo(
          menuRef.current,
          { x: '100%', opacity: 0},
          { x: 0, opacity:1, duration: 1, ease: 'power1.out' }
        );
      } else {
        // Animate the menu sliding out to the right
        gsap.to(menuRef.current, {
          x: '100%',
          opacity: 0,
          duration: 1,
          ease: 'power1.in',
        });
      }
    }
  }, [isMenuOpen]);
  return (
    <div
      ref={navContainer}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <audio ref={audioRef} src="/audio/robo.wav" preload="auto" />
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-7">
            <Image
              src="/logo.svg"
              width={40}
              height={40}
              alt="logo"
              className="w-10"
            />
          </div>

          {/* Navigation Items (Desktop View) */}
          <div className="hidden md:block">
            {navItems.map((item) => (
              <a
                key={item}
                onMouseEnter={handleMouseEnter}
                href={`#${item.toLowerCase()}`}
                className="nav-hover-btn text-[#E5E5E5]"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Bar Icon (Mobile View) */}
          <div className="text-white block md:hidden">
            <FaBars onClick={toggleMenu} className="cursor-pointer" />
          </div>
        </nav>

        {/* Mobile Menu */}
       
          <div
          ref={menuRef}
          className={`md:hidden flex text-white absolute top-1/2 ${isMenuOpen ? 'right-10': 'right-5'} -translate-y-1/2`}>
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 transition-all"
              >
                {item}
              </a>
            ))}
          </div>
       
      </header>
    </div>
  );
};

export default Navbar;
