import { payment } from "@/assets/common-icons";
import React from "react";

interface OrderItem {
  quantity: number;
  name: string;
  price: string; // ✅ Accepts string like "$90.00"
}

export interface PaymentDetailsCardProps {
  paymentMethod: {
    type: string;
    lastFour: string;
  };
  orderItems: OrderItem[];
  total: number;
  gst: number;
  subtotal: number;
}

const PaymentDetailsCard: React.FC<PaymentDetailsCardProps> = ({
  paymentMethod,
  orderItems,
  total,
  gst,
  subtotal,
}) => {
  const PaidWith = () => (
    <div className="flex items-center bg-[#34C7591F] text-black text-sm px-3 py-1 rounded-full">
      <span className="flex gap-1 items-center">Paid with {payment}</span>
      <span className="ml-1">**{paymentMethod.lastFour}</span>
    </div>
  );

  return (
    <div className="p-6 w-full mx-auto  border-1 border-gray-300 rounded-2xl">
      <div className="flex justify-between items-center mb-6 border-gray-200 px-5">
        <h1 className="text-lg font-medium text-gray-800">Payment Details</h1>
        <div className="hidden lg:flex">
          <PaidWith />
        </div>
      </div>

      <div className="mb-4 mx-5 border-b border-gray-300">
        {orderItems.map((item, index) => {
          const parsedPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
          return (
            <div key={index} className="flex justify-between items-center py-2">
              <span className="text-gray-700">
                {item.quantity}x {item.name}
              </span>
              <span className="text-gray-700 font-medium">
                ${parsedPrice.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end px-5">
        <div className="space-y-2 min-w-xs w-full sm:w-auto">
          <div className="flex justify-between items-center text-gray-500">
            <span>Total</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-gray-500">
            <span>GST</span>
            <span className="font-medium">${gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-gray-800 text-md font-bold pt-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end px-5 mt-4 lg:hidden">
        <PaidWith />
      </div>
    </div>
  );
};

export default PaymentDetailsCard;
