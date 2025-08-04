import DetailsLayout from '@/app/order-details/layout'
import DetailsCard from '@/Components/Customers/DetailsCard'
import DetailsTable from '@/Components/Customers/DetailsTable'
import Header from '@/Components/Header'
import Sidebar from '@/Components/Sidebar'
import React from 'react'

function page() {
    return (
        <div className='bg-gray-100 grid grid-cols-1 lg:grid-cols-[230px_1fr]'>
            <div><Sidebar /></div>
            <div className='flex flex-col gap-3 p-4 justify-center'>
                <Header heading='Customers' subheading='Let’s check your clients here' />
                <DetailsCard/>
                <DetailsTable/>
            </div>
            </div>
    )
}

export default page
