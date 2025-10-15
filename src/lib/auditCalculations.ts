export interface AuditInputs {
  industry: string;
  monthlyMarketingSpend: number;
  leadsPerMonth: number;
  followUpMissedPercent: number;
  averageCustomerValue: number;
  leadSources: string[];
  hasCRM: boolean;
  crmName?: string;
}

export interface AuditResults {
  leadsLostMonthly: number;
  revenueLostMonthly: number;
  revenueLostAnnually: number;
  roiOfFixing: number;
  severityLevel: 'low' | 'medium' | 'high' | 'critical';
  severityScore: number;
  recommendations: string[];
  potentialRecoveryPercent: number;
}

export const industryDefaults = {
  'Law Firm': { avgValue: 5000, recoveryRate: 75 },
  'Healthcare': { avgValue: 3000, recoveryRate: 70 },
  'E-commerce': { avgValue: 500, recoveryRate: 65 },
  'SaaS': { avgValue: 2000, recoveryRate: 80 },
  'Real Estate': { avgValue: 8000, recoveryRate: 70 },
  'Other': { avgValue: 2000, recoveryRate: 65 }
};

export function calculateAuditResults(inputs: AuditInputs): AuditResults {
  const leadsLostMonthly = Math.round((inputs.leadsPerMonth * inputs.followUpMissedPercent) / 100);
  const revenueLostMonthly = Math.round(leadsLostMonthly * inputs.averageCustomerValue * 0.25); // Assuming 25% conversion rate on followed-up leads
  const revenueLostAnnually = revenueLostMonthly * 12;
  
  // Calculate ROI of fixing (assuming automation costs 10-15% of recovered revenue)
  const automationCostEstimate = revenueLostAnnually * 0.12;
  const roiOfFixing = Math.round(((revenueLostAnnually - automationCostEstimate) / automationCostEstimate) * 100);
  
  // Calculate severity
  const severityScore = calculateSeverityScore(inputs, revenueLostMonthly);
  const severityLevel = getSeverityLevel(severityScore);
  
  // Get industry-specific recovery rate
  const industryData = industryDefaults[inputs.industry as keyof typeof industryDefaults] || industryDefaults.Other;
  const potentialRecoveryPercent = inputs.hasCRM ? industryData.recoveryRate : industryData.recoveryRate - 15;
  
  // Generate personalized recommendations
  const recommendations = generateRecommendations(inputs, severityScore);
  
  return {
    leadsLostMonthly,
    revenueLostMonthly,
    revenueLostAnnually,
    roiOfFixing,
    severityLevel,
    severityScore,
    recommendations,
    potentialRecoveryPercent
  };
}

function calculateSeverityScore(inputs: AuditInputs, revenueLost: number): number {
  let score = 0;
  
  // Factor 1: Revenue lost as percentage of marketing spend (0-40 points)
  const lossRatio = revenueLost / inputs.monthlyMarketingSpend;
  score += Math.min(lossRatio * 20, 40);
  
  // Factor 2: Follow-up miss percentage (0-30 points)
  score += inputs.followUpMissedPercent * 0.6;
  
  // Factor 3: No CRM (0-15 points)
  if (!inputs.hasCRM) score += 15;
  
  // Factor 4: Multiple lead sources without CRM (0-15 points)
  if (inputs.leadSources.length >= 3 && !inputs.hasCRM) score += 15;
  
  return Math.min(Math.round(score), 100);
}

function getSeverityLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
  if (score >= 75) return 'critical';
  if (score >= 50) return 'high';
  if (score >= 25) return 'medium';
  return 'low';
}

function generateRecommendations(inputs: AuditInputs, severityScore: number): string[] {
  const recommendations: string[] = [];
  
  // CRM recommendation
  if (!inputs.hasCRM) {
    recommendations.push('Implement a CRM system immediately to track and manage all leads centrally');
  } else if (inputs.followUpMissedPercent > 15) {
    recommendations.push(`Optimize your ${inputs.crmName || 'CRM'} workflows with automated follow-up sequences`);
  }
  
  // Follow-up automation
  if (inputs.followUpMissedPercent > 20) {
    recommendations.push('Set up automated follow-up sequences for all new leads within 5 minutes of inquiry');
  }
  
  // Multi-source integration
  if (inputs.leadSources.length >= 3) {
    recommendations.push('Integrate all lead sources into one central system to prevent leads from falling through the cracks');
  }
  
  // Lead routing
  if (inputs.leadsPerMonth > 100) {
    recommendations.push('Implement intelligent lead routing to ensure leads reach the right team member instantly');
  }
  
  // Lead scoring
  if (severityScore > 50) {
    recommendations.push('Add lead scoring to prioritize high-value opportunities and reduce response times');
  }
  
  // Notification system
  if (!inputs.hasCRM || inputs.followUpMissedPercent > 25) {
    recommendations.push('Set up real-time notifications (SMS/Slack) when high-priority leads come in');
  }
  
  // Industry-specific recommendations
  if (inputs.industry === 'Law Firm' || inputs.industry === 'Real Estate') {
    recommendations.push('Enable after-hours lead capture with automated intake forms and instant acknowledgment');
  }
  
  return recommendations.slice(0, 5); // Return top 5 recommendations
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
