"use client";

import React, { useState, useEffect } from "react";
import Column1 from "../Column1";
import Button from "../Button";
import { CloseEyeIcon, EyeIcon } from "@/assets/common-icons";
import { resetPassword } from "@/lib/api/auth/otp";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const isValid =
    password &&
    confirmPassword &&
    password === confirmPassword &&
    password.length >= 6;

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    const storedOtp = localStorage.getItem("resetOtp");
    if (!storedEmail || !storedOtp) {
      router.push("/forget-password");
    } else {
      setEmail(storedEmail);
      setOtp(storedOtp);
    }
  }, [router]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      toast.error(
        "Please make sure passwords match and are at least 6 characters."
      );
      return;
    }
    try {
      if (!email || !otp) {
        toast.error("Missing email or OTP. Please restart the reset process.");
        return;
      }
      await resetPassword(email, otp, password);
      toast.success("Password reset successfully!");
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetOtp");
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.message || "Failed to reset password");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <Column1 />
      <div className="flex flex-col items-center justify-center py-20 bg-white relative">
        <a
          href="/otp"
          className="absolute top-10 left-10 text-gray-700 text-lg font-medium cursor-pointer"
        >
          &lt; Back
        </a>
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col gap-10 px-6 lg:w-[570px]">
            <h1 className="text-3xl font-medium text-center">Reset Password</h1>
            <form className="flex flex-col space-y-7" onSubmit={handleReset}>
              <div className="relative">
                <label className="block mb-4">New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded-lg w-full p-2.5"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-13"
                >
                  {showPassword ? EyeIcon : CloseEyeIcon}
                </button>
              </div>
              <div className="relative">
                <label className="block mb-4">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-gray-300 rounded-lg w-full p-2.5"
                />
              </div>
              <div className="flex justify-center mt-8">
                <Button
                  type="submit"
                  value="Reset password"
                  className={`w-full ${
                    !isValid ? "opacity-50 cursor-not-allowed" : ""
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

export default ResetPassword;
