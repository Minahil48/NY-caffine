"use server";

import axiosInstance from "@/axiosInstance";
import getAuthHeaders from "@/authHeader";

interface ItemData {
  name?: string;
  description?: string;
  price?: number;
  images?: string[];
  category?: string;
  modifiers?: any[];
  branch?: string[];
  isActive?: boolean;
  qty?: number;
}

export const AddItem = async (itemData: ItemData) => {
  try {
    const headers = await getAuthHeaders();

    const payload = {
      name: itemData.name || "",
      description: itemData.description || "",
      price: itemData.price || 0,
      images: itemData.images || [],
      category: itemData.category || "",
      modifiers: itemData.modifiers || [],
      branch: itemData.branch || [],
      isActive: itemData.isActive ?? true,
      qty: itemData.qty || 0,
    };

    const res = await axiosInstance.post("/items", payload, { headers });
    return res.data;
  } catch (error: any) {
    console.error("Error adding item:", error.response?.data || error.message);
    throw error;
  }
};
