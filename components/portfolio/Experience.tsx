"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "../ui/separator";

const experiences = [
  {
    role: "Backend Developer",
    company: "PT. Kreasindo Karya Abadi",
    period: "2024 — Present",
    description: "Develop and maintain backend services for a high-traffic super app platform and other projects, focusing on scalability, security, and performance optimization using Express, PostgreSQL, and many more.",
    highlights: [
      "Optimized backend architecture to handle 70k+ daily active users, achieving 96.9% uptime and 50% faster load times",
      "Implemented adaptive bitrate streaming solution, increasing user satisfaction by 35% and reducing buffering times by 50%",
      "Collaborated with cross-functional teams to deliver user-friendly web applications, boosting user engagement by 40%",
    ],
  },
  {
    role: "Studi Independen - Full Stack Developer",
    company: "PT. Global Investasi (LearningX)",
    period: "February, 2024 — June, 2024",
    description: "Learned and implemented full stack development concepts by building a project management application using Python with Flask and Jinja2 template engine.",
    highlights: ["Developed user authentication and authorization system", "Implemented CRUD operations for project and task management", "Deployed application on Glitch with MongoDB database integration"],
  },
  {
    role: "Bachelor Degree in Information Technology",
    university: "Universitas Insan Pembangunan Indonesia",
    period: "2021 — 2025",
    description: "Pursuing a Bachelor's degree in Information Technology, focusing on software development, data structures, algorithms, and system design.",
    highlights: ["Maintained a GPA of 3.54/4.0 while actively working as a Backend Developer", "Completed coursework in advanced programming, database management, and web development"],
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

export default function Experience() {
  return (
    <section id="experience" className="relative py-24" data-dock>
      <div className="mx-auto max-w-5xl px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }} className="mb-16">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Career</span>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Experience & Growth</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop only) */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />

          <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div key={exp.role + (exp.company ?? exp.university)} variants={itemVariants} className="relative md:grid md:grid-cols-2">
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 top-6 hidden -translate-x-1/2 md:block">
                    <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                  </div>

                  {/* Card */}
                  <div className={`${isLeft ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}>
                    <Card
                      className="
                        relative
                        bg-background/70 backdrop-blur-md
                        border-border/60
                        transition-all
                        hover:shadow-lg
                        hover:-translate-y-1
                      "
                    >
                      <CardHeader className="pb-3">
                        <div className={`flex items-start justify-between gap-4 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                          <div>
                            <CardTitle className="text-lg">{exp.role}</CardTitle>
                            <CardDescription>{exp.company ?? exp.university}</CardDescription>
                          </div>
                          <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{exp.period}</span>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground">{exp.description}</p>

                        <Separator className="my-4" />

                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1 text-primary">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
