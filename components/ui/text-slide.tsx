// // "use client";

// // import { motion, useMotionValue, useTransform, useAnimationFrame, MotionValue, useInView, useSpring } from "framer-motion";
// // import Image, { StaticImageData } from "next/image";
// // import { useLayoutEffect, useRef, useState } from "react";

// // type Direction = "left" | "right";

// // interface SlideProps {
// //   src: StaticImageData;
// //   left: string;
// //   direction: Direction;
// //   progress: MotionValue<number>;
// //   speed?: number;
// // }

// // export default function Slide({ src, left, direction, progress, speed = 30 }: SlideProps) {
// //   const dir = direction === "left" ? -1 : 1;

// //   const containerRef = useRef<HTMLDivElement | null>(null);
// //   const baseX = useMotionValue(0);
// //   const [loopWidth, setLoopWidth] = useState(0);

// //   // 📐 Measure width of ONE loop
// //   useLayoutEffect(() => {
// //     if (!containerRef.current) return;

// //     const el = containerRef.current;

// //     const measure = () => {
// //       // total width dibagi 2 (karena render 2 loop)
// //       setLoopWidth(el.scrollWidth / 2);
// //     };

// //     measure();

// //     const ro = new ResizeObserver(measure);
// //     ro.observe(el);

// //     return () => ro.disconnect();
// //   }, []);

// //   // refactor: useInView for better performance
// //   const isInView = useInView(containerRef, {
// //     margin: "-20% 0px -20% 0px",
// //   });

// //   const scrollX = useTransform(progress, [0, 1], [120 * dir, -120 * dir]);

// //   // const scrollX = useSpring(rawScrollX, {
// //   //   stiffness: 60,
// //   //   damping: 20,
// //   //   mass: 0.8,
// //   // });

// //   const smoothX = useMotionValue(0);

// //   useAnimationFrame((_, delta) => {
// //     if (!loopWidth || !isInView) return;

// //     const isMobile = window.matchMedia("(max-width: 768px)").matches;
// //     const effectiveSpeed = isMobile ? speed * 0.6 : speed;

// //     const moveBy = (dir * effectiveSpeed * delta) / 1000;
// //     let next = baseX.get() + moveBy;
// //     next = ((next % loopWidth) + loopWidth) % loopWidth;
// //     baseX.set(next);

// //     // realtime scroll influence

// //     const targetX = baseX.get() * -1 + scrollX.get();

// //     // frame-based lerp (NO DELAY FEEL)
// //     const current = smoothX.get();
// //     const lerpFactor = isMobile ? 0.25 : 0.15;
// //     smoothX.set(current + (targetX - current) * lerpFactor);
// //   });

// //   // const x = useTransform([baseX, scrollX], ([marquee, scroll]: any) => marquee * -1 + scroll);

// //   return (
// //     <motion.div ref={containerRef} style={{ x: smoothX, left }} className="relative flex whitespace-nowrap will-change-transform">
// //       <Phrase src={src} />
// //       <Phrase src={src} />
// //       <Phrase src={src} />

// //       <Phrase src={src} />
// //       <Phrase src={src} />
// //       <Phrase src={src} />
// //     </motion.div>
// //   );
// // }

// // function Phrase({ src }: { src: StaticImageData }) {
// //   return (
// //     <div className="px-5 flex gap-5 items-center">
// //       <p className="text-[10vw] md:text-[7.5vw]">Full-stack Developer</p>

// //       <span className="relative h-[10vw] md:h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
// //         <Image src={src} alt="image" fill className="object-cover" sizes="(max-width: 768px) 70vw, 30vw" />
// //       </span>
// //     </div>
// //   );
// // }

// // components/text-slide.tsx
// "use client";

// import { motion, useMotionValue, useTransform, useAnimationFrame, MotionValue } from "framer-motion";
// import Image, { StaticImageData } from "next/image";
// import { useLayoutEffect, useRef, useState, useEffect } from "react";

// type Direction = "left" | "right";

// interface SlideProps {
//   src: StaticImageData;
//   left: string;
//   direction: Direction;
//   progress: MotionValue<number>;
//   speed?: number; // Base speed
// }

// export default function Slide({ src, left, direction, progress, speed = 30 }: SlideProps) {
//   const dir = direction === "left" ? -1 : 1;
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const baseX = useMotionValue(0);
//   const [loopWidth, setLoopWidth] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);

//   // ✅ OPTIMIZATION 2: Mobile Detection
//   // Mengurangi beban JS dengan mendeteksi device sekali saja
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // 📐 Measure width
//   useLayoutEffect(() => {
//     if (!containerRef.current) return;
//     const el = containerRef.current;

//     // Pakai bounding client rect kadang lebih presisi untuk transform
//     const measure = () => setLoopWidth(el.scrollWidth / 2);

//     measure();
//     const ro = new ResizeObserver(measure);
//     ro.observe(el);
//     return () => ro.disconnect();
//   }, []);

//   // 🌀 Animation Loop
//   useAnimationFrame((time, delta) => {
//     if (!loopWidth) return;

//     // ✅ OPTIMIZATION 3: Mobile throttling
//     // Di mobile, kita kurangi multiplier speednya supaya tidak "terbang"
//     // speedFactor 0.6 artinya di mobile kecepatannya 60% dari desktop
//     const speedFactor = isMobile ? 0.6 : 1;

//     const moveBy = (dir * (speed * speedFactor) * delta) / 1000;

//     // Direct set, hindari kalkulasi berlebihan
//     let next = baseX.get() + moveBy;
//     if (loopWidth > 0) {
//       next = ((next % loopWidth) + loopWidth) % loopWidth;
//     }

//     baseX.set(next);
//   });

//   // 🖱 Scroll Influence
//   // ✅ OPTIMIZATION 4: Reduced Scroll Sensitivity on Mobile
//   // Di mobile range-nya dikecilin (100 vs 200) biar gak jerky pas jempol gerak
//   const scrollRange = isMobile ? 100 : 200;
//   const scrollX = useTransform(progress, [0, 1], [scrollRange * dir, -scrollRange * dir]);

//   // Combine transforms
//   const x = useTransform([baseX, scrollX], ([marquee, scroll]) => {
//     // Type casting manual karena framer motion array input
//     return (marquee as number) * -1 + (scroll as number);
//   });

//   return (
//     <motion.div
//       ref={containerRef}
//       style={{ x, left }}
//       className="relative flex whitespace-nowrap"
//       // ✅ OPTIMIZATION 5: Force GPU Acceleration
//       // 'transform-gpu' di Tailwind v4 memicu translate3d(0,0,0)
//       // ini mindahin beban render dari CPU ke GPU
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }} // Fade in biar gak kaget pas layout shift
//     >
//       {/* Kita render Phrase secukupnya, 6 udah oke buat cover wide screen */}
//       {[...Array(6)].map((_, i) => (
//         <Phrase key={i} src={src} priority={i < 2} />
//       ))}
//     </motion.div>
//   );
// }

// // ✅ OPTIMIZATION 6: Image Performance
// function Phrase({ src, priority }: { src: StaticImageData; priority: boolean }) {
//   return (
//     <div className="px-5 flex gap-5 items-center">
//       <p className="text-[10vw] md:text-[7.5vw] font-medium tracking-tight">Full-stack Developer</p>

//       <span className="relative h-[10vw] md:h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden bg-gray-200">
//         <Image
//           src={src}
//           alt="project preview"
//           fill
//           className="object-cover"
//           // Pastikan sizes akurat biar Next.js gak download gambar 4k di HP
//           sizes="(max-width: 768px) 30vw, 20vw"
//           // Priority cuma buat 2 item pertama (LCP optimization)
//           priority={priority}
//           loading={priority ? "eager" : "lazy"}
//           // Placeholder blur biar smooth pas loading
//           placeholder="blur"
//         />
//       </span>
//     </div>
//   );
// }

"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  MotionValue,
  useInView, // 1. Import ini
} from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useLayoutEffect, useRef, useState, useEffect, memo } from "react"; // 2. Import memo

type Direction = "left" | "right";

interface SlideProps {
  src: StaticImageData;
  left: string;
  direction: Direction;
  progress: MotionValue<number>;
  speed?: number;
}

export default function Slide({
  src,
  left,
  direction,
  progress,
  speed = 30,
}: SlideProps) {
  const dir = direction === "left" ? -1 : 1;
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // ✅ OPTIMIZATION 1: Only animate when visible
  // 'once: false' artinya toggle terus setiap masuk/keluar viewport
  // margin "0px 100px -50px 0px" bikin buffer dikit biar gak kaget pas masuk layar
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

  useAnimationFrame((time, delta) => {
    // ✅ LOGIC STOPPER: Kalau gak ada loopWidth ATAU gak di layar, RETURN.
    // Ini hemat CPU parah pas user scroll ke section lain.
    if (!loopWidth || !isInView) return;

    const speedFactor = isMobile ? 0.6 : 1;
    const moveBy = (dir * (speed * speedFactor) * delta) / 1000;
    
    let next = baseX.get() + moveBy;
    if (loopWidth > 0) {
        next = ((next % loopWidth) + loopWidth) % loopWidth;
    }
    
    baseX.set(next);
  });

  const scrollRange = isMobile ? 100 : 200;
  const scrollX = useTransform(progress, [0, 1], [scrollRange * dir, -scrollRange * dir]);

  const x = useTransform([baseX, scrollX], ([marquee, scroll]) => {
     return (marquee as number) * -1 + (scroll as number);
  });

  return (
    <motion.div
      ref={containerRef}
      style={{ x, left }}
      className="relative flex whitespace-nowrap transform-gpu" // Ensure GPU layer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth fade in
    >
      {[...Array(6)].map((_, i) => (
        <MemoizedPhrase key={i} src={src} priority={i < 2} /> 
      ))}
    </motion.div>
  );
}

// ✅ OPTIMIZATION 2: React.memo
// Mencegah re-render yang tidak perlu. Component ini hanya akan re-render
// kalau props 'src' atau 'priority' berubah (which is never, in this case).
const MemoizedPhrase = memo(function Phrase({ src, priority }: { src: StaticImageData; priority: boolean }) {
  return (
    <div className="px-5 flex gap-5 items-center">
      <p className="text-[10vw] md:text-[7.5vw] font-medium tracking-tight">
        Full-stack Developer
      </p>

      <span className="relative h-[10vw] md:h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden bg-gray-200/50">
        <Image
          src={src}
          alt="project preview"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 30vw, 20vw"
          priority={priority}
          // ✅ OPTIMIZATION 3: Decoding Async
          // Kasih hint ke browser: "Dekode gambar ini di background thread aja"
          // Biar scrolling tetep licin pas gambarnya lagi diproses.
          decoding="async" 
        />
      </span>
    </div>
  );
});