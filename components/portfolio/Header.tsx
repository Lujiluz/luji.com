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
      <FloatingDock items={links}>
        <ThemeToggle />
        </FloatingDock>
  );
};

export default Header;
