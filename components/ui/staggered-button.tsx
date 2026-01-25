"use client";

import React, { ReactNode, useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { AnimatedText } from "./animated-text";

interface StaggeredButtonProps extends React.ComponentProps<typeof Button> {
  text: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  direction?: "up" | "down";
}

const StaggeredButton = ({ text, leftIcon, rightIcon, direction = "up", className, asChild, ...props }: StaggeredButtonProps) => {
  const [state, setState] = useState<"rest" | "hover">("rest");

  const content = (
    <span className="flex items-center gap-2">
      {leftIcon && <span className="inline-flex">{leftIcon}</span>}

      <span className="relative inline-block">
        <span className="sr-only">{text}</span>
        <AnimatedText aria-hidden text={text} direction={direction} animate={state} />
      </span>

      {rightIcon && <span className="inline-flex">{rightIcon}</span>}
    </span>
  );

  const sharedProps = {
    onMouseEnter: () => setState("hover"),
    onMouseLeave: () => setState("rest"),
  };

  if (asChild) {
    return (
      <Button asChild className={cn("relative overflow-hidden", className)} {...sharedProps} {...props}>
        {React.isValidElement(props.children) ? React.cloneElement(props.children, {}, content) : content}
      </Button>
    );
  }

  return (
    <Button className={cn("relative overflow-hidden", className)} {...sharedProps} {...props}>
      {content}
    </Button>
  );
};

export default StaggeredButton;
