"use client"
import React, { useRef, useState } from "react";
import Column1 from "../Column1";
import Button from "../Button";

function OtpPage() {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp.length === 4) {
            console.log("Verifying OTP:", enteredOtp);
        } else {
            alert("Please enter a valid 4-digit code");
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
                    <div className="flex gap-1">
                        <p className="text-black text-lg mb-8">Code sent to</p>
                        <p className="text-primary text-lg mb-8">amnaemad@gmail.com</p></div>

                    <p className="text-gray-600 text-lg mb-8 self-start">Enter 4 digit code</p>

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
                                className="w-16 h-16 border border-gray-300 rounded-lg text-center text-3xl font-bold text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={() => (location.href = '/')} value="Verify" />
                    </div>

                </form>
            </div>
        </div>
    );
}

export default OtpPage;
