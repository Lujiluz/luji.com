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
    period: "Feb 2024 — June 2024",
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
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }} className="mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Career</span>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Experience & Growth</h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* TIMELINE LINE:
            Mobile: Left aligned (pl-4 or so)
            Desktop: Center aligned
          */}
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />

          <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div key={exp.role + (exp.company ?? exp.university)} variants={itemVariants} className="relative md:grid md:grid-cols-2">
                  {/* TIMELINE DOT:
                    Mobile: Left aligned (nempel sama garis kiri)
                    Desktop: Center aligned
                  */}
                  <div className="absolute left-4 top-6 -translate-x-1/2 md:left-1/2">
                    <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                  </div>

                  {/* CARD CONTENT:
                    Mobile: Padding left besar biar ga nabrak garis
                    Desktop: Kiri kanan ganti-gantian
                  */}
                  <div className={`pl-12 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12 md:text-left"}`}>
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
                        {/* Header alignment: Mobile left, Desktop dynamic */}
                        <div className={`flex flex-col gap-1 ${isLeft ? "md:flex-row-reverse md:justify-between md:items-baseline" : "md:flex-row md:justify-between md:items-baseline"}`}>
                          <div>
                            <CardTitle className="text-base md:text-lg font-semibold">{exp.role}</CardTitle>
                            <CardDescription className="text-sm">{exp.company ?? exp.university}</CardDescription>
                          </div>
                          <span className="font-mono text-xs text-muted-foreground whitespace-nowrap mt-1 md:mt-0">{exp.period}</span>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{exp.description}</p>

                        <Separator className="my-4" />

                        {/* List Highlights */}
                        <ul className={`space-y-2 ${isLeft ? "md:items-end" : "md:items-start"}`}>
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className={`flex items-start gap-2 text-sm text-muted-foreground ${isLeft ? "md:flex-row-reverse" : "flex-row"}`}>
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                              <span className="flex-1">{highlight}</span>
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
