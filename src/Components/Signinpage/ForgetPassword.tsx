'use client';

import React, { useState } from 'react';
import Column1 from '../Column1';
import Button from '../Button';

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(value));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEmailValid) {
            location.href = '/otp-page';
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <Column1 />

            <div className="flex flex-col items-center justify-center py-20 bg-white relative">
                <a href='/' className="absolute top-10 left-10 text-gray-700 text-lg font-medium cursor-pointer">
                    &lt; Back
                </a>

                <div className="flex items-center justify-center py-20">
                    <div className="flex flex-col gap-10 md:gap-16 w-full max-w-md px-6">
                        <div className="text-center md:text-center">
                            <h1 className="text-3xl font-medium mb-2 text-gray-900">Reset Your Password</h1>
                            <p className="text-gray-700 mb-6 text-xl whitespace-nowrap">
                                An email will be sent to the email you provide
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col space-y-5 md:space-y-7 w-full">
                            <div>
                                <label htmlFor="reset-email" className="block mb-4 text-lg text-black">
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
                                <div className="flex justify-center w-full">
                                    <Button
                                        type="submit"
                                        value="Reset Password"
                                        className={`w-full ${!isEmailValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
