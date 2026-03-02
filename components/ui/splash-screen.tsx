"use client";

import { useSplash } from "@/contexts/SplashContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Everything.", "Everywhere.", "All at once."];

export default function SplashScreen() {
  const { isSplashFinished, setIsSplashFinished } = useSplash();
  const [step, setStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [curveDepth, setCurveDepth] = useState(160);

  // State untuk nge-handle pengecekan sesi & hydration
  const [mounted, setMounted] = useState(false);
  const [skipSplash, setSkipSplash] = useState(false);

  // Cek Session Storage saat pertama kali komponen di-load di browser
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (hasSeenSplash) {
      // Kalau udah pernah lihat di sesi ini, langsung skip!
      setSkipSplash(true);
      setIsSplashFinished(true);
    } else {
      // Kalau belum, tandain kalau dia sekarang lagi lihat
      sessionStorage.setItem("hasSeenSplash", "true");
    }

    // Tandain kalau pengecekan browser udah kelar
    setMounted(true);
  }, [setIsSplashFinished]);

  // Responsive Curve Logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCurveDepth(40); // Mobile: Tarikan pendek biar ngebentuk droplet, gak lonjong
      } else if (width < 1024) {
        setCurveDepth(80); // Tablet: Tarikan sedang
      } else {
        setCurveDepth(160); // Desktop: Tarikan dalam
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3. Timeline Animasi
  useEffect(() => {
    // KUNCI: Kalau di-skip atau belum mounted, jangan jalanin timer animasinya
    if (!mounted || skipSplash) return;

    if (step < 3) {
      const timer = setTimeout(() => setStep((prev) => prev + 1), 1600);
      return () => clearTimeout(timer);
    } else if (step === 3) {
      const timer = setTimeout(() => {
        setStep(4);
        setIsSplashFinished(true);
        setTimeout(() => setIsComplete(true), 1200);
      }, 320);
      return () => clearTimeout(timer);
    }
  }, [step, mounted, skipSplash, setIsSplashFinished]);

  // Mencegah error render di server ATAU sembunyikan jika di-skip
  if (!mounted || skipSplash || isComplete) return null;

  const initialPath = "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z";
  const midPath = `M 0 0 L 100 0 L 100 0 Q 50 ${curveDepth} 0 0 Z`;
  const finalPath = "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z";

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
      <motion.svg className="absolute inset-0 w-full h-full" style={{ fill: "hsl(var(--foreground))" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          variants={{
            initial: { d: initialPath },
            exit: {
              d: [initialPath, midPath, finalPath],
              transition: { duration: 1, ease: [0.76, 0, 0.24, 1], times: [0, 0.5, 1] },
            },
          }}
          initial="initial"
          animate={step === 4 ? "exit" : "initial"}
        />
      </motion.svg>

      <div className="relative z-10 flex items-center justify-center h-20 overflow-hidden">
        <AnimatePresence mode="wait">
          {step < 3 && (
            <motion.span
              key={step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="text-3xl md:text-5xl font-display font-medium tracking-tight"
              style={{ color: "hsl(var(--background))" }}
            >
              {words[step]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
