"use server";

import axiosInstance from "@/axiosInstance";
import getAuthHeaders from "@/authHeader";

export const GetCurrentUser = async () => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.get("/auth", { headers });
  return res.data;
};

export const UpdateUserDetails = async (userId: string, userData: any) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.put(`/users/${userId}`, userData, { headers });
  return res.data;
};

export const ChangePassword = async (oldPassword: string, newPassword: string) => {
  const headers = await getAuthHeaders();

  try {
    const payload = { oldPassword, newPassword };
    const res = await axiosInstance.post(`/users/resetPassword/admin`, payload, {
      headers: { ...headers, "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err: any) {
    console.error("Password change failed:", err.response?.data || err);
    throw new Error(err.response?.data?.message || "Failed to change password.");
  }
};
