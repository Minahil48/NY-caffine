'use client';

import CardsInput from '@/Components/CardsInput';
import React, { useState } from 'react';
import DropDown from '../New-Item/ImageDropDown';
import AddButton from '../AddButton';
import ImageDropDown from '../New-Item/ImageDropDown';

interface AddCardProps {
  onClose: () => void;
  onAddRow: (newData: { ID: string; Name: string; Qty: number }) => void;
}

const AddCard: React.FC<AddCardProps> = ({ onClose, onAddRow }) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (categoryName.trim() === '') {
      setError('Category name is required.');
      return;
    }

    const newRow = {
      ID: '#102194',
      Name: categoryName.trim(),
      Qty: Math.floor(Math.random() * 50) + 1,
    };

    onAddRow(newRow);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center z-50 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl relative w-full max-w-md sm:max-w-lg lg:max-w-[480px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl"
        >
          ×
        </button>

        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-medium mb-4 sm:mb-6">New Category</h2>

          <CardsInput
            label="Category Name"
            required
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              if (error) setError('');
            }}
            placeholder="Iced Mocha"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-2 items-center justify-center w-full">
            <ImageDropDown width="w-full lg:w-100" />
          </div>

            <AddButton label="Add New Category" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AddCard;
