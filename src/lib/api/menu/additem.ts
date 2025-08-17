
"use server";

import axiosInstance from "@/axiosInstance";
import { cookies } from "next/headers";

export const AddItem = async (itemData: any) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

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

        const res = await axiosInstance.post(
            "/items",
            payload,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return res.data;
    } catch (error: any) {
        console.error("Error adding item:", error.response?.data || error.message);
        throw error;
    }
};
