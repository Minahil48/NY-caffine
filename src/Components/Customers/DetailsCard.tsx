'use client'

import { edit, leftArrow } from '@/assets/common-icons';
import React, { useState } from 'react';
import Image from 'next/image';

const DetailsCard: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [contact, setContact] = useState('+99 778 89023715');
  const [email, setEmail] = useState('martha@gmail.com');

  const [tempContact, setTempContact] = useState(contact);
  const [tempEmail, setTempEmail] = useState(email);

  const [contactError, setContactError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateContact = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10) {
      setContactError('Please enter a valid phone number');
      return false;
    }
    setContactError('');
    return true;
  };

  const validateEmail = (value: string) => {
    const regex = /^\S+@\S+\.\S+$/;
    if (!regex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isContactValid = validateContact(tempContact);
      const isEmailValid = validateEmail(tempEmail);

      if (isContactValid && isEmailValid) {
        setContact(tempContact);
        setEmail(tempEmail);
        setIsEditing(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl w-full max-w-7xl">
      <div className="flex items-center p-6 border-gray-200">
        {leftArrow}
        <h1 className="text-2xl font-semibold text-gray-800 ml-4">Details</h1>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/martina.png"
              alt="Profile Avatar"
              width={70}
              height={70}
              className="w-16 h-16 rounded-full mr-4 object-cover"
            />
            <div>
              <p className="text-lg font-medium text-gray-900">Martina Roisse</p>
              <p className="text-sm text-gray-500">Since 24 May, 2024</p>
            </div>
          </div>
          <div
            className="flex gap-1 items-center text-gray-500 text-sm font-medium cursor-pointer"
            onClick={() => {
              setIsEditing(true);
              setTempContact(contact);
              setTempEmail(email);
              setContactError('');
              setEmailError('');
            }}
          >
            {edit}
            <span>Edit Profile</span>
          </div>
        </div>
      </div>

      <div className="px-6">
        <hr className="border-gray-200" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 text-center md:text-left">

        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-400">Contact</p>
          {isEditing ? (
            <>
              <input
                type="text"
                value={tempContact}
                onChange={(e) => setTempContact(e.target.value)}
                onKeyDown={handleKeyPress}
                className={`text-base font-medium mt-1 border-b px-1 focus:outline-none ${
                  contactError ? 'border-red-500 text-red-600' : 'border-gray-300 text-gray-700'
                }`}
              />
              {contactError && (
                <span className="text-sm text-red-600 mt-1">{contactError}</span>
              )}
            </>
          ) : (
            <p className="text-base font-medium text-gray-500 mt-1">{contact}</p>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-400">Email</p>
          {isEditing ? (
            <>
              <input
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                onKeyDown={handleKeyPress}
                className={`text-base font-medium mt-1 border-b px-1 focus:outline-none ${
                  emailError ? 'border-red-500 text-red-600' : 'border-gray-300 text-gray-700'
                }`}
              />
              {emailError && (
                <span className="text-sm text-red-600 mt-1">{emailError}</span>
              )}
            </>
          ) : (
            <p className="text-base font-medium text-gray-500 mt-1">{email}</p>
          )}
        </div>

        {/* Static Fields */}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-400">Orders Placed</p>
          <p className="text-base font-medium text-gray-500 mt-1">12</p>
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-400">Payments</p>
          <p className="text-base font-medium text-gray-500 mt-1">$6710.08</p>
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-400">Canceled Orders</p>
          <p className="text-base font-medium text-gray-500 mt-1">15</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
