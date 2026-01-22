// "use client";

// import * as React from "react";
// import { flushSync } from "react-dom";
// import { useTheme } from "next-themes";
// import { Switch } from "@/components/ui/switch";
// import { Moon, Sun } from "lucide-react";

// export function ThemeToggle() {
//   const { theme, setTheme, resolvedTheme } = useTheme();
//   const ref = React.useRef<HTMLSpanElement>(null);

//   const isDark = resolvedTheme === "dark";

//   const toggleTheme = async (checked: boolean) => {
//     /**
//      * Fallback kalo Transition API ga support
//      */
//     if (!ref.current || !document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
//       setTheme(checked ? "dark" : "light");
//       return;
//     }

//     await document.startViewTransition(() => {
//       flushSync(() => {
//         setTheme(checked ? "dark" : "light");
//       });
//     }).ready;

//     const { top, left, width, height } = ref.current.getBoundingClientRect();

//     const x = left + width / 2;
//     const y = top + height / 2;

//     const right = window.innerWidth - left;
//     const bottom = window.innerHeight - top;

//     const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

//     document.documentElement.animate(
//       {
//         clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
//       },
//       {
//         duration: 900,
//         easing: "ease-in-out",
//         pseudoElement: "::view-transition-new(root)",
//       },
//     );
//   };

//   return (
//     <Switch checked={isDark} onCheckedChange={toggleTheme} className="relative">
//       <span ref={ref} className="pointer-events-none flex h-5 w-5 items-center justify-center">
//         {isDark ? <Moon className="h-4 w-4 text-foreground/80" /> : <Sun className="h-4 w-4 text-foreground/80" />}
//       </span>
//     </Switch>
//   );
// }

"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const ref = React.useRef<HTMLButtonElement>(null);

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
    // <Switch checked={isDark} onCheckedChange={toggleTheme} className="relative cursor-pointer">
    //   {/* <span ref={ref} className="pointer-events-none absolute inset-0 flex items-center justify-center"> */}
    //   {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
    //   {/* </span> */}
    // </Switch>
    <Button variant="outline" size="icon" onClick={() => toggleTheme(!isDark)} className="relative cursor-pointer aspect-square items-center justify-center rounded-full" ref={ref}>
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}
