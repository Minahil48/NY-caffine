import Header from '@/Components/Header'
import AddItem from '@/Components/Menu/New-Item/AddItem'
import Sidebar from '@/Components/Sidebar'
import React from 'react'

function page() {
    return (
        <div>
            <div className=' w-full bg-gray-100 grid grid-cols-1 lg:grid-cols-[230px_1fr]'>
                <div><Sidebar /></div>
                <div className='flex flex-col gap-3 p-4 justify-center'>
                    <Header heading='Menu' subheading='Manage your menu from here' />
                    <AddItem/>
                </div>
            </div>
        </div>
    )
}

export default page
