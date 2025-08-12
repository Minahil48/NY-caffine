'use client';

import React, { useState } from 'react';
import OrderFilters from '../order/Filters';
import { OrderSearch } from '../order/Search';
import { edit, Trash } from '@/assets/common-icons';
import Link from 'next/link';
import DynamicTable from '../order/Table';
import { useMenu } from './context/MenuContext';
import AddButton from './AddButton';

const MenuSection: React.FC = () => {
  const { menuItems } = useMenu();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleFilterChange = (label: string, value: string) => {
    if (label === 'By Category') setSelectedCategory(value);
    else if (label === 'In Stock') setSelectedStatus(value);
  };

  const actionIcons = [
    { icon: Trash, action: 'delete' },
    { icon: edit, action: 'edit' },
  ];

  const filteredOrders = menuItems.filter(order =>
    order.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedCategory || order.Category === selectedCategory) &&
    (!selectedStatus || order.status === selectedStatus)
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

      <DynamicTable
        data={filteredOrders}
        icons={actionIcons}
        getRowHref={(row) => `/order-details/${row.Name}`}
      />
    </div>
  );
};

export default MenuSection;
