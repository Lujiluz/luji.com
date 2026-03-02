"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { IconHome } from "@tabler/icons-react";
import { Briefcase, Code2, FileTextIcon, MailIcon, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

// Ini rahasianya! Load FloatingDock HANYA di sisi client setelah browser senggang
const FloatingDock = dynamic(() => import("@/components/ui/floating-dock").then((mod) => mod.FloatingDock), {
  ssr: false,
});

const Header = () => {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="size-5 text-foreground/80" />,
      href: "#home",
    },
    {
      title: "Work",
      icon: <Briefcase className="size-5 text-foreground/80" />,
      href: "#projects",
    },
    {
      title: "Skills",
      icon: <Code2 className="size-5 text-foreground/80" />,
      href: "#skills",
    },
    {
      title: "Experience",
      icon: <Sparkles className="size-5 text-foreground/80" />,
      href: "#experience",
    },
    {
      title: "Writing",
      icon: <FileTextIcon className="size-5 text-foreground/80" />,
      href: "#writing",
    },
    {
      title: "Contact",
      icon: <MailIcon className="size-5 text-foreground/80" />,
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
