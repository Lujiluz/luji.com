"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Slide from "./text-slide";
import Picture1 from "@/public/images/image-1-generated.png";
import Picture2 from "@/public/images/image-2-generated.png";

export default function TextSlideContainer() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <main className="overflow-hidden">
      <div className="md:h-[10vh]" />

      <div ref={containerRef}>
        <Slide src={Picture1} left={"-40%"} direction="left" progress={scrollYProgress} />

        <Slide src={Picture2} left={"-25%"} direction="right" progress={scrollYProgress} />

        <Slide src={Picture1} left={"-75%"} direction="left" progress={scrollYProgress} />
      </div>

      <div className="md:h-[15vh]" />
    </main>
  );
}
