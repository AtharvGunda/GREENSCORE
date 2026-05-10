import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface EmissionsTrendChartProps {
  companyIntensity: number;
  benchmarkIntensity: number;
}

const EmissionsTrendChart: React.FC<EmissionsTrendChartProps> = ({ companyIntensity, benchmarkIntensity }) => {
  const labels = ['FY 22-23', 'FY 23-24', 'FY 24-25'];
  const companyData  = [companyIntensity * 1.25,    companyIntensity * 1.12,    companyIntensity];
  const benchmarkData = [benchmarkIntensity * 1.05, benchmarkIntensity * 1.02, benchmarkIntensity];

  const data = {
    labels,
    datasets: [
      {
        label: 'Your Intensity',
        data: companyData,
        borderColor: '#7bc47b',
        borderWidth: 2.5,
        backgroundColor: (ctx: any) => {
          const chart = ctx.chart;
          const { ctx: c, chartArea } = chart;
          if (!chartArea) return 'transparent';
          const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(90,158,90,0.22)');
          gradient.addColorStop(1, 'rgba(90,158,90,0)');
          return gradient;
        },
        fill: true,
        tension: 0.45,
        pointBackgroundColor: '#7bc47b',
        pointBorderColor: 'rgba(13,31,15,0.8)',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: 'Sector Average',
        data: benchmarkData,
        borderColor: 'rgba(255,255,255,0.25)',
        borderWidth: 1.5,
        borderDash: [5, 5],
        fill: false,
        tension: 0.45,
        pointBackgroundColor: 'rgba(255,255,255,0.3)',
        pointBorderColor: 'transparent',
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200, easing: 'easeOutQuart' as const },
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          color: '#7a987a',
          font: { family: 'JetBrains Mono', size: 11 },
          boxWidth: 10,
          padding: 14,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(13,31,15,0.95)',
        borderColor: 'rgba(90,158,90,0.3)',
        borderWidth: 1,
        titleColor: '#e8f0e8',
        bodyColor: '#7a987a',
        titleFont: { family: 'JetBrains Mono', size: 12 },
        bodyFont: { family: 'JetBrains Mono', size: 11 },
        callbacks: {
          label: (ctx: any) => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)} kg/₹cr`,
        },
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        border: { color: 'rgba(255,255,255,0.05)' },
        ticks: {
          color: '#7a987a',
          font: { family: 'JetBrains Mono', size: 11 },
          callback: (v: any) => `${v}`,
        },
        title: {
          display: true,
          text: 'CO₂e Intensity (kg/₹cr)',
          color: '#4a6a4a',
          font: { family: 'JetBrains Mono', size: 10 },
        },
      },
      x: {
        grid: { display: false },
        border: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#7a987a', font: { family: 'JetBrains Mono', size: 11 } },
      },
    },
  };

  return (
    <div className="h-full w-full">
      <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        Emissions Intensity Trend
      </h3>
      <div className="relative w-full h-[200px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EmissionsTrendChart;
