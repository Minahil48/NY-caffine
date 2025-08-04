'use client';

import React from 'react';
import CardsInput from '@/Components/CardsInput';
import AddButton from '../Menu/AddButton';
import { Calender } from '@/assets/common-icons';

interface AddCardProps {
  onClose: () => void;
}

const AddEmployee: React.FC<AddCardProps> = ({ onClose }) => {
  const [employeeName, setEmployeeName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [joiningDate, setJoiningDate] = React.useState('');

  return (
    <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl relative w-115">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl"
        >
          ×
        </button>

        <div className="flex flex-col gap-5 justify-center">
          <h2 className="text-xl font-medium mb-6">New Category</h2>

          <CardsInput
            label="Employee Name"
            required
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="Ahsan Khan"
          />

          <CardsInput
            label="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ahsankhan@gmail.com"
          />

          <div className="relative">
            <CardsInput
              label="Date of Joining"
              required
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              placeholder="14-April-2012"
            />
            <span className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500 pointer-events-none">
              {Calender}
            </span>
          </div>

          <AddButton label="Add Employee" />
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
