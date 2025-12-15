import { TrendingDown } from "lucide-react";
const AuditHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-[120px] animate-glow" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-destructive rounded-full blur-[140px] animate-glow"
          style={{
            animationDelay: "1s",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-4">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">Revenue Leakage Calculator</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-destructive to-accent bg-clip-text text-transparent leading-tight py-[5px]">
            How Much Revenue Are You Losing to Lead Leaks?
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto">
            Most businesses lose 20-40% of their leads to intake leaks. Discover your lost revenue in under 2 minutes.
          </p>

          {/* Scroll indicator */}
          <div className="pt-8 flex justify-center animate-bounce">
            <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-primary rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AuditHero;
