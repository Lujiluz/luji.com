"use client";

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

const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

/* -------------------------------------------------------------------------- */
/*                               FLOATING DOCK                                */
/* -------------------------------------------------------------------------- */

export function FloatingDock({ items, className, children }: { items: DockItem[]; className?: string; children?: React.ReactNode }) {
  const mouseX = useMotionValue(Infinity);

  /* -------------------------- AUTO HIDE ON SCROLL -------------------------- */
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    return scrollY.on("change", (y) => {
      const delta = y - lastY.current;

      if (y < 80) {
        setVisible(true);
      } else if (delta > 8) {
        setVisible(false); // scroll down
      } else if (delta < -8) {
        setVisible(true); // scroll up
      }

      lastY.current = y;
    });
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className={cn(
            `
            fixed bottom-4 left-1/2 -translate-x-1/2 z-50
            `,
            className,
          )}
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

              h-14 md:ps-8 sm:ps-4 ps-6 pe-4 pb-2 space-x-1.5 md:space-x-4
              sm:h-14 sm:px-3 sm:pb-2.5
              md:h-16 md:px-4 md:pb-3
            "
          >
            {items.map((item) => (
              <DockIcon key={item.title} mouseX={mouseX} {...item} />
            ))}

            {children && (
              <div className="flex items-center gap-4">
                {/* divider */}
                <div className="h-8 w-px bg-black/20 dark:bg-white/20 md:h-10" />

                {/* extra controls */}
                <div onMouseEnter={() => mouseX.set(Infinity)} onMouseMove={() => mouseX.set(Infinity)} className="flex items-center justify-center">
                  {children}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  DOCK ICON                                 */
/* -------------------------------------------------------------------------- */

function DockIcon({ mouseX, title, icon, href }: { mouseX: MotionValue<number>; title: string; icon: React.ReactNode; href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  /* ----------------------------- DISTANCE LOGIC ---------------------------- */
  const distance = useTransform(mouseX, (val) => {
    if (!canHover) return Infinity;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return val - bounds.x - bounds.width / 2;
  });

  /* ----------------------------- SIZE (MAGNIFY) ----------------------------- */
  const size = useSpring(useTransform(distance, [-160, 0, 160], [40, 76, 40]), { stiffness: 300, damping: 24, mass: 0.5 });

  const iconSize = useSpring(useTransform(distance, [-160, 0, 160], [18, 38, 18]), { stiffness: 300, damping: 24, mass: 0.5 });

  /* -------------------------- SNAP TO CENTER (X) ---------------------------- */
  const snapX = useSpring(useTransform(distance, [-200, 0, 200], [14, 0, -14]), { stiffness: 300, damping: 22 });

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
          transition-colors
          active:scale-95
        "
      >
        {/* Tooltip (Desktop only) */}
        <AnimatePresence>
          {hovered && canHover && (
            <motion.div
              initial={{ opacity: 0, y: 8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 4, x: "-50%" }}
              transition={{ duration: 0.15 }}
              className="
                absolute -top-9 left-1/2
                whitespace-nowrap rounded-md
                px-2 py-0.5 text-xs
                bg-[var(--glass-bg)]
                border border-[var(--glass-border)]
                backdrop-blur-md
                shadow-md
              "
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{
            width: canHover ? iconSize : 18,
            height: canHover ? iconSize : 18,
          }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
