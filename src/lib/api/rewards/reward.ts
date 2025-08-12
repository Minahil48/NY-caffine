'use server';

import axiosInstance from "@/axiosInstance";
import { cookies } from "next/headers";

export const getAllRewards = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.get("/reward", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const addReward = async (rewardData: {
  headline: string;
  description: string;
  allocatePoints: number;
  image: string;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.post(
    "/reward",
    rewardData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
