'use client';

import React, { useState, useEffect } from 'react';
import { edit, Trash, Eye } from '@/assets/common-icons';
import { OrderSearch } from '@/components/order/Search';
import DynamicTable from '@/components/order/Table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllCustomers, deleteCustomer } from '@/lib/api/customer/customer';

interface Customer {
  _id: string;
  Name: string;
  Email: string;
  Date?: string;
}

const CustomerSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tableData, setTableData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllCustomers();
      if (res.success && Array.isArray(res.data)) {
        const customers = res.data
          .filter((user: any) => user.role === 'customer')
          .map((cus: any) => ({
            _id: cus._id,
            Name: cus.name,
            Email: cus.email,
            Date: cus.createdAt
              ? new Date(cus.createdAt).toISOString().split('T')[0]
              : '',
          }));
        setTableData(customers);
      } else {
        setError('Failed to load customers');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (customerId: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    try {
      const res = await deleteCustomer(customerId);
      if (!res.success) {
        console.error('Failed to delete customer:', res.message);
        return;
      }
      setTableData((prev) => prev.filter((cus) => cus._id !== customerId));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  let filteredCustomers = tableData.filter((customer) =>
    customer.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedDate) {
    const formatted = formatDate(selectedDate);
    filteredCustomers = filteredCustomers.filter(
      (customer) => customer.Date === formatted
    );
  }

  const mappedData = filteredCustomers.map((cus) => ({
    ID: cus._id,
    Name: cus.Name,
    Email: cus.Email,
    Date: cus.Date,
  }));

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

      {loading && <p>Loading customers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <DynamicTable
        data={mappedData}
        icons={actionIcons}
        onDelete={handleDelete}
        getRowHref={(row) => `/customers/customer-details/${row.ID}`}
      />
    </div>
  );
};

export default CustomerSection;
