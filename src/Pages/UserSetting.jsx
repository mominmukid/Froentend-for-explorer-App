import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  updateUserAvatar,
  updateUserBanner,
  updateUserFullname,
} from "../store/UserSlice";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

function SettingsPage() {
  const reduxUser = useSelector(getUser);
  const [localUser, setLocalUser] = useState(null);
  const dispatch = useDispatch();
  const toast = useRef(null);

  const [banner, setBanner] = useState(
    "https://source.unsplash.com/random/1600x400/?nature"
  );
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=5");
  const [fullname, setFullname] = useState("John Doe");

  const [bannerFile, setBannerFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // Loading states
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [loadingName, setLoadingName] = useState(false);

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

  // ✅ Confirm box wrapper
  const showConfirm = (message, onAccept) => {
    confirmDialog({
      message: (
        <div className="text-center text-gray-800 dark:text-gray-200">
          {message}
        </div>
      ),
      header: (
        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
          Confirmation
        </div>
      ),
      icon: "pi pi-exclamation-triangle text-yellow-500 mr-2 text-xl",
      accept: onAccept,
      rejectClassName:
        "px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400 transition",
      acceptClassName:
        "px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition",
      className:
        "rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 w-[90%] sm:w-[400px]",
      footerClassName: "flex justify-between px-4 pt-4",
    });
  };

  // Handle Avatar Update
  const handleAvatarUpdate = () => {
    if (!avatarFile)
      return toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please select a new avatar first!",
      });

    showConfirm("Are you sure you want to update your avatar?", async () => {
      try {
        setLoadingAvatar(true);
        toast.current.show({
          severity: "info",
          summary: "Uploading...",
          detail: "Updating avatar...",
        });

        const resultAction = await dispatch(updateUserAvatar(avatarFile));
        if (updateUserAvatar.fulfilled.match(resultAction)) {
          const updatedUser = resultAction.payload;
          localStorage.setItem("user", JSON.stringify(updatedUser));

          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Avatar updated successfully!",
          });

          setTimeout(() => window.location.reload(), 1000);
        } else {
          throw new Error("Update action was not fulfilled");
        }
      } catch (error) {
        console.error(error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to update avatar. Try again.",
        });
      } finally {
        setLoadingAvatar(false);
      }
    });
  };

  // Handle Banner Update
  const handleBannerUpdate = () => {
    if (!bannerFile)
      return toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please select a new banner first!",
      });

    showConfirm("Are you sure you want to update your banner?", async () => {
      try {
        setLoadingBanner(true);
        toast.current.show({
          severity: "info",
          summary: "Uploading...",
          detail: "Updating banner...",
        });

        const resultAction = await dispatch(updateUserBanner(bannerFile));
        if (updateUserBanner.fulfilled.match(resultAction)) {
          const updatedUser = resultAction.payload;
          localStorage.setItem("user", JSON.stringify(updatedUser));

          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Banner updated successfully!",
          });

          setTimeout(() => window.location.reload(), 1000);
        } else {
          throw new Error("Update action was not fulfilled");
        }
      } catch (error) {
        console.error(error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to update banner. Try again.",
        });
      } finally {
        setLoadingBanner(false);
      }
    });
  };

  // Handle Fullname Update
  const handleFullnameUpdate = () => {
    if (!fullname.trim())
      return toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Fullname cannot be empty!",
      });

    showConfirm("Are you sure you want to update your fullname?", async () => {
      try {
        setLoadingName(true);
        toast.current.show({
          severity: "info",
          summary: "Uploading...",
          detail: "Updating fullname...",
        });

        const resultAction = await dispatch(updateUserFullname(fullname.trim()));
        if (updateUserFullname.fulfilled.match(resultAction)) {
          const updatedUser = resultAction.payload;
          localStorage.setItem("user", JSON.stringify(updatedUser));

          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Fullname updated successfully!",
          });

          setTimeout(() => window.location.reload(), 1000);
        } else {
          throw new Error("Update action was not fulfilled");
        }
      } catch (error) {
        console.error(error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to update fullname. Try again.",
        });
      } finally {
        setLoadingName(false);
      }
    });
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-200 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto rounded-xl shadow-lg p-6 sm:p-10">
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
                setBannerFile(file);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <button
            onClick={handleBannerUpdate}
            disabled={loadingBanner}
            className={`mt-2 px-4 py-1 rounded-lg text-white ${
              loadingBanner
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loadingBanner ? "Uploading..." : "Update Banner"}
          </button>
        </div>

        {/* Avatar Upload */}
        <div className="mb-6 flex-1 items-center gap-4">
          <div className="relative">
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-md object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setAvatar(URL.createObjectURL(file));
                setAvatarFile(file);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
            />
          </div>
          <button
            onClick={handleAvatarUpdate}
            disabled={loadingAvatar}
            className={`px-4 py-1 rounded-lg text-white ${
              loadingAvatar
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loadingAvatar ? "Uploading..." : "Update Avatar"}
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
              disabled={loadingName}
              className={`px-4 py-1 rounded-lg text-white ${
                loadingName
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loadingName ? "Uploading..." : "Update Name"}
            </button>
          </div>
        </div>
      </div>

      {/* Global Confirm Dialog */}
      <ConfirmDialog />
      {/* Global Toast */}
      <Toast ref={toast} position="top-right" />
    </div>
  );
}

export default SettingsPage;
