"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const ref = React.useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = async (checked: boolean) => {
    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(checked ? "dark" : "light");
      });
    }).ready;

    const { top, left, width, height } = ref.current?.getBoundingClientRect() ?? { top: 1000, left: 900, width: 0, height: 0 };
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: 900,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <Button variant="outline" size="icon" onClick={() => toggleTheme(!isDark)} className="relative cursor-pointer aspect-square items-center justify-center rounded-full bg-surface-subtle" ref={ref}>
      {!mounted ? <Moon className="h-4 w-4" /> : isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}
