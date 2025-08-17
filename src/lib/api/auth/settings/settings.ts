"use server";

import axiosInstance from "@/axiosInstance";
import { cookies } from "next/headers";

export const GetCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("No auth token found.");

  const res = await axiosInstance.get("/auth", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};


export const UpdateUserDetails = async (userId: string, userData: any) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("No auth token found.");

  const res = await axiosInstance.put(`/users/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};


export const ChangePassword = async (oldPassword: string, newPassword: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("No auth token found.");

  try {
    const payload = {
      oldPassword,
      newPassword,
    };

    const res = await axiosInstance.post(
      `/users/resetPassword/admin`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (err: any) {
    console.error("Password change failed:", err.response?.data || err);
    throw new Error(err.response?.data?.message || "Failed to change password.");
  }
};

