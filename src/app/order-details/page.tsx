'use client';

import { leftArrow } from '@/assets/common-icons';
import Header from '@/Components/Header';
import GeneralCard from '@/Components/OrderDetails/GeneralCard';
import Items from '@/Components/OrderDetails/Items';
import PaymentDetailsCard, { PaymentDetailsCardProps } from '@/Components/OrderDetails/PaymentDetailsCard';
import Sidebar from '@/Components/Sidebar';
import Link from 'next/link';
import React, { useState } from 'react';

const paymentData: PaymentDetailsCardProps = {
  paymentMethod: {
    type: "card",
    lastFour: "456",
  },
  orderItems: [
    { quantity: 1, name: "Salted Caramel Latte", price: 10.9 },
    { quantity: 1, name: "Vanilla Cappuccino", price: 12.9 },
    { quantity: 2, name: "Breakfast Croissants", price: 12.9 },
    { quantity: 1, name: "Chocolate Shake", price: 16.9 },
  ],
  total: 34.8,
  gst: 5.8,
  subtotal: 40.8,
};

function Page() {
  const [orderStatus, setOrderStatus] = useState("Pending");

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderStatus(e.target.value);
  };

  return (
    <div className='bg-gray-100 grid grid-cols-1 lg:grid-cols-[230px_1fr] ml-2'>
      <div><Sidebar /></div>
      <div className='flex flex-col gap-3 justify-center'>
        <Header heading='Orders' subheading='Track all your orders from here' />
        <div className='flex flex-col bg-white rounded-2xl min-h-screen mb-2'>
          <div className='flex w-full justify-between p-5'>
            <Link href={"/orders"}>
              <div className='flex items-center p-3 hover:text-primary'>
                {leftArrow}
                <h1 className='text-xl font-medium'>Order Details</h1>
              </div>
            </Link>
            <div className='flex items-center justify-center gap-2'>
              <label htmlFor="status" className='font-medium'>Status:</label>
              <select
                id="status"
                value={orderStatus}
                onChange={handleStatusChange}
                className='border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring focus:border-primary'
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-[1fr_1fr]'>
            <GeneralCard date="27 April, 2025" id={881911} name="Aiza Nadeem" contact="+99 345 8789199" branch="Ny Caffine California" />
            <PaymentDetailsCard {...paymentData} />
          </div>

          <div className='flex flex-col m-6'>
            <h1 className='text-lg font-medium mb-4'>Item List(3)</h1>
            <div className='flex flex-col gap-4'>
              <Items
                imageSrc="/iced-mocha.png"
                altText="Item 1"
                heading="Salted Caramel Latte"
                total={10.30}
                Qty={2}
                Modifiers={['Sprinkles,', 'Almond Milk,', 'Espresso shot,', 'Maple Syrup']}
              />
              <Items
                imageSrc="/iced-mocha.png"
                altText="Item 2"
                heading="Salted Caramel Latte"
                total={10.30}
                Qty={1}
                Modifiers={['Sprinkles,', 'Almond Milk,', 'Espresso shot,', 'Maple Syrup']}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
