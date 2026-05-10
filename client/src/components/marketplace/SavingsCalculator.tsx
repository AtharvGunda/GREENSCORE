import React from 'react';

interface SavingsCalculatorProps {
  greenRate: number;
  marketRate?: number;
  loanAmountLakhs?: number;
  tenureYears: number;
}

const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ 
  greenRate, 
  marketRate = 14.0, 
  loanAmountLakhs = 50, 
  tenureYears 
}) => {
  // Simple interest calc for demonstration: (P * R * T) / 100
  // Note: Actual loans use EMI/reducing balance, but for the requested UI this simple projection works
  const standardAnnualInterest = (loanAmountLakhs * 100000 * marketRate) / 100;
  const greenAnnualInterest = (loanAmountLakhs * 100000 * greenRate) / 100;
  
  const annualSaving = standardAnnualInterest - greenAnnualInterest;
  const totalSaving = annualSaving * tenureYears;

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  return (
    <div className="bg-green-primary/10 border border-green-primary/20 rounded-lg p-3 mt-4 text-sm font-mono">
      <p className="text-text-muted mb-2">
        If you borrow <strong className="text-text-primary">₹{loanAmountLakhs} Lakh</strong> at <strong className="text-green-primary">{greenRate}%</strong> instead of {marketRate}%:
      </p>
      <div className="flex justify-between items-center text-green-primary font-bold">
        <span>Annual saving:</span>
        <span>₹{formatCurrency(annualSaving)}</span>
      </div>
      <div className="flex justify-between items-center text-green-primary font-bold mt-1">
        <span>Over {tenureYears} years:</span>
        <span>₹{formatCurrency(totalSaving)}</span>
      </div>
    </div>
  );
};

export default SavingsCalculator;
