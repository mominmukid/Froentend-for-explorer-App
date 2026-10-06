import { useEffect, useState, useRef } from "react";
import { MdOutlineDashboard, MdLogout } from "react-icons/md";
import { RiLoginBoxLine, RiVideoUploadLine } from "react-icons/ri";
import { IoIosSettings, IoIosInformationCircleOutline } from "react-icons/io";
import { NavLink, useNavigate } from "react-router";
import { clearUser, logoutUser } from "../../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function ProfileBtn({ isblock, setIsblock }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [localUser, setLocalUser] = useState(null);
  const reduxUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setLocalUser(parsed?.user || parsed);
      } catch {
        setLocalUser(null);
      }
    } else {
      setLocalUser(null);
    }
  }, [reduxUser, isblock]);

  const currentUser = reduxUser?.username ? reduxUser : localUser;

  const logout = async () => {
    setIsblock(false);
    try {
      await dispatch(logoutUser());
    } catch {
      // Ignored - clear local state regardless
    }
    // Clear all auth data
    localStorage.removeItem("user");
    dispatch(clearUser());
    setLocalUser(null);
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
    });
    navigate("/");
    // Force page reload to clear any cached cookies/state
    setTimeout(() => window.location.reload(), 200);
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsblock(false);
      }
    };
    if (isblock) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isblock, setIsblock]);

  if (!isblock) return null;

  return (
    <div
      ref={dropdownRef}
      className="fixed top-15 right-3 sm:right-6 w-64 bg-white dark:bg-[#1f2327] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700/80 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 text-gray-800 dark:text-gray-100"
    >
      {/* User Header */}
      {currentUser ? (
        <div className="p-4 border-b border-gray-100 dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-800/40 flex items-center gap-3">
          <img
            src={currentUser?.avatar || "/Images/profile.png"}
            alt="Avatar"
            onError={(e) => {
              e.currentTarget.src = "/Images/profile.png";
            }}
            className="w-11 h-11 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm truncate text-gray-900 dark:text-white">
              {currentUser?.fullname || currentUser?.username}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              @{currentUser?.username || "user"}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 border-b border-gray-100 dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-800/40">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Welcome to Wideview
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Sign in to upload, like, and subscribe.
          </p>
        </div>
      )}

      {/* Navigation List */}
      <div className="py-2 flex flex-col text-sm font-medium">
        {currentUser && (
          <>
            <NavLink
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors"
              onClick={() => setIsblock(false)}
            >
              <MdOutlineDashboard className="text-xl text-blue-500" />
              <span>Creator Dashboard</span>
            </NavLink>

            <NavLink
              to="/upload"
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors"
              onClick={() => setIsblock(false)}
            >
              <RiVideoUploadLine className="text-xl text-purple-500" />
              <span>Upload Video</span>
            </NavLink>

            <NavLink
              to="/setting"
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors"
              onClick={() => setIsblock(false)}
            >
              <IoIosSettings className="text-xl text-gray-500 dark:text-gray-400" />
              <span>Settings</span>
            </NavLink>
          </>
        )}

        {!currentUser && (
          <NavLink
            to="/login"
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors text-blue-600 dark:text-blue-400 font-semibold"
            onClick={() => setIsblock(false)}
          >
            <RiLoginBoxLine className="text-xl" />
            <span>Sign In / Register</span>
          </NavLink>
        )}

        <NavLink
          to="/about"
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors"
          onClick={() => setIsblock(false)}
        >
          <IoIosInformationCircleOutline className="text-xl text-emerald-500" />
          <span>About Wideview</span>
        </NavLink>

        {currentUser && (
          <>
            <hr className="border-gray-100 dark:border-gray-700/60 my-1" />
            <button
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 cursor-pointer transition-colors w-full text-left"
              onClick={logout}
            >
              <MdLogout className="text-xl" />
              <span>Sign Out</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileBtn;
