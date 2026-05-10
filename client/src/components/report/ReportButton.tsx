import React from 'react';
import { FileDown } from 'lucide-react';
import { motion } from 'motion/react';
import { generateReport } from './ReportGenerator';

interface ReportButtonProps {
  company: any;
  scoreData: any;
  emissions: any;
  className?: string;
}

const ReportButton: React.FC<ReportButtonProps> = ({ company, scoreData, emissions, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => generateReport(company, scoreData, emissions)}
      className={`flex items-center gap-2 px-6 py-3 bg-green-primary text-[#f0ead2] font-semibold rounded-lg transition-all duration-200 button-glow ${className}`}
    >
      <FileDown className="w-5 h-5" />
      Download Report (PDF)
    </motion.button>
  );
};

export default ReportButton;
