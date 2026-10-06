import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncVideoSingle } from "../../store/VideoFeatureSlice";
import { FiDownloadCloud, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

function VideoDownloadBox({ videoId, setShowDownload }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDownload = async () => {
    try {
      setLoading(true);

      if (!videoId) return;

      const result = await dispatch(fetchAsyncVideoSingle(videoId));

      if (!fetchAsyncVideoSingle.fulfilled.match(result)) {
        throw new Error("Failed to fetch video details");
      }

      const videoFileUrl = result.payload?.videoFile;
      if (!videoFileUrl) throw new Error("Video file not found");

      setShowDownload(false);
      toast.info("Download starting...", { autoClose: 2000 });

      const response = await fetch(videoFileUrl);
      const blob = await response.blob();

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
      toast.error("Failed to download video");
      setShowDownload(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-sm relative">
        <button
          onClick={() => setShowDownload(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition"
        >
          <FiX size={20} />
        </button>

        <div className="flex flex-col items-center text-center mb-6 mt-2">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
            <FiDownloadCloud size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Download Video
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to download this video to your device?
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowDownload(false)}
            className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={loading}
            className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl transition shadow-sm flex justify-center items-center"
          >
            {loading ? (
               <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Downloading
               </span>
            ) : "Download"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoDownloadBox;
