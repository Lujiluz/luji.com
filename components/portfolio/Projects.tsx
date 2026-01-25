import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconBrandGithub } from "@tabler/icons-react";
import { SpotlightCard } from "../ui/spotlight-card";
import { MotionWrapper } from "../ui/motion-wrapper";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "High-performance marketplace handling 10k+ daily transactions with real-time inventory management and automated fulfillment integration.",
    problem: "Legacy system couldn't scale beyond 1k daily orders",
    solution: "Rebuilt with event-driven architecture and optimized database queries",
    impact: "10x throughput, 60% reduction in page load times",
    stack: ["Next.js", "PostgreSQL", "Redis", "Stripe", "AWS"],
    link: "#",
    github: "#",
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time analytics platform processing millions of events daily with custom visualization engine and anomaly detection.",
    problem: "Teams lacked visibility into product metrics",
    solution: "Built streaming pipeline with interactive dashboards",
    impact: "Reduced decision-making time from days to minutes",
    stack: ["React", "TypeScript", "ClickHouse", "WebSocket", "D3.js"],
    link: "#",
    github: "#",
  },
  {
    title: "Developer Tooling",
    description: "Internal CLI and API toolkit that standardized deployment workflows across 50+ microservices.",
    problem: "Inconsistent deployment practices causing incidents",
    solution: "Unified toolchain with built-in validation and rollback",
    impact: "90% reduction in deployment-related incidents",
    stack: ["Go", "gRPC", "Docker", "Kubernetes", "Terraform"],
    link: "#",
    github: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section-spacing">
      <div className="section-container">
        <MotionWrapper initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Selected Work</span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2">Projects that solved real problems</h2>
        </MotionWrapper>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <MotionWrapper key={project.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <SpotlightCard className="p-6 md:p-8">
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                          <a href={project.github} aria-label="View source">
                            <IconBrandGithub className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                          <a href={project.link} aria-label="View project">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-mono text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 md:border-l md:border-border md:pl-8">
                    <div>
                      <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Problem</span>
                      <p className="text-sm text-muted-foreground mt-1">{project.problem}</p>
                    </div>
                    <div>
                      <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Solution</span>
                      <p className="text-sm text-muted-foreground mt-1">{project.solution}</p>
                    </div>
                    <div>
                      <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Impact</span>
                      <p className="text-sm text-accent font-medium mt-1">{project.impact}</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
