"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function LenisProvider() {
  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      // 🖥 Desktop smooth
      lerp: isMobile ? 1 : 0.1,
      duration: isMobile ? 0 : 1.2,
      smoothWheel: !isMobile,

      // 📱 Mobile = native scroll
      syncTouch: false,
      touchMultiplier: 1,

      autoRaf: true,
    });

    // 🔗 Anchor smooth scroll (desktop & mobile)
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
        duration: isMobile ? 0.4 : 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
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
