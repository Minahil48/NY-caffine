'use client';

import React, { useState, useEffect } from 'react';
import { edit, Trash } from '@/assets/common-icons';
import OrderFilters from '@/components/order/Filters';
import { OrderSearch } from '@/components/order/Search';
import DynamicTable from '@/components/order/Table';
import AddCard from './AddCard';
import AddButton from '../AddButton';
import { addCategory, getAllCategory, deleteCategory, updateCategory } from '@/lib/api/menu/category';

interface Category {
  _id: string;
  name: string;
}

const CategoryShimmer: React.FC = () => (
  <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl animate-pulse">
    <div className="flex w-full justify-between items-center">
      <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
      <div className="h-8 w-40 bg-gray-300 rounded"></div>
    </div>
    <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center mt-3">
      <div className="flex justify-between w-full gap-4">
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
        <div className="h-10 flex-1 bg-gray-200 rounded"></div>
      </div>
    </div>
    <div className="flex items-center justify-between pb-3 mt-4">
      <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
      <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
      <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
    </div>
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="flex items-center justify-between pb-3">
        <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

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
      if (res.success && Array.isArray(res.categories)) {
        setCategories(res.categories.map((cat: any) => ({ _id: cat._id, name: cat.name })));
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
      if (!res.success) return;
      setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
    } catch (err) {
      console.error(err);
    }
  };

  const addRowToTable = async (newCategory: { Name: string }) => {
    try {
      const res = await addCategory({ id: '', name: newCategory.Name });
      if (res.success && res.data) {
        setCategories((prev) => [...prev, { _id: res.data._id, name: res.data.name }]);
        setShowAddCard(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

 
  const handleEdit = async (updatedRow: Record<string, any>) => {
    try {
      const res = await updateCategory({ id: updatedRow.ID, name: updatedRow.Name });
      if (!res.success) return false;

      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === updatedRow.ID ? { ...cat, name: updatedRow.Name } : cat
        )
      );
      return true;
    } catch (err) {
      console.error('Error updating category:', err);
      return false;
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

  if (loading) return <CategoryShimmer />;
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
            onSelect={setSelectedProduct}
          />
          <div className="w-full md:w-auto">
            <OrderSearch value={searchTerm} onChange={setSearchTerm} />
          </div>
        </div>
      </div>

      <DynamicTable
        data={mappedData}
        icons={actionIcons}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {showAddCard && <AddCard onClose={() => setShowAddCard(false)} onAddRow={addRowToTable} />}
    </div>
  );
};

export default CategorySection;
