"use client";

import { motion, useMotionValue, useTransform, useAnimationFrame, MotionValue } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

type Direction = "left" | "right";

interface SlideProps {
  src: StaticImageData;
  left: string;
  direction: Direction;
  progress: MotionValue<number>;
  speed?: number;
}

export default function Slide({ src, left, direction, progress, speed = 30 }: SlideProps) {
  const dir = direction === "left" ? -1 : 1;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const baseX = useMotionValue(0);
  const [loopWidth, setLoopWidth] = useState(0);

  // 📐 Measure width of ONE loop
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;

    const measure = () => {
      // total width dibagi 2 (karena render 2 loop)
      setLoopWidth(el.scrollWidth / 2);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  // 🌀 Seamless marquee with modulo
  useAnimationFrame((_, delta) => {
    if (!loopWidth) return;

    const moveBy = (dir * speed * delta) / 1000;
    let next = baseX.get() + moveBy;

    // wrap seamlessly
    next = ((next % loopWidth) + loopWidth) % loopWidth;
    baseX.set(next);
  });

  // 🖱 scroll influence
  const scrollX = useTransform(progress, [0, 1], [200 * dir, -200 * dir]);

  const x = useTransform([baseX, scrollX], ([marquee, scroll]: any) => marquee * -1 + scroll);

  return (
    <motion.div ref={containerRef} style={{ x, left }} className="relative flex whitespace-nowrap will-change-transform">
      <Phrase src={src} />
      <Phrase src={src} />
      <Phrase src={src} />

      <Phrase src={src} />
      <Phrase src={src} />
      <Phrase src={src} />
    </motion.div>
  );
}

function Phrase({ src }: { src: StaticImageData }) {
  return (
    <div className="px-5 flex gap-5 items-center">
      <p className="text-[10vw] md:text-[7.5vw]">Full-stack Developer</p>

      <span className="relative h-[10vw] md:h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <Image src={src} alt="image" fill className="object-cover" sizes="(max-width: 768px) 70vw, 30vw" />
      </span>
    </div>
  );
}
