'use client';

import { DownloadIcon, Eye, Trash } from '@/assets/common-icons';
import DynamicTable from '@/components/order/Table';

interface Items {
  name: string;
}

interface Order {
  id: string;
  Branch: string;
  PlacedOn: string;
  Items: Items[];
  Price: string;
}

const DetailsTable: React.FC = () => {
  const orders: Order[] = [
    {
      id: '1',
      Branch: 'NY Caffeine London',
      PlacedOn: '12 April, 2025 - 12:00 am',
      Items: [
        { name: 'Chilled latte' },
        { name: 'Croissant' },
      ],
      Price: '$81.90',
    },
    {
      id: '2',
      Branch: 'NY Caffeine London',
      PlacedOn: '12 April, 2025 - 12:00 am',
      Items: [
        { name: 'Chilled latte' },
        { name: 'Croissant' },
      ],
      Price: '$81.90',
    },
    {
      id: '3',
      Branch: 'NY Caffeine California',
      PlacedOn: '12 April, 2025 - 12:00 am',
      Items: [
        { name: 'Chilled latte' },
        { name: 'Croissant' },
      ],
      Price: '$81.90',
    },
    {
      id: '4',
      Branch: 'NY Caffeine California',
      PlacedOn: '12 April, 2025 - 12:00 am',
      Items: [
        { name: 'Chilled latte' },
        { name: 'Croissant' },
      ],
      Price: '$81.90',
    },
  ];

  const actionIcons = [
    { icon: Trash, action: 'delete' },
    { icon: Eye, action: 'view' },
  ];

  return (
    <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl">
      <div className="flex w-full justify-between">
        <h1 className="text-xl font-medium">All Categories</h1>
        <button className="flex gap-1 border-1 text-md text-gray-600 items-center cursor-pointer hover:bg-gray-100 border-gray-200 p-3 rounded-xl">
          {DownloadIcon}
          Download
        </button>
      </div>

      <DynamicTable
        data={orders}
        icons={actionIcons}
        getRowHref={(row) => `/customers/customer-order-details/${row.id}`}
      />
    </div>
  );
};

export default DetailsTable;
