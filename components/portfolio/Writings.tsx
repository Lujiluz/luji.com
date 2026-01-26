"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const articles = [
  {
    title: "Designing for Scale: Lessons from Migrating to Microservices",
    excerpt: "A practical guide on when microservices make sense, common pitfalls to avoid, and patterns that actually work in production.",
    category: "Architecture",
    readTime: "8 min",
    date: "2024",
    link: "#",
  },
  {
    title: "Performance Optimization: Beyond the Basics",
    excerpt: "Exploring advanced techniques for identifying and fixing performance bottlenecks—from database query analysis to frontend bundle optimization.",
    category: "Performance",
    readTime: "12 min",
    date: "2024",
    link: "#",
  },
  {
    title: "Building Reliable Systems with Graceful Degradation",
    excerpt: "How to design applications that fail gracefully, maintain core functionality during outages, and recover automatically.",
    category: "Reliability",
    readTime: "6 min",
    date: "2023",
    link: "#",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Writing() {
  return (
    <section id="writing" className="relative py-24 bg-[hsl(var(--muted)/0.3)]">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }} className="mb-16">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Writing</span>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Technical insights & learnings</h2>
        </motion.div>

        {/* Articles */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <motion.a key={article.title} href={article.link} variants={itemVariants} className="group block h-full">
              <Card
                className="
                  relative h-full
                  bg-background/70 backdrop-blur-md
                  border-border/60
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="font-mono text-xs">
                      {article.category}
                    </Badge>

                    <ArrowUpRight
                      className="
                        h-4 w-4
                        text-muted-foreground
                        transition-all duration-300
                        group-hover:text-primary
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </div>

                  <CardTitle
                    className="
                      leading-snug
                      transition-colors duration-300
                      group-hover:text-primary
                    "
                  >
                    {article.title}
                  </CardTitle>

                  <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
