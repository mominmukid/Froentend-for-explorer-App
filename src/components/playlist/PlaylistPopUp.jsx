import React, { useState, useRef, useEffect } from "react";
import { fetchAsyncplaylist } from "../../store/playlistSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addVideoPlaylist } from '../../store/playlistSlice'

function PlaylistSelectModal({ setShowPlaylist, videoId }) {
   const [selectedPlaylist, setSelectedPlaylist] = useState(null);
   const [loading, setLoading] = useState(false);
   const [playlists, setPlaylists] = useState([]);
   const dispatch = useDispatch();
   const modalRef = useRef(null);

   // Fetch playlists
   useEffect(() => {
      const fetchPlaylists = async () => {
         try {
            setLoading(true);
            const resultAction = await dispatch(fetchAsyncplaylist());
            if (fetchAsyncplaylist.fulfilled.match(resultAction)) {
               setPlaylists(resultAction.payload || []);
            }
         } catch (error) {
            console.error("Error fetching playlists:", error);
            toast.error("Failed to load playlists");
         } finally {
            setLoading(false);
         }
      };
      fetchPlaylists();
   }, [dispatch]);

   // Confirm selection
   const handleConfirm = async () => {
      if (!selectedPlaylist) {
         alert("Please select a playlist!");
         return;
      }
      try {
         const result = await dispatch(addVideoPlaylist({ selectedPlaylist, videoId }))
         if (addVideoPlaylist.fulfilled.match(result)) {
            toast.success("Video added in playList successfully!")
         }

      } catch (error) {
         console.log(error);

      }

      setShowPlaylist(false);
   };

   // Close modal when clicking outside
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowPlaylist(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, [setShowPlaylist]);

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
         <div
            ref={modalRef}
            className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-2xl shadow-lg"
         >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
               Select Playlist
            </h2>

            {loading ? (
               <p className="text-gray-600 dark:text-gray-400">Loading playlists...</p>
            ) : (
               <div className="space-y-3 max-h-64 overflow-y-auto">
                  {playlists.map((playlist) => (
                     <label
                        key={playlist._id}
                        className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer ${selectedPlaylist === playlist._id
                           ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                           : "border-gray-300 dark:border-gray-600"
                           }`}
                     >
                        <input
                           type="radio"
                           name="playlist"
                           value={playlist._id}
                           checked={selectedPlaylist === playlist._id}
                           onChange={() => setSelectedPlaylist(playlist._id)}
                           className="h-4 w-4 text-blue-600"
                        />
                        <div>
                           <p className="text-gray-900 dark:text-gray-100 font-medium">
                              {playlist.title}
                           </p>
                           <p className="text-sm text-gray-600 dark:text-gray-400">
                              {playlist.description}
                           </p>
                        </div>
                     </label>
                  ))}
               </div>
            )}

            <div className="flex gap-3 mt-6">
               <button
                  onClick={handleConfirm}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
               >
                  Select
               </button>
               <button
                  onClick={() => setShowPlaylist(false)}
                  className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
               >
                  Cancel
               </button>
            </div>
         </div>
      </div>
   );
}

export default PlaylistSelectModal;
