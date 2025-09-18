import React, { useState } from "react";

function SettingsPage() {
  const [banner, setBanner] = useState("https://source.unsplash.com/random/1600x400/?nature");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=5");
  const [fullname, setFullname] = useState("John Doe");

  // Handle Banner Upload
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(URL.createObjectURL(file));
    }
  };

  // Handle Avatar Upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  // Handle Save Changes
  const handleSave = () => {
    alert(`Profile Updated!\nName: ${fullname}`);
    // here you can call your API to save user data
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-200 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-10">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

        {/* Banner Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Banner Image | click to change
          </label>
          <div className="relative w-full h-48 md:h-60 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={banner}
              alt=""
              className="w-full h-full object-cover bg-gradient-to-r from-blue-500 to-purple-600"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Avatar Upload */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative">
            <img
              src={avatar}
              alt="Avatar Preview"
              className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-md object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Profile Picture
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Click the image to change avatar
            </p>
          </div>
        </div>

        {/* Full Name */}
        <div className="mb-6">
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter your full name"
            className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
