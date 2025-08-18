"use server";

import axiosInstance from "@/axiosInstance";
import getAuthHeaders from "@/authHeader";

export const getAllModifier = async () => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.get("/modifier", { headers });
  return res.data;
};
