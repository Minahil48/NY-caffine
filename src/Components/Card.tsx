import React, { ReactNode } from 'react';

interface CardProps {
  heading: string;
  percentage: string;
  amount: string;
  subHeading: string;
  icon?: ReactNode;
  bgColor: string;
  textColor: string;
}

function Card({
  heading,
  percentage,
  amount,
  subHeading,
  icon,
  bgColor,
  textColor,
}: CardProps) {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-2xl p-6 sm:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[280px] ml-3">
      <div className="flex gap-4 items-center">
        <div className="text-gray-600 text-md font-medium">{heading}</div>
        <div
          className="flex items-center gap-1 text-sm px-2 py-1 rounded-xl"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          {icon}
          {percentage}
        </div>
      </div>
      <div className="text-3xl font-bold text-primary">{amount}</div>
      <div className="text-sm text-gray-500">{subHeading}</div>
    </div>
  );
}

export default Card;
