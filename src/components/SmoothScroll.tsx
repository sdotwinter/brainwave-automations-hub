import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Home" },
  { id: "summary", label: "About" },
  { id: "metrics", label: "Impact" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SmoothScroll = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <nav className="flex flex-col gap-4">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative flex items-center gap-3"
            aria-label={`Navigate to ${label}`}
          >
            {/* Dot indicator */}
            <div className="relative">
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  activeSection === id
                    ? "border-primary bg-primary scale-125"
                    : "border-muted-foreground bg-transparent hover:border-primary hover:bg-primary/50"
                }`}
              />
              {activeSection === id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 rounded-full bg-primary/30 blur-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </div>

            {/* Label on hover */}
            <span
              className={`absolute right-full mr-4 px-3 py-1 rounded-md bg-card border border-border text-sm whitespace-nowrap transition-all duration-300 ${
                activeSection === id
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SmoothScroll;
