"use client";

import useMounted from "@/app/hooks/useMounted";
import { cn } from "@/lib/utils";
import { AnimatePresence, MotionValue, motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type DockItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

/* -------------------------------------------------------------------------- */
/*                                  UTILITIES                                 */
/* -------------------------------------------------------------------------- */

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
/*                               FLOATING DOCK                                */
/* -------------------------------------------------------------------------- */

export function FloatingDock({ items, className, children }: { items: DockItem[]; className?: string; children?: React.ReactNode }) {
  const mounted = useMounted();
  const canHover = useCanHover();
  const mouseX = useMotionValue(Infinity);

  /* -------------------------- SCROLL VISIBILITY --------------------------- */
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  const [visible, setVisible] = useState(true);
  const [locked, setLocked] = useState(false);
  const [hoveringDock, setHoveringDock] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (y) => {
      if (locked || hoveringDock) return;

      const delta = y - lastY.current;

      if (y < 80) {
        setVisible(true);
      } else if (delta > 8) {
        setVisible(false);
      }

      lastY.current = y;
    });
  }, [scrollY, locked, hoveringDock]);

  useEffect(() => {
    if (!locked && !hoveringDock && scrollY.get() > 80) {
      setVisible(false);
    }
  }, [locked, hoveringDock]);

  /* ------------------------- APPLE-LIKE ANIMATION -------------------------- */
  const dockVariants = {
    hidden: {
      opacity: 0,
      scaleX: 0.25,
      scaleY: 0.4,
      y: 32,
      borderRadius: "999px",
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      y: 0,
      borderRadius: "16px",
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 26,
        mass: 0.6,
      },
    },
  };

  if (!mounted) return null;

  return (
    <>
      {/* ---------------- BOTTOM HOVER REVEAL ZONE ---------------- */}
      {canHover && (
        <div
          className="fixed bottom-0 left-1/2 z-40 h-28 w-[320px] -translate-x-1/2"
          onPointerEnter={() => {
            setLocked(true);
            setVisible(true);
          }}
          onPointerLeave={() => {
            setLocked(false);
          }}
        />
      )}

      {/* --------------------------- DOCK --------------------------- */}
      <AnimatePresence>
        {visible && (
          <motion.div
            variants={dockVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onPointerEnter={() => {
              setHoveringDock(true);
              setLocked(true);
            }}
            onPointerLeave={() => {
              setHoveringDock(false);
              setLocked(false);
            }}
            className={cn("fixed bottom-4 left-1/2 z-50 -translate-x-1/2 origin-bottom", className)}
          >
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

                overflow-visible
                [contain:layout_style]
              "
            >
              {items.map((item) => (
                <DockIcon key={item.title} mouseX={mouseX} {...item} />
              ))}

              {children && (
                <div onMouseEnter={() => mouseX.set(Infinity)} onMouseMove={() => mouseX.set(Infinity)} className="flex items-center gap-4">
                  <div className="h-8 w-px bg-black/20 dark:bg-white/20 md:h-10" />
                  <div className="flex items-center justify-center">{children}</div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 DOCK ICON                                  */
/* -------------------------------------------------------------------------- */

function DockIcon({ mouseX, title, icon, href }: { mouseX: MotionValue<number>; title: string; icon: React.ReactNode; href: string }) {
  const canHover = useCanHover();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  /* -------------------------- DISTANCE CALC -------------------------- */
  const distance = useTransform(mouseX, (x) => {
    if (!canHover) return Infinity;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    return x - rect.left - rect.width / 2;
  });

  /* -------------------------- MAGNIFY -------------------------- */
  const size = useSpring(useTransform(distance, [-160, 0, 160], [40, 76, 40]), { stiffness: 300, damping: 24, mass: 0.5 });

  const iconSize = useSpring(useTransform(distance, [-160, 0, 160], [18, 38, 18]), { stiffness: 300, damping: 24, mass: 0.5 });

  const snapX = useSpring(useTransform(distance, [-200, 0, 200], [14, 0, -14]), { stiffness: 280, damping: 22 });

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{
          width: canHover ? size : 40,
          height: canHover ? size : 40,
          x: canHover ? snapX : 0,
        }}
        onMouseEnter={() => canHover && setHovered(true)}
        onMouseLeave={() => canHover && setHovered(false)}
        className="
          relative flex aspect-square items-center justify-center
          rounded-full
          bg-white/40 dark:bg-white/10
          backdrop-blur-md
          shadow-sm
          will-change-transform
          active:scale-95
        "
      >
        {/* Tooltip */}
        <AnimatePresence>
          {hovered && canHover && (
            <motion.div
              initial={{ opacity: 0, y: 6, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 4, x: "-50%" }}
              transition={{ duration: 0.15 }}
              className="
                absolute -top-9 left-1/2
                rounded-md
                px-2 py-0.5 text-xs
                bg-[var(--glass-bg)]
                border border-[var(--glass-border)]
                backdrop-blur-md
                shadow-md
                whitespace-nowrap
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
