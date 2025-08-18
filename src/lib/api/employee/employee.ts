"use server";

import axiosInstance from "@/axiosInstance";
import getAuthHeaders from "@/authHeader";

interface EmployeeData {
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  password: string;
  role: "employee" | "admin";
  extra: {
    branchId: string;
  };
}

export const getAllEmployees = async () => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.get("/users", { headers });
  return res.data;
};


export const addEmployee = async (employeeData: EmployeeData) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.post("/users", employeeData, { headers });
  return res.data;
};

export const deleteEmployee = async (userId: string) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.delete(`/users/${userId}`, { headers });
  return res.data;
};
