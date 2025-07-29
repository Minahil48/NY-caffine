"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { iconDown } from "@/assets/common-icons";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const primaryColor = "#874F00";
const grayColor = "#EFEFEF";

const data = {
  labels: [
    "Jan", "Feb", "March", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],
  datasets: [
    {
      label: "Sales",
      data: [500, 100, 150, 400, 450, 100, 150, 350, 100, 300, 350, 400],
      backgroundColor: grayColor,
      hoverBackgroundColor: primaryColor,
      borderRadius: 4,
      barPercentage: 0.6,
    },
  ],
};

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#000",
      callbacks: {
        title: () => "",
        label: (context: any) => `$${context.raw}`,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#616161",
        font: { size: 12 },
        maxRotation: 0,
        autoSkip: false,
      },
      grid: { display: false },
    },
    y: {
      min: 0,
      max: 500,
      ticks: {
        color: "#616161",
        font: { size: 12 },
        stepSize: 100,
        callback: (value: number) => value,
      },
      grid: { display: false },
    },
  },
};

const Chart: React.FC = () => {
  return (
    <div className="w-full max-w-[800px] lg:w-[800px] h-auto lg:h-[350px] p-6 bg-white rounded-2xl flex flex-col gap-7">
      <div className="flex flex-wrap gap-4 items-center">
        <h1 className="text-xl sm:text-2xl font-medium">Overall sales</h1>
        <p className="bg-[#FFEFEF] flex items-center gap-2 text-sm text-[#F93131] px-3 py-2 rounded-xl">
          {iconDown} 3.0% this month
        </p>
      </div>
      <div className="h-[230px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Chart;
