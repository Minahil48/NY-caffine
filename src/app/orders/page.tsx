import Header from '@/Components/Header'
import OrderSection from '@/Components/OrderPage/OrderSection'
import Table from '@/Components/OrderPage/OrderTable'
import Sidebar from '@/Components/Sidebar'
import React from 'react'

function page() {
  return (
    <div className=' bg-gray-100 grid grid-cols-1 lg:grid-cols-[230px_1fr]'>
      <div><Sidebar /></div>
      <div className='flex flex-col gap-3 justify-center'>
        <Header heading='Orders' subheading='Track all your orders from here' />
        <OrderSection/>
    </div>
    
    </div>
  )
}

export default page
