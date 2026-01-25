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
      <div className={cn("flex items-center gap-2 rounded-2xl", "bg-secondary backdrop-blur-xl", "", "px-2 shadow-lg")}>
        {/* Floating Dock */}
        <FloatingDock items={links} desktopClassName="" />

        {/* Divider */}
        <div className="h-10 w-[0.5px] me-2 border border-border bg-primary" />

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
