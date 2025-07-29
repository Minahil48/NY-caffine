'use client';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Calender } from '@/assets/common-icons';

ChartJS.register(ArcElement, Tooltip, Legend);

interface OrderChartProps {
  day: number;
  monthYear: string;
  ordersCount: number;
}

const DoughnutChart: React.FC<OrderChartProps> = ({ day, monthYear, ordersCount }) => {
  const totalValue = 150;
  const remainingValue = totalValue - ordersCount;

  const data = {
    labels: ['Order', 'Remaining'],
    datasets: [
      {
        data: [ordersCount, remainingValue],
        backgroundColor: ['#874F00', '#EFEFEF'],
        borderWidth: 0,
        borderRadius: [10, 0],
        cutout: '80%',
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any) {
            return `$${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl w-full max-w-[400px] lg:w-[400px] flex flex-col pb-4 ">
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-2xl font-medium">Orders Today</h1>
          <p className="text-sm text-gray-400">Local time 12:59pm</p>
        </div>
        <div className="border border-gray-300 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          {Calender}
        </div>
      </div>

      <div className="flex items-center justify-center h-[240px] rounded-2xl">
        <div className="relative w-full max-w-[220px] lg:w-[220px] h-[220px] flex items-center justify-center">
          <Doughnut data={data} options={options} />
          <div className="absolute w-25 h-25 sm:w-[110px] sm:h-[110px] gap-0.5 bg-secondary whitespace-nowrap rounded-full flex flex-col items-center justify-center text-center">
            <span className="text-lg font-medium text-gray-800">{day}</span>
            <span className="text-xs text-gray-600 leading-none">{monthYear}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
