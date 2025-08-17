'use server';

import axiosInstance from "@/axiosInstance";
import { cookies } from "next/headers";

interface LocationData {
  name: string;
  branchCode: string;
  address: string;
  email: string;
  password: string;
  image: string;
  latitude: number;
  longitude: number;
}

export const getAllLocations = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.get("/location", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const addLocations = async (locationData: LocationData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.post(
    "/location",
    locationData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const deleteLocations = async (locationId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await axiosInstance.delete(`/location/${locationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

interface LocationData {
  name: string;
  branchCode: string;
  address: string;
  email: string;
  password: string;
  image: string;
}

export const updateBranch = async (locationId: string, locationData: LocationData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("No auth token found");

  const res = await axiosInstance.put(
    `/location/${locationId}`,
    locationData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
