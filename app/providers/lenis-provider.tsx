"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function LenisProvider() {
  useEffect(() => {
    const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const lenis = new Lenis({
      // 🎯 Scroll feel
      lerp: isTouch ? 0.1 : 0.075,
      duration: isTouch ? 0.9 : 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 4),

      // 🖥️ Desktop smooth
      smoothWheel: true,

      // 🎚️ Sensitivity
      wheelMultiplier: 1,
      touchMultiplier: 1.1,

      // Mobile
      syncTouch: false,
      syncTouchLerp: 0.075,

      autoRaf: true
    });

    // function raf(time: number) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }
    // requestAnimationFrame(raf);

    // 🔗 Anchor handling
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
        // Floating dock ada di BAWAH
        offset: isTouch ? 80 : 96,
        duration: isTouch ? 1 : 1.35,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
