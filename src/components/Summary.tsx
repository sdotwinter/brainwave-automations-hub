import { Card } from "@/components/ui/card";

const Summary = () => {
  return (
    <section id="summary" className="py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Professional Summary
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
          <p className="text-lg text-foreground leading-relaxed">
            Automation architect with <span className="text-primary font-semibold">5+ years of experience</span> designing 
            and running AI systems across marketing, legal, and e-commerce. Skilled at fixing broken workflows, removing 
            manual work, and creating systems that generate new revenue.
          </p>
          <p className="text-lg text-foreground leading-relaxed mt-6">
            Builds end-to-end automations and turns messy, manual processes into clean, 
            measurable systems that scale.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default Summary;
