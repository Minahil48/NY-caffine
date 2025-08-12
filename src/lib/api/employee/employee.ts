"use server";

import axiosInstance from "@/axiosInstance";
import { cookies } from "next/headers";

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
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const addEmployee = async (employeeData: EmployeeData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.post(
    "/users",
    employeeData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
export const deleteEmployee= async (UserId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.delete(`/users/${UserId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
