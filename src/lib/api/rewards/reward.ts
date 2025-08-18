"use server";

import axiosInstance from "@/axiosInstance";
import getAuthHeaders from "@/authHeader";

interface RewardData {
  headline: string;
  description: string;
  allocatePoints: number;
  image: string;
}

export const getAllRewards = async () => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.get("/reward", { headers });
  return res.data;
};

export const addReward = async (rewardData: RewardData) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.post("/reward", rewardData, { headers });
  return res.data;
};
