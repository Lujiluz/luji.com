"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { IconBrandGithub, IconBrandX, IconExchange, IconHome, IconNewSection, IconTerminal2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-foreground/80" />,
      href: "#",
    },
    {
      title: "Products",
      icon: <IconTerminal2 className="h-full w-full text-foreground/80" />,
      href: "#",
    },
    {
      title: "Components",
      icon: <IconNewSection className="h-full w-full text-foreground/80" />,
      href: "#",
    },
    {
      title: "Changelog",
      icon: <IconExchange className="h-full w-full text-foreground/80" />,
      href: "#",
    },
    {
      title: "Twitter",
      icon: <IconBrandX className="h-full w-full text-foreground/80" />,
      href: "#",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-foreground/80" />,
      href: "#",
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className={cn("flex items-center gap-2 rounded-2xl", "bg-surface-elevated/80 backdrop-blur-md", "border border-border", "px-2 shadow-lg")}>
        {/* Floating Dock */}
        <FloatingDock items={links} desktopClassName="" />

        {/* Divider */}
        <div className="h-10 w-px border border-border" />

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
