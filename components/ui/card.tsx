"use client";

import * as React from "react";
import { HTMLMotionProps, motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";
import { MotionWrapper } from "./motion-wrapper";

/* ---------------------------------- */
/* Card                               */
/* ---------------------------------- */

const Card = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(({ className, children, ...props }, ref) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const opacity = useMotionValue(0);

  const smoothOpacity = useSpring(opacity, {
    stiffness: 120,
    damping: 22,
  });

  // handle mouse enter
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    opacity.set(0.45);
  };

  // handle mouse leave
  const handleMouseLeave = () => {
    opacity.set(0);
  };

  // Raw cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Buttery smooth spring
  const smoothX = useSpring(mouseX, {
    stiffness: 160,
    damping: 30,
    mass: 0.5,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 160,
    damping: 30,
    mass: 0.5,
  });

  // Dynamic gradient (correct way)
  const spotlight = useMotionTemplate`
    radial-gradient(
      520px circle at ${smoothX}px ${smoothY}px,
      hsl(var(--accent) / 0.5),
      transparent 42%
    )
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <MotionWrapper
      ref={(node) => {
        cardRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 28,
        mass: 0.9,
      }}
      className={cn(
        `
        relative overflow-hidden rounded-xl
        border border-border
        bg-card text-card-foreground
        shadow-sm
        `,
        className,
      )}
      {...props}
    >
      {/* Spotlight layer */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: smoothOpacity,
          background: spotlight,
        }}
        transition={{ opacity: { duration: 0.25, ease: "easeOut" } }}
      />

      {/* Top sheen */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />

      {children}
    </MotionWrapper>
  );
});

Card.displayName = "Card";

/* ---------------------------------- */
/* Subcomponents                      */
/* ---------------------------------- */

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => <h3 ref={ref} className={cn("text-lg font-semibold tracking-tight", className)} {...props} />);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
