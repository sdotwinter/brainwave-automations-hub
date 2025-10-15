import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { TrendingUp, Zap, Clock } from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    value: 4,
    suffix: "x",
    label: "Average ROI Increase",
    color: "from-primary to-secondary",
  },
  {
    icon: Zap,
    value: 150,
    suffix: "+",
    label: "Workflows Built",
    color: "from-secondary to-accent",
  },
  {
    icon: Clock,
    value: 1000,
    suffix: "+",
    label: "Hours Automated",
    color: "from-accent to-primary",
  },
];

const MetricsCounter = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-card to-background relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Impact by the Numbers
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 rounded-2xl`} />
                
                <div className="relative bg-card/50 backdrop-blur border border-border hover:border-primary/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-glow">
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${metric.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="text-5xl md:text-6xl font-bold mb-3">
                      <span className={`bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                        {hasAnimated ? (
                          <CountUp
                            start={0}
                            end={metric.value}
                            duration={2.5}
                            delay={index * 0.2}
                          />
                        ) : (
                          "0"
                        )}
                        {hasAnimated && metric.suffix}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground text-center font-medium">
                      {metric.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MetricsCounter;
