'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStatusDotColor } from '@/lib/utilis/statusColor';

interface DynamicTableProps {
  data: Record<string, any>[];
  icons?: { icon: React.ReactNode; action: string }[];
  maxArrayItemsShown?: number;
  rowKeyPrefix?: string;
  getRowHref?: (row: Record<string, any>) => string;
  onDelete?: (rowId: string) => void;
  onEdit?: (row: Record<string, any>) => Promise<boolean>;
}

const getProductStyleById = (id: string | number) => {
  const styles = [
    { bg: '#F9F5FF', color: '#8B5CF6', bcolor: '#E9D7FE' },
    { bg: '#EFF8FF', color: '#2563EB', bcolor: '#B2DDFF' },
    { bg: '#EEF4FF', color: '#1E40AF', bcolor: '#C7D7FE' },
    { bg: '#FEF3C7', color: '#92400E', bcolor: '#FDE68A' },
    { bg: '#D1FAE5', color: '#065F46', bcolor: '#6EE7B7' },
    { bg: '#E0E7FF', color: '#312E81', bcolor: '#A5B4FC' },
  ];

  const strId = String(id);
  let hash = 0;
  for (let i = 0; i < strId.length; i++) {
    hash = (hash << 5) - hash + strId.charCodeAt(i);
    hash |= 0;
  }
  return styles[Math.abs(hash) % styles.length];
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  icons = [],
  maxArrayItemsShown = 3,
  rowKeyPrefix = 'row-',
  getRowHref,
  onDelete,
  onEdit,
}) => {
  const router = useRouter();
  const [tableData, setTableData] = useState(data);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editedRowData, setEditedRowData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleDeleteClick = (rowIndex: number) => {
    const row = tableData[rowIndex];
    if (onDelete && row?.ID) onDelete(row.ID);
  };

  const handleEditClick = (rowIndex: number) => {
    setEditingRowIndex(rowIndex);
    setEditedRowData({ ...tableData[rowIndex] });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (editedRowData) setEditedRowData({ ...editedRowData, [key]: e.target.value });
  };

  const handleSaveEdit = async (e: React.KeyboardEvent<HTMLInputElement>, rowIndex: number) => {
    if (!editedRowData) return;

    if (e.key === 'Enter' && onEdit) {
      const success = await onEdit(editedRowData);
      if (success) {
        const updated = tableData.map((row, i) => (i === rowIndex ? editedRowData : row));
        setTableData(updated);
        setEditingRowIndex(null);
        setEditedRowData(null);
      } else {
        alert('Failed to update row');
      }
    }

    if (e.key === 'Escape') {
      setEditingRowIndex(null);
      setEditedRowData(null);
    }
  };

  const handleView = (row: Record<string, any>) => {
    if (getRowHref) router.push(getRowHref(row));
  };

  const headers = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  const renderCell = (value: any, key: string, rowIndex: number) => {
    const isEditing = editingRowIndex === rowIndex;

    if (isEditing) {
      return (
        <input
          type="text"
          value={editedRowData?.[key] || ''}
          onChange={(e) => handleInputChange(e, key)}
          onKeyDown={(e) => handleSaveEdit(e, rowIndex)}
          className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      );
    }

    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, maxArrayItemsShown).map((item, i) => {
            const uniqueKey = item?.id ?? item?.name ?? i;
            const { bg, color, bcolor } = getProductStyleById(uniqueKey);
            return (
              <span
                key={i}
                className="px-2 py-1 rounded-full text-xs font-semibold border"
                style={{ backgroundColor: bg, borderColor: bcolor, color }}
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
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-secondary">
          <tr>
            {headers.map((text, i) => (
              <th
                key={i}
                className={`px-4 py-3 text-left text-sm font-bold text-gray-600 tracking-wider ${
                  i === 0 ? 'rounded-tl-lg' : ''
                }`}
              >
                {text}
              </th>
            ))}
            <th className="px-4 py-3 text-center text-sm font-bold text-gray-600 tracking-wider rounded-tr-lg">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row, i) => (
            <tr key={`${rowKeyPrefix}${i}`} className="hover:bg-gray-50">
              {headers.map((key, j) => (
                <td key={j} className="px-8 py-8">
                  {renderCell(row[key], key, i)}
                </td>
              ))}
              <td className="px-8 py-4 flex justify-center items-center space-x-3">
                {icons?.map((iconConfig, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      switch (iconConfig.action) {
                        case 'delete':
                          handleDeleteClick(i);
                          break;
                        case 'edit':
                          handleEditClick(i);
                          break;
                        case 'view':
                          handleView(row);
                          break;
                      }
                    }}
                    className="p-2 rounded-md transition-all duration-200 text-gray-500 hover:text-primary hover:bg-gray-100 hover:shadow cursor-pointer"
                  >
                    {iconConfig.icon}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
