import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncVideoSingle } from "../../store/VideoFeatureSlice";
import { getUserdetils } from "../../store/UserSlice";
import timeAgo from "../../utils/uploadedTime";
import { useNavigate } from "react-router";
import { FiMoreVertical } from "react-icons/fi";
import { removeVideoFromPlaylist } from "../../store/playlistSlice";

function PlayListCard({ videoId, onRemove, playlistId }) {
   const [loading, setLoading] = useState(false);
   const [video, setVideo] = useState(null);
   const [ownerDetails, setOwnerDetails] = useState(null);
   const [menuOpen, setMenuOpen] = useState(false); // for three-dot menu
   const menuRef = useRef();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   // Fetch video details
   useEffect(() => {
      const fetchVideo = async (id) => {
         try {
            if (!id) return;
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
      };
      fetchVideo(videoId);
   }, [dispatch, videoId]);

   // Fetch owner details
   useEffect(() => {
      const fetchOwner = async (id) => {
         if (!id) return;
         try {
            setLoading(true);
            const resultAction = await dispatch(getUserdetils(id));
            if (getUserdetils.fulfilled.match(resultAction)) {
               setOwnerDetails(resultAction.payload);
            }
         } catch (error) {
            console.error("Error fetching owner:", error);
         } finally {
            setLoading(false);
         }
      };
      if (video?.owner) fetchOwner(video.owner);
   }, [dispatch, video?.owner]);

   // Click outside to close menu
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const hanndelRemove = async (playlistId, videoId) => {
      try {
         if (!playlistId || !videoId) return;
         await dispatch(removeVideoFromPlaylist({ playlistId, videoId }))
      } catch (error) {
         console.log(error);

      } finally {
         setLoading(false)
      }
   }

   if (loading && !video) {
      return (
         <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow p-2 animate-pulse">
            <div className="w-40 h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="flex flex-col justify-between p-3 flex-1">
               <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
               <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
         </div>
      );
   }

   if (!video) return null;

   return (
      <div
         className="relative flex bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition cursor-pointer"
         onClick={() => navigate(`/video/${videoId}`, { state: { videoId } })}
      >
         {/* Thumbnail */}
         <div className="relative">
            <img
               src={video.thumbnail || "https://via.placeholder.com/150"}
               alt={video.title}
               className="w-40 h-24 object-cover"
            />
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
               {(video?.duration / 60).toFixed(2)}
            </div>
         </div>

         {/* Video Info */}
         <div className="p-3 flex flex-col justify-between flex-1">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
               {video.title}
            </h3>

            {/* Owner Info */}
            <div className="flex items-center gap-2 mt-2">
               <img
                  src={ownerDetails?.avatar || "https://via.placeholder.com/40"}
                  alt={ownerDetails?.username || "User"}
                  className="w-6 h-6 rounded-full object-cover"
               />
               <span className="text-sm text-gray-600 dark:text-gray-300">
                  {ownerDetails?.username || "Unknown"}
               </span>
            </div>

            {/* Views + Uploaded Time */}
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
               {video.views || 0} views • {timeAgo(video.createdAt)}
            </span>
         </div>

         {/* Three-dot menu */}
         <div className="absolute bottom-2 right-2" ref={menuRef}>
            <FiMoreVertical
               className="text-gray-700 dark:text-gray-300 text-xl cursor-pointer"
               onClick={(e) => {
                  e.stopPropagation(); // prevent card click
                  setMenuOpen(!menuOpen);
               }}
            />
            {menuOpen && (
               <div className="absolute bottom-6 right-0 bg-white dark:bg-gray-700 border rounded shadow-md w-40 z-10">
                  <button
                     className="w-full text-left p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                     onClick={(e) => {
                        e.stopPropagation();
                        onRemove && onRemove(videoId);
                        setMenuOpen(false);
                        hanndelRemove(playlistId, videoId)
                     }}
                  >
                     Remove from Playlist
                  </button>
               </div>
            )}
         </div>
      </div>
   );
}

export default PlayListCard;
