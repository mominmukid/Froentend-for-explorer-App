import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { toggleIsvisibalfalse } from "../../store/VideoSlice";
import uploasedTime from "../../utils/uploadedTime";
import formatDuration from "../../utils/formatDuration";
import { setuserHistory, getUserdetils } from "../../store/UserSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDownload, MdShare, MdPlaylistAdd } from "react-icons/md";

function VideoCard({
  video: { _id, title, thumbnail, duration, viewsCount, createdAt, owner },
  setShowShare,
  setId,
  setShowDownload,
  setShowPlaylist,
}) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(
    typeof owner === "object" && owner !== null ? owner : null
  );
  const [loading, setLoading] = useState(!user);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handlesidebar = () => {
    if (_id) dispatch(setuserHistory(_id));
    dispatch(toggleIsvisibalfalse());
  };

  useEffect(() => {
    if (typeof owner === "object" && owner !== null) {
      setUser(owner);
      setLoading(false);
      return;
    }

    if (!owner) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchUserDetails = async () => {
      try {
        const resultAction = await dispatch(getUserdetils(owner));
        if (getUserdetils.fulfilled.match(resultAction) && isMounted) {
          setUser(resultAction.payload);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserDetails();
    return () => {
      isMounted = false;
    };
  }, [dispatch, owner]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const uploadBefore = uploasedTime(createdAt);

  return (
    <div className="relative group cursor-pointer mb-6 transition-all duration-300">
      <NavLink
        to={`/video/${_id}`}
        state={{ _id }}
        onClick={handlesidebar}
        className="block"
      >
        {/* Thumbnail */}
        <div className="relative mb-3 overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 aspect-video shadow-xs group-hover:shadow-lg transition-shadow duration-300">
          <img
            src={thumbnail || "/Images/alt.avif"}
            alt={title || "Video thumbnail"}
            onError={(e) => {
              e.currentTarget.src = "/Images/alt.avif";
            }}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
          <span className="absolute bottom-2 right-2 bg-black/85 text-xs font-semibold px-2 py-0.5 rounded-md text-white shadow-xs backdrop-blur-xs">
            {formatDuration(duration)}
          </span>
        </div>
      </NavLink>

      {/* Video info */}
      <div className="flex gap-3 px-1">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
          <img
            src={user?.avatar || "/Images/profile.png"}
            alt={user?.username || "profile"}
            onError={(e) => {
              e.currentTarget.src = "/Images/profile.png";
            }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text details */}
        <div className="min-w-0 flex-1">
          <NavLink to={`/video/${_id}`} state={{ _id }} onClick={handlesidebar}>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug mb-1 text-[15px] group-hover:text-blue-500 transition-colors">
              {title}
            </h3>
          </NavLink>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            {loading ? "Loading..." : user?.username || "Creator"}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
            {viewsCount || 0} views • {uploadBefore}
          </p>
        </div>

        {/* Three dot menu */}
        <div className="relative flex items-start" ref={menuRef}>
          <button
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen((prev) => !prev);
            }}
            aria-label="More options"
          >
            <BsThreeDotsVertical className="text-base" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-8 w-44 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700 py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setId(_id);
                  setShowDownload(true);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/70 transition"
              >
                <MdDownload className="text-base text-gray-500" />
                Download
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setId(_id);
                  setShowShare(true);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/70 transition"
              >
                <MdShare className="text-base text-gray-500" />
                Share
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setId(_id);
                  setShowPlaylist(true);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/70 transition"
              >
                <MdPlaylistAdd className="text-base text-gray-500" />
                Add to Playlist
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
