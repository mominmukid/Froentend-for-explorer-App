import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { FiCompass } from "react-icons/fi";
import PlaylistVideo from "../components/Video/PlaylistVideo";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchAsyncplaylist } from "../store/playlistSlice";

function Playlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);

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

  return (
    <main className="flex-1 max-w-7xl mx-auto pt-20 pb-16 px-4 min-h-screen">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Your Playlists
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Organize your favorite videos into collections
          </p>
        </div>
        <button
          className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] text-white font-semibold rounded-xl shadow-md hover:opacity-95 transition cursor-pointer"
          onClick={() => navigate("/playlist/create")}
        >
          <FaPlus className="text-sm" />
          Create Playlist
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          ))}
        </div>
      ) : playlists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {playlists.map((pl) => (
            <PlaylistVideo key={pl._id} playlist={pl} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 flex items-center justify-center text-3xl mb-4">
            <MdOutlinePlaylistPlay />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No playlists yet
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
            Create playlists to organize your favorite videos and share them with others.
          </p>
          <button
            onClick={() => navigate("/playlist/create")}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] text-white font-medium rounded-xl shadow-xs hover:opacity-95 transition cursor-pointer"
          >
            <FaPlus className="text-sm" />
            Create Your First Playlist
          </button>
        </div>
      )}
    </main>
  );
}

export default Playlist;
