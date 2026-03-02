"use client";

import { motion, useMotionValue, useTransform, useAnimationFrame, useInView } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useLayoutEffect, useRef, useState, useEffect, memo } from "react";

type Direction = "left" | "right";

interface SlideProps {
  src: StaticImageData;
  left: string;
  direction: Direction;
  speed?: number;
}

export default function Slide({ src, left, direction, speed = 20 }: SlideProps) {
  const dir = direction === "left" ? -1 : 1;
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Deteksi elemen masuk layar biar pas user gak liat, animasinya pause (hemat baterai HP!)
  const isInView = useInView(containerRef, { margin: "0px 0px -50px 0px", once: false });

  const baseX = useMotionValue(0);
  const [loopWidth, setLoopWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const measure = () => setLoopWidth(el.scrollWidth / 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Animasi Marquee murni yang jalan konsisten
  useAnimationFrame((time, delta) => {
    if (!loopWidth || !isInView) return;

    const speedFactor = isMobile ? 0.6 : 1;
    const moveBy = (dir * (speed * speedFactor) * delta) / 1000;

    let next = baseX.get() + moveBy;
    if (loopWidth > 0) {
      next = ((next % loopWidth) + loopWidth) % loopWidth;
    }

    baseX.set(next);
  });

  // Konversi nilai base ke koordinat sumbu X (dibalik jadi minus)
  const x = useTransform(baseX, (v) => -v);

  return (
    // pisahin posisi statis (left) ke div biasa
    <div style={{ left, position: "relative" }} className="whitespace-nowrap flex overflow-visible">
      <motion.div
        ref={containerRef}
        // Paksa render di GPU dengan willChange
        style={{ x, willChange: "transform" }}
        className="flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Render 4 slide aja */}
        {[...Array(4)].map((_, i) => (
          <MemoizedPhrase key={i} src={src} priority={i < 2} />
        ))}
      </motion.div>
    </div>
  );
}

// Pencegah re-render yang gak perlu
const MemoizedPhrase = memo(function Phrase({ src, priority }: { src: StaticImageData; priority: boolean }) {
  return (
    <div className="px-5 flex gap-5 items-center">
      <p className="text-[10vw] md:text-[7.5vw] font-medium tracking-tight">Full-stack Developer</p>

      <span className="relative h-[10vw] md:h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden bg-gray-200/50">
        <Image src={src} alt="project preview" fill className="object-cover" sizes="(max-width: 768px) 30vw, 20vw" priority={priority} decoding="async" loading={priority ? "eager" : "lazy"} />
      </span>
    </div>
  );
});
