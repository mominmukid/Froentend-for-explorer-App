import React, { useState } from "react";
import { createPlayList } from "../store/playlistSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUploadCloud, FiImage } from "react-icons/fi";

function CreatePlaylistPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name.trim()) return toast.info("Playlist name is required!");
    if (!thumbnail) return toast.info("Thumbnail is required!");
    try {
      setLoading(true);
      const result = await dispatch(createPlayList({ name, description, thumbnail }));
      if (createPlayList.fulfilled.match(result)) {
        toast.success("Playlist created successfully");
        navigate("/playlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating playlist");
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) setThumbnail(file);
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-200 p-4 sm:p-8 pt-20">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 sm:p-10">
        <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
           <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
             Create New Playlist
           </h1>
           <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Organize your favorite videos into beautiful collections.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-6">
              <div>
                 <label className="block text-sm font-semibold mb-2">
                   Playlist Name <span className="text-red-500">*</span>
                 </label>
                 <input
                   type="text"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   placeholder="E.g., Favorite React Tutorials"
                   className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                 />
              </div>

              <div>
                 <label className="block text-sm font-semibold mb-2">
                   Description
                 </label>
                 <textarea
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   placeholder="Tell viewers what this playlist is about..."
                   rows={5}
                   className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm resize-none"
                 ></textarea>
              </div>
           </div>

           <div className="space-y-6">
              <div>
                 <label className="block text-sm font-semibold mb-2">
                   Playlist Thumbnail <span className="text-red-500">*</span>
                 </label>
                 <div className="relative w-full aspect-video bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer group flex flex-col items-center justify-center">
                   {thumbnail ? (
                     <img
                       src={URL.createObjectURL(thumbnail)}
                       alt="Thumbnail Preview"
                       className="w-full h-full object-cover"
                     />
                   ) : (
                     <div className="text-center p-6 flex flex-col items-center">
                        <FiImage size={40} className="text-gray-400 mb-3 group-hover:text-blue-500 transition" />
                        <span className="text-sm text-gray-500 font-medium">Click to upload thumbnail</span>
                        <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                     </div>
                   )}
                   <input
                     type="file"
                     accept="image/*"
                     onChange={handleThumbnailChange}
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                   />
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
           <button
             onClick={() => navigate("/playlist")}
             className="px-6 py-3 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
           >
             Cancel
           </button>
           <button
             onClick={handleCreate}
             disabled={loading}
             className={`px-8 py-3 text-white font-semibold rounded-xl transition shadow-md flex items-center justify-center min-w-[160px] ${
               loading
                 ? "bg-blue-400 cursor-not-allowed"
                 : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"
             }`}
           >
             {loading ? (
               <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating...
               </span>
             ) : (
               "Create Playlist"
             )}
           </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaylistPage;
