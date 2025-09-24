import { MdOutlineDashboard, MdLogout } from "react-icons/md";
import { RiLoginBoxLine } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { NavLink } from "react-router";
import { clearUser } from '../../store/UserSlice';
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

function ProfileBtn({ isblock, setIsblock }) {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("user");
    dispatch(clearUser());
    setIsblock(false);
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsblock(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsblock]);

  return (
    <div ref={dropdownRef}>
      <li
        className={`${isblock ? "block" : "hidden"} fixed top-15 right-4 sm:right-36 lg:right-42 rounded-[20px] overflow-hidden h-fit min-w-[40%] sm:min-w-[13%] bg-white flex flex-col justify-start border-gray-300 border-1 pb-1`}
      >
        <NavLink
          to="/dashboard"
          className="w-full pl-4 py-2 gap-3 flex justify-start items-center hover:bg-gray-200 cursor-pointer"
          onClick={() => setIsblock(false)}
        >
          <span className="text-[23px] font-extrabold">
            <MdOutlineDashboard />
          </span>
          <span className="text-[18px] font-semibold">Dashboard</span>
        </NavLink>

        <NavLink
          to="/login"
          className="w-full pl-4 py-2 gap-3 flex justify-start items-center hover:bg-gray-200 cursor-pointer"
          onClick={() => setIsblock(false)}
        >
          <span className="text-[23px] font-extrabold">
            <RiLoginBoxLine />
          </span>
          <span className="text-[18px] font-semibold">Login</span>
        </NavLink>

        <NavLink
          to="/setting"
          className="w-full pl-4 py-2 gap-3 flex justify-start items-center hover:bg-gray-200 cursor-pointer"
          onClick={() => setIsblock(false)}
        >
          <span className="text-[23px] font-extrabold">
            <IoIosSettings />
          </span>
          <span className="text-[18px] font-semibold">Setting</span>
        </NavLink>

        <hr className="text-gray-400 mt-2" />
        <ul
          className="w-full pl-4 py-2 gap-3 flex justify-start items-center hover:bg-gray-200 cursor-pointer"
          onClick={logout}
        >
          <span className="text-[25px] text-red-600 font-extrabold">
            <MdLogout />
          </span>
          <span className="text-[18px] font-semibold text-red-600">
            Logout
          </span>
        </ul>
      </li>
    </div>
  );
}

export default ProfileBtn;
