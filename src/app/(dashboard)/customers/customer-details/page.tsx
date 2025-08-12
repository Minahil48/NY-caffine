import DetailsCard from '@/components/customers/DetailsCard'
import DetailsTable from '@/components/customers/DetailsTable'
import React from 'react'

function CustomerDetailsPage() {
    return (
            <div className='flex flex-col gap-3 p-4 justify-center'>
                <DetailsCard/>
                <DetailsTable/>
            </div>
    )
}

export default CustomerDetailsPage
