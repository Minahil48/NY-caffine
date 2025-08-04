'use client';

import React, { useState } from 'react';
import { edit, Trash } from '@/assets/common-icons';
import OrderFilters from '@/Components/OrderPage/OrderFilters';
import { OrderSearch } from '@/Components/OrderPage/OrderSearch';
import DynamicTable from '@/Components/OrderPage/OrderTable';
import AddButton from '../Menu/AddButton';
import AddEmployee from './AddEmployee';

interface Order {
    Name: string;
    Email: string;
    status: string;
    Date: string;
}

const CategorySection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [showAddCard, setShowAddCard] = useState(false);

    const orders: Order[] = [
        { Name: 'Martha Safier', Email: 'martha@gmail.com', Date: '25 April, 2025', status: 'Active' },
        { Name: 'Disha Khan', Email: 'dishakhan@gmail.com', Date: '25 April, 2025', status: 'Active' },
        { Name: 'Ahmed Khan', Email: 'ahmed45@gmail.com', Date: '25 April, 2025', status: 'Inactive' },
        { Name: 'Bob Thier', Email: 'bobtheir5@gmail.com', Date: '25 April, 2025', status: 'Active' },
        { Name: 'Robert Langdon', Email: 'robertolangd@gmail.com', Date: '25 April, 2025', status: 'Inactive' },
        { Name: 'Martina Roisse', Email: 'martina@gmail.com', Date: '25 April, 2025', status: 'Active' },
    ];


    const statusOptions = Array.from(new Set(orders.map(order => order.status)));
    const dateOptions = Array.from(new Set(orders.map(order => order.Date)));

    const filteredOrders = orders.filter(order =>
        order.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedStatus ? order.status === selectedStatus : true) &&
        (selectedDate ? order.Date === selectedDate : true)
    );

    return (
        <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl">
            <div className="flex w-full justify-between">
                <h1 className="text-xl font-medium">All Categories</h1>
                <button onClick={() => setShowAddCard(true)}>
                    <AddButton label="+ Add Employee" />
                </button>
            </div>

            {showAddCard && (
                <AddEmployee onClose={() => setShowAddCard(false)} />
            )}

            <div className="flex flex-row justify-between w-full">
                    <div className='flex gap-2'><OrderFilters label="By Status" options={statusOptions} onSelect={setSelectedStatus} />
                    <OrderFilters label="By Date" options={dateOptions} onSelect={setSelectedDate} /></div>
                    <OrderSearch value={searchTerm} onChange={setSearchTerm} />
                </div>

            <DynamicTable data={filteredOrders} icons={[Trash, edit]}
             getRowHref={(row) => ``} />
        </div>
    );
};

export default CategorySection;
