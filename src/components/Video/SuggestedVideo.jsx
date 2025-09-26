import React from "react";
import { NavLink } from "react-router";
import timeAgo from "../../utils/uploadedTime"; // your uploadedTime/timeAgo util

function SuggestedVideo({ video: { _id, title, thumbnail, views, createdAt } }) {
  const uploadedBefore = timeAgo(createdAt);

  return (
    <NavLink
      to={`/video/${_id}`}
      state={{ _id }}
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="flex gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg mb-4 w-full">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-40 aspect-video rounded-lg overflow-hidden bg-gray-900">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-fit"
          />
        </div>

        {/* Video Info */}
        <div className="flex flex-col justify-between flex-1">
          <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {views} views • {uploadedBefore}
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default SuggestedVideo;
