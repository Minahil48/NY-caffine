'use client';

import React, { useState, useEffect } from 'react';
import { Trash, Eye, Change, iconDown, iconUp, upArrow } from '@/assets/common-icons';
import Card from '@/components/Card';
import Chart from '@/components/dashboard/Chart';
import DoughnutChart from '@/components/dashboard/DoughnutChart';
import ViewButton from '@/components/ViewButton';
import DynamicTable from '@/components/order/Table';
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

const actionIcons = [
  { icon: Trash, action: 'delete' },
  { icon: Eye, action: 'view' },
  { icon: Change, action: 'toggleStatus' },
];

function Page() {
  const [orders, setOrders] = useState<Order[]>([]);

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

      setOrders(prev => prev.filter(order => order.ID !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleAction = (action: string, orderId: string) => {
    if (action === 'delete') {
      handleDelete(orderId);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center">
      <div className="flex flex-col items-center lg:justify-start justify-center lg:flex-row gap-11 w-full">
        <Card
          heading="Net income"
          amount="$1,567.99"
          icon={iconUp}
          percentage="3.0%"
          subHeading="April, 2025"
          bgColor="#EDFBEF"
          textColor="#34C759"
        />
        <Card
          heading="Total Orders"
          amount="1290"
          icon={iconDown}
          percentage="3.0%"
          subHeading="April, 2025"
          bgColor="#FFEFEF"
          textColor="#F93131"
        />
        <Card
          heading="Total Employees"
          amount="120"
          icon={iconUp}
          percentage="3.0%"
          subHeading="April, 2025"
          bgColor="#EDFBEF"
          textColor="#34C759"
        />
        <Card
          heading="Location"
          amount="4"
          percentage="Active"
          subHeading="New York City"
          bgColor="#EDFBEF"
          textColor="#34C759"
        />
      </div>

      <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between gap-11">
        <div className="w-full lg:w-2/3">
          <Chart />
        </div>
        <div className="w-full lg:w-1/3">
          <DoughnutChart
            orderDataByDate={{
              '2025-08-04': 80,
              '2025-08-03': 70,
              '2025-08-02': 30,
            }}
          />
        </div>
      </div>

      <div className="bg-white flex flex-col p-10 gap-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium">Recent orders</h1>
          <ViewButton value="View all" icon={upArrow} href="/orders" />
        </div>

        {orders.length > 0 ? (
          <DynamicTable
            data={orders}
            icons={actionIcons}
            getRowHref={(row) => `/orders/${row.ID}`}
            onDelete={handleDelete}
          />

        ) : (
          <div className="text-center text-gray-500 font-medium py-10">No orders found.</div>
        )}
      </div>
    </div>
  );
}

export default Page;
