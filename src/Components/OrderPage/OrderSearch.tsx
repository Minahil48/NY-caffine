"use client";
import { searchIcon } from "@/assets/common-icons";
import React from "react";

export const OrderSearch: React.FC = () => {
    return (
        <div className="relative py-2 items-center justify-center">
            <input
                type="text"
                placeholder="Search by ID"
                className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none w-48 text-gray-400"
            />
            <div className="absolute left-2 top-4 h-4 w-4 text-gray-400">{searchIcon}</div>
        </div>
    );
};
