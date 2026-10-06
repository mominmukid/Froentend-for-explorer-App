import { useEffect, useState, useRef, useCallback } from "react";
import { NavLink } from "react-router";
import { PiListBold } from "react-icons/pi";
import { MdOutlineVideoCall, MdMic } from "react-icons/md";
import { GoSun } from "react-icons/go";
import { IoMoon, IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../store/UserSlice";
import { CiSearch } from "react-icons/ci";
import { searchAllVideos, clearSearch } from "../../store/searchSlice";

function Navitems({ handelList, handleIsBlock }) {
  const reduxUser = useSelector(getUser);
  const userStatus = useSelector((state) => state.user.userStatus);
  const [localUser, setLocalUser] = useState(null);
  const [isDark, setisDark] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const dispatch = useDispatch();

  // Load dark mode preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setisDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setisDark(false);
    }
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const data = JSON.parse(userData);
        setLocalUser(data?.user || data);
      } catch {
        setLocalUser(null);
      }
    }

    // Speech Recognition setup
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        dispatch(searchAllVideos({ searchTerm: transcript }));
        setMobileSearch(false);
        setIsListening(false);
      };

      recognition.onerror = (err) => {
        console.error("Speech recognition error:", err);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [reduxUser, userStatus, dispatch]);

  const user = reduxUser?.user || (reduxUser?._id ? reduxUser : localUser);

  const hanelDark = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setisDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setisDark(true);
    }
  };

  const handleMicClick = () => {
    if (recognitionRef.current) {
      try {
        if (isListening) {
          recognitionRef.current.stop();
          setIsListening(false);
        } else {
          recognitionRef.current.start();
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Speech Recognition is not supported in this browser");
    }
  };

  const executeSearch = useCallback((term) => {
    const cleanTerm = term.trim();
    if (!cleanTerm) {
      dispatch(clearSearch());
      return;
    }
    dispatch(searchAllVideos({ searchTerm: cleanTerm }));
  }, [dispatch]);

  const handelChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!val.trim()) {
      dispatch(clearSearch());
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      executeSearch(val);
    }, 400);
  };

  const handleClear = () => {
    setSearchTerm("");
    dispatch(clearSearch());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      executeSearch(searchTerm);
    }
  };

  return (
    <>
      {/* Mobile Search Overlay */}
      {mobileSearch ? (
        <div className="fixed top-0 left-0 w-full h-[60px] bg-white dark:bg-[#202222] flex items-center px-3 z-50 shadow-md">
          {/* Back Button */}
          <button
            onClick={() => setMobileSearch(false)}
            className="text-2xl text-gray-700 dark:text-gray-200 mr-2 p-1"
            aria-label="Back"
          >
            &#8592;
          </button>

          {/* Search Input */}
          <div className="min-w-0 flex-1 flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 h-10 border-2 border-gray-300 dark:border-gray-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all">
            <input
              type="text"
              value={searchTerm}
              onChange={handelChange}
              onKeyDown={handleKeyDown}
              placeholder="Search videos..."
              className="w-0 min-w-0 flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none text-sm"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 mr-1"
              >
                <IoClose size={18} />
              </button>
            )}
          </div>

          {/* Mic Button */}
          <button
            onClick={handleMicClick}
            className={`ml-2 p-2 rounded-full text-xl transition ${
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            aria-label="Voice Search"
          >
            <MdMic />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full px-2 sm:px-4 h-[60px]">
          {/* Left: Logo + Hamburger */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              className="cursor-pointer text-2xl text-gray-800 dark:text-white p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition flex items-center justify-center"
              onClick={handelList}
              aria-label="Toggle menu"
              title="Toggle sidebar menu"
            >
              <PiListBold />
            </button>
            <NavLink
              to="/"
              onClick={() => {
                if (searchTerm) handleClear();
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <img
                  src="/Images/logo.png"
                  alt="Wideview Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/Images/logo.svg";
                  }}
                />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight hidden sm:inline">
                Wide<span className="text-red-600">view</span>
              </span>
            </NavLink>
          </div>

          {/* Middle: Search (desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6 items-center">
            <div className="flex items-center w-full bg-gray-50 dark:bg-gray-800/80 border-2 border-gray-300 dark:border-gray-700 rounded-full px-4 py-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all">
              <input
                type="text"
                value={searchTerm}
                onChange={handelChange}
                onKeyDown={handleKeyDown}
                placeholder="Search videos..."
                className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 mr-2 cursor-pointer"
                  aria-label="Clear search"
                >
                  <IoClose size={18} />
                </button>
              )}
              <button
                onClick={() => executeSearch(searchTerm)}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer pl-1"
                aria-label="Submit search"
              >
                <CiSearch size={22} />
              </button>
            </div>

            <button
              onClick={handleMicClick}
              className={`ml-2 p-2.5 rounded-full transition cursor-pointer ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
              title="Search with your voice"
              aria-label="Voice Search"
            >
              <MdMic size={18} />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile search icon */}
            <button
              className="md:hidden p-2 text-xl text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition cursor-pointer"
              onClick={() => setMobileSearch(true)}
              aria-label="Open search"
            >
              <CiSearch />
            </button>

            {/* Upload Video Button */}
            <NavLink
              to="/upload"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full font-medium text-sm transition"
              title="Create video"
            >
              <MdOutlineVideoCall className="text-xl text-red-500" />
              <span className="hidden lg:inline text-xs font-semibold">Create</span>
            </NavLink>

            {/* Dark/Light toggle */}
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition cursor-pointer"
              onClick={hanelDark}
              aria-label="Toggle theme"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <GoSun size={20} className="text-yellow-400" /> : <IoMoon size={20} />}
            </button>

            {/* Profile Avatar Button */}
            <button
              className="w-9 h-9 rounded-full ring-2 ring-gray-300 dark:ring-gray-600 hover:ring-blue-500 transition-all overflow-hidden flex items-center justify-center cursor-pointer bg-gray-200 dark:bg-gray-700 ml-1"
              onClick={handleIsBlock}
              aria-label="User menu"
            >
              <img
                src={user?.avatar || "/Images/profile.png"}
                alt={user?.username || "Profile"}
                onError={(e) => {
                  e.currentTarget.src = "/Images/profile.png";
                }}
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navitems;
