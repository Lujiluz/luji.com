import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconBrandGithub } from "@tabler/icons-react";
import { SpotlightCard } from "../ui/spotlight-card";
import { MotionWrapper } from "../ui/motion-wrapper";

const projects = [
  {
    title: "Super App Platform",
    description: "High-performance super app platform handling 70k+ daily active users with PPOB services, real-time notifications, seamless payment integration, video streaming, and chat features.",
    problem: "Legacy system couldn't scale with growing user base and high severity security issues occurs.",
    solution: "Optimize backend architecture and enhance security protocols.",
    impact: "Achieved 96.9% uptime and 50% faster load times, improving user retention by 30%. More reliable and secure platform.",
    stack: ["Express", "PostgreSQL", "Redis", "BullMQ", "Socket.IO", "RTMP for live streaming"],
    link: "#",
    github: "#",
  },
  {
    title: "Pluto Koi Landing Page and Dashboard",
    description: "Redesigned landing page and developed user dashboard for Pluto Koi, a Shiro Utsuri's Koi Breeding Centre, implemented an intuitive design and seamless navigation.",
    problem: "Company lacked online platform for its growing customer base",
    solution: "Created a user-friendly website and dashboard to manage and join an auction event, showcase products, and provide company information.",
    impact: "Increased user engagement by 40% and boosted online inquiries by 25%.",
    stack: ["Next.js", "Express", "MongoDB", "Socket.IO", "NGINX", "Vercel"],
    link: "https://plutokoi.com",
    github: "#",
  },
  {
    title: "Adaptive Bitrate Implementation on Video Streaming Service",
    description: "Implemented adaptive bitrate streaming for a video platform, enhancing user experience by dynamically adjusting video quality based on network conditions and device capabilities.",
    problem: "Inconsistent video playback quality leading to user dissatisfaction and increased buffering times.",
    solution: "Developed an adaptive bitrate streaming solution using HLS and DASH protocols that could adjust bitrate between 480P to 720P in real-time.",
    impact: "Increased user satisfaction by 35% and reduced buffering times by 50%, leading to longer viewing sessions.",
    stack: ["FFmpeg", "Node.js", "HLS", "DASH"],
    link: "#",
    github: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-spacing" data-dock>
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
}
