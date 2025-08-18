"use client";

import React, { useState, useEffect } from "react";
import {
  Trash,
  Eye,
  iconDown,
  iconUp,
  upArrow,
} from "@/assets/common-icons";
import Card from "@/components/Card";
import Chart from "@/components/dashboard/Chart";
import DoughnutChart from "@/components/dashboard/DoughnutChart";
import ViewButton from "@/components/ViewButton";
import DynamicTable from "@/components/order/Table";
import { getAllOrders, deleteOrder } from "@/lib/api/orders/order";

interface Order {
  ID: string;
  Date: string;
  Quantity: number;
  Products: string;
  Price: string;
  Status: string;
}

const actionIcons = [
  { icon: Trash, action: "delete" },
  { icon: Eye, action: "view" },
];

const TableShimmer: React.FC = () => {
  return (
    <div className="overflow-x-auto w-full">
      <div className="min-w-full bg-gray-50 rounded-lg shadow-sm p-4 animate-pulse">
        <div className="flex gap-4 border-b border-gray-200 pb-2 mb-2">
          {[
            "ID",
            "Date",
            "Quantity",
            "Products",
            "Price",
            "Status",
            "Actions",
          ].map((_, idx) => (
            <div key={idx} className="h-5 bg-gray-200 rounded w-50"></div>
          ))}
        </div>
        {Array.from({ length: 6 }).map((_, rowIdx) => (
          <div key={rowIdx} className="flex gap-4 mb-3">
            {Array.from({ length: 7 }).map((_, colIdx) => (
              <div
                key={colIdx}
                className={`h-5 bg-gray-200 rounded ${
                  colIdx === 3 ? "w-50" : "w-50"
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getAllOrders();

        if (!res.success) {
          console.error("Failed to fetch orders:", res.message);
          return;
        }

        const apiOrders = res.orders;

        if (!Array.isArray(apiOrders)) {
          console.error("API did not return an array:", apiOrders);
          return;
        }

        const formatted: Order[] = apiOrders.map((order: any) => ({
          ID: order._id,
          Date: new Date(order.createdAt).toISOString().split("T")[0],
          Quantity: order.itemsQuantity,
          Products: order.products
            .map((p: any) => p.item?.name || "Unknown")
            .join(", "),
          Price: `$${Number(order.totalPrice).toFixed(2)}`,
          Status: order.pickupStatus || "Pending",
        }));

        setOrders(formatted);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await deleteOrder(orderId);

      if (!res.success) {
        console.error("Failed to delete order:", res.message);
        return;
      }

      setOrders((prev) => prev.filter((order) => order.ID !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center">
      {/* Cards */}
      <div className="flex flex-col items-center lg:justify-start justify-center lg:flex-row gap-11 w-full">
        <Card
          heading="Net income"
          amount="$1,567.99"
          icon={iconUp}
          percentage="3.0%"
          subHeading="April, 2025"
          bgColor="#EDFBEF"
          textColor="#34C759"
        />
        <Card
          heading="Total Orders"
          amount="1290"
          icon={iconDown}
          percentage="3.0%"
          subHeading="April, 2025"
          bgColor="#FFEFEF"
          textColor="#F93131"
        />
        <Card
          heading="Total Employees"
          amount="120"
          icon={iconUp}
          percentage="3.0%"
          subHeading="April, 2025"
          bgColor="#EDFBEF"
          textColor="#34C759"
        />
        <Card
          heading="Location"
          amount="4"
          percentage="Active"
          subHeading="New York City"
          bgColor="#EDFBEF"
          textColor="#34C759"
        />
      </div>

      <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between gap-11">
        <div className="w-full lg:w-2/3">
          <Chart />
        </div>
        <div className="w-full lg:w-1/3">
          <DoughnutChart
            orderDataByDate={{
              "2025-08-13": 80,
              "2025-08-14": 70,
              "2025-08-15": 30,
            }}
          />
        </div>
      </div>


      <div className="bg-white flex flex-col p-10 gap-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium">Recent orders</h1>
          <ViewButton value="View all" icon={upArrow} href="/orders" />
        </div>

        {loading ? (
          <TableShimmer />
        ) : orders.length > 0 ? (
          <DynamicTable
            data={orders}
            icons={actionIcons}
            getRowHref={(row) => `/orders/${row.ID}`}
            onDelete={handleDelete}
          />
        ) : (
          <div className="text-center text-gray-500 font-medium py-10">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
