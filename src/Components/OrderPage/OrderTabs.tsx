"use client";
import React, { useState } from "react";

const tabs = ["All Orders", "Pending", "Canceled", "Completed"];

export const OrderTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All Orders");

  return (
    <div className="flex gap-4 text-sm font-medium text-gray-500">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`border-b-2 pb-1 ${
            activeTab === tab
              ? "text-primary border-primary"
              : "border-transparent hover:text-primary"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
