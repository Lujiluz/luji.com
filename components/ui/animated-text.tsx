"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down";
type MotionState = "rest" | "hover";

interface AnimatedTextProps {
  text: string;
  className?: string;
  animate?: MotionState;
  stagger?: number;
  direction?: Direction;
}

export function AnimatedText({ text, className, animate = "rest", stagger = 0.02, direction = "up" }: AnimatedTextProps) {
  const chars = Array.from(text);
  const sign = direction === "up" ? -1 : 1;

  const spring: any = {
    type: "spring",
    stiffness: 700,
    damping: 22,
    mass: 0.7,
  };

  const container = {
    rest: {
      transition: {
        staggerChildren: stagger,
        staggerDirection: -1,
      },
    },
    hover: {
      transition: {
        staggerChildren: stagger,
        staggerDirection: 1,
      },
    },
  };

  const top = {
    rest: { y: "0%" },
    hover: { y: `${sign * 120}%` },
  };

  const bottom = {
    rest: { y: `${-sign * 120}%` },
    hover: { y: "0%" },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.span className={cn("relative inline-flex overflow-hidden will-change-transform", className)} variants={container} initial={false} animate={animate}>
        {chars.map((char, i) => (
          <span key={i} className="relative inline-block">
            {/* ghost */}
            <span className="invisible inline-block">{char === " " ? "\u00A0" : char}</span>

            <m.span className="absolute left-0 top-0 inline-block" variants={top} transition={spring}>
              {char === " " ? "\u00A0" : char}
            </m.span>

            <m.span className="absolute left-0 top-0 inline-block" variants={bottom} transition={spring}>
              {char === " " ? "\u00A0" : char}
            </m.span>
          </span>
        ))}
      </m.span>
    </LazyMotion>
  );
}
