'use client';

import React, { useState, useRef, useEffect } from 'react';
import { iconDown } from '@/assets/common-icons';

interface DateFilterDropdownProps {
  label: string;
  options: string[];
  onSelect?: (value: string) => void;
  selected?: string;
}

const OrderFilters: React.FC<DateFilterDropdownProps> = ({
  label,
  options,
  onSelect,
  selected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative max-w-[190px]" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex gap-2 cursor-pointer text-gray-400 items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
      >
        <span>{selected || label}</span>
        {iconDown}
      </div>

      <div
        className={`absolute z-10 left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow transition-all duration-200 ease-in-out ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="max-h-40 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                selected === option ? 'bg-gray-100 font-medium text-gray-800' : 'text-gray-700'
              }`}
              onClick={() => {
                onSelect?.(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderFilters;
