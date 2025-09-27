
import { useEffect, useState } from 'react';
import { FaRegCirclePlay } from "react-icons/fa6";
import { NavLink } from 'react-router';
import { PiListBold } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineVideoCall } from "react-icons/md";
import { GoSun } from "react-icons/go";
import { IoMoon } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { getUser } from '../../store/UserSlice';
import AltImage from '../../../public/Images/profile.png'

function Navitems({ handelList, handleIsBlock }) {

   const reduxUser = useSelector(getUser);
   const userStatus = useSelector((state) => state.user.userStatus)
   const [localUser, setLocalUser] = useState(null);

   useEffect(() => {
      const userData = localStorage.getItem("user");
      if (userData) {
         setLocalUser(JSON.parse(userData));
      }

   }, [reduxUser, userStatus]); // 👈 rerun when reduxUser changes

   const user = reduxUser?.user || localUser;
   // ✅ Dark mode state
   const [isDark, setisDark] = useState(false);

   // ✅ Toggle dark/light mode
   const hanelDark = () => {
      if (isDark) {
         document.documentElement.classList.remove("dark");
         document.documentElement.classList.add("light"); // ⚠️ not needed, Tailwind only cares about "dark"
         setisDark(!isDark);
      } else {
         document.documentElement.classList.remove("light");
         document.documentElement.classList.add("dark");
         setisDark(!isDark);
      }
   }

   return (
      <>
         {/* Left: Logo + mobile menu toggle */}
         <div className='w-fit h-full flex justify-center items-center gap-2 '>
            {/* Hamburger icon for mobile */}
            <div className='md:hidden cursor-pointer text-xl dark:text-white' onClick={handelList}>
               <PiListBold />
            </div>

            {/* Logo */}
            <NavLink to="/" className='text-3xl md:text-2xl font-bold text-red-600 w-10 h-10'>
               <img src="public/Images/logo.png" alt="public/Images/logo.png" className='w-full h-full' />
            </NavLink>
            <span className='font-bold text-xl text-black hidden md:block dark:text-white font-serif italic'>Wideview</span>
         </div>

         {/* Middle: Search bar */}
         <div className='w-[50%] px-4 rounded-full outline-none border-gray-600 border-1 overflow-hidden h-[70%] flex justify-between items-center dark:text-white'>
            <input
               type="text"
               placeholder='Search videos..'
               className='outline-none w-[95%]'
            />
            <span className='text-xl hidden sm:block'>
               <IoMdSearch />
            </span>
         </div>

         {/* Right: Action buttons */}
         <div className='w-[20%] md:w-[20%] h-full flex justify-evenly items-center dark:text-white'>

            {/* Upload button (desktop only) */}
            <NavLink to="/upload" className='hidden dark:text-gray-200 text-[30px] w-12 h-12 rounded-full hover:bg-gray-200 hover:ring-primary-200 transition-all md:flex justify-center items-center cursor-pointer dark:hover:bg-gray-800 text-gray-800'>
               <MdOutlineVideoCall />
            </NavLink>

            {/* Profile button */}
            <span
               className='text-[30px] dark:text-gray-100 lg:w-12 lg:h-12 w-fit h-fit rounded-full hover:bg-gray-200 hover:ring-primary-200 transition-all overflow-hidden flex justify-center items-center cursor-pointer dark:hover:bg-gray-800 text-gray-800'
               onClick={handleIsBlock}
            >
               {user && user?.avatar ? (
                  <img src={user?.avatar} alt="public/Images/profile.png" className='w-10 h-10 object-cover dark:bg-gray-600' />
               ) : (
                  <img src={AltImage} alt={AltImage} className='w-10 h-10 object-cover dark:bg-gray-600' />
               )}
            </span>


            {/* Dark/Light mode toggle */}
            <span
               className={`text-[25px] lg:w-12 lg:h-12 w-fit h-fit rounded-full hover:bg-gray-200 hover:ring-primary-200 transition-all overflow-hidden dark:hover:bg-gray-800 flex justify-center items-center cursor-pointer ${!isDark ? "text-gray-800" : "text-gray-100"}`}
               onClick={hanelDark}
            >
               {isDark ? <GoSun /> : <IoMoon />}
            </span>
         </div>
      </>
   )
}

export default Navitems
