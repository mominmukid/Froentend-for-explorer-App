import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncVideoSingle } from "../../store/VideoFeatureSlice";

function VideoDownloadBox({ videoId, setShowDownload }) {
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();

   const handleDownload = async () => {
      try {
         setLoading(true);
         setShowDownload(false); // ✅ close the popup immediately

         if (!videoId) return;

         // Fetch video details (with Cloudinary URL)
         const result = await dispatch(fetchAsyncVideoSingle(videoId));

         if (!fetchAsyncVideoSingle.fulfilled.match(result)) {
            throw new Error("Failed to fetch video details");
         }

         const videoFileUrl = result.payload?.videoFile;
         if (!videoFileUrl) throw new Error("Video file not found");

         // Fetch file from Cloudinary
         const response = await fetch(videoFileUrl);
         const blob = await response.blob();

         // Create downloadable link
         const url = window.URL.createObjectURL(blob);
         const a = document.createElement("a");
         a.href = url;

         const fileName =
            videoFileUrl.split("/").pop().split("?")[0] || "video.mp4";

         a.download = fileName;
         document.body.appendChild(a);
         a.click();
         a.remove();

         window.URL.revokeObjectURL(url);
      } catch (err) {
         console.error("Download error:", err);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
         <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
               Download Video
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
               Do you want to download this video?
            </p>

            <div className="flex gap-3">
               <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-50"
               >
                  {loading ? "Downloading..." : "Yes, Download"}
               </button>
               <button
                  onClick={() => setShowDownload(false)}
                  className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
               >
                  Cancel
               </button>
            </div>
         </div>
      </div>
   );
}

export default VideoDownloadBox;
