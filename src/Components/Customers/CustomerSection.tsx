"use client";

import React, { useState, useEffect } from "react";
import { edit, Trash, Eye } from "@/assets/common-icons";
import { OrderSearch } from "@/components/order/Search";
import DynamicTable from "@/components/order/Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllCustomers, deleteCustomer } from "@/lib/api/customer/customer";
import { UpdateUserDetails } from "@/lib/api/auth/settings/settings";

interface Customer {
  _id: string;
  Name: string;
  Email: string;
  Date?: string;
}

const CustomerShimmer: React.FC = () => (
  <div className="animate-pulse flex flex-col gap-4 mt-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center justify-between pb-3">
        <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/5 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

const formatDate = (date: Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CustomerSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tableData, setTableData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllCustomers();
      if (res.success && Array.isArray(res.data)) {
        const customers = res.data
          .filter((user: any) => user.role === "customer")
          .map((cus: any) => ({
            _id: cus._id,
            Name: cus.name,
            Email: cus.email,
            Date: cus.createdAt ? formatDate(new Date(cus.createdAt)) : "",
          }));
        setTableData(customers);
      } else {
        setError("Failed to load customers");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (customerId: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    try {
      const res = await deleteCustomer(customerId);
      if (!res.success) return;
      setTableData((prev) => prev.filter((cus) => cus._id !== customerId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (updatedRow: Record<string, any>) => {
    try {
      const payload = { name: updatedRow.Name, email: updatedRow.Email };
      const res = await UpdateUserDetails(updatedRow.ID, payload);
      if (!res.success) return false;

      setTableData((prev) =>
        prev.map((cus) =>
          cus._id === updatedRow.ID
            ? { ...cus, Name: updatedRow.Name, Email: updatedRow.Email }
            : cus
        )
      );
      return true;
    } catch (err) {
      console.error("Error updating customer:", err);
      return false;
    }
  };

  let filteredCustomers = tableData.filter((customer) =>
    customer.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedDate) {
    const formatted = formatDate(selectedDate);
    filteredCustomers = filteredCustomers.filter(
      (customer) => customer.Date === formatted
    );
  }

  const mappedData = filteredCustomers.map((cus) => ({
    ID: cus._id,
    Name: cus.Name,
    Email: cus.Email,
    Date: cus.Date,
  }));

  const actionIcons = [
    { icon: Trash, action: "delete" },
    { icon: edit, action: "edit" },
    { icon: Eye, action: "view" },
  ];

  return (
    <div className="flex flex-col m-2 bg-white rounded-2xl p-7">
      {loading ? (
        <CustomerShimmer />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="flex items-center justify-between w-full pb-4">
            <h1 className="text-xl font-medium">All Customers</h1>
            <OrderSearch value={searchTerm} onChange={setSearchTerm} />
          </div>

          <div className="flex flex-row justify-between w-full gap-4 pb-4 items-center">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Date"
              className="border border-gray-300 text-gray-700 text-medium max-w-[120px] p-2 rounded-md text-sm"
              maxDate={new Date()}
              isClearable
            />

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedDate(null);
              }}
              className="text-sm text-red-500 hover:underline"
            >
              Clear Filters
            </button>
          </div>

          <DynamicTable
            data={mappedData}
            icons={actionIcons}
            onDelete={handleDelete}
            onEdit={handleEdit}
            getRowHref={(row) => `/customers/customer-details/${row.ID}`}
          />
        </>
      )}
    </div>
  );
};

export default CustomerSection;
