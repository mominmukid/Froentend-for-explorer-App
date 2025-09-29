import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import timeAgo from "../../utils/uploadedTime";
import { getUserdetils } from "../../store/UserSlice";

function PlaylistVideo({ playlist: { createdAt, description, name, owner: ownerId, videos, _id, thumbnail } }) {
  const navigate = useNavigate();
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
    <div
      className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer"
      onClick={() => navigate(`/playlist/show/${_id}`, { state: { _id } })}
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={thumbnail || "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop"}
          alt="thumbnel"
          className="w-full h-40 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-xs px-2 py-1 rounded text-white">
          {videos?.length} videos
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold mb-1">{name}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 line-clamp-2">
          {description}
        </p>

        {/* Owner Info */}
        <div className="flex items-center gap-2 mb-2">
          {loading ? (
            <div className="w-6 h-6 rounded-full bg-gray-400 animate-pulse" />
          ) : ownerDetails ? (
            <>
              <img
                src={ownerDetails.avatar || "https://via.placeholder.com/40"}
                alt={ownerDetails.username}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {ownerDetails.username}
              </span>
            </>
          ) : (
            <span className="text-sm text-gray-500">Unknown User</span>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-xs">{time}</p>
      </div>
    </div>
  );
}

export default PlaylistVideo;
