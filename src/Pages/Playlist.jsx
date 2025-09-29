import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import PlaylistVideo from "../components/Video/PlaylistVideo";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchAsyncplaylist } from "../store/playlistSlice";

function Playlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]); // ✅ renamed for clarity

  // ✅ Fetch playlists on mount
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const resultAction = await dispatch(fetchAsyncplaylist());
        if (fetchAsyncplaylist.fulfilled.match(resultAction)) {
          setPlaylists(resultAction.payload || []); // ensure array
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
    <main className="flex-1 p-6 ml-0 pt-20 min-h-screen">
      {/* Header */}
      <div className="flex-1 sm:flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Playlists</h1>
          <p className="text-gray-700 dark:text-gray-300">
            Organize your favorite videos
          </p>
        </div>
        <button
          className="bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] hover:scale-102  px-4 py-2 rounded-lg font-medium flex justify-center items-center gap-1 cursor-pointer mt-2"
          onClick={() => navigate("/playlist/create")}
        >
          <FaPlus />
          Create Playlist
        </button>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        // Playlists Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {playlists.length > 0 ? (
            playlists.map((pl) => (
              <PlaylistVideo key={pl._id} playlist={pl} />
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300 col-span-full text-center">
              No Playlists Found
            </p>
          )}
        </div>
      )}
    </main>
  );
}

export default Playlist;
