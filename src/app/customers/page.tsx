import { iconDown, iconUp } from '@/assets/common-icons'
import Card from '@/Components/Card'
import CustomerSection from '@/Components/Customers/CustomerSection'
import Header from '@/Components/Header'
import Sidebar from '@/Components/Sidebar'
import React from 'react'

function page() {
  return (
    <div className='bg-gray-100 grid grid-cols-1 lg:grid-cols-[230px_1fr]'>
      <div><Sidebar /></div>
      <div className='flex flex-col gap-3 p-4 justify-center'>
        <Header heading='Customers' subheading='Let’s check your clients here' />

        <div className='bg-white flex justify-between rounded-2xl gap-10 p-6 items-center'>
          <Card
            heading='Total Customers'
            amount='1290'
            icon={iconUp}
            percentage='3.0%'
            subHeading='2025'
            bgColor='#EDFBEF'
            textColor='#34C759'
            borderColor='white'
          />
          <div className="h-40 border-l border-dashed border-gray-200" />


          <Card
            heading='Total Sales'
            amount='$8219.07'
            icon={iconDown}
            percentage='3.0%'
            subHeading='143 Orders'
            bgColor='#FFEFEF'
            textColor='#F93131'
            borderColor='white'
          />
          <div className="h-40 border-l border-dashed border-gray-200" />

          <Card
            heading='canceled Orders'
            amount='45'
            icon={iconDown}
            percentage='3.0%'
            subHeading='April, 2025'
             bgColor='#FFEFEF'
            textColor='#F93131'
            borderColor='white'
          />
        </div>
        <CustomerSection/>
      </div>
      
    </div>
  )
}

export default page
