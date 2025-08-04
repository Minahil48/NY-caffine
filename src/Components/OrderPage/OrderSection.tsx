'use client';

import React, { useState } from 'react';
import { OrderTabs } from './OrderTabs';
import OrderFilters from './OrderFilters';
import { OrderSearch } from './OrderSearch';
import OrderTable from './OrderTable';
import { Trash, Eye, Change } from '@/assets/common-icons';

interface Product {
  name: string;
}

interface Order {
  ID: string;
  Date: string;
  Quantity: number;
  Products: Product[];
  Price: string;
  Status: 'Pending' | 'Completed' | 'Canceled';
}

const parseOrderDate = (dateStr: string): Date => {
  return new Date(dateStr);
};

const OrderSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All Orders');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const orders: Order[] = [
    {
      ID: '019938',
      Date: '14 April, 2025',
      Quantity: 3,
      Products: [{ name: 'Iced Latte' }, { name: 'Donuts' }, { name: 'Croissant' }],
      Price: '$90.00',
      Status: 'Pending',
    },
    {
      ID: '820921',
      Date: '14 April, 2025',
      Quantity: 2,
      Products: [{ name: 'Iced Latte' }, { name: 'Croissant' }],
      Price: '$90.00',
      Status: 'Completed',
    },
    {
      ID: '728107',
      Date: '14 April, 2025',
      Quantity: 5,
      Products: [{ name: 'Iced Latte' }, { name: 'Donuts' }, { name: 'Croissant' }, { name: 'Coffee' }, { name: 'Tea' }],
      Price: '$90.00',
      Status: 'Canceled',
    },
    {
      ID: '738117',
      Date: '11 April, 2025',
      Quantity: 2,
      Products: [{ name: 'Iced Latte' }, { name: 'Donuts' }],
      Price: '$90.00',
      Status: 'Pending',
    },
    {
      ID: '904490',
      Date: '14 April, 2025',
      Quantity: 1,
      Products: [{ name: 'Iced Latte' }],
      Price: '$90.00',
      Status: 'Completed',
    },
    {
      ID: '567105',
      Date: '15 April, 2025',
      Quantity: 4,
      Products: [{ name: 'Iced Latte' }, { name: 'Donuts' }, { name: 'Croissant' }, { name: 'Sandwich' }],
      Price: '$80.00',
      Status: 'Pending',
    },
  ];

  const productOptions = Array.from(
    new Set(orders.flatMap(order => order.Products.map(p => p.name)))
  );

  const statusOptions = Array.from(new Set(orders.map(order => order.Status)));
  const dateOptions = Array.from(new Set(orders.map(order => order.Date)));

  let filtered = activeTab === 'All Orders'
    ? orders
    : orders.filter(order => order.Status === activeTab);

  if (searchTerm.trim()) {
    filtered = filtered.filter(order =>
      order.ID.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }

  if (selectedDate) {
    filtered = filtered.filter(order => order.Date === selectedDate);
  }

  if (selectedStatus) {
    filtered = filtered.filter(order => order.Status === selectedStatus);
  }

  return (
    <div className="flex flex-col gap-5 m-2 bg-white p-6 rounded-2xl">
      <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
        <div className="flex flex-wrap gap-2">
          <OrderFilters label="By Date" options={dateOptions} onSelect={setSelectedDate} />
          <OrderFilters label="By Product" options={productOptions} onSelect={setSelectedProduct} />

        </div>
        <div className="w-full md:w-auto">
          <OrderSearch value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      <OrderTable data={filtered} icons={[Trash, Eye, Change]}
       getRowHref={(row) => `/order-details`} />
    </div>
  );
};

export default OrderSection;
