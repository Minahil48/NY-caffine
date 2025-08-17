'use client';

import React, { useState, useEffect } from "react";
import OrderFilters from "../order/Filters";
import { OrderSearch } from "../order/Search";
import OrderTable from "../order/Table";
import { edit, Trash } from "@/assets/common-icons";
import AddButton from "../menu/AddButton";
import AddBranch from "./AddBranch";

import {
  getAllLocations,
  addLocations,
  deleteLocations,
} from "@/lib/api/location/location";
import { updateBranch } from "@/lib/api/location/location";

interface LocationType {
  _id: string;
  branchCode: string;
  name: string;
  address: string;
}

const LocationSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);
  const [tableData, setTableData] = useState<LocationType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchLocations() {
      setLoading(true);
      setError(null);
      try {
        const res = await getAllLocations();
        if (res.success && Array.isArray(res.data)) {
          setTableData(res.data);
        } else {
          setError("Failed to load locations");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load locations");
      } finally {
        setLoading(false);
      }
    }
    fetchLocations();
  }, []);


  const addRowToTable = async (newData: {
    branchCode?: string;
    name?: string;
    address?: string;
  }) => {
    const { branchCode, name, address } = newData;
    if (!branchCode || !name || !address) {
      setError("Invalid data received from AddBranch");
      return;
    }

    setError(null);

    const payload = {
      branchCode: branchCode.trim(),
      name: name.trim(),
      address: address.trim(),
      email: "branchIsb@gmail.com",
      password: "Test1234",
      image: "default-image.jpg",
      latitude: 0,
      longitude: 0,
    };

    try {
      const res = await addLocations(payload);
      if (res.success && res.data) {
        setTableData((prev) => [...prev, res.data]);
        setShowAddCard(false);
      } else {
        setError("Failed to add location");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data
        ? JSON.stringify(err.response.data)
        : err.message || "Failed to add location";
      setError(`Failed to add location: ${errorMessage}`);
    }
  };


  const handleDelete = async (locationId: string) => {
    if (!confirm("Are you sure you want to delete this branch?")) return;

    try {
      const res = await deleteLocations(locationId);
      if (!res.success) {
        console.error("Failed to delete branch:", res.message);
        return;
      }
      setTableData((prev) => prev.filter((loc) => loc._id !== locationId));
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };


  const handleEdit = async (updatedRow: Record<string, any>) => {
    try {
      const payload = {
        branchCode: updatedRow.branchCode,
        name: updatedRow.branchName,
        address: updatedRow.address,
        email: "branchIsb@gmail.com",
        password: "Test1234",
        image: "default-image.jpg",
        latitude: 0,
        longitude: 0,
      };

      const res = await updateBranch(updatedRow.ID, payload);
      if (!res.success) return false;

      setTableData((prev) =>
        prev.map((loc) =>
          loc._id === updatedRow.ID
            ? {
                ...loc,
                branchCode: updatedRow.branchCode,
                name: updatedRow.branchName,
                address: updatedRow.address,
              }
            : loc
        )
      );
      return true;
    } catch (err) {
      console.error("Error updating branch:", err);
      return false;
    }
  };

  const filteredLocations = tableData.filter(
    (loc) =>
      loc.branchCode.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLocation ? loc.address === selectedLocation : true)
  );

  const mappedData = filteredLocations.map((item) => ({
    ID: item._id,
    branchCode: item.branchCode,
    branchName: item.name,
    address: item.address,
  }));

  const actionIcons = [
    { icon: Trash, action: "delete" },
    { icon: edit, action: "edit" },
  ];

  const ShimmerSection: React.FC = () => (
    <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl animate-pulse">
      <div className="h-6 w-48 bg-gray-300 rounded"></div>
      <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center mt-4">
        <div className="flex gap-2">
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="h-10 w-full md:w-64 bg-gray-300 rounded mt-2 md:mt-0"></div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-full bg-gray-50 rounded-lg shadow p-4">
          <div className="flex gap-4 border-gray-200 pb-2 mb-3">
            {["Branch Code", "Branch Name", "Address", "Actions"].map((_, idx) => (
              <div key={idx} className="h-5 bg-gray-300 rounded w-70"></div>
            ))}
          </div>

          {Array.from({ length: 5 }).map((_, rowIdx) => (
            <div key={rowIdx} className="flex gap-4 mb-3">
              <div className="h-5 bg-gray-200 rounded w-70"></div>
              <div className="h-5 bg-gray-200 rounded w-70"></div>
              <div className="h-5 bg-gray-200 rounded w-70"></div>
              <div className="h-5 bg-gray-200 rounded w-70"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) return <ShimmerSection />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl">
      <div className="flex w-full justify-between">
        <h1 className="text-xl font-medium">Branches</h1>
        <AddButton label="+ Add New Branch" onClick={() => setShowAddCard(true)} />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
        <div className="flex gap-2">
          <OrderFilters
            label="By Location"
            options={[...new Set(tableData.map((o) => o.address))]}
            selected={selectedLocation}
            onSelect={setSelectedLocation}
          />
        </div>

        <div className="w-full md:w-auto">
          <OrderSearch value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      <OrderTable data={mappedData} icons={actionIcons} onDelete={handleDelete} onEdit={handleEdit} />

      {showAddCard && <AddBranch onClose={() => setShowAddCard(false)} onAddRow={addRowToTable} />}
    </div>
  );
};

export default LocationSection;
