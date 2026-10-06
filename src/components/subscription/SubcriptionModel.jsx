import React from "react";
import { formatDistanceToNow } from "date-fns";
import { NavLink } from "react-router-dom";
import formatDuration from "../../utils/formatDuration";

function SubcriptionModel({
  video: { _id, title, duration, thumbnail, views, viewsCount, createdAt, owner },
}) {
  const displayViews = viewsCount !== undefined ? viewsCount : (views || 0);

  return (
    <NavLink
      to={`/video/${_id}`}
      state={{ _id }}
      className="block cursor-pointer bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/60 rounded-2xl shadow-xs hover:shadow-lg overflow-hidden transition-all duration-300 group"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={thumbnail || "/Images/alt.avif"}
          alt={title || "Video"}
          onError={(e) => {
            e.currentTarget.src = "/Images/alt.avif";
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Duration Overlay */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded backdrop-blur-sm">
          {formatDuration(duration)}
        </span>
      </div>

      {/* Video Info */}
      <div className="p-3.5 flex gap-3 items-start">
         {owner?.avatar && (
            <img src={owner.avatar} alt={owner.username} className="w-9 h-9 rounded-full object-cover shrink-0 bg-gray-200 dark:bg-gray-700" />
         )}
         <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold line-clamp-2 mb-1 text-gray-900 dark:text-gray-100 group-hover:text-blue-500 transition-colors leading-snug">
               {title}
            </h3>
            {owner?.username && (
               <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5 truncate hover:text-gray-700 dark:hover:text-gray-300">
                  {owner.username}
               </p>
            )}

            {/* Stats */}
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
               <span>{displayViews} views</span>
               <span>•</span>
               <span>
                  {createdAt
                     ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
                     : "Recently"}
               </span>
            </div>
         </div>
      </div>
    </NavLink>
  );
}

export default SubcriptionModel;
