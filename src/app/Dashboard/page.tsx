'use client'

import { iconDown, iconUp, upArrow } from '@/assets/common-icons'
import Card from '@/Components/Card'
import Chart from '@/Components/Dashboard/Chart'
import DoughnutChart from '@/Components/Dashboard/DoughnutChart'
import Header from '@/Components/Header'
import Table from '@/Components/OrderPage/OrderTable'
import Sidebar from '@/Components/Sidebar'
import ViewButton from '@/Components/ViewButton'
import React from 'react'

function page() {
  return (
    <div className='min-h-screen w-full bg-gray-100 grid grid-cols-1 lg:grid-cols-[230px_1fr]'>
      <div><Sidebar /></div>
      <div className='flex flex-col gap-3 p-4 justify-center'>
        <Header heading='Dashboard' subheading='Let’s check your statistics today' />

        {/* Cards Section */}
        <div className='flex flex-col md:flex-row gap-4 w-full'>
          <Card heading='Net income' amount='$1,567.99' icon={iconUp} percentage='3.0%' subHeading='April, 2025' bgColor='#EDFBEF' textColor='#34C759' />
          <Card heading='Total Orders' amount='1290' icon={iconDown} percentage='3.0%' subHeading='April, 2025' bgColor='#FFEFEF' textColor='#F93131' />
          <Card heading='Total Employees' amount='120' icon={iconUp} percentage='3.0%' subHeading='April, 2025' bgColor='#EDFBEF' textColor='#34C759' />
          <Card heading='Location' amount='4' percentage='Active' subHeading='New York City' bgColor='#EDFBEF' textColor='#34C759' />
        </div>

        {/* Chart Section */}
        <div className='flex flex-col lg:flex-row justify-between gap-6 m-2'>
          <div className='w-full lg:w-2/3'><Chart /></div>
          <div className='w-full lg:1/3'><DoughnutChart day={12} monthYear="March, 2025" ordersCount={109} /></div>
        </div>
        <div className='bg-white flex flex-col p-10 gap-6'>
          <div className='flex justify-between'>
          <h1 className='text-2xl font-medium'>Recent orders</h1>
          <div><ViewButton value="View" icon={upArrow}/></div>
          </div>
        <Table/>
        </div>
      </div>
    </div>
  )
}

export default page
