import { Card } from "@/components/ui/card";

const skillCategories = [
  {
    category: "Automation",
    skills: ["Make.com", "n8n", "Lovable.dev", "GoHighLevel", "Zapier"],
  },
  {
    category: "APIs & Backend",
    skills: ["Supabase", "REST", "Webhooks", "JSON", "HitPay API"],
  },
  {
    category: "Data & Analytics",
    skills: ["Google Sheets", "Looker Studio", "GA4", "Meta Business Suite"],
  },
  {
    category: "Marketing",
    skills: ["Google Ads", "Meta Ads", "Beehiiv", "Hypefury", "Tweet Hunter"],
  },
  {
    category: "Languages",
    skills: ["JavaScript (basic)", "SQL (intermediate)", "Python (scripts)"],
  },
  {
    category: "CMS & E-commerce",
    skills: ["WordPress", "WooCommerce", "Shopify"],
  },
];

const TechnicalSkills = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((item, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">
                {item.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-muted/50 text-foreground text-sm rounded-full border border-border hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
