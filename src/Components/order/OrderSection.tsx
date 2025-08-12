'use client';

import React, { useState, useEffect } from 'react';
import { Trash, Eye, Change } from '@/assets/common-icons';
import { OrderTabs } from './OrderTabs';
import OrderFilters from './Filters';
import { OrderSearch } from './Search';
import DynamicTable from './Table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllOrders, deleteOrder } from '@/lib/api/orders/order';

interface Product {
  name: string;
}

interface Order {
  ID: string;
  Date: string;
  Quantity: number;
  Products: Product[];
  Price: string;
  Status: string;
}

const OrderSection: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<string>('All Orders');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();

        if (!res.success) {
          console.error('Failed to fetch orders:', res.message);
          return;
        }

        const apiOrders = res.orders;

        if (!Array.isArray(apiOrders)) {
          console.error('API did not return an array:', apiOrders);
          return;
        }

        const formatted: Order[] = apiOrders.map((order: any) => ({
          ID: order._id,
          Date: new Date(order.createdAt).toISOString().split('T')[0],
          Quantity: order.itemsQuantity,
          Products: order.products.map((p: any) => ({
            name: p.item || 'Unknown',
          })),
          Price: `$${Number(order.totalPrice).toFixed(2)}`,
          Status: order.pickupStatus || 'Pending',
        }));

        setOrders(formatted);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;

    try {
      const res = await deleteOrder(orderId);

      if (!res.success) {
        console.error('Failed to delete order:', res.message);
        return;
      }

      setOrders(prevOrders => prevOrders.filter(order => order.ID !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleAction = (action: string, orderId: string) => {
    if (action === 'delete') {
      handleDelete(orderId);
    }
  };

  const productOptions = Array.from(
    new Set(orders.flatMap(order => order.Products.map(p => p.name)))
  );

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  let filtered = activeTab === 'All Orders'
    ? orders
    : orders.filter(order => order.Status.toLowerCase() === activeTab.toLowerCase());

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
        product.name.toLowerCase().includes(selectedProduct.toLowerCase())
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
              isClearable
            />
          </div>

          <OrderFilters
            label="By Product"
            options={productOptions}
            selected={selectedProduct}
            onSelect={setSelectedProduct}
          />

          <button
            onClick={() => {
              setActiveTab('All Orders');
              setSearchTerm('');
              setSelectedDate(null);
              setSelectedProduct('');
            }}
            className="ml-4 text-sm text-red-500 hover:underline"
          >
            Clear Filters
          </button>
        </div>

        <div className="w-full md:w-auto">
          <OrderSearch value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      {filtered.length > 0 ? (
        <DynamicTable
          data={orders}
          icons={actionIcons}
          getRowHref={(row) => `/orders/${row.ID}`}
          onDelete={handleDelete}
        />

      ) : (
        <div className="text-center text-gray-500 font-medium py-10">
          No orders found.
        </div>
      )}
    </div>
  );
};

export default OrderSection;
