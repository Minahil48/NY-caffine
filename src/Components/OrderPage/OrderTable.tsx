import { Change, Eye, Trash } from '@/assets/common-icons';
import React from 'react';

interface Product {
  name: string;
}

interface Order {
  id: string;
  placedOn: string;
  qty: number;
  products: Product[];
  price: string;
  status: 'Pending' | 'Completed' | 'Canceled';
}

interface OrderTableProps {
  data: Order[];
}

const getProductStyle = (name: string) => {
  const colorMap: { [key: string]: { bg: string; color: string; bcolor:string } } = {
    'Iced Latte': { bg: '#F9F5FF', color: '#8B5CF6', bcolor:"#E9D7FE" },
    'Donuts': { bg: '#EFF8FF', color: '#2563EB', bcolor:"#B2DDFF" },
    'Croissant': { bg: '#EEF4FF', color: '#1E40AF', bcolor:"#C7D7FE" },
    'Coffee': { bg: '#F59E0B', color: '#B45309', bcolor:"#B45309" },
    'Tea': { bg: '#10B981', color: '#065F46', bcolor:"#065F46'" },
    'Sandwich': { bg: '#6366F1', color: '#312E81', bcolor:"#312E81" },
  };

  return colorMap[name] || { bg: '#E5E7EB', color: '#374151' };
};

const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
  const getStatusDotColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Completed':
        return 'bg-green-500';
      case 'Canceled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
      <table className="min-w-full divide-y divide-gray-200 border-1 border-gray-200 rounded-2xl">
        <thead className="bg-secondary">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider rounded-tl-lg">ID</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">Placed on</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">Qty</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">Product(s)</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">Price</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.placedOn}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.qty}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex flex-wrap gap-1">
                  {order.products.slice(0, 3).map((product, index) => {
                    const { bg, color, bcolor } = getProductStyle(product.name);
                    return (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full text-xs font-semibold border"
                        style={{
                          backgroundColor: bg,
                          borderColor: bcolor,
                          color: color,
                        }}
                      >
                        {product.name}
                      </span>
                    );
                  })}
                  {order.products.length > 3 && (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
                      +{order.products.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{order.price}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                <span className="px-2 py-1 inline-flex items-center text-xs font-semibold rounded-lg border border-gray-300 text-gray-700">
                  <span className={`w-2 h-2 rounded-full mr-1 ${getStatusDotColor(order.status)}`}></span>
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <button className="text-gray-400 hover:text-gray-600" >{Trash}</button>
                  <button className="text-gray-400 hover:text-gray-600" >{Eye}</button>
                  <button className="text-gray-400 hover:text-gray-600" >{Change}</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

const Table: React.FC = () => {
  const orders: Order[] = [
    {
      id: '019938',
      placedOn: '14 April,2025',
      qty: 3,
      products: [
        { name: 'Iced Latte' },
        { name: 'Donuts' },
        { name: 'Croissant' },
      ],
      price: '$90.00',
      status: 'Pending',
    },
    {
      id: '820921',
      placedOn: '14 April,2025',
      qty: 2,
      products: [
        { name: 'Iced Latte' },
        { name: 'Croissant' },
      ],
      price: '$90.00',
      status: 'Completed',
    },
    {
      id: '728107',
      placedOn: '14 April,2025',
      qty: 5,
      products: [
        { name: 'Iced Latte' },
        { name: 'Donuts' },
        { name: 'Croissant' },
        { name: 'Coffee' },
        { name: 'Tea' },
      ],
      price: '$90.00',
      status: 'Canceled',
    },
    {
      id: '738117',
      placedOn: '14 April,2025',
      qty: 2,
      products: [
        { name: 'Iced Latte' },
        { name: 'Donuts' },
      ],
      price: '$90.00',
      status: 'Pending',
    },
    {
      id: '904490',
      placedOn: '14 April,2025',
      qty: 1,
      products: [
        { name: 'Iced Latte' },
      ],
      price: '$90.00',
      status: 'Completed',
    },
    {
      id: '567105',
      placedOn: '14 April,2025',
      qty: 4,
      products: [
        { name: 'Iced Latte' },
        { name: 'Donuts' },
        { name: 'Croissant' },
        { name: 'Sandwich' },
      ],
      price: '$90.00',
      status: 'Pending',
    },
  ];

  return (
        <OrderTable data={orders} />
  );
};

export default Table;
