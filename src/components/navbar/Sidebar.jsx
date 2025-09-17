import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";
import { IoMdHome } from "react-icons/io";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";

function Sidebar({
   cancle,
   handelList,

}) {

   return (
      <>
         <div className={`${cancle ? 'hidden' : 'block'} md:hidden fixed top-0 left-0 h-screen w-[60%] sm:w-[25%] bg-white/90 flex flex-col justify-start pt-12   gap-5 items-center1 border-r-2 border-gray-400 dark:bg-[#202222]`}>
            {/* for home for mobile screen */}
            <NavLink to="/" className='w-full hover:bg-gray-300  cursor-pointer rounded-full flex justify-start pl-5  gap-2 p-2 transition  duration-100 ease-in-out dark:text-white dark:hover:bg-gray-800   '><span className='flex justify-center items-center text-xl '><IoMdHome /> </span> <span className='font-bold '>Home</span></NavLink>

            {/* for playlist for mobile screen */}
            <NavLink to="/playlist" className='w-full hover:bg-gray-300  cursor-pointer rounded-full flex justify-start pl-5  gap-2 p-2 transition duration-200 ease-in-out dark:text-white dark:hover:bg-gray-800'><span className='flex justify-center items-center text-2xl'><MdOutlinePlaylistPlay /> </span> <span className='font-bold '>playlists</span></NavLink>
            {/* for History for mobile screen */}
            <NavLink to="/playlist" className='w-full hover:bg-gray-300  cursor-pointer rounded-full flex justify-start pl-5  gap-2 p-2 transition  duration-200 ease-in-out dark:text-white dark:hover:bg-gray-800'><span className='flex justify-center items-center text-xl'><FaHistory /> </span> <span className='font-bold '>History</span></NavLink>
            {/* for Subscription for mobile screen */}
            <NavLink to="/playlist" className='w-full hover:bg-gray-200  cursor-pointer rounded-full flex justify-start pl-5  gap-2 p-2 transition duration-300 ease-in-out dark:text-white dark:hover:bg-gray-800'><span className='flex justify-center items-center text-xl'>< MdSubscriptions /> </span> <span className='font-bold '>Subsciption</span></NavLink>
            {/* for liked for mobile screen */}
            <NavLink to="/playlist" className='w-full hover:bg-gray-200  cursor-pointer rounded-full flex justify-start pl-5  gap-2 p-2 transition duration-300 ease-in-out dark:text-white dark:hover:bg-gray-800'><span className='flex justify-center items-center text-xl'><AiOutlineLike /> </span> <span className='font-bold '>Liked</span></NavLink>
            {/* Cancle button */}
            <ul className='w-full flex justify-center cursor-pointer text-[20px] font-extrabold  dark:text-white' onClick={handelList}><span className='w-10 h-10 rounded-full dark:hover:bg-gray-800 flex justify-center items-center hover:bg-gray-400'><RxCross1 /></span></ul>
         </div>
      </>
   )
}

export default Sidebar