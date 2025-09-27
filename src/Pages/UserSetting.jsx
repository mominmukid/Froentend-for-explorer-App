import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  updateUserAvatar,
  updateUserBanner,
  updateUserFullname,
  updateUserPassword,
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
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

  // Toast helper
  const showToast = (severity, summary, detail) => {
    const severityStyles = {
      info: "bg-blue-600 text-white",
      success: "bg-green-600 text-white",
      warn: "bg-yellow-500 text-black",
      error: "bg-red-600 text-white",
    };
    toast.current.show({
      severity,
      summary,
      detail,
      life: 2500,
      content: (
        <div
          className={`px-10 py-4 mb-5 w-72 rounded-lg shadow-md ${severityStyles[severity]} flex flex-col flex-wrap`}
        >
          <span className="font-bold">{summary}</span>
          <span className="text-sm">{detail}</span>
        </div>
      ),
    });
  };

  // Handle Avatar Update
  const handleAvatarUpdate = () => {
    if (!avatarFile) return showToast("warn", "Warning", "Please select a new avatar first!");
    showConfirm("Are you sure you want to update your avatar?", async () => {
      try {
        setLoadingAvatar(true);
        showToast("info", "Uploading...", "Updating avatar...");

        const resultAction = await dispatch(updateUserAvatar(avatarFile));
        if (updateUserAvatar.fulfilled.match(resultAction)) {
          const updatedUser = resultAction.payload;
          localStorage.setItem("user", JSON.stringify(updatedUser));

          showToast("success", "Success", "Avatar updated successfully!");
          setTimeout(() => window.location.reload(), 1000);
        } else {
          throw new Error("Update action was not fulfilled");
        }
      } catch (error) {
        console.error(error);
        showToast("error", "Error", "Failed to update avatar. Try again.");
      } finally {
        setLoadingAvatar(false);
      }
    });
  };

  // Handle Banner Update
  const handleBannerUpdate = () => {
    if (!bannerFile) return showToast("warn", "Warning", "Please select a new banner first!");
    showConfirm("Are you sure you want to update your banner?", async () => {
      try {
        setLoadingBanner(true);
        showToast("info", "Uploading...", "Updating banner...");

        const resultAction = await dispatch(updateUserBanner(bannerFile));
        if (updateUserBanner.fulfilled.match(resultAction)) {
          const updatedUser = resultAction.payload;
          localStorage.setItem("user", JSON.stringify(updatedUser));

          showToast("success", "Success", "Banner updated successfully!");
          setTimeout(() => window.location.reload(), 1000);
        } else {
          throw new Error("Update action was not fulfilled");
        }
      } catch (error) {
        console.error(error);
        showToast("error", "Error", "Failed to update banner. Try again.");
      } finally {
        setLoadingBanner(false);
      }
    });
  };

  // Handle Fullname Update
  const handleFullnameUpdate = () => {
    if (!fullname.trim()) return showToast("warn", "Warning", "Fullname cannot be empty!");
    showConfirm("Are you sure you want to update your fullname?", async () => {
      try {
        setLoadingName(true);
        showToast("info", "Uploading...", "Updating fullname...");

        const resultAction = await dispatch(updateUserFullname(fullname.trim()));
        if (updateUserFullname.fulfilled.match(resultAction)) {
          const updatedUser = resultAction.payload;
          localStorage.setItem("user", JSON.stringify(updatedUser));

          showToast("success", "Success", "Fullname updated successfully!");
          setTimeout(() => window.location.reload(), 1000);
        } else {
          throw new Error("Update action was not fulfilled");
        }
      } catch (error) {
        console.error(error);
        showToast("error", "Error", "Failed to update fullname. Try again.");
      } finally {
        setLoadingName(false);
      }
    });
  };



  // Handle Password Update
  const handlePasswordUpdate = () => {
    if (!oldPassword || !newPassword) {
      return showToast("warn", "Warning", "Both fields are required!");
    }
    showConfirm("Are you sure you want to change your password?", async () => {
      try {
        setLoadingPassword(true);
        showToast("info", "Processing...", "Updating password...");

        // await updatePasswordAPI(oldPassword, newPassword);
        const resultAction = await dispatch(updateUserPassword({ newPassword, oldPassword }));
        if (updateUserPassword.fulfilled.match(resultAction)) {
          showToast("success", "Success", "Password updated successfully!");
          setOldPassword("");
          setNewPassword("");
        }
      } catch (error) {
        console.error(error);
        showToast("error", "Error", "Failed to update password. Try again.");
      } finally {
        setLoadingPassword(false);
      }
    });
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-200 p-4 sm:p-8">
      <div className="max-w-7xl sm:max-w-3xl mx-auto rounded-xl p-1 sm:p-10 ">
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
            className={`mt-2 px-4 py-1 rounded-lg text-white ${loadingBanner
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loadingBanner ? "Uploading..." : "Update Banner"}
          </button>
        </div>

        {/* Avatar Upload */}
        <div className="mb-6 flex-1 gap-1 items-center gap-4">
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
            className={`px-4 py-1 rounded-lg text-white ${loadingAvatar
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
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 dark:bg-gray-800 min-w-40"
            />
            <button
              onClick={handleFullnameUpdate}
              disabled={loadingName}
              className={`px-4 py-1 rounded-lg text-white ${loadingName
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loadingName ? "Uploading..." : "Update Name"}
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Change Password</label>
          <div className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 dark:bg-gray-800"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 dark:bg-gray-800"
            />
            <button
              onClick={handlePasswordUpdate}
              disabled={loadingPassword}
              className={`px-4 py-1 rounded-lg text-white ${loadingPassword
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loadingPassword ? "Updating..." : "Update Password"}
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
