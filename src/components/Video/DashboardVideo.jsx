import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import timeAgo from "../../utils/uploadedTime";

function DashboardVideo({ video, setTotalViews, totalViews }) {
  const navigate = useNavigate();
  const { createdAt, views, likeCount, title, duration, _id, thumbnail } = video;

  const formattedDate = timeAgo(createdAt);

  useEffect(() => {
    // Add views to total, safely handling numbers
    setTotalViews((prevTotal) => prevTotal + Number(views?.[0] || 0));
  }, [views, setTotalViews]);

  return (
    <div
      onClick={() => navigate(`/video/${_id}`, { state: { _id } })}
      className="bg-gray-200 dark:bg-gray-800 rounded-lg p-2 sm:p-4 gap-4 flex flex-col sm:flex-row cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative sm:flex-shrink-0">
        <img
          src={thumbnail}
          alt="Video thumbnail"
          className="sm:w-32 sm:h-20 h-36 object-cover rounded w-full"
        />
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-xs px-1 py-0.5 rounded text-white">
          {(duration / 60).toFixed(2)}
        </span>
      </div>

      {/* Video Info */}
      <div className="flex-1">
        <h3 className="font-medium mb-1 hover:underline">{title}</h3>

        <p className="text-gray-700 dark:text-gray-200 text-sm mb-2">
          {views} views • {formattedDate}
        </p>

        <div className="flex items-center gap-4 text-sm mb-3">
          <span className="text-green-400">{likeCount} likes</span>
          <span className="text-gray-800 dark:text-gray-200">324 comments</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigating to video when clicking Update
            navigate(`/video/update/${_id}`, { state: { _id } });
          }}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default DashboardVideo;
