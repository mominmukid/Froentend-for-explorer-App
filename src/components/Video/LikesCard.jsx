import React from "react";
import { NavLink } from "react-router";
import uploasedTime from "../../utils/uploadedTime";
import formatDuration from "../../utils/formatDuration";

function LikeCard({
  video: {
    _id,
    description,
    title,
    duration,
    owner = {},
    thumbnail,
    viewsCount,
    createdAt,
  },
}) {
  const uploadBefore = uploasedTime(createdAt);
  const username = owner?.username || "Creator";
  const avatar = owner?.avatar || "/Images/profile.png";

  return (
    <NavLink to={`/video/${_id}`} state={{ _id }}>
      <div className="flex-1 sm:flex gap-4 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-xs hover:shadow-md transition-all mb-4 border border-gray-100 dark:border-gray-700/60">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-full sm:w-48 aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
          <img
            src={thumbnail || "/Images/alt.avif"}
            alt={title || "Video thumbnail"}
            onError={(e) => {
              e.currentTarget.src = "/Images/alt.avif";
            }}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <span className="absolute bottom-2 right-2 bg-black/80 text-xs px-1.5 py-0.5 rounded font-medium text-white">
            {formatDuration(duration)}
          </span>
        </div>

        {/* Video Info */}
        <div className="flex-1 min-w-0 mt-3 sm:mt-0 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5 hover:text-blue-500 cursor-pointer line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2 flex-wrap">
              <img
                src={avatar}
                alt={username}
                onError={(e) => {
                  e.currentTarget.src = "/Images/profile.png";
                }}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="font-medium text-gray-800 dark:text-gray-200">{username}</span>
              <span>•</span>
              <span>{viewsCount || 0} views</span>
              <span>•</span>
              <span>{uploadBefore}</span>
            </div>
          </div>
          {description && (
            <p className="hidden sm:block text-gray-500 dark:text-gray-400 text-xs line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </NavLink>
  );
}

export default LikeCard;