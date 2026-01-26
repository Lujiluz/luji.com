"use client";

import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import { WavyBackground } from "../ui/wavy-background";
// import { MovingBorder } from "@/components/ui/moving-border";

const socialLinks = [
  { icon: IconBrandGithub, href: "#", label: "GitHub" },
  { icon: IconBrandLinkedin, href: "#", label: "LinkedIn" },
  { icon: IconBrandX, href: "#", label: "Twitter" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <WavyBackground speed="slow" containerClassName="bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }} className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Contact</span>

            <h2 className="mt-2 mb-4 text-3xl font-semibold md:text-4xl">Let’s build something together</h2>

            <p className="mb-10 text-muted-foreground">I’m currently available for freelance projects and interesting opportunities. If you have something in mind and need a reliable developer, let’s talk.</p>

            {/* Primary CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="inline-block">
              <a
                href="mailto:hello@example.com"
                className="
                flex items-center gap-3
                rounded-xl px-8 py-4
                font-medium
                shadow-md
                bg-background/70 backdrop-blur-md
              "
              >
                <Mail className="h-5 w-5" />
                hello@example.com
              </a>
            </motion.div>

            {/* Socials */}
            <div className="mt-10 flex items-center justify-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.div key={label} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Button variant="default" size="icon" asChild className="rounded-xl bg-background/70 backdrop-blur-md text-foreground hover:text-primary shadow-md">
                    <a href={href} aria-label={label}>
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </WavyBackground>
    </section>
  );
}
