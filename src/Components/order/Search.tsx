'use client';

import { searchIcon } from "@/assets/common-icons";
import React from "react";

interface OrderSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const OrderSearch: React.FC<OrderSearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative py-2 flex items-center justify-center">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none w-48 text-gray-700 placeholder-gray-400"
      />
      <div className="absolute left-3 top-[16px] h-4 w-4 text-gray-400 pointer-events-none">
        {searchIcon}
      </div>
    </div>
  );
};
