"use server";

import axiosInstance from "@/axiosInstance";
import getAuthHeaders from "@/authHeader";

export const getAllItem = async () => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.get("/items", { headers });
  return res.data;
};

export const deleteItem = async (itemId: string) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.delete(`/items/${itemId}`, { headers });
  return res.data;
};

export const updateItem = async (itemId: string, updatedData: Record<string, any>) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.put(`/items/${itemId}`, updatedData, { headers });
  return res.data;
};
