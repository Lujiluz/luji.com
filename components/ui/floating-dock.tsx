"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
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

export function FloatingDock({
  items,
  className,
  children,
}: {
  items: DockItem[];
  className?: string;
  children?: React.ReactNode;
}) {
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
  const [scrollDir, setScrollDir] = useState<"up" | "down">("down");
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

      setScrollDir(delta > 0 ? "down" : "up");
    });
  }, [scrollY, canHover, hoverLock]);

  /* --------------------- MOBILE ACTIVE SECTION --------------------- */
  useEffect(() => {
    if (canHover) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-dock]"));
    if (!sections.length) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.intersectionRatio);
        });

        let bestId: string | null = null;
        let bestRatio = 0;

        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (!bestId) return;

        const index = items.findIndex((i) => i.href === `#${bestId}`);
        if (index !== -1) {
          setActiveIndex(index);
        }
      },
      {
        threshold: 0.01,
        rootMargin: "-40% 0px -40% 0px",
      }
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
          className="fixed bottom-0 left-1/2 z-40 h-28 w-[320px] -translate-x-1/2"
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
            initial={{ opacity: 0, scale: 0.4, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.4, y: 32 }}
            transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.6 }}
            onPointerEnter={() => setHoverLock(true)}
            onPointerLeave={() => setHoverLock(false)}
            className={cn(
              "fixed bottom-4 left-1/2 z-50 -translate-x-1/2 max-w-[calc(100vw-32px)]",
              className
            )}
          >
            {/* ================= DESKTOP DOCK ================= */}
            {canHover && (
              <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="
                  flex items-end
                  rounded-2xl
                  bg-[var(--glass-bg)]
                  border border-[var(--glass-border)]
                  backdrop-blur-md
                  shadow-xl
                  h-14 md:h-16
                  px-6 md:px-5
                  pb-2 md:pb-3
                  space-x-2 md:space-x-4
                "
              >
                {items.map((item) => (
                  <DockIcon key={item.title} mouseX={mouseX} {...item} />
                ))}

                {children && (
                  <div
                    onMouseEnter={() => mouseX.set(Infinity)}
                    onMouseMove={() => mouseX.set(Infinity)}
                    className="flex items-center gap-4"
                  >
                    <div className="h-8 w-px bg-black/20 dark:bg-white/20 md:h-10" />
                    {children}
                  </div>
                )}
              </motion.div>
            )}

            {/* ================= MOBILE DYNAMIC ISLAND ================= */}
            {!canHover && (
              <motion.div
                layout
                style={{ borderRadius: 24 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 30,
                  mass: 0.8,
                }}
                className={cn(
                  "relative flex items-center overflow-hidden",
                  "bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-md shadow-xl",
                  "transform-gpu will-change-[width,height]",
                  mobileExpanded
                    ? "h-16 w-full max-w-[400px]"
                    : "h-14 w-auto px-3" // FIX: Changed to w-auto and added padding so children fit
                )}
              >
                <AnimatePresence mode="popLayout">
                  {!mobileExpanded ? (
                    /* --- COLLAPSED STATE --- */
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="flex h-full items-center gap-2" // Added gap for spacing between button and children
                    >
                      <button
                        onClick={() => setMobileExpanded(true)}
                        className="relative h-10 w-10 shrink-0 flex items-center justify-center"
                      >
                        {/* Center Icon */}
                        <div className="relative w-8 h-8 overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeIndex}
                              initial={{ y: scrollDir === "down" ? 12 : -12, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: scrollDir === "down" ? -12 : 12, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              {items[activeIndex]?.icon}
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* Arrows */}
                        <motion.div
                          animate={{ x: [0, -3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          className="pointer-events-none absolute left-0.5 opacity-50"
                        >
                          <ChevronLeft size={12} />
                        </motion.div>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          className="pointer-events-none absolute right-0.5 opacity-50"
                        >
                          <ChevronRight size={12} />
                        </motion.div>
                      </button>

                      {/* FIX: Render children here (e.g. Theme Toggle) */}
                      {children && (
                        <div className="flex items-center gap-3 border-l border-white/10 pl-3">
                          {children}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    /* --- EXPANDED STATE --- */
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      transition={{ duration: 0.2 }}
                      className="flex w-full items-center justify-between pr-4 pl-1"
                    >
                      {/* Nav Items Container */}
                      <div className="
                        flex items-center gap-3 overflow-x-auto px-3 py-2 no-scrollbar
                        mask-image-linear-to-r from-transparent via-black to-transparent
                      ">
                        {items.map((item) => (
                          <a
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileExpanded(false)}
                            className="shrink-0"
                          >
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/40 dark:bg-white/10 active:scale-95 transition-transform">
                              {item.icon}
                            </div>
                          </a>
                        ))}
                      </div>

                      {/* Divider & Actions */}
                      <div className="flex shrink-0 items-center gap-3 pl-3 border-l border-white/10 dark:border-white/10">
                        {children}

                        <button
                          onClick={() => setMobileExpanded(false)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 active:scale-90 transition-transform"
                        >
                          <X size={14} className="opacity-60" />
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
/* DOCK ICON                                 */
/* -------------------------------------------------------------------------- */

function DockIcon({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue<number>;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const canHover = useCanHover();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (x) => {
    if (!canHover) return Infinity;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    return x - rect.left - rect.width / 2;
  });

  const size = useSpring(useTransform(distance, [-160, 0, 160], [40, 76, 40]), {
    stiffness: 300,
    damping: 24,
    mass: 0.5,
  });

  const iconSize = useSpring(useTransform(distance, [-160, 0, 160], [18, 38, 18]), {
    stiffness: 300,
    damping: 24,
    mass: 0.5,
  });

  const snapX = useSpring(useTransform(distance, [-200, 0, 200], [14, 0, -14]), {
    stiffness: 280,
    damping: 22,
  });

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{
          width: canHover ? size : 40,
          height: canHover ? size : 40,
          x: canHover ? snapX : 0,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="
          relative flex items-center justify-center
          rounded-full
          bg-white/40 dark:bg-white/10
          backdrop-blur-md
          shadow-sm
          will-change-transform
        "
      >
        <AnimatePresence>
          {hovered && canHover && (
            <motion.div
              initial={{ opacity: 0, y: 6, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 4, x: "-50%" }}
              className="
                absolute -top-9 left-1/2
                rounded-md px-2 py-0.5 text-xs
                bg-[var(--glass-bg)]
                border border-[var(--glass-border)]
                backdrop-blur-md shadow-md
              "
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}