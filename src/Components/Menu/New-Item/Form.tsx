"use client"

import { iconDown } from '@/assets/common-icons';
import React, { useRef, useState } from 'react';
import DropDown from './DropDown';

const Form: React.FC = () => {
    const [itemName, setItemName] = useState<string>('');
    const [setPrice, setSetPrice] = useState<string>('');

    const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);

    const branchOptions: string[] = ["NY California", "NY London", "Texas Houston", "Florida Miami"];
    const categoryOptions: string[] = ["Beverages", "Food", "Desserts", "Snacks"];
    const modifierOptions: string[] = ["Toppings", "Milk Variations", "Sweeteners", "Temperature"];

    const branchRef = useRef<HTMLSelectElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const modifierRef = useRef<HTMLSelectElement>(null);

    const handleAddItem = (
        item: string,
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        currentItems: string[]
    ) => {
        if (item && !currentItems.includes(item)) {
            setter([...currentItems, item]);
        }
    };

    const handleRemoveItem = (
        itemToRemove: string,
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        currentItems: string[]
    ) => {
        setter(currentItems.filter(item => item !== itemToRemove));
    };

    const FormGroup: React.FC<{
        label: string;
        isRequired: boolean;
        children: React.ReactNode;
        selectedItems?: string[];
        onRemoveItem?: (item: string) => void;
    }> = ({ label, isRequired, children, selectedItems, onRemoveItem }) => (
        <div className="mb-6">
            <label className="block text-black text-md font-medium mb-2">
                {label} {isRequired && <span className="text-red-600">*</span>}
            </label>
            {children}
            {selectedItems && selectedItems.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedItems.map(item => (
                        <div
                            key={item}
                            className="flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm shadow-sm"
                        >
                            {item}
                            {onRemoveItem && (
                                <button
                                    type="button"
                                    onClick={() => onRemoveItem(item)}
                                    className="ml-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                                    aria-label={`Remove ${item}`}
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-white p-6 sm:p-8 w-full flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                <FormGroup
                    label="Branch"
                    isRequired={true}
                    selectedItems={selectedBranches}
                    onRemoveItem={(item) => handleRemoveItem(item, setSelectedBranches, selectedBranches)}
                >
                    <div className="relative">
                        <span
                            className="absolute right-28 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => branchRef.current?.focus()}
                        >
                            {iconDown}
                        </span>
                        <select
                            ref={branchRef}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md max-w-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-800 appearance-none pr-8 cursor-pointer"
                            onChange={(e) => handleAddItem(e.target.value, setSelectedBranches, selectedBranches)}
                            value=""
                        >
                            <option value="" disabled>Select Branch</option>
                            {branchOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </FormGroup>

                <FormGroup label="Item Name" isRequired={true}>
                    <input
                        type="text"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md max-w-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-800"
                        placeholder="Iced Mocha"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </FormGroup>

                <FormGroup
                    label="Category"
                    isRequired={true}
                    selectedItems={selectedCategories}
                    onRemoveItem={(item) => handleRemoveItem(item, setSelectedCategories, selectedCategories)}
                >
                    <div className="relative">
                        <span
                            className="absolute right-28 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => categoryRef.current?.focus()}
                        >
                            {iconDown}
                        </span>
                        <select
                            ref={categoryRef}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md max-w-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-800 appearance-none pr-8 cursor-pointer"
                            onChange={(e) => handleAddItem(e.target.value, setSelectedCategories, selectedCategories)}
                            value=""
                        >
                            <option value="" disabled>Select Category</option>
                            {categoryOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </FormGroup>
                <FormGroup label="Set Price(USD)" isRequired={true}>
                    <input
                        type="number"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md max-w-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-800"
                        placeholder="0"
                        value={setPrice}
                        onChange={(e) => setSetPrice(e.target.value)}
                    />
                </FormGroup>

                <FormGroup
                    label="Modifier"
                    isRequired={true}
                    selectedItems={selectedModifiers}
                    onRemoveItem={(item) => handleRemoveItem(item, setSelectedModifiers, selectedModifiers)}
                >
                    <div className="relative">
                        <span
                            className="absolute right-28 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => modifierRef.current?.focus()}
                        >
                            {iconDown}
                        </span>
                        <select
                            ref={modifierRef}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md max-w-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-800 appearance-none pr-8 cursor-pointer"
                            onChange={(e) => handleAddItem(e.target.value, setSelectedModifiers, selectedModifiers)}
                            value=""
                        >
                            <option value="" disabled>Select Modifier</option>
                            {modifierOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </FormGroup>
                
            </div>
            <DropDown width="w-50" />
        </div>
    );
};

export default Form;
