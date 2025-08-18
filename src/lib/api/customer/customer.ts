"use server";

import axiosInstance from "@/axiosInstance";
import getAuthHeaders from "@/authHeader";

export const getAllCustomers = async () => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.get("/users", { headers });
  return res.data;
};

export const getCustomerById = async (customerId: string) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.get(`/users/${customerId}`, { headers });
  return res.data;
};

export const deleteCustomer = async (customerId: string) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.delete(`/users/${customerId}`, { headers });
  return res.data;
};
