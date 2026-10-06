import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  updateUserFullname,
  updateUserPassword,
} from "../store/UserSlice";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { MdCameraAlt, MdImage, MdLockOutline, MdPersonOutline } from "react-icons/md";
import { UPLOAD_URL } from "../utils/apiConfig";

function SettingsPage() {
  const reduxUser = useSelector(getUser);
  const [localUser, setLocalUser] = useState(null);
  const dispatch = useDispatch();
  const toast = useRef(null);

  const [banner, setBanner] = useState("");
  const [avatar, setAvatar] = useState("/Images/profile.png");
  const [fullname, setFullname] = useState("");

  const [bannerFile, setBannerFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // Loading and Progress states
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [avatarProgress, setAvatarProgress] = useState(0);

  const [loadingBanner, setLoadingBanner] = useState(false);
  const [bannerProgress, setBannerProgress] = useState(0);

  const [loadingName, setLoadingName] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Load user from localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const data = JSON.parse(userData);
        setLocalUser(data?.user || data);
      } catch {
        setLocalUser(null);
      }
    }
  }, []);

  const user = reduxUser?.username ? reduxUser : (reduxUser?.user || localUser);

  function saveUser(updated) {
    const now = new Date();
    const item = {
      user: updated,
      expiry: now.getTime() + 24 * 60 * 60 * 1000,
    };
    localStorage.setItem("user", JSON.stringify(item));
    setLocalUser(updated);
  }

  // Populate form fields when user data is ready
  useEffect(() => {
    if (!user) return;
    if (user.avatar) setAvatar(user.avatar);
    if (user.fullname) setFullname(user.fullname);
    if (user.coverImage) setBanner(user.coverImage);
  }, [user]);

  const showConfirm = (message, onAccept) => {
    confirmDialog({
      message: (
        <div className="text-center text-gray-800 dark:text-gray-200 py-2">
          {message}
        </div>
      ),
      header: (
        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
          Confirm Changes
        </div>
      ),
      icon: "pi pi-exclamation-triangle text-amber-500 mr-2 text-xl",
      accept: onAccept,
      rejectClassName:
        "px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition",
      acceptClassName:
        "px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition",
      className:
        "rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 w-[90%] sm:w-[400px]",
      footerClassName: "flex justify-end gap-3 px-4 pt-4",
    });
  };

  const showToast = (severity, summary, detail) => {
    const severityStyles = {
      info: "bg-blue-600 text-white",
      success: "bg-emerald-600 text-white",
      warn: "bg-amber-500 text-black",
      error: "bg-red-600 text-white",
    };
    toast.current?.show({
      severity,
      summary,
      detail,
      life: 2500,
      content: (
        <div className={`p-4 rounded-xl shadow-lg ${severityStyles[severity]} flex flex-col`}>
          <span className="font-bold">{summary}</span>
          <span className="text-sm">{detail}</span>
        </div>
      ),
    });
  };

  // Handle Avatar Update with percentage progress
  const handleAvatarUpdate = () => {
    if (!avatarFile) return showToast("warn", "Warning", "Please select a new avatar image first!");
    showConfirm("Are you sure you want to update your profile photo?", () => {
      setLoadingAvatar(true);
      setAvatarProgress(0);

      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setAvatarProgress(percent);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setAvatarProgress(100);
          try {
            const res = JSON.parse(xhr.responseText);
            const updatedUser = res.data;
            saveUser(updatedUser);
            if (updatedUser?.avatar) setAvatar(updatedUser.avatar);
          } catch (err) {
            console.error(err);
          }
          setAvatarFile(null);
          showToast("success", "Success", "Profile photo updated successfully!");
        } else {
          showToast("error", "Error", "Failed to update profile photo.");
        }
        setLoadingAvatar(false);
      });

      xhr.addEventListener("error", () => {
        showToast("error", "Error", "Network error updating avatar.");
        setLoadingAvatar(false);
      });

      xhr.open("PATCH", `${UPLOAD_URL}/users/avatar`);
      xhr.withCredentials = true;
      xhr.send(formData);
    });
  };

  // Handle Banner Update with percentage progress
  const handleBannerUpdate = () => {
    if (!bannerFile) return showToast("warn", "Warning", "Please select a new banner image first!");
    showConfirm("Are you sure you want to update your channel banner?", () => {
      setLoadingBanner(true);
      setBannerProgress(0);

      const formData = new FormData();
      formData.append("coverImage", bannerFile);

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setBannerProgress(percent);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setBannerProgress(100);
          try {
            const res = JSON.parse(xhr.responseText);
            const updatedUser = res.data;
            saveUser(updatedUser);
            if (updatedUser?.coverImage) setBanner(updatedUser.coverImage);
          } catch (err) {
            console.error(err);
          }
          setBannerFile(null);
          showToast("success", "Success", "Banner image updated successfully!");
        } else {
          showToast("error", "Error", "Failed to update channel banner.");
        }
        setLoadingBanner(false);
      });

      xhr.addEventListener("error", () => {
        showToast("error", "Error", "Network error updating banner.");
        setLoadingBanner(false);
      });

      xhr.open("PATCH", `${UPLOAD_URL}/users/cover-image`);
      xhr.withCredentials = true;
      xhr.send(formData);
    });
  };

  // Handle Fullname Update
  const handleFullnameUpdate = () => {
    if (!fullname.trim()) return showToast("warn", "Warning", "Full name cannot be empty!");
    showConfirm("Are you sure you want to update your full name?", async () => {
      try {
        setLoadingName(true);
        const resultAction = await dispatch(updateUserFullname(fullname.trim()));
        if (updateUserFullname.fulfilled.match(resultAction)) {
          const updatedUser = resultAction.payload;
          saveUser(updatedUser);
          showToast("success", "Success", "Full name updated successfully!");
        } else {
          throw new Error("Update failed");
        }
      } catch (error) {
        console.error(error);
        showToast("error", "Error", "Failed to update full name. Please try again.");
      } finally {
        setLoadingName(false);
      }
    });
  };

  // Handle Password Update
  const handlePasswordUpdate = () => {
    if (!oldPassword || !newPassword) {
      return showToast("warn", "Warning", "Both current and new passwords are required!");
    }
    if (newPassword.length < 6) {
      return showToast("warn", "Warning", "New password must be at least 6 characters!");
    }
    showConfirm("Are you sure you want to change your password?", async () => {
      try {
        setLoadingPassword(true);
        const resultAction = await dispatch(updateUserPassword({ newPassword, oldPassword }));
        if (updateUserPassword.fulfilled.match(resultAction)) {
          showToast("success", "Success", "Password changed successfully!");
          setOldPassword("");
          setNewPassword("");
        } else {
          throw new Error("Password update failed");
        }
      } catch (error) {
        console.error(error);
        showToast("error", "Error", "Failed to change password. Check your current password.");
      } finally {
        setLoadingPassword(false);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto pt-6 pb-16 px-4">
      <Toast ref={toast} position="top-right" />
      <ConfirmDialog />

      <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
        Account Settings
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Manage your profile details, channel banner, and account security
      </p>

      <div className="space-y-8">
        {/* Banner Section */}
        <div className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-3xl p-6 shadow-xs">
          <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
            <MdImage className="text-blue-500 text-xl" />
            Channel Banner
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Upload a banner image to customize your channel header
          </p>

          <div className="relative w-full h-40 sm:h-48 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 mb-4 border border-gray-200 dark:border-gray-700 group">
            <img
              src={banner || "/Images/alt.avif"}
              alt="Channel Banner"
              onError={(e) => {
                e.currentTarget.src = "/Images/alt.avif";
              }}
              className="w-full h-full object-cover"
            />
            <label className="absolute inset-0 bg-black/40 hover:bg-black/60 flex items-center justify-center cursor-pointer transition text-white gap-2 font-medium text-sm">
              <MdCameraAlt className="text-2xl" />
              <span>Change Banner</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setBanner(URL.createObjectURL(file));
                    setBannerFile(file);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>

          {loadingBanner && (
            <div className="mb-3 space-y-1">
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span>Uploading banner...</span>
                <span>{bannerProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-200"
                  style={{ width: `${bannerProgress}%` }}
                />
              </div>
            </div>
          )}

          {bannerFile && (
            <div className="flex justify-end">
              <button
                onClick={handleBannerUpdate}
                disabled={loadingBanner}
                className="px-5 py-2 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] hover:opacity-95 transition disabled:opacity-50 cursor-pointer"
              >
                {loadingBanner ? `Uploading ${bannerProgress}%...` : "Save Banner"}
              </button>
            </div>
          )}
        </div>

        {/* Profile Details (Avatar & Fullname) */}
        <div className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-3xl p-6 shadow-xs">
          <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
            <MdPersonOutline className="text-purple-500 text-xl" />
            Profile Information
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            Update your public profile photo and display name
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shrink-0">
              <img
                src={avatar || "/Images/profile.png"}
                alt="Profile"
                onError={(e) => {
                  e.currentTarget.src = "/Images/profile.png";
                }}
                className="w-full h-full object-cover"
              />
              <label className="absolute inset-0 bg-black/40 hover:bg-black/60 flex items-center justify-center cursor-pointer transition text-white">
                <MdCameraAlt className="text-xl" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setAvatar(URL.createObjectURL(file));
                      setAvatarFile(file);
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex-1 w-full space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Enter your name"
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleFullnameUpdate}
                    disabled={loadingName}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold disabled:opacity-50 transition cursor-pointer"
                  >
                    {loadingName ? "Saving..." : "Update Name"}
                  </button>
                </div>
              </div>

              {loadingAvatar && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <span>Uploading photo...</span>
                    <span>{avatarProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-200"
                      style={{ width: `${avatarProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {avatarFile && (
                <button
                  onClick={handleAvatarUpdate}
                  disabled={loadingAvatar}
                  className="px-4 py-2 rounded-xl text-white text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 transition disabled:opacity-50 cursor-pointer"
                >
                  {loadingAvatar ? `Uploading ${avatarProgress}%...` : "Save New Photo"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Password Security */}
        <div className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-3xl p-6 shadow-xs">
          <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
            <MdLockOutline className="text-red-500 text-xl" />
            Security & Password
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            Ensure your account is using a strong, secret password
          </p>

          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min. 6 characters)"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handlePasswordUpdate}
              disabled={loadingPassword}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold disabled:opacity-50 transition cursor-pointer shadow-xs"
            >
              {loadingPassword ? "Changing Password..." : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
