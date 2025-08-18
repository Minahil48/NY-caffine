"use server";

import axiosInstance from "@/axiosInstance";
import getAuthHeaders from "@/authHeader";

export const getAllOrders = async () => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.get("/orders", { headers });
  return res.data;
};

export const getOrderById = async (orderId: string) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.get(`/orders/${orderId}`, { headers });
  return res.data;
};

export const deleteOrder = async (orderId: string) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.delete(`/orders/${orderId}`, { headers });
  return res.data;
};
