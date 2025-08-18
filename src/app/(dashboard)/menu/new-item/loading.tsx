"use client";

import React from "react";

const Shimmer = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
);

export default function Loading() {
  return (
    <div className="bg-white p-8 flex flex-col gap-3 rounded-2xl m-4">
      <div className="flex justify-between items-center mb-8">
        <Shimmer className="h-6 w-40" />
        <Shimmer className="h-10 w-40" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div>
          <Shimmer className="h-4 w-20 mb-2" />
          <Shimmer className="h-10 w-full lg:w-[450px]" />
        </div>
        <div>
          <Shimmer className="h-4 w-24 mb-2" />
          <Shimmer className="h-10 w-full lg:w-[450px]" />
        </div>
        <div>
          <Shimmer className="h-4 w-20 mb-2" />
          <Shimmer className="h-10 w-full lg:w-[450px]" />
        </div>
        <div>
          <Shimmer className="h-4 w-28 mb-2" />
          <Shimmer className="h-10 w-full lg:w-[450px]" />
        </div>
        <div>
          <Shimmer className="h-4 w-24 mb-2" />
          <Shimmer className="h-10 w-full lg:w-[450px]" />
        </div>

        <div>
          <Shimmer className="h-4 w-28 mb-2" />
          <Shimmer className="h-24 w-full lg:w-[450px]" />
        </div>
      </div>

      <div className="mt-6">
        <Shimmer className="h-6 w-32 mb-2" />
        <Shimmer className="h-32 w-64" />
      </div>
    </div>
  );
}
