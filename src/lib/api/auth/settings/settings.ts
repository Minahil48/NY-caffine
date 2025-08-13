"use server";

import axiosInstance from "@/axiosInstance";
import { cookies } from "next/headers";

export const ResetAdminPassword = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await axiosInstance.get("/users/resetPassword/admin", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};


export const UpdateValues = async (
  UserId: string,
  updatedData: { name: string; email: string; phone: string }
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.put(
    `/users/${UserId}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};


