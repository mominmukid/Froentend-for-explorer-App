import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch } from 'react-redux';
import { toggleIsvisibalfalse } from '../../store/VideoSlice';
import uploasedTime from '../../utils/uploadedTime';
import { setuserHistory, getUserdetils } from '../../store/UserSlice';

function VideoCard({ video: { _id, title, thumbnail, duration, views, createdAt, owner, } }) {

    const dispatch = useDispatch();
    const [user, setUser] = useState(null); // owner details
    const [loading, setLoading] = useState(true);

    const handlesidebar = () => {
        dispatch(setuserHistory(_id));
        dispatch(toggleIsvisibalfalse());
    };

    useEffect(() => {
        const getuserDitails = async () => {
            try {
                const resultAction = await dispatch(getUserdetils(owner));

                if (getUserdetils.fulfilled.match(resultAction)) {
                    const loggedInUser = resultAction.payload; // ✅ user + tokens from backend
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

    const uploadBefore = uploasedTime(createdAt);

    return (
        <NavLink
            to={`/video/${_id}`}
            state={{ _id }}
            // Removed fixed bg color: The card should blend into the grid container's background.
            // Added padding at the bottom for spacing when used in a grid.
            className="group cursor-pointer mb-8 transition-transform hover:scale-[1.01] duration-300"
            onClick={handlesidebar}
        >
            {/* Thumbnail */}
            <div className="relative mb-3">
                <img
                    src={thumbnail}
                    alt="Video thumbnail"
                    // Removed 'object-contain' as thumbnails should generally cover the area.
                    className="w-full aspect-video object-cover rounded-xl group-hover:rounded-none transition-all duration-300"
                />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-xs px-1 py-0.5 rounded text-white">
                    {(duration / 60).toFixed(2)}
                </span>
            </div>

            {/* Video info */}
            {/* The flex layout ensures avatar and text are side-by-side, which works for all screen sizes in a grid. */}
            <div className="flex gap-3 px-1">
                {/* Avatar - Smaller on mobile, standard on larger screens */}
                <img
                    src={
                        user?.avatar ||
                        "https://via.placeholder.com/36x36.png?text=U" // fallback
                    }
                    alt="Channel avatar"
                    // Adjusted size for responsiveness: w-10/h-10 on small, w-12/h-12 on medium/larger
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
                />

                {/* Text details */}
                <div className="min-w-0">
                    {/* Title */}
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>

                    {/* Owner name */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-0.5 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                        {loading ? "Loading..." : user?.username || "Unknown User"}
                    </p>

                    {/* Views + time */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {views} views • {uploadBefore}
                    </p>
                </div>
            </div>
        </NavLink>
    );
}

export default VideoCard;