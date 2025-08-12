"use client";

import { CloseEyeIcon, edit, EyeIcon } from "@/assets/common-icons";
import { useState } from "react";
import Image from "next/image";

const Page = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: "Amna",
    email: "amnaemad@gmail.com",
    phone: "+44 768 8876220",
  });

  const [tempFormData, setTempFormData] = useState({ ...formData });
  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("No file selected.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    if (file.size >= 1024 * 1024) {
      alert("Image must be smaller than 1MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setSelectedImage(result);
      } else {
        alert("Failed to load image.");
      }
    };

    reader.onerror = () => {
      alert("Error reading image.");
    };

    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    setFormData({ ...tempFormData });
    setEditProfile(false);
    setProfileMessage("Profile updated successfully!");
    setTimeout(() => setProfileMessage(""), 3000);
  };

  const handleSavePassword = () => {
    if (passwords.new.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    alert("Password changed successfully!");
    setPasswords({ old: "", new: "", confirm: "" });
    setIsChangingPassword(false);
  };

  const handleDisable = () => {
    if (confirm("Are you sure you want to disable your account? This cannot be undone.")) {
      alert("Account disabled.");
    }
  };

  return (
        <div className="flex bg-gray-100 p-2">
          <div className="w-1/4 bg-white rounded-lg p-6 h-fit">
            <div className="flex flex-col items-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">{formData.name}</h2>
                <p className="text-sm text-gray-500">{formData.email}</p>
              </div>
              <div className="my-6 relative">
                <Image
                  src={selectedImage || "/profile.svg"}
                  alt="profile image"
                  width={90}
                  height={90}
                  className="rounded-full"
                />
              </div>
              <label className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm mb-4 hover:bg-gray-50 transition-colors cursor-pointer">
                Upload New Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <div className="bg-blue-50 text-blue-800 border border-blue-200 rounded-lg p-3 text-sm text-center">
                <p>Upload avatar. Larger image will be resized automatically</p>
                <p className="mt-1">Maximum size is 1MB</p>
              </div>
              <p className="text-sm text-gray-500 mt-6">Joined on 29 September, 2025</p>
            </div>
          </div>


          <div className="w-3/4 ml-8 bg-white rounded-lg p-8">

            <div className="flex justify-between items-center pb-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-800">Profile Information</h1>
              {!editProfile && (
                <button
                  onClick={() => setEditProfile(true)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {edit}
                  Edit Profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  value={tempFormData.name}
                  onChange={(e) => setTempFormData({ ...tempFormData, name: e.target.value })}
                  readOnly={!editProfile}
                  className={`w-full px-4 py-2 border ${editProfile ? "bg-white" : "bg-gray-50 cursor-not-allowed text-gray-600"
                    } border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={tempFormData.email}
                  onChange={(e) => setTempFormData({ ...tempFormData, email: e.target.value })}
                  readOnly={!editProfile}
                  className={`w-full px-4 py-2 border ${editProfile ? "bg-white" : "bg-gray-50 cursor-not-allowed text-gray-600"
                    } border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  value={tempFormData.phone}
                  onChange={(e) => setTempFormData({ ...tempFormData, phone: e.target.value })}
                  readOnly={!editProfile}
                  className={`w-full px-4 py-2 border ${editProfile ? "bg-white" : "bg-gray-50 cursor-not-allowed text-gray-600"
                    } border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>
            </div>

            {editProfile && (
              <div className="flex space-x-2 pt-4">
                <button
                  onClick={() => {
                    setTempFormData({ ...formData });
                    setEditProfile(false);
                  }}
                  className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            )}

            {profileMessage && (
              <p className="text-green-600 mt-2 text-sm">{profileMessage}</p>
            )}

            {/* Password */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800">Account Settings</h2>
              <div className="mt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Change Password</h3>
                    <p className="text-sm text-gray-500">
                      You will be logged out of all active sessions. Re-login required.
                    </p>
                  </div>
                  {!isChangingPassword && (
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                    >
                      Reset Password
                    </button>
                  )}
                </div>

                {isChangingPassword && (
                  <div className="mt-4 space-y-4 max-w-md">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Old Password"
                      value={passwords.old}
                      onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute cursor-pointer inset-y-0 right-115 -bottom-103 pr-3 flex items-center pt-10"
                    >
                      {showPassword ? EyeIcon : CloseEyeIcon}
                    </button>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="New Password"
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />

                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setIsChangingPassword(false)}
                        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSavePassword}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Disable */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-red-600">Disable Account</h3>
                  <p className="text-sm text-gray-500">
                    All the data will be lost. Non-revertible action
                  </p>
                </div>
                <button
                  onClick={handleDisable}
                  className="bg-white border border-red-300 text-red-500 font-medium py-2 px-4 rounded-lg hover:bg-red-50"
                >
                  Disable Account
                </button>
              </div>
            </div>

          </div>
        </div>
  );
};

export default Page;
