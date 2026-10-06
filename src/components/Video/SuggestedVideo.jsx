import React from "react";
import { NavLink } from "react-router";
import timeAgo from "../../utils/uploadedTime";
import formatDuration from "../../utils/formatDuration";

function SuggestedVideo({ video: { _id, title, thumbnail, viewsCount, createdAt, duration } }) {
  const uploadedBefore = timeAgo(createdAt);

  return (
    <NavLink
      to={`/video/${_id}`}
      state={{ _id }}
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="flex gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/80 p-2 rounded-xl transition-colors duration-150 group">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-40 aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
          <img
            src={thumbnail || "/Images/alt.avif"}
            alt={title}
            onError={(e) => {
              e.currentTarget.src = "/Images/alt.avif";
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {duration && (
            <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] font-medium px-1.5 py-0.5 rounded text-white">
              {formatDuration(duration)}
            </span>
          )}
        </div>

        {/* Video Info */}
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <h3 className="text-sm font-semibold line-clamp-2 leading-snug text-gray-900 dark:text-gray-100 group-hover:text-blue-500 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {viewsCount || 0} views • {uploadedBefore}
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default SuggestedVideo;
