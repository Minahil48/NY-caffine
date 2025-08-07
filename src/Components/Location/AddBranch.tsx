'use client';

import React, { useState } from 'react';
import CardsInput from '@/Components/CardsInput';
import AddButton from '../Menu/AddButton';

interface AddCardProps {
  onClose: () => void;
  onAddRow: (newData: { BranchCode: string; BranchName: string; Address: string}) => void;
}

const AddBranch: React.FC<AddCardProps> = ({ onClose, onAddRow }) => {
  const [branchName, setBranchName] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [address, setAddress] = useState('');

  const [errors, setErrors] = useState({
    branchName: '',
    branchCode: '',
    address: '',
  });

  const validate = () => {
    const newErrors: typeof errors = {
      branchName: '',
      branchCode: '',
      address: '',
    };

    if (!branchName.trim()) {
      newErrors.branchName = 'Branch name is required.';
    }

    if (!branchCode.trim()) {
      newErrors.branchCode = 'Branch code is required.';
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required.';
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((msg) => msg !== '');
  };

  const handleSubmit = () => {
    if (validate()) {
      const newRow = {
        BranchName: branchName,
        BranchCode: branchCode,
        Address: address,
      };
      onAddRow(newRow);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center z-50 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl relative w-full max-w-md sm:max-w-lg lg:w-115">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl"
        >
          ×
        </button>

        <div className="flex flex-col gap-5 justify-center">
          <h2 className="text-xl font-medium mb-4 sm:mb-6">New Branch</h2>

          <div>
            <CardsInput
              label="Branch Name"
              required
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="London Branch"
            />
            {errors.branchName && <p className="text-red-500 text-sm mt-1">{errors.branchName}</p>}
          </div>

          <div>
            <CardsInput
              label="Branch Code"
              required
              value={branchCode}
              onChange={(e) => setBranchCode(e.target.value)}
              placeholder="NY-123"
            />
            {errors.branchCode && <p className="text-red-500 text-sm mt-1">{errors.branchCode}</p>}
          </div>

          <div>
            <CardsInput
              label="Branch Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <AddButton label="Add Branch" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AddBranch;
