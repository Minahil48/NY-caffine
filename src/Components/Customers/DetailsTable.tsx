"use client";
import { useEffect, useState } from "react";
import { DownloadIcon, Eye, Trash } from "@/assets/common-icons";
import DynamicTable from "@/components/order/Table";
import { getCustomerById } from "@/lib/api/customer/customer";

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

interface DetailsTableProps {
  customerId: string;
}

const DetailsTable: React.FC<DetailsTableProps> = ({ customerId }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getCustomerById(customerId);
        const orderHistory = data?.orderHistory?.orders || [];

        const formattedOrders: Order[] = orderHistory.map((order: any) => ({
          id: order._id,
          Branch: order.branch || "N/A",
          PlacedOn: new Date(order.createdAt).toLocaleString(),
          Items: order.products.map((p: any) => ({
          name: p.item?.name || "Unnamed Item",
          })),
          Price: `$${order.totalPrice?.toFixed(2) || "0.00"}`,
        }));

        setOrders(formattedOrders);
      } catch (err) {
        console.error("Failed to fetch customer orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  const actionIcons = [
    { icon: Trash, action: "delete" },
    { icon: Eye, action: "view" },
  ];

  if (loading) return <div className="p-5">Loading orders...</div>;

  return (
    <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl">
      <div className="flex w-full justify-between">
        <h1 className="text-xl font-medium">Customer Orders</h1>
        <button className="flex gap-1 border-1 text-md text-gray-600 items-center cursor-pointer hover:bg-gray-100 border-gray-200 p-3 rounded-xl">
          {DownloadIcon}
          Download
        </button>
      </div>

      <DynamicTable
        data={orders}
        icons={actionIcons}
        getRowHref={(row) => `/orders/${row.id}`}
      />
    </div>
  );
};

export default DetailsTable;
