'use client';

import { DownloadIcon, Eye, Trash } from '@/assets/common-icons';
import DynamicTable from '@/Components/OrderPage/OrderTable';

interface Items {
  name: string;
}

interface Order {
  Branch: string;
  PlacedOn: string;
  Items: Items[];
  Price: string;
}

const DetailsTable: React.FC = () => {
  const orders: Order[] = [
    {
      Branch: 'NY Caffeine London',
      PlacedOn: '12 April, 2025 - 12:00 am',
      Items: [
        { name: 'Chilled latte' },
        { name: 'Croissant' },
      ],
      Price: '$81.90',
    },
    {
      Branch: 'NY Caffeine London',
      PlacedOn: '12 April, 2025 - 12:00 am',
      Items: [
        { name: 'Chilled latte' },
        { name: 'Croissant' },
      ],
      Price: '$81.90',
    },
    {
      Branch: 'NY Caffeine California',
      PlacedOn: '12 April, 2025 - 12:00 am',
      Items: [
        { name: 'Chilled latte' },
        { name: 'Croissant' },
      ],
      Price: '$81.90',
    },
    {
      Branch: 'NY Caffeine California',
      PlacedOn: '12 April, 2025 - 12:00 am',
      Items: [
        { name: 'Chilled latte' },
        { name: 'Croissant' },
      ],
      Price: '$81.90',
    },
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
        icons={[Trash, Eye]}
        getRowHref={(row) => `/customers/customer-order-details`} />
    </div>
  );
};

export default DetailsTable;
