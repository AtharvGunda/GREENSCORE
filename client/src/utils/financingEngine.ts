import { LoanScheme } from '../constants/loanProducts';

export interface UserProfile {
  score: number;
  sector: string;
  percentile: number;
  revenueCr: number;
}

/**
 * Returns loans that are either sector-agnostic (null) or match the user's sector.
 */
export const getSectorRelevantLoans = (loans: LoanScheme[], sector: string) => {
  if (!sector) return loans;
  return loans.filter(l => !l.eligibleSectors || l.eligibleSectors.includes(sector));
};

/**
 * Returns loans that the user meets the minimum score requirement for.
 */
export const getEligibleLoans = (loans: LoanScheme[], score: number) => {
  return loans.filter(l => score >= l.minScore);
};

/**
 * Calculates a dynamically reduced interest rate.
 * - Base rate logic: linear interpolation between rateMax (at minScore) and rateMin (at 100 score).
 * - Percentile bonus: Top 10% gets an extra -0.5% off. Top 25% gets -0.25% off.
 */
export const calculateDynamicRate = (loan: LoanScheme, profile: UserProfile): number => {
  const { score, percentile } = profile;
  
  if (score < loan.minScore) return loan.rateMax;

  // Base interpolation
  const scoreRange = 100 - loan.minScore;
  const scoreProgress = (score - loan.minScore) / scoreRange; // 0.0 to 1.0
  let dynamicRate = loan.rateMax - (scoreProgress * (loan.rateMax - loan.rateMin));

  // Percentile bonus (remember percentile 1 means Top 1%)
  if (percentile <= 10) {
    dynamicRate -= 0.50;
  } else if (percentile <= 25) {
    dynamicRate -= 0.25;
  }

  // Ensure we don't drop below an absolute floor (e.g. rateMin - 0.5)
  const absoluteFloor = Math.max(4.0, loan.rateMin - 0.5);
  return Math.max(absoluteFloor, dynamicRate);
};

/**
 * Calculates a dynamic, realistic max loan amount for UI purposes.
 * - Max loan cannot exceed the scheme's absolute max limit.
 * - Max loan is heuristically capped at 30% of annual revenue to remain realistic.
 */
export const calculateDynamicLoanAmountCr = (loan: LoanScheme, revenueCr: number): number => {
  const revenueCap = revenueCr * 0.30;
  // If revenue is somehow missing or 0, fallback to 1 Cr to show some numbers
  if (!revenueCr || revenueCr <= 0) return Math.min(loan.maxAmountCr, 1);
  return Math.min(loan.maxAmountCr, revenueCap);
};
