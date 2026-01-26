"use client";

import { motion } from "framer-motion";
import { forwardRef, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type MotionDivProps = ComponentPropsWithoutRef<typeof motion.div>;

export const MotionWrapper = forwardRef<HTMLDivElement, MotionDivProps>(({ className, ...props }, ref) => {
  return <motion.div ref={ref} className={cn(className)} {...props} />;
});

MotionWrapper.displayName = "MotionWrapper";
