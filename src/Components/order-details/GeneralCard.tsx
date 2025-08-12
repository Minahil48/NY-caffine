import React from 'react';

interface GeneralCardProps {
  date: string;
  id: string;          
  name: string;
  contact: string;
  branch: string;
}

function GeneralCard({ date, id, name, contact, branch }: GeneralCardProps) {
  return (
    <div className="flex flex-col gap-4 border-1 border-gray-300 m-5 p-7 rounded-2xl">
      <h1 className="text-lg font-medium">General</h1>

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-500">Placed on</h1>
        <span className="font-medium text-gray-600">{date}</span>
      </div>

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-500">Order ID</h1>
        <span className="flex font-medium text-gray-600">#{id}</span>
      </div>

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-500">Placed By</h1>
        <span className="font-medium text-gray-600">{name}</span>
      </div>

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-500">Contact Number</h1>
        <span className="font-medium text-gray-600">{contact}</span>
      </div>

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-500">Branch Details</h1>
        <span className="font-medium text-gray-600">{branch}</span>
      </div>
    </div>
  );
}

export default GeneralCard;
