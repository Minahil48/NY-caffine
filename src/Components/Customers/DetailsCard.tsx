"use client";

import { edit, leftArrow } from "@/assets/common-icons";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getCustomerById } from "@/lib/api/customer/customer";

interface DetailsCardProps {
  customerId: string;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ customerId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [ordersPlaced, setOrdersPlaced] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [canceledOrders, setCanceledOrders] = useState(0);

  const [tempContact, setTempContact] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [contactError, setContactError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const data = await getCustomerById(customerId);

        const user = data?.user || {};
        const orders = data?.orderHistory?.orders || [];

        setName(user.name || "");
        setEmail(user.email || "");
        setContact(user.phone || "");
        setJoinDate(user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "");

        setOrdersPlaced(orders.length);
        setTotalPayments(
          orders.reduce((sum: number, o: any) => sum + (o.totalPrice || 0), 0)
        );
        setCanceledOrders(orders.filter((o: any) => o.pickupStatus === "canceled").length);
      } catch (err) {
        console.error("Failed to fetch customer details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const validateContact = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 10) {
      setContactError("Please enter a valid phone number");
      return false;
    }
    setContactError("");
    return true;
  };

  const validateEmail = (value: string) => {
    const regex = /^\S+@\S+\.\S+$/;
    if (!regex.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const isContactValid = validateContact(tempContact);
      const isEmailValid = validateEmail(tempEmail);

      if (isContactValid && isEmailValid) {
        setContact(tempContact);
        setEmail(tempEmail);
        setIsEditing(false);
      }
    }
  };

  const ShimmerCard = () => (
    <div className="p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-300" />
        <div className="flex flex-col gap-2">
          <div className="h-5 w-48 bg-gray-300 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-4 w-24 bg-gray-300 rounded self-center md:self-start"></div>
            <div className="h-5 w-16 bg-gray-200 rounded self-center md:self-start"></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl w-full max-w-7xl">
      <div className="flex items-center p-6 border-b border-gray-200">
        {leftArrow}
        <h1 className="text-2xl font-semibold text-gray-800 ml-4">Details</h1>
      </div>

      {loading ? (
        <ShimmerCard />
      ) : (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image
                src="/martina.png"
                alt="Profile Avatar"
                width={70}
                height={70}
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div>
                <p className="text-lg font-medium text-gray-900">{name}</p>
                <p className="text-sm text-gray-500">Since {joinDate}</p>
              </div>
            </div>

            {/* Edit Profile button commented out */}
            {/*
            <div
              className="flex gap-1 items-center text-gray-500 text-sm font-medium cursor-pointer"
              onClick={() => {
                setIsEditing(true);
                setTempContact(contact);
                setTempEmail(email);
                setContactError("");
                setEmailError("");
              }}
            >
              {edit}
              <span>Edit Profile</span>
            </div>
            */}
          </div>

          <div className="px-0 md:px-6">
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
                      contactError
                        ? "border-red-500 text-red-600"
                        : "border-gray-300 text-gray-700"
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
                      emailError
                        ? "border-red-500 text-red-600"
                        : "border-gray-300 text-gray-700"
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

            <div className="flex flex-col">
              <p className="text-sm font-medium text-center text-gray-400">Orders Placed</p>
              <p className="text-base font-medium text-center text-gray-500 mt-1">{ordersPlaced}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-400">Payments</p>
              <p className="text-base font-medium text-gray-500 mt-1">
                ${totalPayments.toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-400">Canceled Orders</p>
              <p className="text-base font-medium text-gray-500 mt-1">{canceledOrders}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsCard;
