'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { edit, Trash, Eye } from '@/assets/common-icons';
import OrderFilters from '@/Components/OrderPage/OrderFilters';
import { OrderSearch } from '@/Components/OrderPage/OrderSearch';
import DynamicTable from '@/Components/OrderPage/OrderTable';

interface Customer {
  name: string;
  contact: string;
  email: string;
}

const CustomerSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const customers: Customer[] = [
    {
      name: 'Martina Roisse',
      contact: '+99 890 456124',
      email: 'martha@gmail.com',
    },
    {
      name: 'Martina Roisse',
      contact: '+99 890 456124',
      email: 'martha@gmail.com',
    },
    {
      name: 'Martina Roisse',
      contact: '+99 890 456124',
      email: 'martha@gmail.com',
    },
    {
      name: 'Martina Roisse',
      contact: '+99 890 456124',
      email: 'martha@gmail.com',
    },
  ];

  const dateOptions = ['2023-01-01', '2023-02-01'];
  const statusOptions = ['Active', 'Inactive'];

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col m-2 bg-white rounded-2xl p-7">
      <div className="flex items-center justify-between w-full pb-4">
        <h1 className="text-xl font-medium">All Customers</h1>
        <div>
          <OrderSearch value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      <div className="flex flex-row justify-between w-full gap-4 pb-4">
        <div className="flex gap-2">
          <OrderFilters
            label="By Date"
            options={dateOptions}
            onSelect={setSelectedDate}
          />
        </div>
      </div>

      <DynamicTable data={filteredCustomers} icons={[Trash, edit, Eye]} 
       getRowHref={(row) => `/customers/customer-details`}/>
    </div>
  );
};

export default CustomerSection;
