"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { IconBrandGithub, IconHome } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Briefcase, Code2, FileTextIcon, MailIcon, Sparkles } from "lucide-react";

const Header = () => {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-foreground/80" />,
      href: "/",
    },
    {
      title: "Work",
      icon: <Briefcase className="h-full w-full text-foreground/80" />,
      href: "#projects",
    },
    {
      title: "Skills",
      icon: <Code2 className="h-full w-full text-foreground/80" />,
      href: "#skills",
    },
    {
      title: "Experience",
      icon: <Sparkles className="h-full w-full text-foreground/80" />,
      href: "#experience",
    },
    {
      title: "Writing",
      icon: <FileTextIcon className="h-full w-full text-foreground/80" />,
      href: "#writing",
    },
    {
      title: "Contact",
      icon: <MailIcon className="h-full w-full text-foreground/80" />,
      href: "#contact",
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className={cn("relative flex items-center gap-2 rounded-2xl px-2", "bg-[var(--glass-bg)] border border-[var(--glass-border) backdrop-blur-md shadow-sm")}>
        <FloatingDock items={links} desktopClassName="" />

        <div className="h-10 w-px bg-black/50 dark:bg-white/50 mx-1" />

        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
