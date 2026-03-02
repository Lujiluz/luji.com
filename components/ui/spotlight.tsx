import React from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight = ({ className, fill = "hsl(var(--accent))" }: SpotlightProps) => {
  return (
    // Div luar cuma bertugas jalanin animasi bawaan tailwind
    <div className={cn("pointer-events-none absolute z-[1] opacity-0 animate-spotlight", className)}>
      {/* Div dalam bertugas ngebentuk "cahaya senter" */}
      <div
        style={{
          // Ukuran dibikin sangat timpang (panjang & tipis) biar gradient-nya jadi elips miring
          width: "80vw", // Panjang sorotan cahaya
          height: "35vh", // Ketebalan cahaya
          background: `radial-gradient(ellipse 50% 50% at 50% 50%, ${fill} 0%, transparent 100%)`,
          // Diputar -45 derajat dan digeser sedikit biar posisinya pas
          transform: "rotate(-140deg) translate(-20%, -50%)",
          transformOrigin: "center",
          opacity: 0.2, // Atur intensitas cahayanya di sini
          // Hardware acceleration tipis-tipis buat HP
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
};
