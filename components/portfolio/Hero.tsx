"use client";
import { cn } from "@/lib/utils";
import { Spotlight } from "../ui/spotlight";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Badge } from "../ui/badge";
import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { MotionWrapper } from "../ui/motion-wrapper";
import StaggeredButton from "../ui/staggered-button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pb-24 overflow-hidden" id="home" data-dock>
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="hsl(var(--accent))" />
      <div className="section-container relative z-10">
        <div className="max-w-3xl">
          <MotionWrapper initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-6">
            <Badge variant="secondary" className="text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/20 border-[hsl(var(--accent))]/20">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--accent))] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--accent))]"></span>
              </span>
              Available for projects
            </Badge>
          </MotionWrapper>

          <MotionWrapper initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight tracking-tight text-foreground">
              <TextGenerateEffect words="Full-Stack Developer building reliable, scalable systems" />
            </h1>
          </MotionWrapper>

          <MotionWrapper initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            I design and build web applications with focus on performance, maintainability, and user experience. From database architecture to pixel-perfect interfaces.
          </MotionWrapper>

          <MotionWrapper initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex items-center gap-4">
            <StaggeredButton asChild size="lg" text="View my work" direction="up" rightIcon={<ArrowDown className="w-4 h-4" />}>
              <a href="#projects" />
            </StaggeredButton>

            <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
              <a href="#contact">Let's talk →</a>
            </Button>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};
