'use client';

import React, { useState } from 'react';
import { edit, Trash, Eye } from '@/assets/common-icons';
import { OrderSearch } from '@/Components/OrderPage/OrderSearch';
import DynamicTable from '@/Components/OrderPage/OrderTable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Customer {
  name: string;
  contact: string;
  email: string;
  date?: string;
}

const CustomerSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  const customers: Customer[] = [
    {
      name: 'Martina Roisse',
      contact: '+99 890 456124',
      email: 'martha@gmail.com',
      date: '2025-08-05',
    },
    {
      name: 'John Doe',
      contact: '+12 345 678901',
      email: 'john@example.com',
      date: '2025-08-04',
    },
    {
      name: 'Alice Smith',
      contact: '+44 123 456789',
      email: 'alice@example.com',
      date: '2025-08-03',
    },
  ];

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  let filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedDate) {
    const formatted = formatDate(selectedDate);
    filteredCustomers = filteredCustomers.filter(
      (customer) => customer.date === formatted
    );
  }

  const actionIcons = [
    { icon: Trash, action: 'delete' },
    { icon: edit, action: 'edit' },
    { icon: Eye, action: 'view' },
  ];

  return (
    <div className="flex flex-col m-2 bg-white rounded-2xl p-7">
      <div className="flex items-center justify-between w-full pb-4">
        <h1 className="text-xl font-medium">All Customers</h1>
        <div>
          <OrderSearch value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      <div className="flex flex-row justify-between w-full gap-4 pb-4">
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
      </div>

      <DynamicTable
        data={filteredCustomers}
        icons={actionIcons}
        getRowHref={(row) => `/customers/customer-details`}
      />
    </div>
  );
};

export default CustomerSection;
