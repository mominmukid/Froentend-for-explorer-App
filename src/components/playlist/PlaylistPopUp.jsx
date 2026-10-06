import React, { useState, useRef, useEffect } from "react";
import { fetchAsyncplaylist, addVideoPlaylist } from "../../store/playlistSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";

function PlaylistSelectModal({ setShowPlaylist, videoId }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

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

  const handleConfirm = async () => {
    if (!selectedPlaylist) {
      toast.warning("Please select a playlist!");
      return;
    }
    try {
      const result = await dispatch(addVideoPlaylist({ selectedPlaylist, videoId }));
      if (addVideoPlaylist.fulfilled.match(result)) {
        toast.success("Video added to playlist successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add video to playlist");
    }
    setShowPlaylist(false);
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-2xl shadow-xl transform transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Save to Playlist
          </h2>
          <button
            onClick={() => setShowPlaylist(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : playlists.length === 0 ? (
           <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4">You don't have any playlists yet.</p>
           </div>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {playlists.map((playlist) => (
              <label
                key={playlist._id}
                className={`flex items-start gap-4 p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedPlaylist === playlist._id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <div className="flex items-center h-5 mt-1">
                  <input
                    type="radio"
                    name="playlist"
                    value={playlist._id}
                    checked={selectedPlaylist === playlist._id}
                    onChange={() => setSelectedPlaylist(playlist._id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-gray-100 font-medium mb-1">
                    {playlist.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {playlist.description || "No description"}
                  </p>
                </div>
              </label>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setShowPlaylist(false)}
            className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedPlaylist || loading}
            className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 text-white font-medium rounded-xl transition shadow-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaylistSelectModal;
