import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";
import { BsPersonVcard } from "react-icons/bs";

function Sidebar({ cancle, setcancle }) {
  return (
    <>
      {/* Overlay (click anywhere outside to close) */}
      {!cancle && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setcancle(true)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`${cancle ? "-translate-x-full" : "translate-x-0"
          } md:hidden fixed top-0 left-0 h-screen w-[60%] sm:w-[40%] bg-white dark:bg-[#202222] border-r-2 border-gray-300 dark:border-gray-800 shadow-lg z-50 transition-transform duration-300 ease-in-out`}
      >
        <nav className="flex flex-col gap-2 mt-12">
          <NavLink
            to="/"
            className="w-full flex items-center gap-2 px-5 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white font-medium"
            onClick={() => setcancle(true)}
          >
            <IoMdHome className="text-xl" /> Home
          </NavLink>

          <NavLink
            to="/playlist"
            className="w-full flex items-center gap-2 px-5 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white font-medium"
            onClick={() => setcancle(true)}
          >
            <MdOutlinePlaylistPlay className="text-2xl" /> Playlists
          </NavLink>

          <NavLink
            to="/history"
            className="w-full flex items-center gap-2 px-5 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white font-medium"
            onClick={() => setcancle(true)}
          >
            <FaHistory className="text-lg" /> History
          </NavLink>

          <NavLink
            to="/subscription"
            className="w-full flex items-center gap-2 px-5 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white font-medium"
            onClick={() => setcancle(true)}
          >
            <MdSubscriptions className="text-xl" /> Subscription
          </NavLink>

          <NavLink
            to="/like"
            className="w-full flex items-center gap-2 px-5 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white font-medium"
            onClick={() => setcancle(true)}
          >
            <AiOutlineLike className="text-xl" /> Liked
          </NavLink>
        </nav>
        <div className="w-full absolute bottom-0 border-t-2 border-gray-100  p-3 flex justify-between items-center dark:border-[#181818]">
          <a href="https://www.linkedin.com/in/mukid-momin" target="_blank">
            <p className="p-2  dark:hover:text-white dark:hover:bg-gray-400/10 rounded-full cursor-pointer hover:bg-gray-300 text-blue-700 text-xl"><FaLinkedin /></p></a>
          <a href="https://github.com/mominmukid " target="_blank">
            <p className="p-2 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-400/10 rounded-full cursor-pointer hover:bg-gray-300 text-xl"><VscGithub /></p></a>
          <a href="https://mukid-portfolio.netlify.app" target="_blank">
            <p className="p-2  dark:hover:text-white dark:hover:bg-gray-400/10 rounded-full cursor-pointer hover:bg-gray-300 text-xl  text-[#1e9fab]"><BsPersonVcard /></p></a>

        </div>
      </div>
    </>
  );
}

export default Sidebar;
