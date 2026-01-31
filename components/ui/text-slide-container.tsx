"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Slide from "./text-slide";
import Picture from "@/public/images/image-3.png";

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
        <Slide src={Picture} left={"-40%"} direction="left" progress={scrollYProgress} />

        <Slide src={Picture} left={"-25%"} direction="right" progress={scrollYProgress} />

        <Slide src={Picture} left={"-75%"} direction="left" progress={scrollYProgress} />
      </div>

      <div className="md:h-[15vh]" />
    </main>
  );
}
