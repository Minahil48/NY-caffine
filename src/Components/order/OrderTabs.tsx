'use client';

import React from 'react';

const tabs = ['All Orders', 'Pending', 'Canceled', 'Completed'];

interface OrderTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const OrderTabs: React.FC<OrderTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex gap-4 text-sm font-medium text-gray-500">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`border-b-2 pb-1 ${
            activeTab === tab
              ? 'text-primary border-primary cursor-pointer'
              : 'border-transparent hover:text-primary cursor-pointer'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
