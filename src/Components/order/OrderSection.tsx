"use client";

import React, { useState, useEffect } from "react";
import { Trash, Eye, Change } from "@/assets/common-icons";
import { OrderTabs } from "./OrderTabs";
import OrderFilters from "./Filters";
import { OrderSearch } from "./Search";
import DynamicTable from "./Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllOrders, deleteOrder } from "@/lib/api/orders/order";

interface Order {
  ID: string;
  Date: string;
  Quantity: number;
  Products: string;
  Price: string;
  Status: string;
}

const TableShimmer = () => (
  <div className="w-full border border-gray-200 rounded-lg overflow-hidden animate-pulse">
    <div className="grid grid-cols-6 gap-2 bg-gray-100 p-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-4 w-16 bg-gray-200 rounded"></div>
      ))}
    </div>
    {[...Array(6)].map((_, rowIdx) => (
      <div
        key={rowIdx}
        className="grid grid-cols-6 gap-2 p-3 border-t border-gray-100"
      >
        {[...Array(6)].map((_, colIdx) => (
          <div key={colIdx} className="h-4 w-16 bg-gray-200 rounded"></div>
        ))}
      </div>
    ))}
  </div>
);

const PageShimmer = () => (
  <div className="flex flex-col gap-5 m-2 bg-white p-6 rounded-2xl animate-pulse">

    <div className="flex gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-6 w-20 bg-gray-200 rounded"></div>
      ))}
    </div>

    <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
      <div className="flex flex-wrap gap-2 items-center">
        <div className="h-9 w-28 bg-gray-200 rounded"></div>
        <div className="h-9 w-32 bg-gray-200 rounded"></div>
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
      </div>
      <div className="h-9 w-40 bg-gray-200 rounded"></div>
    </div>

    <TableShimmer />
  </div>
);

const formatDate = (date: Date) => date.toLocaleDateString("en-CA");

const OrderSection: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("All Orders");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
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
          Date: new Date(order.createdAt).toLocaleDateString("en-CA"),
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

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.ID !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const productOptions = Array.from(
    new Set(orders.flatMap((order) => order.Products.split(", ")))
  );

  let filtered =
    activeTab === "All Orders"
      ? orders
      : orders.filter(
          (order) => order.Status.toLowerCase() === activeTab.toLowerCase()
        );

  if (searchTerm.trim()) {
    filtered = filtered.filter((order) =>
      order.ID.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }

  if (selectedDate) {
    const formatted = formatDate(selectedDate);
    filtered = filtered.filter((order) => order.Date === formatted);
  }

  if (selectedProduct) {
    filtered = filtered.filter((order) =>
      order.Products.toLowerCase().includes(selectedProduct.toLowerCase())
    );
  }

  const actionIcons = [
    { icon: Trash, action: "delete" },
    { icon: Eye, action: "view" },
  ];

  if (loading) {
    return <PageShimmer />;
  }

  return (
    <div className="flex flex-col gap-5 m-2 bg-white p-6 rounded-2xl">
      <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex flex-col">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Date"
              className="border border-gray-300 text-gray-700 text-medium max-w-[120px] p-2 rounded-md text-sm"
              maxDate={new Date()}
              isClearable
            />
          </div>

          <OrderFilters
            label="By Product"
            options={productOptions}
            selected={selectedProduct}
            onSelect={setSelectedProduct}
          />

          <button
            onClick={() => {
              setActiveTab("All Orders");
              setSearchTerm("");
              setSelectedDate(null);
              setSelectedProduct("");
            }}
            className="ml-4 text-sm text-red-500 hover:underline"
          >
            Clear Filters
          </button>
        </div>

        <div className="w-full md:w-auto">
          <OrderSearch value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      {filtered.length > 0 ? (
        <DynamicTable
          data={filtered}
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
  );
};

export default OrderSection;
