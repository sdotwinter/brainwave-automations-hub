import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Rocket, TrendingUp, CreditCard, Workflow, Coffee, Brain, ChevronDown } from "lucide-react";

const projects = [
  {
    icon: Brain,
    title: "AI Intake Leak Finder",
    description: "Detects missed leads in real time",
    tech: ["Make.com", "GoHighLevel", "Meta API"],
    problem: "Law firms were losing 20-30% of leads due to broken handoffs between Meta Ads, forms, and CRM systems.",
    solution: "Built Make.com workflow with duplicate detection, form matching, and real-time Slack alerts for anomalies.",
    results: ["Reduced lead loss from 25% to under 3%", "Recovered $50K+ in lost opportunities in first month", "Automated QA catching issues within 5 minutes"],
  },
  {
    icon: TrendingUp,
    title: "90-Day AI Visibility Audit",
    description: "Automated audit system generating dashboards and reports",
    tech: ["Make.com", "Looker Studio", "GPT API"],
    problem: "Manual audits took 8+ hours per client and lacked consistency across different marketing channels.",
    solution: "Created automated pipeline pulling data from GA4, Meta, Google Ads, and Search Console. GPT analyzes patterns and generates insights.",
    results: ["Cut audit time from 8 hours to 45 minutes", "Increased audit capacity by 10x", "Standardized reporting across 30+ clients"],
  },
  {
    icon: Workflow,
    title: "Slack-Synced Project Management",
    description: "Kanban system linking project stages with Sheets and ad performance data",
    tech: ["Slack API", "Google Sheets", "n8n"],
    problem: "Teams using separate tools for project tracking, budget management, and client communication led to misalignment.",
    solution: "Built n8n automation syncing Slack channels with Google Sheets budget tracker and matter status updates.",
    results: ["Reduced status update meetings by 60%", "Real-time budget visibility for all stakeholders", "Automated client notifications on milestone completion"],
  },
  {
    icon: CreditCard,
    title: "ReCredit - Shopify Returns App",
    description: "Automated store-credit system for Shopify using Supabase backend",
    tech: ["Shopify API", "Supabase", "Lovable.dev"],
    problem: "Manual return processing and store credit issuance created delays and customer frustration.",
    solution: "Built Shopify app with webhook automation for return detection, credit calculation, and customer notifications via Supabase.",
    results: ["Reduced return processing time by 85%", "Eliminated manual credit entry errors", "Improved customer satisfaction scores by 40%"],
  },
  {
    icon: Coffee,
    title: "Custom HitPay Payment Plugin",
    description: "WordPress plugin handling complex payment redirects and callbacks",
    tech: ["WordPress", "HitPay API", "PHP"],
    problem: "Standard payment plugins couldn't handle tourism booking requirements with variable pricing and date-based inventory.",
    solution: "Developed custom WordPress plugin integrating HitPay API with dynamic pricing rules and booking confirmation flows.",
    results: ["Enabled online bookings 24/7", "Increased booking conversion rate by 35%", "Automated payment reconciliation saving 5 hours/week"],
  },
  {
    icon: Rocket,
    title: "AI Visibility Pilot",
    description: "Uses Google AI Overviews and ChatGPT schema for SEO growth",
    tech: ["SEO", "AI Integration", "Analytics"],
    problem: "Traditional SEO strategies weren't adapting to AI-powered search results and ChatGPT visibility.",
    solution: "Developed schema markup and content optimization specifically targeting AI Overview features and ChatGPT citations.",
    results: ["Featured in 15+ AI Overview results", "30% increase in organic visibility", "Generated qualified leads from AI search citations"],
  },
];

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <section id="projects" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Case Studies & Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground">Click any project to see the full story</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isExpanded = expandedProject === index;
            
            return (
              <motion.div
                key={index}
                layout
                className={`${isExpanded ? "md:col-span-2 lg:col-span-3" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group cursor-pointer"
                  onClick={() => toggleProject(index)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="text-xs px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-border mt-4 grid md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center text-xs">?</span>
                              Problem
                            </h4>
                            <p className="text-sm text-muted-foreground">{project.problem}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-xs">→</span>
                              Solution
                            </h4>
                            <p className="text-sm text-muted-foreground">{project.solution}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">✓</span>
                              Results
                            </h4>
                            <ul className="space-y-2">
                              {project.results.map((result, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
