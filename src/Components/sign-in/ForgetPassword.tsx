"use client";

import React, { useState, useEffect } from "react";
import Column1 from "../Column1";
import Button from "../Button";
import toast from "react-hot-toast";
import { forgetpassword } from "@/lib/api/auth/forgetpassword";
import { useRouter } from "next/navigation";

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!loading && shouldNavigate) {
            router.push(`/otp?email=${encodeURIComponent(email)}`);
        }
    }, [loading, shouldNavigate, email, router]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!isEmailValid || loading) return;

        setLoading(true);
        try {
            const res = await forgetpassword({ email });

            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
                setShouldNavigate(true);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <Column1 />
            <div className="flex flex-col items-center justify-center py-20 bg-white relative">
                <a
                    href="/"
                    className="absolute top-10 left-10 text-gray-700 text-lg font-medium cursor-pointer"
                >
                    &lt; Back
                </a>
                <div className="flex items-center justify-center py-20">
                    <div className="flex flex-col gap-10 md:gap-16 w-full max-w-md px-6">
                        <div className="text-center">
                            <h1 className="text-3xl font-medium mb-2 text-gray-900">
                                Reset Your Password
                            </h1>
                            <p className="text-gray-700 mb-6 text-xl whitespace-nowrap">
                                An email will be sent to the email you provide
                            </p>
                        </div>

                        <form
                            className="flex flex-col space-y-5 md:space-y-7 w-full"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="reset-email"
                                    className="block mb-4 text-lg text-black"
                                >
                                    Enter Email
                                </label>
                                <input
                                    type="email"
                                    name="reset-email"
                                    id="reset-email"
                                    placeholder="amnaemad@gmail.com"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                            </div>
                            <div className="flex justify-center mt-8">
                                <Button
                                    type="submit"
                                    value={loading ? "Sending..." : "Reset Password"}
                                    className={`w-full ${!isEmailValid || loading
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                        }`}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
