"use server";

import axiosInstance from "@/axiosInstance";
import { AxiosResponse } from "axios";
import { cookies } from "next/headers";

interface User {
    email: string;
    password: string;
};

export const loginUser = async ({ email, password }: User) => {
    const cookieStore = await cookies();
    try {
        const res: AxiosResponse = await axiosInstance.post<unknown>(`/auth/login`, {
            email: email,
            password: password,
            fcmToken: "null"
        })

        console.log("RES", res)

        if (res.data.success) {
            cookieStore.set('token', res.data.token);
            return {
                success: true,
                message: "Login Successful"
            }
        } else {
            return {
                success: false,
                message: res.data.message
            }
        }

    } catch (e) {
        console.log("Error", e)
        return {
            success: false,
            message: e
        }
    }
}