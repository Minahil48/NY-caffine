"use client";

import React, { useState, useEffect } from "react";
import OrderFilters from "../order/Filters";
import { OrderSearch } from "../order/Search";
import { edit, Trash } from "@/assets/common-icons";
import Link from "next/link";
import DynamicTable from "../order/Table";
import AddButton from "../menu/AddButton";
import { getAllItem, deleteItem, updateItem } from "@/lib/api/menu/item";

const TableShimmer = () => (
  <div className="w-full border border-gray-200 rounded-lg overflow-hidden animate-pulse">
    <div className="grid grid-cols-3 gap-2 bg-gray-100 p-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-4 w-20 bg-gray-200 rounded"></div>
      ))}
    </div>
    {[...Array(6)].map((_, rowIdx) => (
      <div
        key={rowIdx}
        className="grid grid-cols-3 gap-2 p-3 border-t border-gray-100"
      >
        {[...Array(3)].map((_, colIdx) => (
          <div key={colIdx} className="h-4 w-20 bg-gray-200 rounded"></div>
        ))}
      </div>
    ))}
  </div>
);

const PageShimmer = () => (
  <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl animate-pulse">
    <div className="flex w-full justify-between">
      <div className="h-6 w-28 bg-gray-200 rounded"></div>
      <div className="h-9 w-36 bg-gray-200 rounded"></div>
    </div>
    <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
      <div className="flex flex-wrap gap-2">
        <div className="h-9 w-28 bg-gray-200 rounded"></div>
        <div className="h-9 w-28 bg-gray-200 rounded"></div>
      </div>
      <div className="h-9 w-40 bg-gray-200 rounded"></div>
    </div>
    <TableShimmer />
  </div>
);

const MenuSection: React.FC = () => {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await getAllItem();
      setMenuItems(res.items || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await deleteItem(itemId);
      if (!res.success) return;
      setMenuItems((prev) => prev.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = async (updatedRow: Record<string, any>) => {
    try {
      const payload = {
        name: updatedRow.Name,
        isActive: updatedRow.Status === "Active",
      };
      const res = await updateItem(updatedRow.ID, payload);

      if (!res.success) return false;

      setMenuItems((prev) =>
        prev.map((item) =>
          item._id === updatedRow.ID
            ? {
                ...item,
                name: updatedRow.Name,
                isActive: updatedRow.Status === "Active",
              }
            : item
        )
      );
      return true;
    } catch (err) {
      console.error("Error updating item:", err);
      return false;
    }
  };

  const handleFilterChange = (label: string, value: string) => {
    if (label === "By Name") setSelectedName(value);
    else if (label === "In Stock") setSelectedStatus(value);
  };

  const actionIcons = [
    { icon: Trash, action: "delete" },
    { icon: edit, action: "edit" },
  ];

  const nameOptions = [
    ...new Set(menuItems.map((i) => i.name).filter(Boolean)),
  ];

  const filteredItems = menuItems
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => !selectedName || item.name === selectedName)
    .filter(
      (item) =>
        !selectedStatus ||
        (selectedStatus === "Active" ? item.isActive : !item.isActive)
    );

  const mappedData = filteredItems.map((item) => ({
    ID: item._id,
    Name: item.name,
    Status: item.isActive ? "Active" : "Inactive",
  }));

  if (loading) return <PageShimmer />;

  return (
    <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl">
      <div className="flex w-full justify-between">
        <h1 className="text-xl font-medium">All Items</h1>
        <Link href="/menu/new-item">
          <AddButton label="+ Add New Item" />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
        <div className="flex flex-wrap gap-2">
          <OrderFilters
            label="By Name"
            options={nameOptions}
            selected={selectedName}
            onSelect={(val) => handleFilterChange("By Name", val)}
          />
          <OrderFilters
            label="In Stock"
            options={["Active", "Inactive"]}
            selected={selectedStatus}
            onSelect={(val) => handleFilterChange("In Stock", val)}
          />
        </div>
        <div className="w-full md:w-auto">
          <OrderSearch value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      {mappedData.length > 0 ? (
        <DynamicTable
          data={mappedData}
          icons={actionIcons}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ) : (
        <div className="text-center text-gray-500 font-medium py-10">
          No items found.
        </div>
      )}
    </div>
  );
};

export default MenuSection;
