'use client';

import React, { useState } from 'react';
import { edit, Trash } from '@/assets/common-icons';
import AddButton from '../AddButton';
import OrderFilters from '@/Components/OrderPage/OrderFilters';
import { OrderSearch } from '@/Components/OrderPage/OrderSearch';
import DynamicTable from '@/Components/OrderPage/OrderTable';
import Addcard from './Addcard';


interface Order {
  ID: string;
  Name: string;
  Qty: number;
}

const CategorySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [showAddCard, setShowAddCard] = useState(false); 

  const orders: Order[] = [
    { ID: '#102193', Name: 'Iced Coffee', Qty: 23 },
    { ID: '#102193', Name: 'Pateries', Qty: 43 },
    { ID: '#102193', Name: 'Breakfast', Qty: 19 },
    { ID: '#102193', Name: 'Shakes', Qty: 4 },
    { ID: '#102193', Name: 'Hot Drinks', Qty: 8 },
    { ID: '#102193', Name: 'Hot Brew', Qty: 8 },
  ];

  const productOptions = Array.from(new Set(orders.map(order => order.Name)));

  const filteredOrders = orders.filter(order =>
    order.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedProduct
      ? order.Name === selectedProduct || order.ID === selectedProduct
      : true)
  );

  return (
    <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl">
      <div className="flex w-full justify-between">
        <h1 className="text-xl font-medium">All Categories</h1>
        <button onClick={() => setShowAddCard(true)}>
          <AddButton label="+ Add New Category" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
        <div className="flex justify-between w-full">
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

      <DynamicTable data={filteredOrders} icons={[Trash, edit]} />

      {showAddCard && <Addcard onClose={() => setShowAddCard(false)} />}
    </div>
  );
};

export default CategorySection;
