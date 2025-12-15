import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AuditHero from "@/components/audit/AuditHero";
import AuditCalculator from "@/components/audit/AuditCalculator";
import AuditResults from "@/components/audit/AuditResults";
import ParticleBackground from "@/components/ParticleBackground";
import { AuditInputs, AuditResults as Results, calculateAuditResults } from "@/lib/auditCalculations";

const LeadLeaksAudit = () => {
  const [results, setResults] = useState<Results | null>(null);
  const [inputs, setInputs] = useState<AuditInputs | null>(null);

  const handleCalculate = (auditInputs: AuditInputs) => {
    setInputs(auditInputs);
    const calculatedResults = calculateAuditResults(auditInputs);
    setResults(calculatedResults);
    
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleRecalculate = () => {
    setResults(null);
    setInputs(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen relative bg-background">
      <ParticleBackground />
      
      {/* Back to Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Button
          variant="outline"
          className="border-primary/50 hover:bg-primary/10 backdrop-blur-sm"
          asChild
        >
          <a href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
        </Button>
      </div>

      <AuditHero />
      
      {!results ? (
        <AuditCalculator onCalculate={handleCalculate} />
      ) : (
        <div id="results">
          <AuditResults 
            results={results} 
            inputs={inputs!} 
            onRecalculate={handleRecalculate}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground font-mono">
            © 2025 Sean Winter. Built with automation in mind.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default LeadLeaksAudit;
