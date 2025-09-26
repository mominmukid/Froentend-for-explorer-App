import React from "react";
import { NavLink } from "react-router";
import uploasedTime from "../../utils/uploadedTime";

function LikeCard({
  video: {
    _id,
    description,
    title,
    duration,
    owner: { username, avatar },
    thumbnail,
    views,
    createdAt,
  },
}) {
  const uploadBefore = uploasedTime(createdAt);

  return (
    <NavLink to={`/video/${_id}`} state={{ _id }}>
      {/* FIXED BG: 
        - Changed bg-gray-200 to bg-white for better contrast on a light background. 
        - Kept dark:bg-gray-800 for dark mode.
        - Added shadow for separation.
      */}
      <div className="flex-1 sm:flex gap-4 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all mb-5">
        
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-full sm:w-48 aspect-video rounded-lg overflow-hidden">
          <img
            src={thumbnail || "public/Images/alt.avif"}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Duration badge fixed inside bottom-right */}
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-xs px-2 py-0.5 rounded text-white">
            {(duration / 60).toFixed(2)}
          </span>
        </div>

        {/* Video Info */}
        <div className="flex-1 min-w-0 mt-3 sm:mt-0">
          <h3 className="font-medium mb-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer line-clamp-2 text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2 flex-wrap">
            <img
              src={avatar}
              alt={username}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-gray-800 dark:text-gray-300">{username}</span>
            <span>•</span>
            <span>{views} views</span>
            <span>•</span>
            <span>{uploadBefore}</span>
          </div>
          <p className="hidden sm:block text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default LikeCard;