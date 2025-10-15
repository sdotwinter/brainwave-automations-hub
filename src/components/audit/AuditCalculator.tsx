import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Calculator, AlertCircle } from "lucide-react";
import { AuditInputs } from "@/lib/auditCalculations";

interface AuditCalculatorProps {
  onCalculate: (inputs: AuditInputs) => void;
}

const leadSourceOptions = [
  "Web forms",
  "Phone calls",
  "Live chat",
  "Social media",
  "Email",
  "Referrals"
];

const AuditCalculator = ({ onCalculate }: AuditCalculatorProps) => {
  const [inputs, setInputs] = useState<AuditInputs>({
    monthlyMarketingSpend: 5000,
    leadsPerMonth: 50,
    followUpMissedPercent: 20,
    averageCustomerValue: 2000,
    leadSources: ["Web forms"],
    hasCRM: false,
    crmName: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLeadSourceToggle = (source: string) => {
    setInputs(prev => ({
      ...prev,
      leadSources: prev.leadSources.includes(source)
        ? prev.leadSources.filter(s => s !== source)
        : [...prev.leadSources, source]
    }));
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (inputs.leadsPerMonth < 1) {
      newErrors.leadsPerMonth = "Please enter at least 1 lead per month";
    }

    if (inputs.averageCustomerValue < 1) {
      newErrors.averageCustomerValue = "Please enter a valid customer value";
    }

    if (inputs.leadSources.length === 0) {
      newErrors.leadSources = "Please select at least one lead source";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      onCalculate(inputs);
    }
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-6 md:p-10 bg-card/50 backdrop-blur border-border">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Business Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-foreground">Business Information</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketingSpend">
                  Monthly Marketing Spend: ${inputs.monthlyMarketingSpend.toLocaleString()}
                </Label>
                <Slider
                  id="marketingSpend"
                  min={0}
                  max={50000}
                  step={500}
                  value={[inputs.monthlyMarketingSpend]}
                  onValueChange={([value]) => setInputs(prev => ({ ...prev, monthlyMarketingSpend: value }))}
                  className="pt-2"
                />
                <p className="text-xs text-muted-foreground">Move slider to adjust</p>
              </div>
            </div>

            {/* Step 2: Lead Metrics */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-foreground">Lead Flow Metrics</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="leadsPerMonth">Leads Per Month</Label>
                  <Input
                    id="leadsPerMonth"
                    type="number"
                    min="1"
                    value={inputs.leadsPerMonth || ""}
                    onChange={(e) => setInputs(prev => ({ ...prev, leadsPerMonth: parseInt(e.target.value) || 0 }))}
                    placeholder="e.g., 50"
                  />
                  {errors.leadsPerMonth && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.leadsPerMonth}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerValue">Average Customer Value ($)</Label>
                  <Input
                    id="customerValue"
                    type="number"
                    min="1"
                    value={inputs.averageCustomerValue || ""}
                    onChange={(e) => setInputs(prev => ({ ...prev, averageCustomerValue: parseInt(e.target.value) || 0 }))}
                    placeholder="e.g., 2000"
                  />
                  {errors.averageCustomerValue && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.averageCustomerValue}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="followUpMissed">
                  Estimated % of Leads Not Followed Up: {inputs.followUpMissedPercent}%
                </Label>
                <Slider
                  id="followUpMissed"
                  min={0}
                  max={50}
                  step={5}
                  value={[inputs.followUpMissedPercent]}
                  onValueChange={([value]) => setInputs(prev => ({ ...prev, followUpMissedPercent: value }))}
                  className="pt-2"
                />
                <p className="text-xs text-muted-foreground">Industry average: 20-30%</p>
              </div>
            </div>

            {/* Step 3: Current Process */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-foreground">Current Process</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="mb-3 block">How do leads enter your system?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {leadSourceOptions.map(source => (
                      <div key={source} className="flex items-center space-x-2">
                        <Checkbox
                          id={source}
                          checked={inputs.leadSources.includes(source)}
                          onCheckedChange={() => handleLeadSourceToggle(source)}
                        />
                        <Label htmlFor={source} className="text-sm cursor-pointer">
                          {source}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.leadSources && (
                    <p className="text-xs text-destructive flex items-center gap-1 mt-2">
                      <AlertCircle className="w-3 h-3" />
                      {errors.leadSources}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasCRM"
                      checked={inputs.hasCRM}
                      onCheckedChange={(checked) => setInputs(prev => ({ ...prev, hasCRM: checked as boolean }))}
                    />
                    <Label htmlFor="hasCRM" className="cursor-pointer">
                      We have a CRM system
                    </Label>
                  </div>

                  {inputs.hasCRM && (
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="crmName">Which CRM? (optional)</Label>
                      <Input
                        id="crmName"
                        value={inputs.crmName}
                        onChange={(e) => setInputs(prev => ({ ...prev, crmName: e.target.value }))}
                        placeholder="e.g., Salesforce, HubSpot, Pipedrive"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate My Lead Leaks
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default AuditCalculator;
