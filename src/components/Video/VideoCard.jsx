import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router';
import { useDispatch } from 'react-redux';
import { toggleIsvisibalfalse } from '../../store/VideoSlice';
import uploasedTime from '../../utils/uploadedTime';
import { setuserHistory, getUserdetils } from '../../store/UserSlice';
import { BsThreeDotsVertical } from "react-icons/bs";


function VideoCard({ video: { _id, title, thumbnail, duration, views, createdAt, owner }, setShowShare, setId, setShowDownload, setShowPlaylist }) {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handlesidebar = () => {
        dispatch(setuserHistory(_id));
        dispatch(toggleIsvisibalfalse());
    };

    useEffect(() => {
        const getuserDitails = async () => {
            try {
                const resultAction = await dispatch(getUserdetils(owner));
                if (getUserdetils.fulfilled.match(resultAction)) {
                    const loggedInUser = resultAction.payload;
                    setUser(loggedInUser);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getuserDitails();
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
        <div className="relative group cursor-pointer mb-8 transition-transform hover:scale-[1.01] duration-300">
            <NavLink
                to={`/video/${_id}`}
                state={{ _id }}
                onClick={handlesidebar}
            >
                {/* Thumbnail */}
                <div className="relative mb-3">
                    <img
                        src={thumbnail}
                        alt="Video thumbnail"
                        className="w-full aspect-video object-cover rounded-xl group-hover:rounded-none transition-all duration-300"
                    />
                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-xs px-1 py-0.5 rounded text-white">
                        {(duration / 60).toFixed(2)}
                    </span>
                </div>
            </NavLink>

            {/* Video info */}
            <div className="flex gap-3 px-1">
                {/* Avatar */}
                <img
                    src={user?.avatar || "public/Images/profile.png"}
                    alt="profile"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
                />

                {/* Text details */}
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-0.5 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                        {loading ? "Loading..." : user?.username || "Unknown User"}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {views} views • {uploadBefore}
                    </p>
                </div>

                {/* Three dot menu */}
                <div className="relative flex items-start" ref={menuRef}>
                    <button
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        <BsThreeDotsVertical className="text-lg dark:text-white" />
                    </button>

                    {menuOpen && (
                        <div className="absolute bottom-0 right-0 mt-8 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50">
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    setId(_id)
                                    setShowDownload(true);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Download
                            </button>
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    setId(_id)
                                    setShowShare(true);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Share
                            </button>
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    setId(_id)
                                    setShowPlaylist(true)
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
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
