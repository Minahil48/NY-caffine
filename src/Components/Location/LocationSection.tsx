'use client';

import React, { useState } from 'react';
import OrderFilters from '../OrderPage/OrderFilters';
import { OrderSearch } from '../OrderPage/OrderSearch';
import OrderTable from '../OrderPage/OrderTable';
import { edit, Trash } from '@/assets/common-icons';
import Link from 'next/link';
import AddButton from '../Menu/AddButton';
import AddCard from '../Menu/Categories/Addcard';
import AddBranch from './AddBranch';

interface Order {
    BranchCode: string;
    BranchName: string;
    Address: string;
}

const LocationSection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showAddCard, setShowAddCard] = useState(false);

    const [tableData, setTableData] = useState<Order[]>([
        {
            BranchCode: 'NY-8900',
            BranchName: 'NY Caffeine California',
            Address: 'Main Boulevard, Street 18, London',
        },
        {
            BranchCode: 'TX-7800',
            BranchName: 'NY Caffeine California',
            Address: 'Main Boulevard, Street 18, London',
        },
        {
            BranchCode: 'CA-5600',
            BranchName: 'NY Caffine Amsterdam',
            Address: 'Main Boulevard, Street 18 Downtown Amsterdam',
        },
        {
            BranchCode: 'FL-1200',
            BranchName: 'Florida Coffee',
            Address: 'Ocean Drive, Miami',
        },
        {
            BranchCode: 'NY-8900',
            BranchName: 'NY Caffeine Scotland',
            Address: 'Langdon Square Area, Lane 5, Scotland',
        },
        {
            BranchCode: 'NY-8900',
            BranchName: 'NY Caffeine London',
            Address: 'Main Boulevard, Street 18, London',
        },
    ]);
    const addRowToTable = (newData: Order) => {
        setTableData((prevData) => [...prevData, newData]);
    };
    const filteredOrders = tableData.filter(order =>
        order.BranchCode.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedLocation ? order.Address === selectedLocation : true)
    );
    const actionIcons = [
        { icon: Trash, action: 'delete' },
        { icon: edit, action: 'edit' },
    ];
    return (
        <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl">
            <div className="flex w-full justify-between">
                <h1 className="text-xl font-medium">Branches</h1>
                <AddButton label="+ Add New Branch" onClick={() => setShowAddCard(true)} />
            </div>


            <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
                <div className="flex gap-2">
                    <OrderFilters
                        label="By Location"
                        options={[...new Set(tableData.map(o => o.Address))]}
                        selected={selectedLocation}
                        onSelect={(val) => setSelectedLocation(val)}
                    />
                </div>

                <div className="w-full md:w-auto">
                    <OrderSearch
                        value={searchTerm}
                        onChange={setSearchTerm}
                    />
                </div>
            </div>

            <OrderTable
                data={filteredOrders}
                icons={actionIcons}
                getRowHref={(row) => `/order-details`}
            />
            {showAddCard && <AddBranch onClose={() => setShowAddCard(false)} onAddRow={addRowToTable} />}
        </div>
    );
};

export default LocationSection;
