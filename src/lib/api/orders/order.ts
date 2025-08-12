"use server";

import axiosInstance from "@/axiosInstance";
import { cookies } from "next/headers";

export const getAllOrders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.get("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getOrderById = async (orderId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.get(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteOrder= async (orderId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.delete(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
