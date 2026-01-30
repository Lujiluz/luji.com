"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      // 🎯 Scroll feel (Desktop)
      // Higher lerp = snappier/tighter control. Lower = floaty/heavy.
      // 0.12 is a sweet spot for "premium" but responsive feel.
      lerp: 0.12,
      
      // ⚙️ Configuration
      duration: 1.2, // Slightly shorter duration for snappier feel
      smoothWheel: true,
      
      // 📱 Mobile Optimization
      // syncTouch: false is correct! It lets mobile use NATIVE scroll (60fps).
      // We don't want Lenis to calculate scroll physics on touch fingers.
      syncTouch: false, 
      touchMultiplier: 2, // Makes touch scrolling feel more 1:1 if syncTouch were on
      
      // 🚀 Performance
      autoRaf: true, // Let Lenis handle its own animation frame optimization
    });

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
        offset: -80, // Negative value for top offset (header height)
        duration: 1.2,
        // Exponential easing feels much snappier than Quartic
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        immediate: false,
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