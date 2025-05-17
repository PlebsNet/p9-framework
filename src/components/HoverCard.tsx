"use client";

import { useState, useRef, useEffect } from 'react';

const HoverCard = ({
  children,
  className = "",
  width = "w-full",
  height = "h-full",
  bgColor = "bg-gray-900",
  cardSize = "16rem",
  fontSize = "0.6rem",
  mainColor = "rgb(90, 30, 255)",
  mainLightColor = "120, 80, 255",
  secondaryColor = "60, 190, 255",
  bgLightColor = "30, 30, 30",
  charLength = 1500
}) => {
  const cardRef = useRef(null);
  const lettersRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // Generate random characters
  const generateRandomChars = (length) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length }).map(() => {
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
  };

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (cardRef.current && lettersRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      lettersRef.current.style.setProperty("--x", `${x}px`);
      lettersRef.current.style.setProperty("--y", `${y}px`);

      // Only update text when hovering to avoid unnecessary re-renders
      if (isHovering) {
        lettersRef.current.innerText = generateRandomChars(charLength);
      }
    }
  };

  // Handle touch movement
  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMouseMove(e.touches[0]);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${width} ${height} rounded-xl ${bgColor} overflow-hidden cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        '--card-size': cardSize,
        '--font-size': fontSize,
        '--background-light-rgb': bgLightColor,
        '--plebs-main-rgb': mainColor,
        '--plebs-main-light-rgb': mainLightColor,
        '--plebs-secondary-rgb': secondaryColor
      }}
    >

      {/* Agent silhouette overlay */}
      <div className={`mix-blend-multiply absolute top-[20%] left-0 w-full h-full pointer-events-none z-10 transition-opacity ${isHovering ? 'opacity-60 duration-500' : 'opacity-0'}`}>
        <svg viewBox="0 0 474 1282" fill={`${mainColor}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
          <g filter="url(#filter0_f_6389_38)">
            <path d="M133.549 248.953C126.237 148.701 171.568 47.2534 281.78 50.0568L283.068 50.0939C392.306 53.6693 432.06 156.871 419.708 256.233C408.868 343.433 368.415 387.712 331.152 408.793C322.205 418.886 316.701 432.818 316.701 453.742C316.701 548.41 342.415 530.768 404.5 662.443C446.787 752.128 401.904 1082.52 416 1232H50C96.9856 1037.68 -19.7033 679.882 133 545.354C193.838 491.757 207.726 438.237 198.925 394.675C167.967 369.003 139.04 324.239 133.549 248.953Z" />
          </g>
          <defs>
            <filter id="filter0_f_6389_38" x="0" y="0" width="473.146" height="1282" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_6389_38" />
            </filter>
          </defs>
        </svg>
        </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 mix-blend-darken"
        style={{
          background: 'radial-gradient(transparent 0%, var(--plebs-main-rgb) 50%, rgb(var(--plebs-main-light-rgb)), rgb(var(--plebs-secondary-rgb)))'
        }}
      />

      {/* Text with mask effect */}
      <div
        ref={lettersRef}
        className={`absolute inset-0 text-white text-xs font-medium break-words transition-opacity duration-400 scale-103 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        style={{
          '--x': '0px',
          '--y': '0px',
          WebkitMaskImage: 'radial-gradient(calc(var(--card-size) * 0.8) circle at var(--x) var(--y), rgb(255 255 255) 20%, rgb(255 255 255 / 25%), transparent)',
          maskImage: 'radial-gradient(calc(var(--card-size) * 0.8) circle at var(--x) var(--y), rgb(255 255 255) 20%, rgb(255 255 255 / 25%), transparent)',
          transform: 'scale(1.03)'
        }}
      />

      {/* Card content area */}
      <div className="relative z-20 h-full w-full p-4">
        {children}
      </div>
    </div>
  );
};

export default HoverCard;