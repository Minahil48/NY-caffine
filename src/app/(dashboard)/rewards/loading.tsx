'use client';

import React from 'react';

const RewardsShimmer: React.FC = () => {
  return (
    <div className="flex flex-col p-5 bg-white rounded-2xl gap-3 animate-pulse">

      <div className="flex justify-between mb-5">
        <div className="h-6 w-50 bg-gray-300 rounded"></div>
        <div className="h-10 w-50 bg-gray-300 rounded"></div>
      </div>
      <div className="flex gap-7 w-full justify-start flex-wrap">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="w-66 h-66 bg-gray-200 rounded-xl flex flex-col gap-3 p-3"
          >
            <div className="h-24 w-full bg-gray-300 rounded-lg"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="h-3 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-20 bg-gray-300 rounded mt-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsShimmer;
