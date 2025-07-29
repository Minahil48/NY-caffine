import { iconDown } from '@/assets/common-icons';
import React from 'react';

interface DateFilterDropdownProps {
    label: string;
}

const OrderFilters: React.FC<DateFilterDropdownProps> = ({ label }) => {
    return (
        <button
            className="flex whitespace-nowrap gap-2 text-gray-400 max-w-[130px] items-center justify-between px-4 bg-white border border-gray-300 rounded-lg text-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-gray-50">
            <span>{label}</span>
            {iconDown}
        </button>
    );
};

export default OrderFilters;