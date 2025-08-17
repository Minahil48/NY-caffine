'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { iconDown, leftArrow } from '@/assets/common-icons';
import Link from 'next/link';
import { useMenu } from '../context/MenuContext';
import ImageDropDown from './ImageDropDown';
import { AddItem } from '@/lib/api/menu/additem';
import { getAllCategory } from '@/lib/api/menu/category';
import { getAllLocations } from '@/lib/api/location/location';
import { getAllModifier } from '@/lib/api/menu/modifiers';


const FormGroup = React.memo(
  ({ label, isRequired = false, children, selectedItems = [], onRemoveItem }: any) => (
    <div className="mb-6">
      <label className="block text-black text-md font-medium mb-2">
        {label} {isRequired && <span className="text-red-600">*</span>}
      </label>
      {children}
      {(selectedItems ?? []).length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {(selectedItems ?? []).map((item: any) => (
            <div
              key={item._id}
              className="flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm shadow-sm"
            >
              {item.name}
              {onRemoveItem && (
                <button onClick={() => onRemoveItem(item)} className="ml-2">
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
);
FormGroup.displayName = 'FormGroup';


const Dropdown = React.memo(
  ({ label, options = [], onSelect, name, openDropdown, setOpenDropdown }: any) => (
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
          {(options ?? []).map((option: any) => (
            <li
              key={option._id}
              onClick={() => onSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
);
Dropdown.displayName = 'Dropdown';


const Form = () => {
  const router = useRouter();
  const { addMenuItem } = useMenu();

  const [itemName, setItemName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [selectedBranches, setSelectedBranches] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedModifiers, setSelectedModifiers] = useState<any[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [branches, setBranches] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [modifiers, setModifiers] = useState<any[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [branchRes, categoryRes, modifierRes] = await Promise.all([
          getAllLocations(),
          getAllCategory(),
          getAllModifier(),
        ]);

        setBranches(branchRes?.data ?? []);
        setCategories(categoryRes?.categories ?? []);
        setModifiers(modifierRes?.data ?? []);

        console.log('Categories fetched:', categoryRes);
      } catch (err) {
        console.error('Error fetching dropdown data:', err);
      }
    };
    fetchData();
  }, []);

  const handleAddItem = (item: any, setter: any, currentItems: any[]) => {
    if (item && !currentItems.find((i) => i._id === item._id)) {
      setter([...currentItems, item]);
    }
    setOpenDropdown(null);
  };

  const handleRemoveItem = (itemToRemove: any, setter: any, currentItems: any[]) => {
    setter(currentItems.filter((item) => item._id !== itemToRemove._id));
  };

  const handleSubmit = async () => {
    const numericPrice = parseFloat(price);

    if (!itemName.trim() || !desc.trim() || isNaN(numericPrice) || numericPrice <= 0) {
      alert('Please fill all required fields.');
      return;
    }

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

    setLoading(true);

    try {
      const response = await AddItem({
        name: itemName,
        desc,
        price: numericPrice,
        category: selectedCategories[0]._id,
        modifiers: selectedModifiers.map((m) => m._id),
        branch: selectedBranches.map((b) => b._id),
        qty: 10,
        isActive: true,
        images: [],
      });

      if (response.success) {
        addMenuItem({
          Name: response.data.name,
          Price: `$${response.data.price.toFixed(2)}`,
          Category: response.data.category,
          Modifiers: response.data.modifiers.map((id: string) => ({ name: id })),
          Qty: response.data.qty,
          status: response.data.isActive ? 'Active' : 'Inactive',
        });

        router.push('/menu');
      } else {
        alert('Failed to add item: ' + response.message);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    itemName.trim() !== '' &&
    desc.trim() !== '' &&
    !isNaN(parseFloat(price)) &&
    parseFloat(price) > 0 &&
    selectedBranches.length > 0 &&
    selectedCategories.length > 0 &&
    selectedModifiers.length > 0;

  return (
    <div className="bg-white p-8 flex flex-col gap-3 rounded-2xl m-4">
      <div className="flex justify-between items-center mb-8">
        <Link href="/menu-page" className="text-xl flex items-center text-gray-800 hover:text-primary">
          {leftArrow} <span className="ml-2">Add New Item</span>
        </Link>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add New Inventory'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <FormGroup
          label="Branch"
          isRequired
          selectedItems={selectedBranches}
          onRemoveItem={(item: any) => handleRemoveItem(item, setSelectedBranches, selectedBranches)}
        >
          <Dropdown
            name="branch"
            label="Select Branch"
            options={branches}
            onSelect={(val: any) => handleAddItem(val, setSelectedBranches, selectedBranches)}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        </FormGroup>

        <FormGroup label="Item Name" isRequired>
          <input
            type="text"
            className="block w-full lg:w-[450px] px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Mocha"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </FormGroup>

        <FormGroup
          label="Category"
          isRequired
          selectedItems={selectedCategories}
          onRemoveItem={(item: any) => handleRemoveItem(item, setSelectedCategories, selectedCategories)}
        >
          <Dropdown
            name="category"
            label="Select Category"
            options={categories}
            onSelect={(val: any) => handleAddItem(val, setSelectedCategories, selectedCategories)}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        </FormGroup>

        <FormGroup label="Set Price (USD)" isRequired>
          <div>
            <input
              type="number"
              className={`block w-full lg:w-[450px] px-4 py-2 border ${
                price !== '' && parseFloat(price) <= 0 ? 'border-red-500' : 'border-gray-300'
              } rounded-md`}
              placeholder="Enter a price greater than 0"
              value={price}
              min="1"
              step="1"
              onChange={(e) => setPrice(e.target.value)}
            />
            {price !== '' && parseFloat(price) <= 0 && (
              <p className="text-red-500 text-sm mt-1">Price must be greater than 0.</p>
            )}
          </div>
        </FormGroup>

        <FormGroup
          label="Modifier"
          isRequired
          selectedItems={selectedModifiers}
          onRemoveItem={(item: any) => handleRemoveItem(item, setSelectedModifiers, selectedModifiers)}
        >
          <Dropdown
            name="modifier"
            label="Select Modifier"
            options={modifiers}
            onSelect={(val: any) => handleAddItem(val, setSelectedModifiers, selectedModifiers)}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        </FormGroup>

        <FormGroup label="Description" isRequired>
          <textarea
            className="block w-full lg:w-[450px] px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter item description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </FormGroup>
      </div>

      <ImageDropDown width="w-64" />
    </div>
  );
};

export default Form;
