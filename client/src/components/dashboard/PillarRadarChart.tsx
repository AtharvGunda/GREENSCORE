import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface PillarRadarChartProps {
  scoreData: {
    energy_score: number;
    water_score: number;
    waste_score: number;
    renewables_score: number;
    governance_score: number;
  };
}

const PillarRadarChart: React.FC<PillarRadarChartProps> = ({ scoreData }) => {
  const benchmarkScores = [50, 50, 50, 50, 33];

  const data = {
    labels: ['Energy', 'Water', 'Waste', 'Renewables', 'Governance'],
    datasets: [
      {
        label: 'Your Score',
        data: [
          scoreData.energy_score,
          scoreData.water_score,
          scoreData.waste_score,
          scoreData.renewables_score,
          scoreData.governance_score,
        ],
        backgroundColor: 'rgba(90, 158, 90, 0.18)',
        borderColor: '#7bc47b',
        borderWidth: 2,
        pointBackgroundColor: '#7bc47b',
        pointBorderColor: 'rgba(255,255,255,0.15)',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#7bc47b',
      },
      {
        label: 'Sector Average',
        data: benchmarkScores,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.18)',
        borderWidth: 1.5,
        borderDash: [4, 4],
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
    animation: { duration: 1000, easing: 'easeOutQuart' as const },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
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
          label: (ctx: any) => ` ${ctx.dataset.label}: ${ctx.raw} / 100`,
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        angleLines: { color: 'rgba(255,255,255,0.06)' },
        grid: { color: 'rgba(255,255,255,0.06)' },
        pointLabels: {
          color: '#7a987a',
          font: { size: 11, family: 'JetBrains Mono' },
        },
        ticks: {
          display: false,
          backdropColor: 'transparent',
        },
      },
    },
  };

  return (
    <div className="h-full w-full">
      <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        Pillar Radar
      </h3>
      <div className="relative w-full h-[240px]">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default PillarRadarChart;
