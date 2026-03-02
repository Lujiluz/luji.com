"use client";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
}

export const TextGenerateEffect = ({ words, className, filter = false }: TextGenerateEffectProps) => {
  const wordsArray = words.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: filter ? "blur(10px)" : "none",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: filter ? "blur(0px)" : "none",
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <div className={cn("inline-block", className)}>
      <span className="sr-only">{words}</span>

      <motion.div variants={containerVariants} initial="hidden" animate="show" aria-hidden="true" className="inline">
        {wordsArray.map((word, idx) => (
          <motion.span key={word + idx} variants={wordVariants} className="inline-block mr-[0.25em]">
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
