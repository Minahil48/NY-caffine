
'use client';

import CardsInput from '@/Components/CardsInput';
import React from 'react';
import DropDown from '../New-Item/DropDown';
import AddButton from '../AddButton';

interface AddCardProps {
    onClose: () => void;
}


const AddCard: React.FC<AddCardProps> = ({ onClose }) => {
    const [categoryName, setCategoryName] = React.useState('');
    return (
        <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl relative w-120">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-600 hover:text-black"
                >
                    ×
                </button>
                <div className='flex flex-col gap-5'>
                    <h2 className="text-xl font-medium mb-6"> New Category</h2>
                    <CardsInput
                        label="Category Name"
                        required
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Iced Mocha" />
                    <div className='flex gap-2'><DropDown width="w-105" /></div>
                    <AddButton label="Add New Category"/></div>
                    
            </div>
        </div>
    );
};

export default AddCard;
