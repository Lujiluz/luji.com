"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionValue, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* TYPES                                   */
/* -------------------------------------------------------------------------- */

export type DockItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

/* -------------------------------------------------------------------------- */
/* UTILITIES                                 */
/* -------------------------------------------------------------------------- */

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setCanHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return canHover;
}

/* -------------------------------------------------------------------------- */
/* FLOATING DOCK                               */
/* -------------------------------------------------------------------------- */

export function FloatingDock({ items, className, children }: { items: DockItem[]; className?: string; children?: React.ReactNode }) {
  const mounted = useMounted();
  const canHover = useCanHover();
  const mouseX = useMotionValue(Infinity);

  /* ----------------------------- VISIBILITY ----------------------------- */
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const [visible, setVisible] = useState(true);
  const [hoverLock, setHoverLock] = useState(false);

  /* ------------------------------ MOBILE ------------------------------ */
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  // ✅ NEW: State buat nentuin arah animasi (1 = down/next, -1 = up/prev)
  const [direction, setDirection] = useState(1);
  const activeIndexRef = useRef(0); // Ref buat track index tanpa trigger re-render observer
  const dockRef = useRef<HTMLDivElement>(null);

  /* ---------------------- DESKTOP HIDE ON SCROLL ----------------------- */
  useEffect(() => {
    return scrollY.on("change", (y) => {
      const delta = y - lastY.current;
      lastY.current = y;
      if (!canHover) return;
      if (hoverLock) return;
      if (y < 80) setVisible(true);
      else if (delta > 8) setVisible(false);
    });
  }, [scrollY, canHover, hoverLock]);

  /* --------------------- MOBILE ACTIVE SECTION --------------------- */
  useEffect(() => {
    // Kalo desktop (canHover), gak usah jalanin logic ini biar hemat resource
    if (canHover) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-dock]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Kita cari entry mana yang lagi "intersecting" (masuk area pantau)
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          const targetId = visibleEntry.target.id;
          const newIndex = items.findIndex((i) => i.href === `#${targetId}`);

          if (newIndex !== -1 && newIndex !== activeIndexRef.current) {
            const newDirection = newIndex > activeIndexRef.current ? 1 : -1;
            setDirection(newDirection);
            setActiveIndex(newIndex);
            activeIndexRef.current = newIndex;
          }
        }
      },
      {
        // Treshold 0 artinya "asal nyentuh dikit aja langsung lapor"
        threshold: 0,
        // RootMargin ini kuncinya!
        // "-45% 0px -45% 0px" artinya kita persempit area pandang jadi cuma GARIS TIPIS DI TENGAH LAYAR (10% tinggi layar).
        // Jadi section dianggap aktif CUMA kalau dia ngelewatin tengah layar.
        rootMargin: "-45% 0px -45% 0px",
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items, canHover]);

  /* --------------------- CLICK OUTSIDE HANDLER --------------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setMobileExpanded(false);
      }
    };
    if (mobileExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileExpanded]);

  if (!mounted) return null;

  return (
    <>
      {/* ================= DESKTOP HOVER REVEAL ZONE ================= */}
      {canHover && (
        <div
          className="fixed bottom-0 left-1/2 z-40 h-24 w-[400px] -translate-x-1/2"
          onPointerEnter={() => {
            setHoverLock(true);
            setVisible(true);
          }}
          onPointerLeave={() => setHoverLock(false)}
        />
      )}

      {/* ================= DOCK ROOT ================= */}
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={dockRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={cn("fixed bottom-6 left-1/2 z-50 -translate-x-1/2", className)}
            onPointerEnter={() => setHoverLock(true)}
            onPointerLeave={() => setHoverLock(false)}
          >
            {/* ================= DESKTOP DOCK ================= */}
            {canHover && (
              <motion.div
                className="
                  flex items-center gap-4
                  rounded-2xl
                  /* --- FIX LIQUID GLASS --- */
                  bg-white/10 dark:bg-black/10       
                  backdrop-blur-md                   
                  border border-white/20 dark:border-white/10
                  shadow-lg dark:shadow-black/20
                  h-16 px-4
                "
              >
                <div className="flex items-end gap-3" onMouseMove={(e) => mouseX.set(e.pageX)} onMouseLeave={() => mouseX.set(Infinity)}>
                  {items.map((item) => (
                    <DockIcon key={item.title} mouseX={mouseX} {...item} />
                  ))}
                </div>

                {children && (
                  <>
                    <div className="h-8 w-[1px] bg-white/30 dark:bg-white/10" />
                    <div className="flex items-center">{children}</div>
                  </>
                )}
              </motion.div>
            )}

            {/* ================= MOBILE DYNAMIC ISLAND ================= */}
            {!canHover && (
              <motion.div
                layout
                style={{ borderRadius: 24 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={cn(
                  "relative flex items-center overflow-hidden",
                  /* --- FIX LIQUID GLASS MOBILE --- */
                  "bg-white/20 dark:bg-black/20",
                  "backdrop-blur-lg",
                  "border border-white/20 dark:border-white/10",
                  "shadow-2xl",
                  mobileExpanded ? "px-0 h-16 w-[calc(100vw-40px)] max-w-[400px]" : "px-2 h-14 w-auto",
                )}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {!mobileExpanded ? (
                    /* --- COLLAPSED STATE --- */
                    <motion.div
                      key="collapsed"
                      layout
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 px-2"
                    >
                      <button onClick={() => setMobileExpanded(true)} className="relative flex items-center justify-center h-10 w-10 active:scale-90 transition-transform">
                        <motion.div layout className="relative w-6 h-6">
                          <AnimatePresence mode="popLayout" custom={direction}>
                            {/* ✅ ANIMATION FIX: Gunakan direction state */}
                            <motion.div
                              key={activeIndex}
                              variants={{
                                enter: (dir: number) => ({
                                  y: dir * 12, // Kalau dir 1 (turun), masuk dari bawah (+12). Kalau -1, dari atas (-12)
                                  opacity: 0,
                                }),
                                center: {
                                  y: 0,
                                  opacity: 1,
                                },
                                exit: (dir: number) => ({
                                  y: dir * -12, // Kalau dir 1 (turun), keluar ke atas (-12). Kalau -1, ke bawah (+12)
                                  opacity: 0,
                                }),
                              }}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              custom={direction} // Pass direction ke variants
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              {items[activeIndex]?.icon}
                            </motion.div>
                          </AnimatePresence>
                        </motion.div>
                        <div className="absolute left-0 opacity-40 animate-pulse">
                          <ChevronLeft size={10} />
                        </div>
                        <div className="absolute right-0 opacity-40 animate-pulse">
                          <ChevronRight size={10} />
                        </div>
                      </button>

                      {children && (
                        <motion.div layout className="pl-3 border-l border-white/20 dark:border-white/10">
                          {children}
                        </motion.div>
                      )}
                    </motion.div>
                  ) : (
                    /* --- EXPANDED STATE (SCROLLABLE) --- */
                    <motion.div key="expanded" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }} className="flex w-full items-center justify-between">
                      {/* Horizontal Scroll Container */}
                      <div
                        className="
                        flex-1 overflow-x-auto no-scrollbar
                        flex items-center gap-3 px-4 py-2
                        [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
                        -ml-2
                      "
                      >
                        {items.map((item) => (
                          <motion.a
                            layout
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileExpanded(false)}
                            className="
                                flex h-10 w-10 shrink-0 items-center justify-center rounded-full 
                                bg-white/50 dark:bg-white/10
                                active:scale-90 transition-transform
                            "
                          >
                            {item.icon}
                          </motion.a>
                        ))}
                      </div>

                      {/* Divider & Actions */}
                      <div
                        className="
                          flex shrink-0 items-center gap-3 pr-4 pl-2 
                          border-l border-white/20 dark:border-white/10 
                          z-10 bg-transparent h-full
                      "
                      >
                        {children}

                        <button
                          onClick={() => setMobileExpanded(false)}
                          className="
                             flex h-8 w-8 items-center justify-center rounded-full 
                             bg-red-500/10 text-red-500 
                             active:scale-90 transition-transform
                          "
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* DOCK ICON (OPTIMIZED PHYSICS)                             */
/* -------------------------------------------------------------------------- */

function DockIcon({ mouseX, title, icon, href }: { mouseX: MotionValue<number>; title: string; icon: React.ReactNode; href: string }) {
  const canHover = useCanHover();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (x) => {
    if (!canHover) return Infinity;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    return x - rect.left - rect.width / 2;
  });

  const size = useSpring(useTransform(distance, [-150, 0, 150], [40, 75, 40]), {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
  });

  const iconSize = useSpring(useTransform(distance, [-150, 0, 150], [20, 35, 20]), {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
  });

  // Narrow Range for Vertical Pop ([-65, 65])
  const y = useSpring(useTransform(distance, [-65, 0, 65], [0, -15, 0]), {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
  });

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width: size, height: size, y }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="
          relative flex items-center justify-center
          rounded-full
          /* --- ICON GLASS EFFECT --- */
          bg-white/40 dark:bg-white/10
          border border-white/20
          backdrop-blur-sm
          transition-colors duration-200 hover:bg-white/60 dark:hover:bg-white/20
        "
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: -50, x: "-50%" }}
              exit={{ opacity: 0, y: 0, x: "-50%" }}
              transition={{ duration: 0.15 }}
              className="
                absolute left-1/2 top-0
                whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium
                bg-black/80 text-white dark:bg-white/90 dark:text-black
                shadow-lg pointer-events-none z-50
              "
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center text-black/70 dark:text-white/80">
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
