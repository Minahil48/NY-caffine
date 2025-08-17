'use client';

import React from 'react';

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 p-6 animate-pulse bg-gray-50 min-h-screen">

      <div className="flex flex-col lg:flex-row gap-6 w-full justify-center">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="w-full lg:w-56 h-32 bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3"
          >
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded mt-auto"></div>
          </div>
        ))}
      </div>


      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="w-full lg:w-2/3 h-64 bg-white rounded-2xl shadow-sm"></div>
        <div className="w-full lg:w-1/3 h-64 bg-white rounded-2xl shadow-sm"></div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm mt-6 flex flex-col gap-4">
        <div className="flex justify-between mb-4">
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>

   
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="flex gap-4 p-4 bg-gray-100 rounded-lg w-full"
            >
              <div className="h-5 w-12 bg-white rounded"></div>
              <div className="h-5 w-24 bg-white rounded"></div>
              <div className="h-5 w-16 bg-white rounded"></div>
              <div className="h-5 w-20 bg-white rounded"></div>
              <div className="h-5 w-12 bg-white rounded ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
