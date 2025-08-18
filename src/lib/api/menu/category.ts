"use server";

import axiosInstance from "@/axiosInstance";
import getAuthHeaders from "@/authHeader";

interface CategoryData {
  id?: string;
  name: string;
}

interface UpdateCategoryData {
  id: string;
  name: string;
  image?: File;
}

export const getAllCategory = async () => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.get("/category", { headers });
  return res.data;
};

export const addCategory = async (categoryData: CategoryData) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.post("/category", categoryData, { headers });
  return res.data;
};

export const deleteCategory = async (categoryId: string) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.delete(`/category/${categoryId}`, {
    headers,
  });
  return res.data;
};

// Update a category (with optional image)
export const updateCategory = async (data: UpdateCategoryData) => {
  const headers = await getAuthHeaders();

  try {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.image) formData.append("image", data.image);

    const res = await axiosInstance.put(`/category/${data.id}`, formData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err: any) {
    console.error(
      "Failed to update category:",
      err.response?.data || err.message
    );
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};
