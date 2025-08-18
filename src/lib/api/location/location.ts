"use server";

import axiosInstance from "@/axiosInstance";
import getAuthHeaders from "@/authHeader";

interface LocationData {
  name: string;
  branchCode: string;
  address: string;
  email: string;
  password: string;
  image: string;
  latitude?: number;
  longitude?: number;
}

export const getAllLocations = async () => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.get("/location", { headers });
  return res.data;
};

export const addLocations = async (locationData: LocationData) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.post("/location", locationData, { headers });
  return res.data;
};

export const deleteLocations = async (locationId: string) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.delete(`/location/${locationId}`, {
    headers,
  });
  return res.data;
};

export const updateBranch = async (
  locationId: string,
  locationData: LocationData
) => {
  const headers = await getAuthHeaders();
  const res = await axiosInstance.put(`/location/${locationId}`, locationData, {
    headers,
  });
  return res.data;
};
