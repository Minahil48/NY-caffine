"use server";

import axiosInstance from "@/axiosInstance";
import { cookies } from "next/headers";

export const getAllModifier = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await axiosInstance.get("/modifier", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};
