'use client';

import React from 'react';

interface InputFieldProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}


const CardsInput: React.FC<InputFieldProps> = ({
    
  label,
  required = false,
  value,
  onChange,
  placeholder = '',
}) => {
  return (
    <div className="flex flex-col space-y-1 w-[400px]">
      <label className="text-sm text-black">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type="text"
        className="px-4 py-2 border border-gray-200 rounded-md outline-none"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CardsInput;
