import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import CountUp from "react-countup";
import { AlertTriangle, CheckCircle2, Calendar, TrendingUp } from "lucide-react";
import { AuditResults as Results, formatCurrency, formatNumber } from "@/lib/auditCalculations";

interface AuditResultsProps {
  results: Results;
  inputs: { industry: string; monthlyMarketingSpend: number };
}

const severityColors = {
  low: 'hsl(142, 76%, 36%)',
  medium: 'hsl(48, 96%, 53%)',
  high: 'hsl(25, 95%, 53%)',
  critical: 'hsl(0, 85%, 60%)'
};

const severityLabels = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
  critical: 'Critical Risk'
};

const AuditResults = ({ results, inputs }: AuditResultsProps) => {
  const currentVsOptimized = [
    {
      name: 'Current',
      revenue: inputs.monthlyMarketingSpend * 3, // Assumed baseline ROI
      fill: 'hsl(var(--muted))'
    },
    {
      name: 'With Automation',
      revenue: (inputs.monthlyMarketingSpend * 3) + (results.revenueLostMonthly * (results.potentialRecoveryPercent / 100)),
      fill: 'hsl(var(--primary))'
    }
  ];

  const recoveryData = [
    { name: 'Lost Revenue', value: results.revenueLostMonthly, fill: 'hsl(var(--destructive))' },
    { name: 'Recoverable', value: results.revenueLostMonthly * (results.potentialRecoveryPercent / 100), fill: 'hsl(var(--primary))' },
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Severity Alert */}
        <Card className="p-6 border-2 bg-card/50 backdrop-blur" style={{ borderColor: severityColors[results.severityLevel] }}>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full" style={{ backgroundColor: `${severityColors[results.severityLevel]}20` }}>
              <AlertTriangle className="w-6 h-6" style={{ color: severityColors[results.severityLevel] }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-foreground">{severityLabels[results.severityLevel]}</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ 
                  backgroundColor: `${severityColors[results.severityLevel]}20`,
                  color: severityColors[results.severityLevel]
                }}>
                  Score: {results.severityScore}/100
                </span>
              </div>
              <Progress value={results.severityScore} className="h-2 mb-2" />
              <p className="text-muted-foreground">
                Your lead leakage severity indicates {results.severityLevel === 'critical' ? 'immediate action is required' : `${results.severityLevel} priority for optimization`}.
              </p>
            </div>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-destructive/10 to-card border-destructive/20">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Monthly Revenue Lost</p>
              <p className="text-4xl font-bold text-destructive">
                <CountUp end={results.revenueLostMonthly} duration={2} prefix="$" separator="," />
              </p>
              <p className="text-xs text-muted-foreground">{formatNumber(results.leadsLostMonthly)} leads lost/month</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-destructive/10 to-card border-destructive/20">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Annual Revenue Lost</p>
              <p className="text-4xl font-bold text-destructive">
                <CountUp end={results.revenueLostAnnually} duration={2} prefix="$" separator="," />
              </p>
              <p className="text-xs text-muted-foreground">{formatNumber(results.leadsLostMonthly * 12)} leads lost/year</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-card border-primary/20">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">ROI of Fixing This</p>
              <p className="text-4xl font-bold text-primary">
                <CountUp end={results.roiOfFixing} duration={2} suffix="%" />
              </p>
              <p className="text-xs text-muted-foreground">Return on automation investment</p>
            </div>
          </Card>
        </div>

        {/* Recovery Potential */}
        <Card className="p-6 md:p-8 bg-card/50 backdrop-blur border-border">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Recovery Potential</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-foreground">Current vs. Optimized Revenue</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={currentVsOptimized}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                    {currentVsOptimized.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-foreground">Revenue Recovery Breakdown</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={recoveryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {recoveryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center text-muted-foreground mt-4">
                <span className="text-primary font-bold">{results.potentialRecoveryPercent}%</span> of lost revenue is recoverable with proper automation
              </p>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-6 md:p-8 bg-card/50 backdrop-blur border-border">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Personalized Recommendations</h3>
          </div>
          
          <div className="space-y-4">
            {results.recommendations.map((recommendation, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {index + 1}
                </div>
                <p className="text-foreground pt-1">{recommendation}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-primary/20">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Ready to Stop Losing Revenue?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a free 30-minute automation audit and I'll show you exactly how to plug these leaks and recover up to <span className="text-primary font-bold">{formatCurrency(results.revenueLostMonthly * (results.potentialRecoveryPercent / 100))}/month</span>.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300 w-full md:w-auto"
            asChild
          >
            <a href="https://calendly.com/sean-winter/ai-automations-audit" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Book Your Free Audit Now</span>
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">No commitment. No sales pitch. Just actionable insights.</p>
        </Card>
      </div>
    </section>
  );
};

export default AuditResults;
