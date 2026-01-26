import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MotionWrapper } from "../ui/motion-wrapper";

const skillCategories = [
  {
    category: "Frontend",
    description: "Building responsive, accessible interfaces",
    skills: [
      { name: "React / Next.js", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Vue.js", level: "Advanced" },
      { name: "Testing (Jest, Playwright)", level: "Advanced" },
    ],
  },
  {
    category: "Backend",
    description: "Designing scalable APIs and services",
    skills: [
      { name: "Node.js", level: "Expert" },
      { name: "Python", level: "Advanced" },
      { name: "Go", level: "Intermediate" },
      { name: "PostgreSQL", level: "Expert" },
      { name: "Redis", level: "Advanced" },
      { name: "GraphQL / REST", level: "Expert" },
    ],
  },
  {
    category: "Infrastructure",
    description: "Deploying and scaling systems",
    skills: [
      { name: "AWS / GCP", level: "Advanced" },
      { name: "Docker / Kubernetes", level: "Advanced" },
      { name: "CI/CD (GitHub Actions)", level: "Expert" },
      { name: "Terraform", level: "Intermediate" },
      { name: "Monitoring (Datadog)", level: "Advanced" },
    ],
  },
];

const levelVariants: Record<string, "default" | "secondary" | "glass" | "outline"> = {
  Expert: "glass",
  Advanced: "outline",
  Intermediate: "secondary",
};

export default function Skills() {
  return (
    <section id="skills" className="section-spacing bg-muted/30">
      <div className="section-container">
        <MotionWrapper initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Technical Skills</span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2">Tools and technologies I work with</h2>
        </MotionWrapper>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <MotionWrapper key={category.category} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.skills.map((skill) => (
                      <li key={skill.name} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{skill.name}</span>
                        <Badge variant={levelVariants[skill.level]} className="font-mono text-xs">
                          {skill.level}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
