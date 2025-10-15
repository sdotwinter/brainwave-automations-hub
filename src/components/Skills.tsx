import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Workflow, Database, Zap, Code, BarChart, Settings } from "lucide-react";

const skills = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    items: ["Make.com", "n8n", "Zapier", "Lovable.dev"],
  },
  {
    icon: Database,
    title: "API & Backend",
    items: ["Supabase", "REST/JSON", "Webhooks", "HitPay API"],
  },
  {
    icon: Zap,
    title: "AI Systems",
    items: ["GPT-based automation", "AI Visibility tools", "Process mapping"],
  },
  {
    icon: Settings,
    title: "CRM & Integration",
    items: ["GoHighLevel", "Slack", "Google Sheets", "Meta Leads"],
  },
  {
    icon: BarChart,
    title: "Analytics & Tracking",
    items: ["Conversion tracking", "Reporting", "QA systems"],
  },
  {
    icon: Code,
    title: "Development",
    items: ["JavaScript", "SQL", "Python", "No-code SaaS"],
  },
];

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="skills" ref={ref} className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Core Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const proficiencyLevel = index < 2 ? 95 : index < 4 ? 85 : 80; // Varying skill levels
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    {/* Proficiency indicator */}
                    <div className="relative w-16 h-16">
                      <svg className="transform -rotate-90 w-16 h-16">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          className="text-border"
                        />
                        <motion.circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="url(#gradient)"
                          strokeWidth="4"
                          fill="transparent"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                          animate={inView ? { 
                            strokeDashoffset: 2 * Math.PI * 28 * (1 - proficiencyLevel / 100)
                          } : {}}
                          transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop offset="100%" stopColor="hsl(var(--secondary))" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{proficiencyLevel}%</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{skill.title}</h3>
                  <ul className="space-y-2">
                    {skill.items.map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="text-muted-foreground text-sm flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 + i * 0.05 + 0.4, duration: 0.3 }}
                      >
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
