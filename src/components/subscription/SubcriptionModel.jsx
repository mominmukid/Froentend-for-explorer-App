import React from "react";
import { formatDistanceToNow } from "date-fns";
import { NavLink } from "react-router-dom";

function SubcriptionModel({
  video: { _id, title, duration, thumbnail, views, createdAt },
}) {
  return (
    <NavLink
      to={`/video/${_id}`}
      state={_id}
      className="block cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md overflow-hidden transition"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-48 sm:h-44 md:h-40 lg:h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Duration Overlay */}
        {duration && (
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
            {duration}
          </span>
        )}
      </div>

      {/* Video Info */}
      <div className="p-3">
        {/* Title */}
        <h3 className="text-sm font-semibold line-clamp-2 mb-2 text-gray-900 dark:text-gray-100">
          {title}
        </h3>

        {/* Stats */}
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span>{views || 0} views</span>
          <span>•</span>
          <span>
            {createdAt
              ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
              : "Some time ago"}
          </span>
        </div>
      </div>
    </NavLink>
  );
}

export default SubcriptionModel;
