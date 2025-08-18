import { iconDown, iconUp } from '@/assets/common-icons'
import Card from '@/components/Card'
import CustomerSection from '@/components/customers/CustomerSection'
import React from 'react'

function CustomerPage() {
  return (
    <div className='flex flex-col gap-2'>
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
      <CustomerSection />
    </div>


  )
}

export default CustomerPage
