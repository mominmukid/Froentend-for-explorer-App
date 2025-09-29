import { useEffect, useState, useRef } from "react";
import { MdOutlineDashboard, MdLogout } from "react-icons/md";
import { RiLoginBoxLine } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { NavLink } from "react-router";
import { clearUser, logoutUser } from '../../store/UserSlice';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function ProfileBtn({ isblock, setIsblock }) {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [localUser, setLocalUser] = useState(null);

  const logout = async () => {
    localStorage.removeItem("user");
    dispatch(clearUser());
    setIsblock(false);
    const resultAction = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(resultAction)) {
      toast.success("Logout successfully", { position: "top-right", autoClose: 1000, theme: "dark" });
      window.location.reload();
    } else {
      toast.error("Logout failed", { position: "top-right", autoClose: 2000, theme: "dark" });
      throw new Error("Logout failed");
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setLocalUser(JSON.parse(userData));
  }, [dispatch]);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsblock(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsblock]);

  return (
    <div ref={dropdownRef}>
      <li
        className={`${isblock ? "block" : "hidden"} fixed top-16 right-4 sm:right-36 lg:right-42 rounded-2xl overflow-hidden min-w-[40%] sm:min-w-[13%] bg-white  flex flex-col border border-gray-300 dark:border-gray-700 shadow-lg`}
      >
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={`${localUser ? "flex" : "hidden"} items-center gap-3 px-4 py-2 hover:bg-gray-200  transition`}
          onClick={() => setIsblock(false)}
        >
          <MdOutlineDashboard className="text-[23px]" />
          <span className="text-[16px] font-semibold">Dashboard</span>
        </NavLink>

        {/* Login */}
        <NavLink
          to="/login"
          className={`${!localUser ? "flex" : "hidden"} items-center gap-3 px-4 py-2 hover:bg-gray-200 transition`}
          onClick={() => setIsblock(false)}
        >
          <RiLoginBoxLine className="text-[23px]" />
          <span className="text-[16px] font-semibold">Login</span>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/setting"
          className={`${localUser ? "flex" : "hidden"} items-center gap-3 px-4 py-2 hover:bg-gray-200  transition`}
          onClick={() => setIsblock(false)}
        >
          <IoIosSettings className="text-[23px]" />
          <span className="text-[16px] font-semibold">Settings</span>
        </NavLink>

        {/* About */}
        <NavLink
          to="/about"
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200  transition"
          onClick={() => setIsblock(false)}
        >
          <span className="text-[23px] font-bold text-gray-900  pl-2">i</span>
          <span className="text-[16px] font-semibold">About Us</span>
        </NavLink>

        <hr className="border-gray-300 dark:border-gray-700 my-2" />

        {/* Logout */}
        <ul
          className={`${localUser ? "flex" : "hidden"} items-center gap-3 px-4 py-2 hover:bg-red-100 cursor-pointer transition`}
          onClick={logout}
        >
          <MdLogout className="text-[23px] text-red-600" />
          <span className="text-[16px] font-semibold text-red-600">Logout</span>
        </ul>
      </li>
    </div>
  );
}

export default ProfileBtn;
