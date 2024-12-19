"use client";
import { ReactNode, useRef } from "react";

interface ButtonProps {
  title: string;
  id: string;
  leftIcon?: ReactNode;
  lowerTitle?: string; // New text for hover
  lowerIcon?: ReactNode; // New icon for hover
  containerClass?: string;
}

const Button = ({
  title,
  id,
  leftIcon,
  containerClass,
}: ButtonProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to play audio on hover
  const handleMouseEnter = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <>
      {/* Audio element for sound effect */}
      <audio ref={audioRef} src="/audio/robo.wav" preload="auto" />

      {/* Button Component */}
      <button
        id={id}
        className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-lg bg-blue-600 duration-500 px-7 py-3 text-white ${containerClass}`}
        onClick={handleMouseEnter}
      >
        {/* Container for animations */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden">
          {/* Upper Layer (Default Text and Icon) */}
          <div className="group-hover:translate-y-[-100%] transition-transform duration-300 ease flex items-center space-x-2">
            <span className="font-robert text-xs uppercase">{title}</span>
            {leftIcon && <span>{leftIcon}</span>}
          </div>
          {/* Lower Layer (Text and Icon on Hover) */}
          <div className="absolute top-full group-hover:translate-y-[-100%] transition-transform duration-300 ease flex items-center space-x-2">
            <span className="font-robert text-xs uppercase">{title}</span>
            {leftIcon && <span>{leftIcon}</span>}
          </div>
        </div>
      </button>
    </>
  );
};

export default Button;
