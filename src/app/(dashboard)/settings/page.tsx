"use client";

import { CloseEyeIcon, edit, EyeIcon } from "@/assets/common-icons";
import { useState, useEffect } from "react";
import Image from "next/image";
import { GetCurrentUser, UpdateUserDetails, ChangePassword } from "@/lib/api/auth/settings/settings";

const Page = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [formData, setFormData] = useState<any>({
    _id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    isActive: true,
    extra: { rewardPoints: 0, currentRedeemedReward: null, rewardHistory: [], image: null },
  });
  const [tempFormData, setTempFormData] = useState({ name: "", email: "", phone: "" });
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [passwordError, setPasswordError] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await GetCurrentUser();
        if (res.success && res.user) {
          const user = res.user;
          setFormData(user);
          setTempFormData({ name: user.name, email: user.email, phone: user.phone });
          setSelectedImage(user.extra?.image || null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return alert("No file selected.");
    if (!file.type.startsWith("image/")) return alert("Please upload a valid image file.");
    if (file.size >= 1024 * 1024) return alert("Image must be smaller than 1MB.");

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    try {
      const updatedData = {
        ...formData,
        name: tempFormData.name,
        email: tempFormData.email,
        phone: tempFormData.phone,
        extra: { ...formData.extra, image: selectedImage },
      };
      const res = await UpdateUserDetails(formData._id, updatedData);
      if (res.success) {
        setFormData(res.data);
        setTempFormData({ name: res.data.name, email: res.data.email, phone: res.data.phone });
        setProfileMessage(res.message);
        setEditProfile(false);
        setTimeout(() => setProfileMessage(""), 3000);
      }
    } catch (err) {
      console.error("Profile update error:", err);
    }
  };

  const handleSavePassword = async () => {
  if (passwords.new.length < 6) return setPasswordError("Password must be at least 6 characters.");
  if (passwords.new !== passwords.confirm) return setPasswordError("Passwords do not match.");
  setPasswordError("");

  try {
    const res = await ChangePassword(passwords.old, passwords.new);
    alert(res.message);
    setPasswords({ old: "", new: "", confirm: "" });
    setIsChangingPassword(false);
  } catch (err: any) {
    console.error(err);
    setPasswordError(err.message || "Failed to change password.");
  }
};


  const handleDisable = async () => {
    if (!confirm("Are you sure you want to disable your account? This action cannot be undone.")) return;
    alert("Account disabled successfully!"); // Replace with actual API call
  };

  return (
    <div className="flex bg-gray-100 p-2">
      {/* Sidebar */}
      <div className="w-1/4 bg-white rounded-lg p-6 h-fit">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">{formData.name || "Loading..."}</h2>
            <p className="text-sm text-gray-500">{formData.email || "Loading..."}</p>
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
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
          <div className="bg-blue-50 text-blue-800 border border-blue-200 rounded-lg p-3 text-sm text-center">
            <p>Upload avatar. Larger image will be resized automatically</p>
            <p className="mt-1">Maximum size is 1MB</p>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Joined on {formData.createdAt ? new Date(formData.createdAt).toLocaleDateString() : "Loading..."}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="w-3/4 ml-8 bg-white rounded-lg p-8">
        {/* Profile Info */}
        <div className="flex justify-between items-center pb-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Profile Information</h1>
          {!editProfile && (
            <button
              onClick={() => setEditProfile(true)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {edit} Edit Profile
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
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                editProfile ? "bg-white" : "bg-gray-50 cursor-not-allowed text-gray-600"
              }`}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={tempFormData.email}
              onChange={(e) => setTempFormData({ ...tempFormData, email: e.target.value })}
              readOnly={!editProfile}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                editProfile ? "bg-white" : "bg-gray-50 cursor-not-allowed text-gray-600"
              }`}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              value={tempFormData.phone}
              onChange={(e) => setTempFormData({ ...tempFormData, phone: e.target.value })}
              readOnly={!editProfile}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                editProfile ? "bg-white" : "bg-gray-50 cursor-not-allowed text-gray-600"
              }`}
            />
          </div>
        </div>

        {editProfile && (
          <div className="flex space-x-2 pt-4">
            <button
              onClick={() => {
                setTempFormData({ name: formData.name, email: formData.email, phone: formData.phone });
                setEditProfile(false);
              }}
              className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button onClick={handleSaveProfile} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              Save
            </button>
          </div>
        )}
        {profileMessage && <p className="text-green-600 mt-2 text-sm">{profileMessage}</p>}

        {/* Password Section */}
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
                  className="bg-gray-100 text-gray-700 cursor-pointer font-medium py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  Reset Password
                </button>
              )}
            </div>

            {isChangingPassword && (
              <div className="mt-4 space-y-4 max-w-md relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Old Password"
                  value={passwords.old}
                  onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2 right-2 cursor-pointer"
                >
                  {showPassword ? EyeIcon : CloseEyeIcon}
                </button>
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
                    className="bg-blue-500 text-white py-2 cursor-pointer px-4 rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Disable Account */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-red-600">Disable Account</h3>
              <p className="text-sm text-gray-500">All the data will be lost. Non-revertible action</p>
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
