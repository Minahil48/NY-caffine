'use client';

import React, { useState } from 'react';
import Column1 from '../Column1';
import Button from '../Button';
import { CloseEyeIcon, EyeIcon } from '@/assets/common-icons';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValid =
    password &&
    confirmPassword &&
    password === confirmPassword &&
    password.length >= 6;

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setMessage('Please fill in both fields.');
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setMessage('Reset successfully!');
    // You can redirect or handle success logic here
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <Column1 />

      <div className="flex flex-col items-center justify-center py-20 bg-white relative">
        <a href='/otp-page' className="absolute top-10 left-10 text-gray-700 text-lg font-medium cursor-pointer">
          &lt; Back
        </a>

        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col gap-10 md:gap-16 px-6 min-w-md lg:w-[570px]">
            <div className="text-center">
              <h1 className="text-3xl mb-2 font-medium text-gray-900">Reset Password</h1>
              <p className="text-gray-700 mb-6 text-xl whitespace-nowrap">Create a new password</p>
            </div>

            <form className="flex flex-col space-y-5 md:space-y-7 w-full" onSubmit={handleReset}>
              <div className="relative">
                <label htmlFor="reset-password" className="block mb-4 text-lg text-black">
                  New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="reset-password"
                  id="reset-password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center pt-10"
                >
                  {showPassword ? EyeIcon : CloseEyeIcon}
                </button>
              </div>

              <div className="relative">
                <label htmlFor="confirm-password" className="block mb-4 text-lg text-black">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="******"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center pt-10"
                >
                  {showPassword ? EyeIcon : CloseEyeIcon}
                </button>
              </div>

              {message && (
                <p className={`text-center text-sm ${message === 'Reset successfully!' ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
              )}

              <div className="flex justify-center mt-8 w-full">
                <Button
                  type="submit"
                  value="Reset password"
                  className={`w-full ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
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
