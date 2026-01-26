import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  `
  inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium
  backdrop-blur-md
  transition-all duration-200
  `,
  {
    variants: {
      variant: {
        default: `
          bg-primary/90 text-primary-foreground
          hover:bg-primary
        `,
        secondary: `
          bg-secondary/80 text-secondary-foreground
          hover:bg-secondary
        `,
        outline: `
          border border-border
          bg-background/40
          hover:bg-background/70
        `,
        glass: `
          bg-[hsl(var(--accent))]/20 text-[hsl(var(--accent))]
          border border-white/15
          shadow-sm
          hover:bg-white/20
        `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
