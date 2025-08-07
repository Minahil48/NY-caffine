'use client';

import { Change, Eye, iconDown, iconUp, Trash, upArrow } from '@/assets/common-icons';
import Card from '@/Components/Card';
import Chart from '@/Components/Dashboard/Chart';
import DoughnutChart from '@/Components/Dashboard/DoughnutChart';
import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';
import ViewButton from '@/Components/ViewButton';
import DynamicTable from '@/Components/OrderPage/OrderTable';
import { orders } from '@/app/data/order';
import React from 'react';

const actionIcons = [
  { icon: Trash, action: 'delete' },
  { icon: Eye, action: 'view' },
  { icon: Change, action: 'toggleStatus' },
];

function Page() {
  const filtered = orders.slice(0, 5);

  return (
    <div className='min-h-screen w-full bg-gray-100 grid grid-cols-1 lg:grid-cols-[230px_1fr]'>
      <div><Sidebar /></div>
      <div className='flex flex-col gap-3 p-4 justify-center'>
        <Header heading='Dashboard' subheading='Let’s check your statistics today' />

        <div className='flex flex-col items-center justify-center lg:flex-row gap-8 w-full'>
          <Card heading='Net income' amount='$1,567.99' icon={iconUp} percentage='3.0%' subHeading='April, 2025' bgColor='#EDFBEF' textColor='#34C759' />
          <Card heading='Total Orders' amount='1290' icon={iconDown} percentage='3.0%' subHeading='April, 2025' bgColor='#FFEFEF' textColor='#F93131' />
          <Card heading='Total Employees' amount='120' icon={iconUp} percentage='3.0%' subHeading='April, 2025' bgColor='#EDFBEF' textColor='#34C759' />
          <Card heading='Location' amount='4' percentage='Active' subHeading='New York City' bgColor='#EDFBEF' textColor='#34C759' />
        </div>

        <div className='flex flex-col justify-center items-center lg:flex-row lg:justify-between gap-6 m-2'>
          <div className='w-full lg:w-2/3'><Chart /></div>
          <div className='w-full lg:1/3'><DoughnutChart orderDataByDate={{
            '2025-08-04': 80,
            '2025-08-03': 70,
            '2025-08-02': 30,
          }} />
          </div>
        </div>

        <div className='bg-white flex flex-col p-10 gap-6'>
          <div className='flex justify-between'>
            <h1 className='text-2xl font-medium'>Recent orders</h1>
            <div><ViewButton value="View all" icon={upArrow} href="/orders" /></div>
          </div>

          <DynamicTable
            data={filtered}
            icons={actionIcons}
            getRowHref={(row) => `/order-details/${row.ID}`}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
