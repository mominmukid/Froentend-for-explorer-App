import React from "react";
import { NavLink } from "react-router";
import uploasedTime from "../../utils/uploadedTime";

function HistoryVideo({
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
      <div className="flex-1 sm:flex gap-4 p-3 rounded-lg bg-gray-200 dark:bg-gray-800 transition-colors mb-5">
        {/* Thumbnail (16:9 responsive box) */}
        <div className="relative flex-shrink-0 w-full sm:w-48 aspect-video">
          <img
            src={thumbnail || "public/Images/alt.avif"}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-xs px-1 py-0.5 rounded text-white">
            {(duration / 60).toFixed(2)}
          </span>
        </div>

        {/* Video Info */}
        <div className="flex-1 min-w-0 mt-3 sm:mt-0">
          <h3 className="font-medium mb-2 hover:text-blue-400 cursor-pointer line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2 flex-wrap">
            <img
              src={avatar}
              alt="Channel"
              className="w-10 h-10 object-cover rounded-full"
            />
            <span>{username}</span>
            <span>•</span>
            <span>{views} views</span>
            <span>•</span>
            <span>{uploadBefore}</span>
          </div>
          <p className="hidden sm:block text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default HistoryVideo;
