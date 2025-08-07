'use client';

import { useParams } from 'next/navigation';
import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';
import GeneralCard from '@/Components/OrderDetails/GeneralCard';
import PaymentDetailsCard from '@/Components/OrderDetails/PaymentDetailsCard';
import Items from '@/Components/OrderDetails/Items';
import { leftArrow } from '@/assets/common-icons';
import React from 'react';

const paymentData = {
  paymentMethod: {
    type: 'card',
    lastFour: '4567',
  },
  orderItems: [
    { quantity: 1, name: 'Salted Caramel Latte', price: '$10.00' },
    { quantity: 1, name: 'Croissant', price: '$5.00' },
  ],
  total: 15,
  gst: 1.5,
  subtotal: 16.5,
};

function CustomerOrderDetailsPage() {
  const { id } = useParams();

  return (
 <div className='min-h-screen w-full bg-gray-100 grid grid-cols-1 lg:grid-cols-[230px_1fr]'>
      <div><Sidebar /></div>
      <div className='flex flex-col gap-3 p-4 justify-center'>
        <Header heading='Dashboard' subheading='Let’s check your statistics today' />

        <div className="bg-white p-5 rounded-2xl text-lg font-medium">
          <div className="flex items-center gap-1 mb-4">
            {leftArrow}
            <h1>Order Details (ID: {id})</h1>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6">
            <div className="flex flex-col gap-4">
              <GeneralCard
                date="27 April, 2025"
                id={id as string}
                name="Aiza Nadeem"
                contact="+99 345 8789199"
                branch="NY Caffeine California"
              />
              <PaymentDetailsCard {...paymentData} />
            </div>

            <div className="flex flex-col p-4 sm:p-6 bg-gray-100 rounded-xl">
              <h1 className="text-lg font-medium mb-4">Item List (2)</h1>
              <div className="flex flex-col gap-4">
                <Items
                  imageSrc="/iced-mocha.png"
                  altText="Latte"
                  heading="Salted Caramel Latte"
                  total="10.00"
                  Qty={1}
                  Modifiers={['Whipped cream', '2 espresso shots', 'Sprinkles']}
                />
                <Items
                  imageSrc="/iced-mocha.png"
                  altText="Croissant"
                  heading="Croissant"
                  total="5.00"
                  Qty={1}
                  Modifiers={['Butter']}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrderDetailsPage;
