// "use client";

// import { motion } from "framer-motion";
// import { Timeline } from "@/components/ui/timeline"; // <- Aceternity Timeline
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// /* ---------------------------------- */
// /* Data                               */
// /* ---------------------------------- */

// const experiences = [
//   {
//     role: "Senior Full-Stack Developer",
//     company: "Tech Company",
//     period: "2022 — Present",
//     description: "Leading development of core platform features, mentoring junior developers, and driving technical decisions for a product serving 500k+ users.",
//     highlights: ["Architected microservices migration reducing deployment time by 80%", "Led team of 5 engineers on critical revenue features", "Established testing standards improving coverage from 40% to 85%"],
//   },
//   {
//     role: "Full-Stack Developer",
//     company: "Growing Startup",
//     period: "2020 — 2022",
//     description: "Built and scaled web applications from MVP to production, working closely with product and design teams.",
//     highlights: ["Developed real-time collaboration features using WebSockets", "Optimized database queries reducing API latency by 70%", "Implemented CI/CD pipeline automating 100% of deployments"],
//   },
//   {
//     role: "Frontend Developer",
//     company: "Digital Agency",
//     period: "2018 — 2020",
//     description: "Created responsive web experiences for clients across fintech, healthcare, and e-commerce sectors.",
//     highlights: ["Delivered 15+ client projects on time and within budget", "Introduced component library reducing development time by 40%", "Mentored 2 junior developers"],
//   },
// ];

// /* ---------------------------------- */
// /* Transform → Timeline format        */
// /* ---------------------------------- */

// const timelineData = experiences.map((exp) => ({
//   title: exp.period,
//   content: (
//     <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease: "easeOut" }} className="pb-8">
//       <Card>
//         <CardHeader className="pb-2">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <CardTitle className="text-lg">{exp.role}</CardTitle>
//               <CardDescription>{exp.company}</CardDescription>
//             </div>
//             <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{exp.period}</span>
//           </div>
//         </CardHeader>

//         <CardContent>
//           <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>

//           <Separator className="my-4" />

//           <ul className="space-y-2">
//             {exp.highlights.map((highlight, i) => (
//               <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
//                 <span className="text-accent mt-0.5">•</span>
//                 <span>{highlight}</span>
//               </li>
//             ))}
//           </ul>
//         </CardContent>
//       </Card>
//     </motion.div>
//   ),
// }));

// /* ---------------------------------- */
// /* Experience Section                 */
// /* ---------------------------------- */

// const Experience = () => {
//   return (
//     <section id="experience" className="section-spacing">
//       <div className="section-container">
//         {/* Section header */}
//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
//           <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Career</span>
//           <h2 className="text-3xl md:text-4xl font-semibold mt-2">Experience and growth</h2>
//         </motion.div>

//         {/* Timeline */}
//         <Timeline data={timelineData} />
//       </div>
//     </section>
//   );
// };

// export default Experience;

"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const experiences = [
  {
    role: "Senior Full-Stack Developer",
    company: "Tech Company",
    period: "2022 — Present",
    description: "Leading development of core platform features, mentoring junior developers, and driving technical decisions for a product serving 500k+ users.",
    highlights: ["Architected microservices migration reducing deployment time by 80%", "Led team of 5 engineers on critical revenue features", "Established testing standards improving coverage from 40% to 85%"],
  },
  {
    role: "Full-Stack Developer",
    company: "Growing Startup",
    period: "2020 — 2022",
    description: "Built and scaled web applications from MVP to production, working closely with product and design teams.",
    highlights: ["Developed real-time collaboration features using WebSockets", "Optimized database queries reducing API latency by 70%", "Implemented CI/CD pipeline automating 100% of deployments"],
  },
  {
    role: "Frontend Developer",
    company: "Digital Agency",
    period: "2018 — 2020",
    description: "Created responsive web experiences for clients across fintech, healthcare, and e-commerce sectors.",
    highlights: ["Delivered 15+ client projects on time and within budget", "Introduced component library reducing development time by 40%", "Mentored 2 junior developers"],
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
    <section id="experience" className="relative py-24">
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
                <motion.div key={exp.role + exp.company} variants={itemVariants} className="relative md:grid md:grid-cols-2">
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
                            <CardDescription>{exp.company}</CardDescription>
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
