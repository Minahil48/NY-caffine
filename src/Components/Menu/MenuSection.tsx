'use client';

import React, { useState } from 'react';
import OrderFilters from '../OrderPage/OrderFilters';
import { OrderSearch } from '../OrderPage/OrderSearch';
import OrderTable from '../OrderPage/OrderTable';
import { edit, Trash } from '@/assets/common-icons';
import AddButton from './AddButton';
import Link from 'next/link';

interface Product {
  name: string;
}

interface Order {
  Name: string;
  Price: string;
  Category: string;
  Modifiers: Product[];
  Qty: number;
  status: 'Active' | 'Inactive';
}

const MenuSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const orders: Order[] = [
    {
      Name: 'Latte',
      Price: '$90.00',
      Category: 'Iced Coffee',
      Modifiers: [{ name: 'Dairy' }, { name: 'Decaf' }, { name: 'Non-Diary' }],
      Qty: 23,
      status: 'Active',
    },
    {
      Name: 'Mocha',
      Price: '$90.00',
      Category: 'Iced Coffee',
      Modifiers: [{ name: 'Dairy' }, { name: 'Decaf' }, { name: 'Non-Diary' }],
      Qty: 43,
      status: 'Active',
    },
    {
      Name: 'Mocha',
      Price: '$90.00',
      Category: 'Iced Coffee',
      Modifiers: [{ name: 'Dairy' }, { name: 'Decaf' }, { name: 'Non-Diary' }],
      Qty: 10,
      status: 'Inactive',
    },
    {
      Name: 'Hot Chocalate',
      Price: '$90.00',
      Category: 'Milkshake',
      Modifiers: [{ name: 'Dairy' }, { name: 'Decaf' }, { name: 'Non-Diary' }],
      Qty: 19,
      status: 'Active',
    },
    {
      Name: 'Americano',
      Price: '$90.00',
      Category: 'Milkshake',
      Modifiers: [{ name: 'Dairy' }, { name: 'Decaf' }, { name: 'Non-Diary' }],
      Qty: 4,
      status: 'Inactive',
    },
    {
      Name: 'Espresso',
      Price: '$90.00',
      Category: 'Milkshake',
      Modifiers: [{ name: 'Dairy' }, { name: 'Decaf' }, { name: 'Non-Diary' }],
      Qty: 8,
      status: 'Active',
    },
  ];

  const handleFilterChange = (label: string, value: string) => {
    if (label === 'By Category') {
      setSelectedCategory(value);
    } else if (label === 'In Stock') {
      setSelectedStatus(value);
    }
  };

  const filteredOrders = orders.filter(order =>
    order.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory ? order.Category === selectedCategory : true) &&
    (selectedStatus ? order.status === selectedStatus : true)
  );

  return (
    <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl">
      <div className="flex w-full justify-between">
        <h1 className="text-xl font-medium">All Items</h1>
        <Link href="/menu-page/new-item">
          <AddButton label="+ Add New Item" />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
        <div className="flex flex-wrap gap-2">
          <OrderFilters
            label="By Category"
            options={['Iced Coffee', 'Milkshake']}
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

      <OrderTable data={filteredOrders} icons={[Trash, edit]}
       getRowHref={(row) => `/order-details`} />
    </div>
  );
};

export default MenuSection;
