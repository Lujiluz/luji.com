"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/* ---------------------------------- */
/* Spotlight SVG (unchanged)          */
/* ---------------------------------- */

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export const Spotlight = ({ className, fill }: SpotlightProps) => {
  return (
    <svg className={cn("animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0", className)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3787 2842" fill="none">
      <g filter="url(#filter)">
        <ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501" transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)" fill={fill || "white"} fillOpacity="0.21" />
      </g>
      <defs>
        <filter id="filter" x="0.860352" y="0.838989" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  );
};

/* ---------------------------------- */
/* Spotlight Card (smooth & delayed)  */
/* ---------------------------------- */

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SpotlightCard = ({ children, className }: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const opacity = useMotionValue(0);

  const smoothOpacity = useSpring(opacity, {
    stiffness: 120,
    damping: 20,
  });

  //  handle mouse entered
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    opacity.set(0.6);
  };

  // handle mouse leave
  const handleMouseLeave = () => {
    opacity.set(0);
  };

  // Raw cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring motion
  const smoothX = useSpring(mouseX, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });

  // ✅ Proper way to build dynamic CSS with MotionValues
  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${smoothX}px ${smoothY}px,
      hsl(var(--accent) / 0.5),
      transparent 40%
    )
  `;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;

      const rect = divRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={cn("relative overflow-hidden rounded-xl border border-border bg-card", className)}>
      <motion.div
        className="pointer-events-none absolute -inset-px"
        style={{
          opacity: smoothOpacity,
          background,
        }}
        transition={{
          opacity: { duration: 0.25, ease: "easeOut" },
        }}
      />

      {children}
    </div>
  );
};
