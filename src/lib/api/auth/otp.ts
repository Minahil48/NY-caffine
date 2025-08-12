import axiosInstance from "@/axiosInstance";

export const resetPassword = async (email: string, otp: string, newPassword: string) => {
  try {
    const res = await axiosInstance.post("/users/resetPassword", {
      email,
      otp,
      newPassword,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Reset password failed");
  }
};
