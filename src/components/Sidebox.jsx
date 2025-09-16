import { MdSavedSearch } from "react-icons/md";
import { FaAudible } from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";
import { PiSignInBold } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { IoMdHome } from "react-icons/io";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";
import { NavLink } from "react-router";

function SideBox() {
  return (
    <div className="hidden md:flex flex-col justify-between w-[240px] dark:bg-[#202222] h-screen fixed top-0 left-0 overflow-y-auto border-r-2 border-gray-300 dark:border-gray-700">
      {/* Sidebar content */}
      <div className="flex flex-col items-center w-full">
        {/* Navigation Links */}
        <div className="w-[98%]  flex flex-col gap-3 mt-20">
            {/* for home for mobile screen */}
            <NavLink to="/" className='w-full hover:bg-gray-300  cursor-pointer rounded-full flex justify-start pl-5  gap-2 p-2 transition delay-150 duration-100 ease-in-out dark:text-white dark:hover:bg-gray-800   '><span className='flex justify-center items-center text-xl '><IoMdHome /> </span> <span className='font-bold '>Home</span></NavLink>

            {/* for playlist for mobile screen */}
            <NavLink to="/playlist" className='w-full hover:bg-gray-300  cursor-pointer rounded-full flex justify-start pl-5  gap-2 p-2 transition delay-150 duration-100 ease-in-out dark:text-white dark:hover:bg-gray-800'><span className='flex justify-center items-center text-2xl'><MdOutlinePlaylistPlay /> </span> <span className='font-bold '>playlists</span></NavLink>
            {/* for History for mobile screen */}
            <NavLink to="/playlist" className='w-full hover:bg-gray-300  cursor-pointer rounded-full flex justify-start pl-5  gap-2 p-2 transition delay-150 duration-100 ease-in-out dark:text-white dark:hover:bg-gray-800'><span className='flex justify-center items-center text-xl'><FaHistory /> </span> <span className='font-bold '>History</span></NavLink>
            {/* for Subscription for mobile screen */}
            <NavLink to="/playlist" className='w-full hover:bg-gray-200  cursor-pointer rounded-full flex justify-start pl-5  gap-2 p-2 transition delay-150 duration-100 ease-in-out dark:text-white dark:hover:bg-gray-800'><span className='flex justify-center items-center text-xl'>< MdSubscriptions /> </span> <span className='font-bold '>Subsciption</span></NavLink>
            {/* for liked for mobile screen */}
            <NavLink to="/playlist" className='w-full hover:bg-gray-200  cursor-pointer rounded-full flex justify-start pl-5  gap-2 p-2 transition delay-150 duration-100 ease-in-out dark:text-white dark:hover:bg-gray-800'><span className='flex justify-center items-center text-xl'><AiOutlineLike /> </span> <span className='font-bold '>Liked</span></NavLink>
            {/* Cancle button */}




        </div>
      </div>

      {/* Bottom Icons */}
      <div className="w-full border-t-2 border-gray-300  p-3 flex justify-between items-center">
        <p className="p-2 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-400/10 rounded-full cursor-pointer hover:bg-gray-300"><FaInstagram /></p>
        
          <p className="p-2 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-400/10 rounded-full cursor-pointer hover:bg-gray-300"><FaXTwitter /></p>
          <p className="p-2 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-400/10 rounded-full cursor-pointer hover:bg-gray-300"><FaDiscord /></p>
        
      </div>
    </div>
  );
}

export default SideBox;
