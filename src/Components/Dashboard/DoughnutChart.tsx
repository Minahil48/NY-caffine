"use client";

import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Calender } from "@/assets/common-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(ArcElement, Tooltip, Legend);

interface OrderChartProps {
  orderDataByDate: Record<string, number>;
}

const DoughnutChart: React.FC<OrderChartProps> = ({ orderDataByDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const formattedDate = selectedDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
  const ordersCount = orderDataByDate[formattedDate] ?? null;

  const totalValue = 150;
  const remainingValue = totalValue - (ordersCount ?? 0);

  const data = {
    labels: ["Order", "Remaining"],
    datasets: [
      {
        data: [ordersCount ?? 0, remainingValue],
        backgroundColor: ["#874F00", "#EFEFEF"],
        borderWidth: 0,
        borderRadius: [10, 0],
        cutout: "80%",
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  const day = selectedDate.getDate();
  const monthYear = selectedDate.toLocaleDateString("default", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl w-full min-w-[300px] lg:w-[400px] flex flex-col pb-4 relative">
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-2xl font-medium">Orders</h1>
          <p className="text-sm text-gray-400">Selected: {formattedDate}</p>
        </div>
        <div
          className="border border-gray-300 w-8 h-8 rounded-full bg-secondary flex items-center justify-center cursor-pointer"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {Calender}
        </div>

        {showCalendar && (
          <div className="absolute right-4 top-[70px] z-50">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => {
                if (date) {
                  setSelectedDate(date);
                  setShowCalendar(false);
                }
              }}
              inline
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-center h-[240px] rounded-2xl">
        {ordersCount !== null ? (
          <div className="relative w-full max-w-[220px] lg:w-[220px] h-[220px] flex items-center justify-center">
            <Doughnut data={data} options={options} />
            <div className="absolute w-25 h-25 sm:w-[110px] sm:h-[110px] gap-0.5 bg-secondary whitespace-nowrap rounded-full flex flex-col items-center justify-center text-center">
              <span className="text-lg font-medium text-gray-800">{day}</span>
              <span className="text-xs text-gray-600 leading-none">
                {monthYear}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-lg">No data on this date</p>
        )}
      </div>
    </div>
  );
};

export default DoughnutChart;
