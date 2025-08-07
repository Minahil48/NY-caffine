'use client';

import React, { useState } from 'react';
import { Trash, Eye, Change } from '@/assets/common-icons';
import { orders } from '@/app/data/order';
import { OrderTabs } from './OrderTabs';
import OrderFilters from './OrderFilters';
import { OrderSearch } from './OrderSearch';
import DynamicTable from './OrderTable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const OrderSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All Orders');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const productOptions = Array.from(
    new Set(orders.flatMap(order => order.Products.map(p => p.name)))
  );

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  let filtered = activeTab === 'All Orders'
    ? orders
    : orders.filter(order => order.Status === activeTab);

  if (searchTerm.trim()) {
    filtered = filtered.filter(order =>
      order.ID.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }

  if (selectedDate) {
    const formatted = formatDate(selectedDate);
    filtered = filtered.filter(order => order.Date === formatted);
  }

  if (selectedProduct) {
    filtered = filtered.filter(order =>
      order.Products.some(product =>
        product.name.toLowerCase() === selectedProduct.toLowerCase()
      )
    );
  }

  const actionIcons = [
    { icon: Trash, action: 'delete' },
    { icon: Eye, action: 'view' },
    { icon: Change, action: 'toggleStatus' },
  ];

  return (
    <div className="flex flex-col gap-5 m-2 bg-white p-6 rounded-2xl">
      <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex flex-col">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Date"
              className="border border-gray-300 text-gray-700 text-medium max-w-[100px] p-2 rounded-md text-sm"
              maxDate={new Date()}
            />
          </div>

          <OrderFilters
            label="By Product"
            options={productOptions}
            selected={selectedProduct}
            onSelect={setSelectedProduct}
          />
        </div>

        <div className="w-full md:w-auto">
          <OrderSearch value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      {filtered.length > 0 ? (
        <DynamicTable
          data={filtered}
          icons={actionIcons}
          getRowHref={(row) => `/order-details/${row.ID}`}
        />
      ) : (
        <div className="text-center text-gray-500 font-medium py-10">
          No data for this date.
        </div>
      )}
    </div>
  );
};

export default OrderSection;
