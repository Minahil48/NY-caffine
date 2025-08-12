import axiosInstance from "@/axiosInstance";
import { AxiosResponse } from "axios";

interface User {
  email: string;
}

interface ForgetPasswordResponse {
  success: boolean;
  message: string;
}

export const forgetpassword = async ({ email }: User) => {
  try {
    const res: AxiosResponse<ForgetPasswordResponse> = await axiosInstance.post(
      `/users/forgetpassword`,
      {
        email,
        fcmToken: null
      }
    );

    console.log("RES", res.data);

    if (res.data.message == "OTP sent to your email") {
      return {
        success: true,
        message: "OTP sent to your email"
      };
    } else {
      return {
        success: false,
        message: (res.data.message == "Failed to sent OTP")
      };
    }
  } catch (error: any) {
    console.error("Error", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong"
    };
  }
};
