import { useEffect, useState, useRef } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { NavLink } from "react-router";
import { PiListBold } from "react-icons/pi";
import { MdOutlineVideoCall, MdMic } from "react-icons/md";
import { GoSun } from "react-icons/go";
import { IoMoon } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getUser } from "../../store/UserSlice";
import { CiSearch } from "react-icons/ci";
import AltImage from "../../../public/Images/profile.png";

function Navitems({ handelList, handleIsBlock }) {
   const reduxUser = useSelector(getUser);
   const userStatus = useSelector((state) => state.user.userStatus);
   const [localUser, setLocalUser] = useState(null);

   const [isDark, setisDark] = useState(false);
   const [mobileSearch, setMobileSearch] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");

   const recognitionRef = useRef(null);

   useEffect(() => {
      const userData = localStorage.getItem("user");
      if (userData) {
         const data = JSON.parse(userData);
         setLocalUser(data.user);
      }

      // Initialize Speech Recognition
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
         const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
         recognitionRef.current = new SpeechRecognition();
         recognitionRef.current.continuous = false;
         recognitionRef.current.interimResults = false;

         recognitionRef.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setSearchTerm(transcript);
         };

         recognitionRef.current.onerror = (err) => console.error(err);
      }
   }, [reduxUser, userStatus]);

   const user = reduxUser?.user || localUser;

   const hanelDark = () => {
      if (isDark) {
         document.documentElement.classList.remove("dark");
         setisDark(false);
      } else {
         document.documentElement.classList.add("dark");
         setisDark(true);
      }
   };

   const handleMicClick = () => {
      if (recognitionRef.current) {
         recognitionRef.current.start();
      } else {
         alert("Speech Recognition not supported in this browser");
      }
   };

   return (
      <>
         {/* Mobile Search Overlay */}
         {mobileSearch ? (
            <div className="fixed top-0 left-0 w-full h-[60px] bg-white dark:bg-gray-900 flex items-center px-2 z-50 shadow-md">
               {/* Back Button */}
               <button
                  onClick={() => setMobileSearch(false)}
                  className="text-2xl text-gray-800 dark:text-gray-100 mr-2"
               >
                  &#8592;
               </button>

               {/* Search Input */}
               <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search videos..."
                  className="flex-1 h-10 px-4 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none"
               />

               {/* Mic Button */}
               <button
                  onClick={handleMicClick}
                  className="ml-2 text-2xl text-gray-600 dark:text-gray-200 hover:text-red-500 transition"
               >
                  <MdMic />
               </button>
            </div>
         ) : (
            <div className="flex items-center justify-between w-full px-4 h-[60px]">
               {/* Left: Logo + Hamburger */}
               <div className="flex items-center px-2 gap-7">
                  <div
                     className="md:hidden cursor-pointer text-xl dark:text-white"
                     onClick={handelList}
                  >
                     <PiListBold />
                  </div>
                  <NavLink
                     to="/"
                     className="text-3xl md:text-2xl font-bold text-red-600 w-7 h-7"
                  >
                     <img src="/Images/logo.png" alt="W" className="w-full h-full" />
                  </NavLink>
                  <span className="font-bold text-xl text-black hidden md:block dark:text-white font-serif italic">
                     Wideview
                  </span>
               </div>

               {/* Middle: Search (desktop) */}
               <div className="hidden md:flex w-[60%] px-4 rounded-full outline-none border border-gray-600 overflow-hidden h-[70%] items-center relative">
                  <input
                     type="text"
                     placeholder="Search videos..."
                     className="w-full px-4 py-1 outline-none dark:text-white"
                  />
                  <CiSearch className="text-xl text-gray-600 dark:text-white absolute right-4 cursor-pointer" />
               </div>

               {/* Right: Icons */}
               <div className="flex items-center gap-4">
                  {/* Mobile search icon */}
                  <button
                     className="md:hidden text-2xl dark:text-white"
                     onClick={() => setMobileSearch(true)}
                  >
                     <CiSearch />
                  </button>

                  {/* Upload (desktop only) */}
                  <NavLink
                     to="/upload"
                     className="hidden md:flex text-[30px] w-12 h-12 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 items-center justify-center text-gray-800 dark:text-gray-200"
                  >
                     <MdOutlineVideoCall />
                  </NavLink>

                  {/* Profile */}
                  <span
                     className="text-[30px] w-fit h-fit rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 flex justify-center items-center cursor-pointer overflow-hidden"
                     onClick={handleIsBlock}
                  >
                     {user?.avatar ? (
                        <img
                           src={user.avatar}
                           alt="Profile"
                           className="w-8 h-8 object-cover dark:bg-gray-600"
                        />
                     ) : (
                        <img
                           src={AltImage}
                           alt="Profile"
                           className="w-10 h-10 object-cover dark:bg-gray-600"
                        />
                     )}
                  </span>

                  {/* Dark/Light toggle */}
                  <span
                     className={`text-10 w-fit h-fit rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 flex justify-center items-center cursor-pointer ${!isDark ? "text-gray-800" : "text-gray-100"
                        }`}
                     onClick={hanelDark}
                  >
                     {isDark ? <GoSun /> : <IoMoon />}
                  </span>
               </div>
            </div>
         )}
      </>
   );
}

export default Navitems;
