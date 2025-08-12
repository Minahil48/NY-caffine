'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Order } from '@/lib/static-data/menu';
import { iconDown, leftArrow } from '@/assets/common-icons';
import Link from 'next/link';
import { useMenu } from '../context/MenuContext';
import ImageDropDown from './ImageDropDown';

const Form = () => {
    const router = useRouter();
    const { addMenuItem } = useMenu();

    const [itemName, setItemName] = useState('');
    const [setPrice, setSetPrice] = useState('');
    const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleAddItem = (item: string, setter: any, currentItems: string[]) => {
        if (item && !currentItems.includes(item)) {
            setter([...currentItems, item]);
        }
        setOpenDropdown(null);
    };

    const handleRemoveItem = (itemToRemove: string, setter: any, currentItems: string[]) => {
        setter(currentItems.filter((item) => item !== itemToRemove));
    };

    const handleSubmit = () => {
        const price = parseFloat(setPrice);

        if (selectedBranches.length === 0) {
            alert('Please select at least one branch.');
            return;
        }

        if (selectedCategories.length === 0) {
            alert('Please select at least one category.');
            return;
        }

        if (selectedModifiers.length === 0) {
            alert('Please select at least one modifier.');
            return;
        }

        const newItem: Order = {
            Name: itemName,
            Price: `$${price.toFixed(2)}`,
            Category: selectedCategories[0],
            Modifiers: selectedModifiers.map(name => ({ name })),
            Qty: Math.floor(Math.random() * 100),
            status: 'Active',
        };

        addMenuItem(newItem);
        router.push('/menu-page');
    };

    const isFormValid =
        itemName.trim() !== '' &&
        !isNaN(parseFloat(setPrice)) &&
        parseFloat(setPrice) > 0 &&
        selectedBranches.length > 0 &&
        selectedCategories.length > 0 &&
        selectedModifiers.length > 0;

    const FormGroup = ({ label, isRequired = false, children, selectedItems = [], onRemoveItem }: any) => (
        <div className="mb-6">
            <label className="block text-black text-md font-medium mb-2">
                {label} {isRequired && <span className="text-red-600">*</span>}
            </label>
            {children}
            {selectedItems.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedItems.map((item: string) => (
                        <div
                            key={item}
                            className="flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm shadow-sm"
                        >
                            {item}
                            {onRemoveItem && (
                                <button onClick={() => onRemoveItem(item)} className="ml-2">&times;</button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const Dropdown = ({ label, options, selected, onSelect, name }: any) => (
        <div className="relative max-w-md">
            <button
                type="button"
                className="flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white"
                onClick={() => setOpenDropdown(openDropdown === name ? null : name)}
            >
                <span>{label}</span>
                <span>{iconDown}</span>
            </button>
            {openDropdown === name && (
                <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md">
                    {options.map((option: string) => (
                        <li
                            key={option}
                            onClick={() => onSelect(option)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div className="bg-white p-8 flex flex-col gap-3 rounded-2xl m-4">
            <div className="flex justify-between items-center mb-8">
                <Link href="/menu-page" className="text-xl flex items-center text-gray-800 hover:text-primary">
                    {leftArrow} <span className="ml-2">Add New Item</span>
                </Link>
                <button
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary disabled:opacity-50"
                >
                    Add New Inventory
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <FormGroup
                    label="Branch"
                    isRequired
                    selectedItems={selectedBranches}
                    onRemoveItem={(item: string) => handleRemoveItem(item, setSelectedBranches, selectedBranches)}
                >
                    <Dropdown
                        name="branch"
                        label="Select Branch"
                        options={['NY California', 'Texas', 'Florida']}
                        selected={selectedBranches}
                        onSelect={(val: string) => handleAddItem(val, setSelectedBranches, selectedBranches)}
                    />
                </FormGroup>

                <FormGroup label="Item Name" isRequired>
                    <input
                        type="text"
                        className="block w-full lg:w-[450px] px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Mocha"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        autoFocus
                    />
                </FormGroup>

                <FormGroup
                    label="Category"
                    isRequired
                    selectedItems={selectedCategories}
                    onRemoveItem={(item: string) => handleRemoveItem(item, setSelectedCategories, selectedCategories)}
                >
                    <Dropdown
                        name="category"
                        label="Select Category"
                        options={['Milkshake', 'Iced Coffee']}
                        selected={selectedCategories}
                        onSelect={(val: string) => handleAddItem(val, setSelectedCategories, selectedCategories)}
                    />
                </FormGroup>

                    <FormGroup label="Set Price (USD)" isRequired>
                        <div>
                            <input
                                type="number"
                                className={`block w-full lg:w-[450px] px-4 py-2 border ${parseFloat(setPrice) <= 0 && setPrice !== ''
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                    } rounded-md`}
                                placeholder="Enter a price greater than 0"
                                value={setPrice}
                                min="1"
                                step="1"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (parseFloat(value) >= 0 || value === '') {
                                        setSetPrice(value);
                                    }
                                }}
                            />
                            {setPrice !== '' && parseFloat(setPrice) <= 0 && (
                                <p className="text-red-500 text-sm mt-1">Price must be greater than 0.</p>
                            )}
                        </div>
                    </FormGroup>
                <FormGroup
                    label="Modifier"
                    isRequired
                    selectedItems={selectedModifiers}
                    onRemoveItem={(item: string) => handleRemoveItem(item, setSelectedModifiers, selectedModifiers)}
                >
                    <Dropdown
                        name="modifier"
                        label="Select Modifier"
                        options={['Dairy', 'Decaf', 'Non Dairy']}
                        selected={selectedModifiers}
                        onSelect={(val: string) => handleAddItem(val, setSelectedModifiers, selectedModifiers)}
                    />
                </FormGroup>
            </div>

            <ImageDropDown width="w-64" />
        </div>
    );
};

export default Form;
