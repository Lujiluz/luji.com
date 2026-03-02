"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { useAnimationFrame } from "motion/react";

export default function LenisProvider() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,

      // mobile = biarin hardware-accelerated scroll bawaan HP yang kerja
      syncTouch: false,
      touchMultiplier: 2,

      // matiin loop bawaan Lenis
      autoRaf: false,
    });

    lenisRef.current = lenis;

    // Anchor smooth scroll
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const el = document.querySelector(hash) as HTMLElement | null;
      if (!el) return;

      e.preventDefault();

      lenis.scrollTo(el, {
        offset: -80,
        duration: 1.2,
        // Pakai easing expo-out biar berasa premium kayak web Apple
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    };

    // passive: false biar listener nggak nge-throttle main thread
    document.addEventListener("click", onClick, { passive: false });

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis sekarang "numpang" di ticker frame-nya Framer Motion.
  // supaya CPU mobile lega soalnya layout recalculation cuma 1x per frame.
  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
  });

  return null;
}
