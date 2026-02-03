"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WorkingInProgressProps {
  className?: string;
}

export function WorkingInProgress({ className }: WorkingInProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("relative inline-flex items-center gap-4", "rounded-2xl px-6 py-4", "bg-[var(--glass-bg)]", "border border-[var(--glass-border)]", "backdrop-blur-md", "shadow-[0_10px_30px_rgba(0,0,0,0.25)]", className)}
    >
      {/* subtle moving highlight */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.15) 50%, transparent 80%)",
        }}
      />

      {/* indicator */}
      <motion.span className="relative flex h-2.5 w-2.5" aria-hidden>
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30" />
        <motion.span
          className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.span>

      {/* text */}
      <div className="flex flex-col">
        <span className="text-sm font-medium tracking-wide text-black dark:text-white">Writing in progress</span>
        <span className="text-xs text-black/60 dark:text-white/50">polishing ideas & insights</span>
      </div>
    </motion.div>
  );
}
