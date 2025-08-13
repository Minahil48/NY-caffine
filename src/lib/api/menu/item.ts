"use server";

import axiosInstance from "@/axiosInstance";
import { cookies } from "next/headers";

interface AddItemPayload {
    name: string;
    price: number;
    category: string;
    modifiers: string[];
    branch: string[];
    qty: number;
    isActive: boolean;
    images: [];
}

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

export const AddItem = async (itemData: AddItemPayload) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await axiosInstance.post(
        "/items",
        itemData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
};

export const deleteItem= async (ItemId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.delete(`/items/${ItemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
