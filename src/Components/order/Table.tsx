'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getStatusDotColor } from '@/lib/utilis/statusColor';
import { nextIcon, previousIcon } from '@/assets/common-icons';

interface DynamicTableProps {
    data: Record<string, any>[];
    icons?: { icon: React.ReactNode; action: string }[];
    maxArrayItemsShown?: number;
    rowKeyPrefix?: string;
    getRowHref?: (row: Record<string, any>) => string;
    onDelete?: (rowId: string) => void; // New prop for delete callback
}

const getProductStyleByIndex = (index: number) => {
    const styles = [
        { bg: '#F9F5FF', color: '#8B5CF6', bcolor: '#E9D7FE' },
        { bg: '#EFF8FF', color: '#2563EB', bcolor: '#B2DDFF' },
        { bg: '#EEF4FF', color: '#1E40AF', bcolor: '#C7D7FE' },
        { bg: '#FEF3C7', color: '#92400E', bcolor: '#FDE68A' },
        { bg: '#D1FAE5', color: '#065F46', bcolor: '#6EE7B7' },
        { bg: '#E0E7FF', color: '#312E81', bcolor: '#A5B4FC' },
    ];
    return styles[index % styles.length];
};

const DynamicTable: React.FC<DynamicTableProps> = ({
    data,
    icons = [],
    maxArrayItemsShown = 3,
    rowKeyPrefix = 'row-',
    getRowHref,
    onDelete,
}) => {
    const router = useRouter();
    const [sortedData, setSortedData] = useState(data);
    const [editingRowId, setEditingRowId] = useState<number | null>(null);
    const [editedData, setEditedData] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        setSortedData(data);
    }, [data]);

    // Remove local deletion - delegate to parent via onDelete
    const handleDelete = (rowIndex: number) => {
        const row = sortedData[rowIndex];
        if (onDelete && row?.ID) {
            onDelete(row.ID);
        }
    };

    const handleEdit = (rowIndex: number) => {
        setEditingRowId(rowIndex);
        setEditedData({ ...sortedData[rowIndex] });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        if (editedData) {
            setEditedData({ ...editedData, [key]: e.target.value });
        }
    };

    const handleSave = (e: React.KeyboardEvent<HTMLInputElement>, rowIndex: number) => {
        if (e.key === 'Enter' && editedData) {
            const newData = sortedData.map((row, i) => (i === rowIndex ? editedData : row));
            setSortedData(newData);
            setEditingRowId(null);
            setEditedData(null);
        }
        if (e.key === 'Escape') {
            setEditingRowId(null);
            setEditedData(null);
        }
    };

    const handleStatusToggle = (rowIndex: number) => {
        const row = sortedData[rowIndex];
        const newStatus = { ...row };
        const currentStatus = newStatus.Status?.toLowerCase();

        const completionStatuses = ['pending', 'completed', 'canceled'];
        const activeStatuses = ['active', 'inactive'];

        let statusCycle;
        if (completionStatuses.includes(currentStatus)) {
            statusCycle = completionStatuses;
        } else if (activeStatuses.includes(currentStatus)) {
            statusCycle = activeStatuses;
        } else {
            statusCycle = ['active', 'inactive'];
        }

        const currentIndex = statusCycle.indexOf(currentStatus);
        const nextIndex = (currentIndex + 1) % statusCycle.length;
        newStatus.Status = statusCycle[nextIndex].charAt(0).toUpperCase() + statusCycle[nextIndex].slice(1);

        const newData = sortedData.map((r, i) => (i === rowIndex ? newStatus : r));
        setSortedData(newData);
    };

    const handleView = (row: Record<string, any>) => {
        if (getRowHref) {
            const href = getRowHref(row);
            router.push(href);
        }
    };

    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    const renderCell = (value: any, key: string, index: number, rowIndex: number) => {
        const isEditing = editingRowId === rowIndex;

        if (isEditing && key !== 'id') {
            return (
                <input
                    type="text"
                    value={editedData?.[key] || ''}
                    onChange={(e) => handleInputChange(e, key)}
                    onKeyDown={(e) => handleSave(e, rowIndex)}
                    className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            );
        }

        if (Array.isArray(value)) {
            return (
                <div className="flex flex-wrap gap-1">
                    {value.slice(0, maxArrayItemsShown).map((item, i) => {
                        const { bg, color, bcolor } = getProductStyleByIndex(i);
                        return (
                            <span
                                key={i}
                                className="px-2 py-1 rounded-full text-xs font-semibold border"
                                style={{ backgroundColor: bg, borderColor: bcolor, color: color }}
                            >
                                {typeof item === 'object' ? item.name ?? JSON.stringify(item) : item}
                            </span>
                        );
                    })}
                    {value.length > maxArrayItemsShown && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
                            +{value.length - maxArrayItemsShown}
                        </span>
                    )}
                </div>
            );
        }

        if (key.toLowerCase() === 'status') {
            return (
                <span className="px-2 py-1 inline-flex items-center text-xs font-semibold rounded-lg border border-gray-300 text-gray-700">
                    <span className={`w-2 h-2 rounded-full mr-1 ${getStatusDotColor(value)}`}></span>
                    {value}
                </span>
            );
        }

        return <span className="text-sm text-gray-600">{value}</span>;
    };

    return (
        <div className="space-y-4">
            {/* Desktop View */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-secondary">
                        <tr>
                            {headers.map((text, i) => (
                                <th
                                    key={i}
                                    className={`px-4 py-3 text-left text-sm font-bold text-gray-600 tracking-wider ${i === 0 ? 'rounded-tl-lg' : ''}`}
                                >
                                    {text}
                                </th>
                            ))}
                            <th className="px-4 py-3 text-center text-sm font-bold text-gray-600 tracking-wider rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedData.map((row, i) => (
                            <tr key={`${rowKeyPrefix}${i}`} className="hover:bg-gray-50">
                                {headers.map((key, j) => (
                                    <td key={j} className="px-4 py-8">
                                        {renderCell(row[key], key, i, i)}
                                    </td>
                                ))}
                                <td className="px-4 py-8 flex space-x-4 justify-center items-center">
                                    {icons?.map((iconConfig, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                switch (iconConfig.action) {
                                                    case 'delete':
                                                        handleDelete(i);
                                                        break;
                                                    case 'edit':
                                                        handleEdit(i);
                                                        break;
                                                    case 'view':
                                                        handleView(row);
                                                        break;
                                                    case 'toggleStatus':
                                                        handleStatusToggle(i);
                                                        break;
                                                    default:
                                                        break;
                                                }
                                            }}
                                            className="p-2 rounded-md transition-all duration-200 text-gray-500 hover:text-primary hover:bg-gray-100 hover:shadow cursor-pointer"
                                        >
                                            {iconConfig.icon}
                                        </button>
                                    ))}
                                    {editingRowId === i && (
                                        <button
                                            onClick={() => { setEditingRowId(null); setEditedData(null); }}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex items-center justify-between px-4 py-4">
                    <button className="flex items-center space-x-1 text-sm text-gray-700 font-medium border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-100">
                        {previousIcon}
                        <span>Previous</span>
                    </button>
                    <div className="flex items-center space-x-1">
                        {[1, 2, 3, '...', 8, 9, 10].map((num, i) => (
                            <button
                                key={i}
                                className={`px-3 py-1 text-sm ${num === 1 ? 'text-black' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center space-x-1 text-sm text-gray-700 font-medium border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-100">
                        <span>Next</span>
                        {nextIcon}
                    </button>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {sortedData.map((row, i) => (
                    <div key={`${rowKeyPrefix}${i}`} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-2">
                        {headers.map((key, j) => (
                            <div key={j} className="text-sm text-gray-600">
                                <strong>{key}: </strong>
                                {renderCell(row[key], key, i, i)}
                            </div>
                        ))}
                        <div className="flex justify-end space-x-3 pt-2">
                            {icons?.map((iconConfig, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        switch (iconConfig.action) {
                                            case 'delete':
                                                handleDelete(i);
                                                break;
                                            case 'edit':
                                                handleEdit(i);
                                                break;
                                            case 'view':
                                                handleView(row);
                                                break;
                                            case 'toggleStatus':
                                                handleStatusToggle(i);
                                                break;
                                            default:
                                                break;
                                        }
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    {iconConfig.icon}
                                </button>
                            ))}
                            {editingRowId === i && (
                                <button
                                    onClick={() => { setEditingRowId(null); setEditedData(null); }}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DynamicTable;
