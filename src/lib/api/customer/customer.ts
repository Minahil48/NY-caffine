"use server";

import axiosInstance from "@/axiosInstance";
import { cookies } from "next/headers";

interface CustomerData {
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
    password: string;
    role: "customer";
    extra: {
        image: null;
        rewardPoints: number;
        currentRedeemedReward: null;
        rewardHistory: [];
    };
}

export const getAllCustomers = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await axiosInstance.get("/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};


export const getCustomerById = async (customerId: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await axiosInstance.get(`/users/${customerId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const deleteCustomer = async (customerId: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await axiosInstance.delete(`/users/${customerId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};