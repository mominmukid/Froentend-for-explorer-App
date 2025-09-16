

import React, { useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { MdSavedSearch } from "react-icons/md";
import { FaAudible } from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";
import { PiSignInBold } from "react-icons/pi";
import { CiMobile4 } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

function SideBox() {
  const [showCollapse, setShowCollapse] = useState(false);

  return (
    // Ensure that this container is set to a height that allows for scrolling
    <div className="sidebar hidden lg:block w-[220px]  bg-[#202222] h-screen sticky top-0">
      {/* Sidebar with sticky positioning */}
      <div className={`sidebar w-[100%] h-screen  sticky top-0`}>
        {/* Sidebar Layout */}
        <div className='w-full flex flex-col justify-start items-center'>
          {/* Logo and Collapse Button */}
          <div className='w-[90%] flex mt-2 p-1 justify-between items-center'>
            
            <p
              onMouseEnter={() => setShowCollapse(true)}
              onMouseLeave={() => setShowCollapse(false)}
              className='text-sm text-gray-400 rounded-full hover:text-white cursor-pointer hover:bg-gray-400/10 p-2 duration-300 font-bold'>
              <IoArrowBack />
            </p>
          </div>
          {/* Collapse tooltip */}
          <div className={`w-fit absolute font-bold bg-gray-600 top-[4rem] text-sm left-[9.5rem] text-gray-100 p-1 z-50 ${showCollapse ? 'block' : 'hidden'}`}>
            Collapse
          </div>
        </div>

        {/* Search Box */}
        <div className='w-full flex mt-2 h-[2.5rem] justify-center items-center'>
          <div className='w-[85%] h-[2.5rem] flex justify-between cursor-pointer items-center rounded-full bg-[#191a1a] text-gray-300 px-3 border-2 border-[#2a2c2d] hover:border-[#20b8cd] duration-300'>
            <p className='text-sm text-gray-500 font-bold'>New Thread</p>
            <div className='flex justify-center items-center gap-1'>
              <div className='tracking-[2px] flex justify-center items-center py-[-1px] h-[1.2rem] px-[3px] text-gray-500 border border-gray-500 rounded-[4px] '>ctrl</div>
              <div className='tracking-[2px] flex justify-center items-center py-[-1px] h-[1.2rem] px-[5px] text-gray-500 border border-gray-500 rounded-[4px] '>I</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className='w-full flex justify-center items-center'>
          <div className='show_page_list w-[98%] mt-5 flex flex-col justify-center items-center gap-3'>
            <div className='px-4 cursor-pointer w-[98%] text-[1rem] py-[4px] hover:bg-gray-700/50 rounded-md duration-300 hover:text-gray-200 flex justify-start items-center text-[#8d9191] font-semibold'>
              <span className='text-xl'><MdSavedSearch /></span> &nbsp;Home
            </div>
            <div className='px-4 cursor-pointer w-[98%] text-[1rem] py-[4px] hover:bg-gray-700/50 rounded-md duration-300 hover:text-gray-200 flex justify-start items-center text-gray-200 font-semibold'>
              <span className=''><IoEarthOutline /></span> &nbsp;Discover
            </div>
            <div className='px-4 cursor-pointer w-[98%] text-[1rem] py-[4px] hover:bg-gray-700/50 rounded-md duration-300 hover:text-gray-200 flex justify-start items-center text-[#8d9191] font-semibold'>
              <span className=''><FaAudible /></span>&nbsp;Library
            </div>
            <div className='px-4 cursor-pointer w-[98%] text-[1rem] py-[4px] hover:bg-gray-700/50 rounded-md duration-300 hover:text-gray-200 flex justify-start items-center text-[#8d9191] font-semibold'>
              <span className=''><PiSignInBold /></span>&nbsp;Sign in
            </div>
          </div>
        </div>

        {/* Sign Up Button */}
        <div className='w-full flex mt-8 h-[2.5rem] justify-center items-center'>
          <button className='w-[85%] h-[2.5rem] flex justify-center items-center rounded-full bg-[#20b8cd] px-3 duration-300 font-semibold text-black hover:bg-[#20b8cd]/80 duration-300'>
            Sign Up
          </button>
        </div>

        {/* Subscription Section */}
        <div className='w-full p-2 mt-5 flex flex-col justify-start items-start px-5'>
          <p className='text-normal text-white/90 font-semibold hover:text-[#20b8cd] cursor-pointer'>Try Pro</p>

          <p className='text-[#787b7b]'>
            Upgrade for image upload, smarter AI, and more Pro Search.
          </p>
          <button className='w-fit p-1 px-2 mt-1 gap-1 rounded-md font-semibold bg-[#383a3a] text-white/85 duration-300 flex items-center justify-center hover:text-[#787b7b]'>
            <MdArrowOutward /> Learn More
          </button>
        </div>

        {/* Bottom Icons */}
        <div className='w-full flex flex-wrap absolute bottom-0 justify-between items-center p-2 py-3 border-t border-gray-600'>
          <div className='w-fit flex justify-between items-center rounded-full px-2 py-1 text-[#8d9191] gap-1 mb-1 hover:bg-gray-400/10 duration-300 cursor-pointer hover:text-white'>
            <p><CiMobile4 /></p>
            <p>Download</p>
          </div>
          <div className='flex justify-between items-center px-2 py-1 text-[#8d9191] gap-1 mb-1 duration-300 cursor-pointer hover:text-[#20b8cd]'>
            <p className='text-gray-400 rounded-full hover:text-white cursor-pointer hover:bg-gray-400/10 p-2 duration-400 font-bold'><FaXTwitter /></p>
            <p className='text-gray-400 rounded-full hover:text-white cursor-pointer hover:bg-gray-400/10 p-2 duration-400 font-bold'><FaDiscord /></p>
          </div>
        </div>
      </div>

      {/* This is a placeholder for content to show the scrolling effect */}
      
    </div>
  );
}

export default SideBox;