import { Mail, MapPin, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-[120px] animate-glow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-[140px] animate-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-block">
            <div className="text-primary font-mono text-sm mb-4 tracking-wider">
              &lt;developer&gt;
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
            Sean Winter
          </h1>

          <p className="text-2xl md:text-3xl text-muted-foreground font-light">
            AI Automation Architect & Systems Strategist
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground pt-4">
            <a 
              href="mailto:sean@brainwave.llc" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">sean@brainwave.llc</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Remote</span>
            </div>
            <a 
              href="https://www.linkedin.com/in/seanewinter/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>

          <div className="pt-8">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300"
              asChild
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          <div className="inline-block pt-8">
            <div className="text-primary font-mono text-sm tracking-wider">
              &lt;/developer&gt;
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
