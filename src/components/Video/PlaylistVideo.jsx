import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import timeAgo from "../../utils/uploadedTime";
import { getUserdetils } from "../../store/UserSlice";

function PlaylistVideo({ playlist: { createdAt, description, name, owner: ownerId, videos, _id, thumbnail } }) {
  const dispatch = useDispatch();
  const time = timeAgo(createdAt);

  const [loading, setLoading] = useState(false);
  const [ownerDetails, setOwnerDetails] = useState(null);

  useEffect(() => {
    const fetchOwner = async () => {
      if (!ownerId) return;
      try {
        setLoading(true);
        const resultAction = await dispatch(getUserdetils(ownerId));
        if (getUserdetils.fulfilled.match(resultAction)) {
          setOwnerDetails(resultAction.payload);
        }
      } catch (error) {
        console.error("Error fetching owner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwner();
  }, [dispatch, ownerId]);

  return (
    <NavLink
      to={`/playlist/show/${_id}`}
      state={{ _id }}
      className="block bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/60 rounded-2xl shadow-xs hover:shadow-lg overflow-hidden transition-all duration-300 group"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={thumbnail || "/Images/alt.avif"}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = "/Images/alt.avif";
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded-md text-white font-medium flex items-center gap-1 shadow-sm backdrop-blur-sm">
           <span>{videos?.length || 0}</span>
           <span>videos</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-base mb-1 text-gray-900 dark:text-gray-100 group-hover:text-blue-500 transition-colors line-clamp-1">{name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 min-h-[40px]">
          {description || "No description provided."}
        </p>

        {/* Owner Info & Time */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ) : ownerDetails ? (
              <>
                <img
                  src={ownerDetails.avatar || "/Images/profile.png"}
                  alt={ownerDetails.username}
                  onError={(e) => {
                    e.currentTarget.src = "/Images/profile.png";
                  }}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-[100px]">
                  {ownerDetails.username}
                </span>
              </>
            ) : (
              <>
                <img src="/Images/profile.png" alt="Unknown User" className="w-6 h-6 rounded-full object-cover" />
                <span className="text-sm font-medium text-gray-500">Unknown</span>
              </>
            )}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{time}</span>
        </div>
      </div>
    </NavLink>
  );
}

export default PlaylistVideo;
