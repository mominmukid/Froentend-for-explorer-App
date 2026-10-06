import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncVideoSingle } from "../../store/VideoFeatureSlice";
import { getUserdetils } from "../../store/UserSlice";
import timeAgo from "../../utils/uploadedTime";
import formatDuration from "../../utils/formatDuration";
import { useNavigate } from "react-router-dom";
import { FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { removeVideoFromPlaylist } from "../../store/playlistSlice";
import { toast } from "react-toastify";

function PlayListCard({ videoId, onRemove, playlistId }) {
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchVideo = useCallback(
    async (id) => {
      if (!id) return;
      try {
        setLoading(true);
        const result = await dispatch(fetchAsyncVideoSingle(id));
        if (fetchAsyncVideoSingle.fulfilled.match(result)) {
          setVideo(result.payload);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchVideo(videoId);
  }, [fetchVideo, videoId]);

  useEffect(() => {
    const ownerId = video?.owner;
    if (!ownerId) return;

    if (typeof ownerId === "object" && ownerId?.username) {
      setOwnerDetails(ownerId);
      return;
    }

    const fetchOwner = async (id) => {
      try {
        const resultAction = await dispatch(getUserdetils(id));
        if (getUserdetils.fulfilled.match(resultAction)) {
          setOwnerDetails(resultAction.payload);
        }
      } catch (error) {
        console.error("Error fetching owner:", error);
      }
    };
    fetchOwner(ownerId);
  }, [dispatch, video?.owner]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRemove = async (plId, vId) => {
    try {
      if (!plId || !vId) return;
      const result = await dispatch(removeVideoFromPlaylist({ playlistId: plId, videoId: vId }));
      if (removeVideoFromPlaylist.fulfilled.match(result)) {
        toast.success("Video removed from playlist", { autoClose: 1500, theme: "dark" });
        if (typeof onRemove === "function") {
          onRemove(vId);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove video");
    }
  };

  if (loading && !video) {
    return (
      <div className="flex bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xs p-3 animate-pulse border border-gray-100 dark:border-gray-700">
        <div className="w-40 sm:w-48 aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        <div className="flex flex-col justify-between p-3 flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!video) return null;

  return (
    <div
      className="relative flex flex-col sm:flex-row bg-white dark:bg-gray-800/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700/60 p-2 sm:p-3 gap-3 group"
      onClick={() => navigate(`/video/${videoId}`, { state: { videoId } })}
    >
      {/* Thumbnail */}
      <div className="relative shrink-0 w-full sm:w-48 aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={video.thumbnail || "/Images/alt.avif"}
          alt={video.title}
          onError={(e) => {
            e.currentTarget.src = "/Images/alt.avif";
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded backdrop-blur-sm">
          {formatDuration(video?.duration)}
        </div>
      </div>

      {/* Video Info */}
      <div className="flex flex-col justify-between flex-1 min-w-0 pr-8 py-1">
        <div>
          <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug group-hover:text-blue-500 transition-colors">
            {video.title}
          </h3>

          {/* Owner Info */}
          <div className="flex items-center gap-2 mt-2">
            <img
              src={ownerDetails?.avatar || "/Images/profile.png"}
              alt={ownerDetails?.username || "User"}
              onError={(e) => {
                e.currentTarget.src = "/Images/profile.png";
              }}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
              {ownerDetails?.username || "Creator"}
            </span>
          </div>
        </div>

        {/* Views + Uploaded Time */}
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {video.viewsCount || 0} views • {timeAgo(video.createdAt)}
        </span>
      </div>

      {/* Three-dot menu */}
      <div className="absolute top-3 right-3" ref={menuRef}>
        <button
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          aria-label="Options"
        >
          <FiMoreVertical size={18} />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl w-48 z-20 py-1 overflow-hidden">
            <button
              className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                handleRemove(playlistId, videoId);
              }}
            >
              <FiTrash2 size={16} /> Remove from Playlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayListCard;
