import React from 'react'
import { useState } from 'react';
import { FaRegCirclePlay } from "react-icons/fa6";
import { NavLink } from 'react-router';
import { PiListBold } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineVideoCall } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GoSun } from "react-icons/go";
import { IoMoon } from "react-icons/io5";


function Navitems({ handelList,  handleIsBlock }) {
   cancelAnimationFrame

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
            <NavLink to="/" className='text-3xl md:text-2xl font-bold text-red-600'>
               <FaRegCirclePlay />
            </NavLink>
            <span className='font-bold text-xl text-black hidden md:block dark:text-white'>VideoTube</span>
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
            <span className='hidden dark:text-gray-200 text-[30px] w-12 h-12 rounded-full hover:bg-gray-200 hover:ring-primary-200 transition-all md:flex justify-center items-center cursor-pointer dark:hover:bg-gray-800 text-gray-800'>
               <MdOutlineVideoCall />
            </span>

            {/* Profile button */}
            <span className='text-[30px] dark:text-gray-100 lg:w-12 lg:h-12 w-fit h-fit rounded-full hover:bg-gray-200 hover:ring-primary-200 transition-all overflow-hidden flex justify-center items-center cursor-pointer dark:hover:bg-gray-800 text-gray-800' onClick={handleIsBlock}>
               <CgProfile />
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
