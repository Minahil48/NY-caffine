'use client';

import React, { useState, useEffect } from 'react';
import OrderFilters from '../order/Filters';
import { OrderSearch } from '../order/Search';
import { edit, Trash } from '@/assets/common-icons';
import Link from 'next/link';
import DynamicTable from '../order/Table';
import AddButton from '../menu/AddButton';
import { getAllItem, deleteItem } from '@/lib/api/menu/item';

const MenuSection: React.FC = () => {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await getAllItem();
      setMenuItems(res.items || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await deleteItem(itemId);
      if (!res.success) {
        console.error('Failed to delete item:', res.message);
        return;
      }
      setMenuItems((prev) => prev.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleFilterChange = (label: string, value: string) => {
    if (label === 'By Category') setSelectedCategory(value);
    else if (label === 'In Stock') setSelectedStatus(value);
  };

  const actionIcons = [
    { icon: Trash, action: 'delete' },
    { icon: edit, action: 'edit' },
  ];

  const filteredOrders = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedCategory || item.category?.name === selectedCategory) &&
    (!selectedStatus || (selectedStatus === 'Active' ? item.isActive : !item.isActive))
  );

  if (loading) return <div className="p-4">Loading items...</div>;

  const mappedData = filteredOrders.map(item => ({
    ID: item._id,
    Name: item.name,
    status: item.isActive ? 'Active' : 'Inactive',
  }));

  return (
    <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl">
      <div className="flex w-full justify-between">
        <h1 className="text-xl font-medium">All Items</h1>
        <Link href="/menu/new-item">
          <AddButton label="+ Add New Item" />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
        <div className="flex flex-wrap gap-2">
          <OrderFilters
            label="By Category"
            options={[...new Set(menuItems.map(i => i.category?.name).filter(Boolean))]}
            selected={selectedCategory}
            onSelect={(val) => handleFilterChange('By Category', val)}
          />
          <OrderFilters
            label="In Stock"
            options={['Active', 'Inactive']}
            selected={selectedStatus}
            onSelect={(val) => handleFilterChange('In Stock', val)}
          />
        </div>
        <div className="w-full md:w-auto">
          <OrderSearch value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      <DynamicTable
        data={mappedData}
        icons={actionIcons}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MenuSection;
