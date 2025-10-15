import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, ArrowRight, User, Sparkles, MessageSquare, PartyPopper } from "lucide-react";

const demoSteps = [
  { 
    id: 1, 
    title: "Lead captured from Meta", 
    status: "processing",
    data: { name: "Jane Smith", email: "jane@example.com", source: "Meta Ads" }
  },
  { 
    id: 2, 
    title: "AI crafting personalized message", 
    status: "pending",
    data: { model: "GPT-5", action: "Generating response", tone: "Professional" }
  },
  { 
    id: 3, 
    title: "SMS sent to lead", 
    status: "pending",
    data: { phone: "+1 (555) 123-4567", status: "Delivered", message: "Hi Jane! Thanks for your interest..." }
  },
  { 
    id: 4, 
    title: "Duplicate check completed", 
    status: "pending",
    data: { status: "No duplicates found", verified: true }
  },
  { 
    id: 5, 
    title: "GoHighLevel CRM updated", 
    status: "pending",
    data: { action: "Contact created", id: "#12345", tags: "Meta Lead, SMS Sent" }
  },
  { 
    id: 6, 
    title: "Team notified via Slack", 
    status: "pending",
    data: { channel: "#new-leads", alert: "High-value lead assigned" }
  },
];

const LiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState(demoSteps);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isRunning && currentStep < steps.length) {
      // Auto-scroll on mobile
      if (window.innerWidth < 768 && stepRefs.current[currentStep]) {
        stepRefs.current[currentStep]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }

      const timer = setTimeout(() => {
        setSteps(prev => 
          prev.map((step, idx) => 
            idx === currentStep 
              ? { ...step, status: "complete" }
              : idx === currentStep + 1
              ? { ...step, status: "processing" }
              : step
          )
        );
        setCurrentStep(prev => prev + 1);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length && isRunning) {
      setTimeout(() => {
        setIsRunning(false);
        setCurrentStep(0);
        setSteps(demoSteps);
      }, 3000);
    }
  }, [currentStep, isRunning, steps.length]);

  const startDemo = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setSteps(prev => 
      prev.map((step, idx) => ({
        ...step,
        status: idx === 0 ? "processing" : "pending"
      }))
    );
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            AI Intake System Demo
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground">
            Watch the AI Intake Leak Finder in action
          </p>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur border-border">
          {/* Mock lead data */}
          <div className="mb-8 p-4 bg-background/50 rounded-lg border border-border overflow-hidden">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Incoming Lead</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex flex-col sm:grid sm:grid-cols-[120px_1fr] gap-1 sm:gap-2">
                <span className="text-muted-foreground font-medium">Name:</span>
                <span className="text-foreground">Jane Smith</span>
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-[120px_1fr] gap-1 sm:gap-2">
                <span className="text-muted-foreground font-medium">Email:</span>
                <span className="text-foreground break-all">jane@example.com</span>
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-[120px_1fr] gap-1 sm:gap-2">
                <span className="text-muted-foreground font-medium">Source:</span>
                <span className="text-foreground">Meta Ads Campaign</span>
              </div>
            </div>
          </div>

          {/* Workflow steps */}
          <div className="space-y-4 mb-8">
            <AnimatePresence mode="popLayout">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  ref={(el) => (stepRefs.current[index] = el)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className={`p-4 rounded-lg border transition-all duration-300 ${
                    step.status === "complete" 
                      ? "bg-primary/10 border-primary/50" 
                      : step.status === "processing"
                      ? "bg-secondary/10 border-secondary/50"
                      : "bg-muted/20 border-border"
                  }`}>
                    <div className="flex items-start gap-3">
                      {step.status === "complete" ? (
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      ) : step.status === "processing" ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mt-0.5"
                        >
                          <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                        </motion.div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{step.title}</p>
                        {step.status !== "pending" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="text-xs text-muted-foreground mt-2 space-y-1"
                          >
                            {Object.entries(step.data).map(([key, value]) => (
                              <div key={key} className="break-words">
                                <span className="capitalize font-medium">{key}:</span> {String(value)}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                      {step.status === "complete" && (
                        <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </div>

                  {/* Connecting line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-full w-0.5 h-4 bg-border" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Success message */}
          {currentStep >= steps.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-pulse" />
              <div className="relative p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/50 rounded-xl text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-block mb-3"
                >
                  <PartyPopper className="w-12 h-12 text-primary mx-auto" />
                </motion.div>
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Success!
                  <Sparkles className="w-5 h-5" />
                </h3>
                <p className="text-foreground font-semibold mb-1">
                  Lead processed in under 5 seconds
                </p>
                <p className="text-sm text-muted-foreground">
                  Zero data loss • AI-powered • Fully automated
                </p>
              </div>
            </motion.div>
          )}

          {/* Control button */}
          <div className="text-center mt-8">
            <motion.button
              onClick={startDemo}
              disabled={isRunning}
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-glow transition-all duration-300"
              whileHover={{ scale: isRunning ? 1 : 1.05 }}
              whileTap={{ scale: isRunning ? 1 : 0.95 }}
            >
              {isRunning ? "Running..." : currentStep >= steps.length ? "Run Again" : "Start Demo"}
            </motion.button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default LiveDemo;
