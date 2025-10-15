import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, Facebook, Zap, Database, FileSpreadsheet } from "lucide-react";

const flowSteps = [
  {
    icon: Facebook,
    label: "Meta Ads",
    description: "Lead generated",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Zap,
    label: "Make.com",
    description: "Automation triggers",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Database,
    label: "GoHighLevel",
    description: "CRM updated",
    color: "from-green-500 to-green-600",
  },
  {
    icon: FileSpreadsheet,
    label: "Google Sheets",
    description: "Data synced",
    color: "from-emerald-500 to-emerald-600",
  },
];

const AutomationFlow = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const triggerFlow = () => {
    setIsAnimating(true);
    setActiveStep(0);
    setTimeout(() => setIsAnimating(false), 2400);
  };

  useEffect(() => {
    if (isAnimating && activeStep >= 0 && activeStep < flowSteps.length) {
      // Auto-scroll on mobile only
      if (window.innerWidth < 768 && stepRefs.current[activeStep]) {
        stepRefs.current[activeStep]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }

      // Move to next step
      const timer = setTimeout(() => {
        setActiveStep(prev => prev + 1);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [activeStep, isAnimating]);

  return (
    <section id="automation" className="py-20 px-4 bg-gradient-to-b from-background to-card/20 relative overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                See Automation in Action
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Watch how data flows seamlessly through automated systems in real-time
            </p>
          </motion.div>
        </div>

        <Card className="relative p-6 md:p-16 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden">
          {/* Ambient glow effect */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          
          <div className="relative">
            {/* Desktop Flow */}
            <div className="hidden md:flex items-center justify-center gap-4">
              {flowSteps.map((step, index) => {
                const Icon = step.icon;
                
                return (
                  <div key={index} className="flex items-center">
                    <motion.div
                      className="relative group"
                      onHoverStart={() => setHoveredStep(index)}
                      onHoverEnd={() => setHoveredStep(null)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      {/* Hover glow */}
                      <motion.div
                        className={`absolute -inset-4 bg-gradient-to-r ${step.color} rounded-full opacity-0 blur-2xl`}
                        animate={{
                          opacity: hoveredStep === index ? 0.4 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Active pulse - single, elegant pulse */}
                      {isAnimating && (
                        <motion.div
                          className={`absolute -inset-2 bg-gradient-to-r ${step.color} rounded-full`}
                          initial={{ scale: 1, opacity: 0.6 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.4,
                            ease: "easeOut"
                          }}
                        />
                      )}
                      
                      {/* Icon container */}
                      <motion.div 
                        className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg ring-4 ring-background/50`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Icon className="w-12 h-12 text-white drop-shadow-lg" />
                      </motion.div>
                      
                      {/* Label below icon - always visible */}
                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center w-32">
                        <p className="font-semibold text-foreground text-sm mb-1">{step.label}</p>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </motion.div>

                    {/* Arrow connector - separated from line */}
                    {index < flowSteps.length - 1 && (
                      <div className="relative mx-2 flex flex-col items-center gap-2">
                        {/* Animated data flow line - positioned separately */}
                        <div className="relative w-16 h-1">
                          {isAnimating && (
                            <>
                              {/* Background track */}
                              <div className="absolute inset-0 bg-muted/30 rounded-full" />
                              {/* Flowing line */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full"
                                initial={{ scaleX: 0, originX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{
                                  duration: 0.6,
                                  delay: index * 0.4,
                                  ease: "easeInOut"
                                }}
                              />
                              {/* Particle effect */}
                              <motion.div
                                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-glow"
                                initial={{ left: 0 }}
                                animate={{ left: "100%" }}
                                transition={{
                                  duration: 0.6,
                                  delay: index * 0.4,
                                  ease: "easeInOut"
                                }}
                              />
                            </>
                          )}
                        </div>
                        <ArrowRight className="w-6 h-6 text-primary/60" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Flow - Vertical */}
            <div className="flex md:hidden flex-col items-center gap-8">
              {flowSteps.map((step, index) => {
                const Icon = step.icon;
                
                return (
                  <div 
                    key={index} 
                    ref={(el) => (stepRefs.current[index] = el)}
                    className="flex flex-col items-center w-full"
                  >
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Subtle pulse for mobile - no excessive flashing */}
                      {isAnimating && (
                        <motion.div
                          className={`absolute -inset-2 bg-gradient-to-r ${step.color} rounded-full`}
                          initial={{ scale: 1, opacity: 0.3 }}
                          animate={{ scale: 1.3, opacity: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.3,
                            ease: "easeOut"
                          }}
                        />
                      )}
                      
                      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg ring-4 ring-background/50`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>
                    
                    <div className="text-center mt-3 mb-4">
                      <p className="font-semibold text-foreground">{step.label}</p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>

                    {index < flowSteps.length - 1 && (
                      <div className="relative">
                        <div className="w-1 h-12 bg-muted/30 rounded-full" />
                        {isAnimating && (
                          <motion.div
                            className="absolute top-0 left-0 w-1 bg-gradient-to-b from-primary to-secondary rounded-full"
                            initial={{ height: 0 }}
                            animate={{ height: "100%" }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.3,
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Spacer for desktop labels */}
            <div className="hidden md:block h-20" />

            {/* Call to action */}
            <div className="mt-12 text-center">
              <motion.button
                onClick={triggerFlow}
                disabled={isAnimating}
                className="group relative px-10 py-5 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-xl font-bold text-lg shadow-xl overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(var(--primary) / 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-3 justify-center">
                  {isAnimating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Processing Flow...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Trigger Automation Flow
                    </>
                  )}
                </span>
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
              <p className="text-muted-foreground text-sm mt-4">
                Click to watch data flow through the system
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AutomationFlow;
