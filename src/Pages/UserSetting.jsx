import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUserAvatar, updateUserBanner, updateUserFullname } from "../store/UserSlice";

function SettingsPage() {
  const reduxUser = useSelector(getUser);
  const [localUser, setLocalUser] = useState(null);
  const dispatch = useDispatch();

  const [banner, setBanner] = useState("https://source.unsplash.com/random/1600x400/?nature");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=5");
  const [fullname, setFullname] = useState("John Doe");

  const [bannerFile, setBannerFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setLocalUser(JSON.parse(userData));
  }, []);

  const user = reduxUser?.user || localUser;

  // Populate form fields when user data is ready
  useEffect(() => {
    if (!user) return;
    if (user.avatar) setAvatar(user.avatar);
    if (user.fullname) setFullname(user.fullname);
    if (user.coverImage) setBanner(user.coverImage);
  }, [user]);

  // Handle Avatar Update
  const handleAvatarUpdate = async () => {
    if (!avatarFile) return alert("Please select a new avatar first!");
    const confirmed = window.confirm("Are you sure you want to update your avatar?");
    if (!confirmed) return;

    try {
      const resultAction = await dispatch(updateUserAvatar(avatarFile));

      if (updateUserAvatar.fulfilled.match(resultAction)) {
        const updatedUser = resultAction.payload; // <- this is the updated user object
        localStorage.setItem("user", JSON.stringify(updatedUser)); // save updated user
        window.location.reload();
      } else {
        throw new Error("Update action was not fulfilled");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update avatar. Try again."); // failure alert
    }
  };

  const handleBannerUpdate = async () => {
    if (!bannerFile) return alert("Please select a new Banner first!");
    const confirmed = window.confirm("Are you sure you want to update your Banner?");
    if (!confirmed) return;

    try {
      const resultAction = await dispatch(updateUserBanner(bannerFile));

      if (updateUserBanner.fulfilled.match(resultAction)) {
        const updatedUser = resultAction.payload; // <- this is the updated user object
        localStorage.setItem("user", JSON.stringify(updatedUser)); // save updated user
        window.location.reload();
      } else {
        throw new Error("Update action was not fulfilled");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update Banner. Try again."); // failure alert
    }
  };


  // Handle Fullname Update
  const handleFullnameUpdate = async () => {
    if (!fullname.trim()) return alert("Fullname cannot be empty!");
    const confirmed = window.confirm("Are you sure you want to update your fullname?");
    if (!confirmed) return;

    try {
      const resultAction = await dispatch(updateUserFullname(fullname.trim()));

      if (updateUserFullname.fulfilled.match(resultAction)) {
        const updatedUser = resultAction.payload; // <- this is the updated user object
        localStorage.setItem("user", JSON.stringify(updatedUser)); // save updated user
        window.location.reload();
      } else {
        throw new Error("Update action was not fulfilled");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update fullname. Try again."); // failure alert
    }
  };

  return (
    <div className="min-h-screen   text-gray-900 dark:text-gray-200 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto rounded-xl shadow-lg p-6 sm:p-10 ">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

        {/* Banner Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Banner Image</label>
          <div className="relative w-full h-48 md:h-60 bg-gray-200 rounded-lg overflow-hidden">
            <img src={banner} alt="Banner" className="w-full h-full object-cover" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setBanner(URL.createObjectURL(file));
                setBannerFile(file); // store actual File for backend
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <button
            onClick={handleBannerUpdate}
            className="mt-2 px-4 py-1 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700"
          >
            Update Banner
          </button>
        </div>

        {/* Avatar Upload */}
        <div className="mb-6 flex-1 items-center gap-4">
          <div className="relative">
            <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-md object-cover" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setAvatar(URL.createObjectURL(file));
                setAvatarFile(file); // store actual File for backend
              }}
              className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
            />
          </div>
          <button
            onClick={handleAvatarUpdate}
            className="px-4 py-1 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700"
          >
            Update Avatar
          </button>
        </div>

        {/* Full Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 dark:bg-gray-800"
            />
            <button
              onClick={handleFullnameUpdate}
              className="px-4 py-1 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update Name
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
