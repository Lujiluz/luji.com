"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

export function MotionWrapper({ children, className, ...motionProps }: MotionWrapperProps) {
  return (
    <motion.div className={cn(className)} {...motionProps}>
      {children}
    </motion.div>
  );
}
