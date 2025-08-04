'use client';

import React from 'react';
import CardsInput from '@/Components/CardsInput';
import AddButton from '../Menu/AddButton';
import { Calender } from '@/assets/common-icons';

interface AddCardProps {
  onClose: () => void;
}

const AddBranch: React.FC<AddCardProps> = ({ onClose }) => {
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
          <h2 className="text-xl font-medium mb-6">New New Branch</h2>

          <CardsInput
            label="Branch Name"
            required
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="NY Caffine Khan"
          />

          <CardsInput
            label="Branch Code"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="NY-9092"
          />

            <CardsInput
              label="Address"
              required
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              placeholder="Main Boulevard, Street 18, London"
            />

          <AddButton label="Add Employee" />
        </div>
      </div>
    </div>
  );
};

export default AddBranch;
