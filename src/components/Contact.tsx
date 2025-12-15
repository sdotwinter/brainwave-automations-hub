import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Linkedin, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Ready to Fix Your Lead Leaks?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <Card className="p-8 md:p-12 bg-card/50 backdrop-blur border-border">
          <div className="text-center space-y-8">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stop losing revenue to lead leakage. Book a free 30-minute automation audit and discover exactly where
              your leads are slipping away.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300 w-full md:w-auto"
                asChild
              >
                <a
                  href="https://calendly.com/sean-winter/case-leaks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Book Free Audit
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 w-full md:w-auto"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/seanewinter/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="w-5 h-5" />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>

            <div className="pt-8 border-t border-border">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Based in Panglao • Available for Remote Work</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground font-mono">© 2025 Sean Winter. Built with automation in mind.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
