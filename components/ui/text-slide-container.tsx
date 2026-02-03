// "use client";

// import { useRef } from "react";
// import { useScroll } from "framer-motion";
// import Slide from "./text-slide";
// import Picture1 from "@/public/images/image-1-generated.png";
// import Picture2 from "@/public/images/image-2-generated.png";

// export default function TextSlideContainer() {
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   });

//   return (
//     <main className="overflow-hidden">
//       <div className="md:h-[10vh]" />

//       <div ref={containerRef}>
//         <Slide src={Picture1} left={"-40%"} direction="left" progress={scrollYProgress} />

//         <Slide src={Picture2} left={"-25%"} direction="right" progress={scrollYProgress} />

//         <Slide src={Picture1} left={"-75%"} direction="left" progress={scrollYProgress} />
//       </div>

//       <div className="md:h-[15vh]" />
//     </main>
//   );
// }

// components/text-slide-container.tsx
"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import Slide from "./text-slide";
import Picture1 from "@/public/images/image-1-generated.png";
import Picture2 from "@/public/images/image-2-generated.png";

export default function TextSlideContainer() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // ✅ OPTIMIZATION 1: Smooth Scrolling
  // Menambahkan physics (damping/stiffness) supaya scroll tidak "patah"
  // saat user scroll cepat lalu berhenti mendadak.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="overflow-hidden w-full">
      <div className="md:h-[10vh]" />

      <div ref={containerRef} className="flex flex-col gap-2 md:gap-0">
        {/* Pass smoothProgress instead of raw scrollYProgress */}
        <Slide src={Picture1} left="-40%" direction="left" progress={smoothProgress} />

        {/* Speed default 30, kita turunin dikit visualnya biar gak pusing */}
        <Slide src={Picture2} left="-25%" direction="right" progress={smoothProgress} />

        <Slide src={Picture1} left="-75%" direction="left" progress={smoothProgress} />
      </div>

      <div className="md:h-[15vh]" />
    </main>
  );
}
