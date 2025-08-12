'use client';

import React, { useState } from 'react';
import { edit, Trash } from '@/assets/common-icons';
import OrderFilters from '@/components/order/Filters';
import { OrderSearch } from '@/components/order/Search';
import DynamicTable from '@/components/order/Table';
import AddCard from './AddCard';
import AddButton from '../AddButton';

interface Order {
  ID: string;
  Name: string;
  Qty: number;
}

const CategorySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);
  const [tableData, setTableData] = useState<Order[]>([
    { ID: '102193', Name: 'Iced Coffee', Qty: 23 },
    { ID: '103194', Name: 'Pastries', Qty: 43 },
    { ID: '112195', Name: 'Breakfast', Qty: 19 },
    { ID: '102196', Name: 'Shakes', Qty: 4 },
    { ID: '132197', Name: 'Hot Drinks', Qty: 8 },
    { ID: '102198', Name: 'Hot Brew', Qty: 8 },
  ]);

  const addRowToTable = (newData: Order) => {
    setTableData((prevData) => [...prevData, newData]);
  };

  const productOptions = Array.from(new Set(tableData.map((order) => order.Name)));
  const filteredOrders = tableData.filter((order) =>
    order.ID.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedProduct ? order.Name === selectedProduct : true)
  );

  const actionIcons = [
    { icon: Trash, action: 'delete' },
    { icon: edit, action: 'edit' },
  ];

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
            onSelect={(val) => setSelectedProduct(val)}
          />

          <div className="w-full md:w-auto">
            <OrderSearch value={searchTerm} onChange={setSearchTerm} />
          </div>
        </div>
      </div>

      <DynamicTable data={filteredOrders} icons={actionIcons} />
      {showAddCard && (
        <AddCard onClose={() => setShowAddCard(false)} onAddRow={addRowToTable} />
      )}
    </div>
  );
};

export default CategorySection;
