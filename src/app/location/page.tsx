import Header from '@/Components/Header'
import LocationSection from '@/Components/Location/LocationSection'
import Sidebar from '@/Components/Sidebar'
import React from 'react'

function page() {
    return (
        <div className='bg-gray-100 grid grid-cols-1 lg:grid-cols-[230px_1fr]'>
            <div><Sidebar /></div>
            <div className='flex flex-col gap-3 p-4 justify-center'>
                <Header heading='Location' subheading='Manage your store branched from here' />
                <LocationSection/>
            </div>
        </div>
    )
}

export default page
