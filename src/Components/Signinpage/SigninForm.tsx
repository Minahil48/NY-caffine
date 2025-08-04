'use client';

import React, { useState } from 'react';
import { CloseEyeIcon, EyeIcon } from "@/assets/common-icons";
import Column1 from '../Column1';
import Button from '../Button';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValid = email.trim() !== '' && password.trim() !== '';

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      location.href = '/dashboard';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <Column1 />

      <div className="flex flex-col items-center py-20 bg-white">
        <div className="flex flex-col gap-10 md:gap-16 w-full max-w-lg">
          <div className="text-center">
            <h1 className="text-3xl font-semibold mb-2">Welcome Back!</h1>
            <p className="text-gray-700 mb-6 text-xl">Let's Sign You In</p>
          </div>

          <form className="flex flex-col space-y-5 md:space-y-7 w-full" onSubmit={handleSignIn}>
            <div>
              <label htmlFor="email" className="block mb-4 text-md text-gray-900">
                Branch Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="branchNY@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block mb-4 text-md text-gray-900">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center pt-10"
              >
                {showPassword ? EyeIcon : CloseEyeIcon}
              </button>
            </div>

            <div className="flex justify-end text-sm mb-12">
              <a href="/forget-password" className="font-medium text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <div className="flex justify-center w-full">
              <Button
                type="submit"
                value="Sign in"
                className={`w-full ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
