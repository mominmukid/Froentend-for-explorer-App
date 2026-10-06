import React from "react";
import { NavLink } from "react-router";
import { IoMdHome } from "react-icons/io";
import { MdOutlinePlaylistPlay, MdSubscriptions } from "react-icons/md";
import { FaHistory, FaLinkedin } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { VscGithub } from "react-icons/vsc";
import { BsPersonVcard } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

function Sidebar({ cancle, setcancle }) {
  const navLinks = [
    { to: "/", label: "Home", icon: <IoMdHome className="text-xl" /> },
    { to: "/playlist", label: "Playlists", icon: <MdOutlinePlaylistPlay className="text-2xl" /> },
    { to: "/history", label: "History", icon: <FaHistory className="text-lg" /> },
    { to: "/subscription", label: "Subscriptions", icon: <MdSubscriptions className="text-xl" /> },
    { to: "/like", label: "Liked Videos", icon: <AiOutlineLike className="text-xl" /> },
  ];

  return (
    <>
      {/* Overlay */}
      {!cancle && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity"
          onClick={() => setcancle(true)}
        />
      )}

      {/* Sidebar Sheet */}
      <div
        className={`${
          cancle ? "-translate-x-full" : "translate-x-0"
        } fixed top-0 left-0 h-screen w-[270px] bg-white dark:bg-[#202222] border-r border-gray-200 dark:border-gray-800 shadow-2xl z-50 transition-transform duration-300 ease-in-out flex flex-col justify-between`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <img src="/Images/logo.png" alt="Wideview" className="w-7 h-7 object-contain" />
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Wide<span className="text-red-600">view</span>
              </span>
            </div>
            <button
              onClick={() => setcancle(true)}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
              aria-label="Close menu"
            >
              <IoClose size={22} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1.5 p-3">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setcancle(true)}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                    isActive
                      ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 font-semibold"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                <span className="flex items-center justify-center">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer social icons */}
        <div className="border-t border-gray-100 dark:border-gray-800 p-3 flex justify-around items-center">
          <a
            href="https://www.linkedin.com/in/mukid-momin"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="p-2 text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <FaLinkedin className="text-xl" />
          </a>
          <a
            href="https://github.com/mominmukid"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <VscGithub className="text-xl" />
          </a>
          <a
            href="https://mukid-portfolio.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            title="Portfolio"
            className="p-2 text-[#1e9fab] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <BsPersonVcard className="text-xl" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
