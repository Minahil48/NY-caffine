"use server";

import axiosInstance from "@/axiosInstance";
import { cookies } from "next/headers";


export const getAllItem = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.get("/items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteItem = async (ItemId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.delete(`/items/${ItemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


export const updateItem = async (ItemId: string, updatedData: Record<string, any>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.put(`/items/${ItemId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
