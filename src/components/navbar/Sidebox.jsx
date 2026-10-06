import React from "react";
import { FaLinkedin, FaHistory } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";
import { BsPersonVcard } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { MdOutlinePlaylistPlay, MdSubscriptions } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";

function SideBox() {
  const toggle = useSelector((state) => state.video.isvisibal);

  const navLinks = [
    { to: "/", label: "Home", icon: <IoMdHome className="text-xl" /> },
    { to: "/playlist", label: "Playlists", icon: <MdOutlinePlaylistPlay className="text-2xl" /> },
    { to: "/history", label: "History", icon: <FaHistory className="text-lg" /> },
    { to: "/subscription", label: "Subscriptions", icon: <MdSubscriptions className="text-xl" /> },
    { to: "/like", label: "Liked Videos", icon: <AiOutlineLike className="text-xl" /> },
  ];

  return (
    <aside
      className={`hidden flex-col justify-between w-[240px] bg-white dark:bg-[#202222] h-screen fixed top-0 left-0 overflow-y-auto border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-40 ${
        toggle ? "md:flex" : "hidden"
      }`}
    >
      {/* Navigation Links */}
      <div className="w-full flex flex-col items-center pt-20 px-3">
        <nav className="w-full flex flex-col gap-1.5">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 font-semibold shadow-xs"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                }`
              }
            >
              <span className="flex items-center justify-center">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Creator Links */}
      <div className="w-full border-t border-gray-100 dark:border-gray-800 p-3 flex justify-around items-center">
        <a
          href="https://www.linkedin.com/in/mukid-momin"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn Profile"
          className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 transition"
        >
          <FaLinkedin className="text-xl" />
        </a>
        <a
          href="https://github.com/mominmukid"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Profile"
          className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition"
        >
          <VscGithub className="text-xl" />
        </a>
        <a
          href="https://mukid-portfolio.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          title="Portfolio"
          className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#1e9fab] transition"
        >
          <BsPersonVcard className="text-xl" />
        </a>
      </div>
    </aside>
  );
}

export default SideBox;
