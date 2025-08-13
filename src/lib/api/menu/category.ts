"use server";

import axiosInstance from "@/axiosInstance";
import { cookies } from "next/headers";

interface CategoryData {
    id: string;
    name: string;
}

export const getAllCategory = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await axiosInstance.get("/category", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const addCategory = async (categoryData: CategoryData) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await axiosInstance.post(
        "/category",
        categoryData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
};

export const deleteCategory= async (CategoryId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.delete(`/category/${CategoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
