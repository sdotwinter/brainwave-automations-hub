import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import CountUp from "react-countup";
import { AlertTriangle, CheckCircle2, Calendar, TrendingUp, Download, Info, ChevronDown, ChevronUp, Share2, Calculator, BarChart3 } from "lucide-react";
import { AuditResults as Results, formatCurrency, formatNumber, AuditInputs, industryDefaults } from "@/lib/auditCalculations";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AuditResultsProps {
  results: Results;
  inputs: AuditInputs;
  onRecalculate: () => void;
}
const severityColors = {
  low: "hsl(142, 76%, 36%)",
  medium: "hsl(48, 96%, 53%)",
  high: "hsl(25, 95%, 53%)",
  critical: "hsl(0, 85%, 60%)"
};
const severityLabels = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk",
  critical: "Critical Risk"
};
const AuditResults = ({
  results,
  inputs,
  onRecalculate
}: AuditResultsProps) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [whatIfMissed, setWhatIfMissed] = useState(inputs.followUpMissedPercent);
  const [whatIfConversion, setWhatIfConversion] = useState(inputs.conversionRate);

  // What-if calculations
  const whatIfLeadsLost = Math.round((inputs.leadsPerMonth * whatIfMissed) / 100);
  const whatIfRevenueLost = Math.round(whatIfLeadsLost * inputs.averageCustomerValue * (whatIfConversion / 100));

  // Industry benchmark comparison
  const industryAvgMissRate = 25; // Benchmark: average follow-up miss rate
  const industryAvgConversion = 15; // Benchmark: average conversion rate
  
  const handleDownloadPDF = () => {
    const originalTitle = document.title;
    const date = new Date().toISOString().split("T")[0];
    document.title = `Revenue-Leakage-Report-${date}`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 100);
  };

  const handleShare = (platform: 'twitter' | 'linkedin') => {
    const text = `I just discovered I'm losing ${formatCurrency(results.revenueLostMonthly)}/month in missed leads. This free audit tool is eye-opening!`;
    const url = window.location.href;
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  const currentVsOptimized = [{
    name: "Current",
    revenue: inputs.monthlyMarketingSpend * 3,
    // Assumed baseline ROI
    fill: "hsl(var(--muted))"
  }, {
    name: "With Automation",
    revenue: inputs.monthlyMarketingSpend * 3 + results.revenueLostMonthly * (results.potentialRecoveryPercent / 100),
    fill: "hsl(var(--primary))"
  }];
  const recoveryData = [{
    name: "Lost Revenue",
    value: results.revenueLostMonthly,
    fill: "hsl(var(--destructive))"
  }, {
    name: "Recoverable",
    value: results.revenueLostMonthly * (results.potentialRecoveryPercent / 100),
    fill: "hsl(var(--primary))"
  }];
  return <section className="py-12 px-4 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Report Content - Only this section will be printed */}
        <div id="printable-report">
          {/* Severity Alert */}
          <Card className="p-6 border-2 bg-card/50 backdrop-blur" style={{
          borderColor: severityColors[results.severityLevel]
        }}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full" style={{
              backgroundColor: `${severityColors[results.severityLevel]}20`
            }}>
                <AlertTriangle className="w-6 h-6" style={{
                color: severityColors[results.severityLevel]
              }} />
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
                  Your lead leakage severity indicates{" "}
                  {results.severityLevel === "critical" ? "immediate action is required" : `${results.severityLevel} priority for optimization`}
                  .
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
                <p className="text-xs text-muted-foreground">
                  {formatNumber(results.leadsLostMonthly)} leads lost/month
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-destructive/10 to-card border-destructive/20">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Annual Revenue Lost</p>
                <p className="text-4xl font-bold text-destructive">
                  <CountUp end={results.revenueLostAnnually} duration={2} prefix="$" separator="," />
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(results.leadsLostMonthly * 12)} leads lost/year
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-card border-primary/20">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground font-medium">ROI of Fixing This</p>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">
                          Calculated as: (Recoverable Revenue - Automation Cost) ÷ Automation Cost × 100. 
                          Assumes 50% of lost revenue is recoverable and automation costs ~12% of recovered revenue.
                        </p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <p className="text-4xl font-bold text-primary">
                  <CountUp end={results.roiOfFixing} duration={2} suffix="%" />
                </p>
                <p className="text-xs text-muted-foreground">Return on automation investment</p>
              </div>
            </Card>
          </div>

          {/* Calculation Breakdown */}
          <Collapsible open={showBreakdown} onOpenChange={setShowBreakdown}>
            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full flex items-center justify-between p-0 h-auto hover:bg-transparent">
                  <div className="flex items-center gap-3">
                    <Calculator className="w-5 h-5 text-primary" />
                    <span className="text-lg font-semibold text-foreground">How We Calculated This</span>
                  </div>
                  {showBreakdown ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Leads per month</span>
                    <span className="font-medium text-foreground">{formatNumber(inputs.leadsPerMonth)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">× Follow-up miss rate</span>
                    <span className="font-medium text-foreground">{inputs.followUpMissedPercent}%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border bg-destructive/5 px-2 rounded">
                    <span className="text-destructive font-medium">= Leads lost monthly</span>
                    <span className="font-bold text-destructive">{formatNumber(results.leadsLostMonthly)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">× Average customer value</span>
                    <span className="font-medium text-foreground">{formatCurrency(inputs.averageCustomerValue)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">× Conversion rate</span>
                    <span className="font-medium text-foreground">{inputs.conversionRate}%</span>
                  </div>
                  <div className="flex justify-between py-2 bg-destructive/10 px-2 rounded">
                    <span className="text-destructive font-medium">= Monthly revenue lost</span>
                    <span className="font-bold text-destructive">{formatCurrency(results.revenueLostMonthly)}</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Industry Benchmarks */}
          <Card className="p-6 bg-card/50 backdrop-blur border-border">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">How You Compare</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your follow-up miss rate</span>
                  <span className={inputs.followUpMissedPercent > industryAvgMissRate ? "text-destructive font-medium" : "text-primary font-medium"}>
                    {inputs.followUpMissedPercent}%
                  </span>
                </div>
                <Progress value={inputs.followUpMissedPercent} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Industry average: {industryAvgMissRate}% — 
                  {inputs.followUpMissedPercent > industryAvgMissRate 
                    ? <span className="text-destructive"> {inputs.followUpMissedPercent - industryAvgMissRate}% above average</span>
                    : <span className="text-primary"> {industryAvgMissRate - inputs.followUpMissedPercent}% below average</span>}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your conversion rate</span>
                  <span className={inputs.conversionRate < industryAvgConversion ? "text-destructive font-medium" : "text-primary font-medium"}>
                    {inputs.conversionRate}%
                  </span>
                </div>
                <Progress value={inputs.conversionRate} max={30} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Industry average: {industryAvgConversion}% — 
                  {inputs.conversionRate < industryAvgConversion 
                    ? <span className="text-destructive"> {industryAvgConversion - inputs.conversionRate}% below average</span>
                    : <span className="text-primary"> {inputs.conversionRate - industryAvgConversion}% above average</span>}
                </p>
              </div>
            </div>
          </Card>

          {/* What-If Simulator */}
          <Card className="p-6 bg-gradient-to-br from-secondary/5 to-card border-secondary/20">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-semibold text-foreground">What-If Simulator</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Adjust the sliders to see how improvements would impact your revenue.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-foreground">Follow-up miss rate</label>
                    <span className="text-sm font-bold text-primary">{whatIfMissed}%</span>
                  </div>
                  <Slider 
                    value={[whatIfMissed]} 
                    onValueChange={(v) => setWhatIfMissed(v[0])} 
                    max={50} 
                    min={5} 
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Current: {inputs.followUpMissedPercent}%</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-foreground">Conversion rate</label>
                    <span className="text-sm font-bold text-primary">{whatIfConversion}%</span>
                  </div>
                  <Slider 
                    value={[whatIfConversion]} 
                    onValueChange={(v) => setWhatIfConversion(v[0])} 
                    max={30} 
                    min={5} 
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Current: {inputs.conversionRate}%</p>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="text-center p-4 rounded-lg bg-background/50">
                  <p className="text-sm text-muted-foreground mb-1">Projected Monthly Loss</p>
                  <p className={`text-3xl font-bold ${whatIfRevenueLost < results.revenueLostMonthly ? 'text-primary' : 'text-destructive'}`}>
                    {formatCurrency(whatIfRevenueLost)}
                  </p>
                  {whatIfRevenueLost < results.revenueLostMonthly && (
                    <p className="text-sm text-primary mt-2">
                      Saving {formatCurrency(results.revenueLostMonthly - whatIfRevenueLost)}/month
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Recovery Potential */}
          <Card className="p-6 md:p-8 bg-card/50 backdrop-blur border-border">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Monthly Recovery Potential</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-foreground">Current vs. Optimized Revenue</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={currentVsOptimized}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={value => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} formatter={(value: number) => formatCurrency(value)} />
                    <Bar dataKey="revenue" radius={[8, 8, 0, 0]} label={false}>
                      {currentVsOptimized.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-foreground">Revenue Recovery Breakdown</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={recoveryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" label={entry => `${entry.name}: ${formatCurrency(entry.value)}`} labelLine={true}>
                      {recoveryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-center text-muted-foreground mt-4">
                  <span className="text-primary font-bold">{results.potentialRecoveryPercent}%</span> of lost revenue is
                  recoverable with proper automation
                </p>
              </div>
            </div>
          </Card>

        {/* Recommendations */}
        <Card className="p-6 md:p-8 bg-card/50 backdrop-blur border-border">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Personalized Recommendations</h3>
          </div>
          <p className="text-muted-foreground mb-6 ml-9">
            These are the same intake fixes I implement for ad-driven law firms to recover missed cases without adding staff.
          </p>

          <div className="space-y-4">
              {results.recommendations.map((recommendation, index) => <div key={index} className="flex gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {index + 1}
                  </div>
                  <p className="text-foreground pt-1">{recommendation}</p>
                </div>)}
            </div>
          </Card>

          {/* Why Now Nudge */}
          <div className="text-center py-6">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every month these leaks stay unaddressed, this revenue is permanently gone. Most firms don't need more leads — they need better capture of the ones they already paid for.
            </p>
          </div>
        </div>
        {/* End of printable report content */}

        {/* CTA */}
        <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-primary/20 no-print">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Ready to Stop Losing Revenue?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a free 30-minute call and I'll show you exactly how to plug these leaks and recover up to{" "}
            <span className="text-primary font-bold">
              {formatCurrency(results.revenueLostMonthly * (results.potentialRecoveryPercent / 100))}/month
            </span>
            .
          </p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300 w-full md:w-auto" asChild>
            <a href="https://calendly.com/sean-winter/case-leaks" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Fix These Lead Leaks</span>
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">A 30-minute intake walkthrough using your numbers.</p>
        </Card>

        {/* Social Sharing */}
        <div className="flex flex-wrap justify-center gap-3 no-print">
          <Button variant="outline" size="sm" onClick={() => handleShare('twitter')} className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share on X
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')} className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share on LinkedIn
          </Button>
        </div>

        {/* Download PDF Button */}
        <div className="flex flex-col items-center gap-4 no-print">
          <Button onClick={handleDownloadPDF} variant="outline" size="lg" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report as PDF
          </Button>
          <Button variant="outline" size="lg" onClick={onRecalculate} className="border-primary/50 hover:bg-primary/10">
            Recalculate with Different Numbers
          </Button>
        </div>
      </div>
    </section>;
};
export default AuditResults;