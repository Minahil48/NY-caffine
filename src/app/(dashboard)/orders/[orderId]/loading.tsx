"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col bg-white rounded-2xl min-h-screen mb-2 animate-pulse">
      <div className="flex w-full justify-between p-5">
        <div className="flex items-center p-3 gap-2">
          <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 p-6">
        <div className="flex flex-col gap-3 p-4 border border-gray-200 rounded-xl">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 w-3/4 bg-gray-200 rounded"></div>
          ))}
        </div>

        <div className="flex flex-col gap-3 p-4 border border-gray-200 rounded-xl">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-2/3 bg-gray-200 rounded"></div>
          ))}
          <div className="flex justify-between mt-4">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="flex justify-between font-bold">
            <div className="h-5 w-20 bg-gray-200 rounded"></div>
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col m-6">
        <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>

        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl"
            >
              <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>

              <div className="flex flex-col gap-2 flex-1">
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
              </div>
              <div className="h-5 w-12 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
