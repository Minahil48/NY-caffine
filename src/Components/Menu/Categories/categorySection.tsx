'use client';

import React, { useState, useEffect } from 'react';
import { edit, Trash } from '@/assets/common-icons';
import OrderFilters from '@/components/order/Filters';
import { OrderSearch } from '@/components/order/Search';
import DynamicTable from '@/components/order/Table';
import AddCard from './AddCard';
import AddButton from '../AddButton';
import { addCategory, getAllCategory, deleteCategory } from '@/lib/api/menu/category';

interface Category {
  _id: string;
  name: string;
}

const CategorySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [showAddCard, setShowAddCard] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllCategory();
      console.log('Categories API response:', res);

      if (res.success && Array.isArray(res.categories)) {
        const mappedCategories: Category[] = res.categories.map((cat: any) => ({
          _id: cat._id,
          name: cat.name,
        }));
        setCategories(mappedCategories);
      } else {
        setError('Failed to load categories');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await deleteCategory(categoryId);
      if (!res.success) {
        console.error('Failed to delete category:', res.message);
        return;
      }
      setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const addRowToTable = async (newCategory: { Name: string }): Promise<void> => {
    try {
      const res = await addCategory({ id: '', name: newCategory.Name });
      if (res.success && res.data && typeof res.data._id === 'string' && typeof res.data.name === 'string') {
        const newCat: Category = {
          _id: res.data._id,
          name: res.data.name,
        };
        setCategories((prev) => [...prev, newCat]);
        setShowAddCard(false);
      } else {
        console.error('Failed to add category:', res.message);
      }
    } catch (err) {
      console.error('Failed to add category:', err);
    }
  };

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedProduct ? cat.name === selectedProduct : true)
  );

  const productOptions: string[] = Array.from(new Set(categories.map((cat) => cat.name)));

  const actionIcons = [
    { icon: Trash, action: 'delete' },
    { icon: edit, action: 'edit' },
  ];

  const mappedData = filteredCategories.map((cat) => ({
    ID: cat._id,
    Name: cat.name,
  }));

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl">
      <div className="flex w-full justify-between">
        <h1 className="text-xl font-medium">All Categories</h1>
        <AddButton label="+ Add New Category" onClick={() => setShowAddCard(true)} />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
        <div className="flex justify-between w-full gap-4">
          <OrderFilters
            label="By Product"
            options={productOptions}
            selected={selectedProduct}
            onSelect={(val: string) => setSelectedProduct(val)}
          />

          <div className="w-full md:w-auto">
            <OrderSearch value={searchTerm} onChange={setSearchTerm} />
          </div>
        </div>
      </div>

      <DynamicTable data={mappedData} icons={actionIcons} onDelete={handleDelete} />

      {showAddCard && <AddCard onClose={() => setShowAddCard(false)} onAddRow={addRowToTable} />}
    </div>
  );
};

export default CategorySection;
