import React, { useState } from "react";
import { createPlayList } from "../store/playlistSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function CreatePlaylistPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false); // new loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name.trim()) return toast.info("Playlist name is required!");
    if (!thumbnail) return toast.info("Thumbnail is required!");
    try {
      setLoading(true); // start loader
      const result = await dispatch(createPlayList({ name, description, thumbnail }));
      if (createPlayList.fulfilled.match(result)) {
        toast.success("Playlist created successfully");
        navigate("/playlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating playlist");
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-2">
      <div className=" shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Create Playlist
        </h1>

        {/* Playlist Name */}
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Playlist Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter playlist name"
          className="w-full px-4 py-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        {/* Playlist Description */}
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          rows={4}
          className="w-full px-4 py-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        ></textarea>

        {/* Thumbnail Upload */}
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Thumbnail <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="w-full mb-4 border-dotted border-2 border-black dark:border-white p-4"
        />

        {/* Submit Button */}
        <button
          onClick={handleCreate}
          disabled={loading}
          className={`w-full py-2 text-white font-semibold rounded-lg transition flex justify-center items-center ${loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] hover:scale-102"
            }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : null}
          {loading ? "Creating..." : "Create Playlist"}
        </button>
      </div>
    </div>
  );
}

export default CreatePlaylistPage;
