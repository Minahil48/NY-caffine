"use client"

import React from 'react'
import { OrderTabs } from './OrderTabs'
import OrderFilters from './OrderFilters'
import { OrderSearch } from './OrderSearch'
import Table from './OrderTable'


function OrderSection() {
    return (
        <div className='flex flex-col gap-3 m-2 bg-white p-4 rounded-2xl '>
            <OrderTabs />
            <div className='flex justify-between'>
                <div className='flex gap-2'><OrderFilters label='Date' /> 
                <OrderFilters label='By Status' />
                </div>
                <OrderSearch/>
                </div>
                <Table/>
        </div>
    )
}

export default OrderSection
