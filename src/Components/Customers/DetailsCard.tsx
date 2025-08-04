import { edit, leftArrow } from '@/assets/common-icons';
import React from 'react';

const DetailsCard: React.FC = () => {
  return (
      <div className="bg-white rounded-2xl w-full max-w-7xl">
        
        <div className="flex items-center p-6 border-gray-200">
          {leftArrow}
          <h1 className="text-2xl font-semibold text-gray-800 ml-4">Details</h1>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/martina.png"
                alt="Profile Avatar"
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div>
                <p className="text-lg font-medium text-gray-900">Martina Roisse</p>
                <p className="text-sm text-gray-500">Since 24 May, 2024</p>
              </div>
            </div>
            <div className="flex gap-1 items-center text-gray-500 text-sm font-medium cursor-pointer">
              {edit}
              <span>Edit Profile</span>
            </div>
          </div>
        </div>

        <div className="px-6">
          <hr className="border-gray-200" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 text-center md:text-left">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-400">Contact</p>
            <p className="text-base font-medium text-gray-500 mt-1">+99 778 89023715</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-400">Email</p>
            <p className="text-base font-medium text-gray-500 mt-1">martha@gmail.com</p>
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-400">Orders Placed</p>
            <p className="text-base font-medium text-gray-500 mt-1">12</p>
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-400">Payments</p>
            <p className="text-base font-medium text-gray-500 mt-1">$6710.08</p>
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-400">Canceled Orders</p>
            <p className="text-base font-medium text-gray-500 mt-1">15</p>
          </div>
        </div>
      </div>
  );
};

export default DetailsCard;
