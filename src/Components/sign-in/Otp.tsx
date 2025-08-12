"use client";

import React, { useRef, useState } from "react";
import Button from "../Button";
import Column1 from "../Column1";
import { useRouter, useSearchParams } from "next/navigation";

function Otp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpFilled = otp.every((digit) => digit !== "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length === 6) {
      localStorage.setItem("resetEmail", email);
      localStorage.setItem("resetOtp", enteredOtp);
      router.push("/reset-password");
    } else {
      alert("Please enter a valid 6-digit code");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <Column1 />
      <div className="flex flex-col items-center justify-center py-20 bg-white relative">
        <a href="/forget-password" className="absolute top-10 left-10 text-gray-700 text-lg font-medium cursor-pointer">
          &lt; Back
        </a>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md px-4">
          <h2 className="text-3xl font-semibold mb-2 text-gray-800">Enter OTP</h2>
          <p className="text-gray-600 text-xl mb-8 self-start">Enter 6 digit code sent to {email}</p>
          <div className="flex justify-center gap-4 mb-10">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-16 h-16 border border-gray-300 rounded-lg text-center text-3xl"
              />
            ))}
          </div>
          <Button
            type="submit"
            value="Verify"
            className={`w-full ${!isOtpFilled ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </form>
      </div>
    </div>
  );
}

export default Otp;
