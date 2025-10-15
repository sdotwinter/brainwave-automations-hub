import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Founder / Automation Architect",
    company: "Brainwave LLC",
    period: "2023–Present",
    description: "AI Visibility & PPC Consultancy",
    achievements: [
      "Developed AI Visibility tools combining SEO, Ads, and automation to increase ROI by 4–8×",
      "Created AI Intake Leak Finder, a Make.com system that recovers lost leads between Meta Ads, GoHighLevel, and CRMs",
      "Designed QA workflows that flag missed calls, duplicates, and broken intake paths in real time",
      "Integrated Meta, Google Ads, and GoHighLevel data for accurate lead attribution",
      "Built reusable templates for onboarding, reporting, and campaign sync",
    ],
  },
  {
    role: "Strategic Advisor & Automation Engineer",
    company: "Laukaitis Law",
    period: "2025–Present",
    description: "Rebuilt client intake systems with automation and AI",
    achievements: [
      "Connected Meta → Google Sheets → GoHighLevel to track all ad leads",
      "Added duplicate checks, form-matching, and webhook logic to stop data loss",
      "Built Slack Kanban automations syncing matters, budgets, and tag-based triggers",
      "Automated follow-ups and reporting to improve conversions and data accuracy",
    ],
  },
  {
    role: "Founder",
    company: "PanglaoFishing.com",
    period: "2019–Present",
    description: "Used automation and digital systems to grow tourism businesses",
    achievements: [
      "Automated bookings and payments using WooCommerce, HitPay, and PluginHive",
      "Linked pricing, scheduling, and reconciliation across CRM and Sheets",
      "Built cost-tracking systems and automated margin reports",
      "Set up SEO pipelines and dashboards for daily business insights",
    ],
  },
  {
    role: "Product Designer & Builder",
    company: "ReCredit (Shopify SaaS)",
    period: "2024–Present",
    description: "Creating a Shopify app for store-credit returns using Supabase and Lovable.dev",
    achievements: [
      "Built automation for detecting returns, issuing credit, and notifying customers",
      "Linked Shopify API to backend systems with webhooks",
      "Produced MVP prototypes and developer docs for hand-off and scaling",
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative pl-8 md:pl-20 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-[-8px] md:left-[23px] top-0">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary shadow-glow flex items-center justify-center">
                    <Briefcase className="w-3 h-3 text-background" />
                  </div>
                </div>

                <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-1">{exp.role}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                    <p className="text-sm text-secondary italic mt-2">{exp.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
