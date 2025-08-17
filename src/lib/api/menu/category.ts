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

interface UpdateCategoryData {
  id: string;
  name: string;
  image?: File; // optional image
}

export const updateCategory = async (data: UpdateCategoryData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.image) formData.append("image", data.image);

    const res = await axiosInstance.put(`/category/${data.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err: any) {
    console.error("Failed to update category:", err.response?.data || err.message);
    return { success: false, message: err.response?.data?.message || err.message };
  }
};