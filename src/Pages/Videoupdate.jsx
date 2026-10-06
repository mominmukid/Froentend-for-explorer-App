import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updateVideoDetails,
  fetchAsyncVideoSingle,
} from "../store/VideoFeatureSlice";
import { toast } from "react-toastify";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { FiImage, FiVideo, FiUploadCloud } from "react-icons/fi";
import { UPLOAD_URL } from "../utils/apiConfig";

function VideoUpdatePage() {
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [videoUploading, setVideoUploading] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [thumbnailProgress, setThumbnailProgress] = useState(0);

  const [detailsUpdating, setDetailsUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) setVideo(file);
  };

  useEffect(() => {
    const oldVideoDetails = async () => {
      try {
        setLoading(true);
        const resultAction = await dispatch(fetchAsyncVideoSingle(id));
        if (fetchAsyncVideoSingle.fulfilled.match(resultAction)) {
          const videoData = resultAction.payload;
          setTitle(videoData.title || "");
          setDescription(videoData.description || "");
          setThumbnail(videoData.thumbnail || videoData.thumbnailUrl || null);
        } else {
          throw new Error("Update action not fulfilled");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch video details");
      } finally {
        setLoading(false);
      }
    };
    if (id) oldVideoDetails();
  }, [dispatch, id]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) setThumbnail(file);
  };

  const showConfirm = (message, onAccept) => {
    confirmDialog({
      message: <div className="text-center text-gray-800 dark:text-gray-200">{message}</div>,
      header: <div className="font-bold text-lg text-gray-900 dark:text-white">Confirm Action</div>,
      icon: "pi pi-info-circle text-blue-500 mr-2 text-xl",
      accept: onAccept,
      rejectClassName:
        "px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition font-medium mr-2",
      acceptClassName:
        "px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow-sm",
      className:
        "rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 w-[90%] sm:w-[450px]",
      footerClassName: "flex justify-end pt-6 mt-4 border-t border-gray-100 dark:border-gray-800",
    });
  };

  const handleVideoUpload = () => {
    if (!video) return toast.warn("Please select a new video first!");
    showConfirm("Are you sure you want to update the video file? This might take a while.", () => {
      setVideoUploading(true);
      setVideoProgress(0);

      const formData = new FormData();
      formData.append("video", video);

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setVideoProgress(percent);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setVideoProgress(100);
          toast.success("Video updated successfully!", { theme: "dark" });
          setTimeout(() => navigate(`/video/${id}`), 1000);
        } else {
          toast.error("Video update failed.");
        }
        setVideoUploading(false);
      });

      xhr.addEventListener("error", () => {
        toast.error("Network error updating video.");
        setVideoUploading(false);
      });

      xhr.open("PATCH", `${UPLOAD_URL}/videos/updatevideo/${id}`);
      xhr.withCredentials = true;
      xhr.send(formData);
    });
  };

  const handleThumbnailUpload = () => {
    if (!thumbnail || typeof thumbnail === "string") return toast.warn("Please select a new thumbnail image first!");
    showConfirm("Are you sure you want to update the thumbnail?", () => {
      setThumbnailUploading(true);
      setThumbnailProgress(0);

      const formData = new FormData();
      formData.append("Thumbnel", thumbnail);

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setThumbnailProgress(percent);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setThumbnailProgress(100);
          toast.success("Thumbnail updated successfully!", { theme: "dark" });
        } else {
          toast.error("Thumbnail update failed.");
        }
        setThumbnailUploading(false);
      });

      xhr.addEventListener("error", () => {
        toast.error("Network error updating thumbnail.");
        setThumbnailUploading(false);
      });

      xhr.open("PATCH", `${UPLOAD_URL}/videos/updade-thumnel/${id}`);
      xhr.withCredentials = true;
      xhr.send(formData);
    });
  };

  const handleDetailsUpdate = async () => {
    if (!title.trim() || !description.trim())
      return toast.warn("Title and description are required!");
    showConfirm("Are you sure you want to update the video details?", async () => {
      try {
        setDetailsUpdating(true);
        const resultAction = await dispatch(updateVideoDetails({ id, title, description }));
        if (updateVideoDetails.fulfilled.match(resultAction)) {
          toast.success("Details updated successfully!", { theme: "dark" });
          navigate(`/video/${id}`);
        } else {
          throw new Error("Update action not fulfilled");
        }
      } catch (error) {
        console.error(error);
        toast.error("Details update failed.");
      } finally {
        setDetailsUpdating(false);
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-300 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 pt-6 px-4 max-w-6xl mx-auto text-gray-900 dark:text-white">
      {/* Page Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold">Edit Video</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Update media files, thumbnail, title, and description
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Media Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Video File Upload */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/50">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <FiVideo className="text-blue-500" /> Replace Video File
              </label>
              <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 transition cursor-pointer group">
                {video ? (
                  <video
                    src={URL.createObjectURL(video)}
                    controls
                    className="w-full h-full object-cover z-10 relative"
                  />
                ) : (
                  <div className="text-center p-4 flex flex-col items-center">
                    <FiUploadCloud size={32} className="text-gray-400 mb-2 group-hover:text-blue-500 transition" />
                    <span className="text-sm font-medium text-gray-500">Select new video</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  title="Click to replace video"
                />
              </div>

              {/* Upload Progress Indicator */}
              {videoUploading && (
                <div className="mt-3 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <span>Uploading video...</span>
                    <span>{videoProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-200"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleVideoUpload}
                disabled={videoUploading || !video}
                className={`mt-4 w-full px-4 py-2.5 rounded-xl text-white font-medium shadow-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                  videoUploading || !video ? "bg-blue-400 cursor-not-allowed opacity-70" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {videoUploading ? `Uploading ${videoProgress}%...` : "Update Video"}
              </button>
            </div>

            {/* Thumbnail Upload */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/50">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <FiImage className="text-blue-500" /> Replace Thumbnail
              </label>
              <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 transition cursor-pointer group">
                {thumbnail ? (
                  <img
                    src={
                      typeof thumbnail === "string"
                        ? thumbnail
                        : URL.createObjectURL(thumbnail)
                    }
                    alt="Thumbnail Preview"
                    className="w-full h-full object-cover z-10 relative"
                  />
                ) : (
                  <div className="text-center p-4 flex flex-col items-center">
                    <FiUploadCloud size={32} className="text-gray-400 mb-2 group-hover:text-blue-500 transition" />
                    <span className="text-sm font-medium text-gray-500">Select new thumbnail</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  title="Click to replace thumbnail"
                />
              </div>

              {/* Upload Progress Indicator */}
              {thumbnailUploading && (
                <div className="mt-3 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <span>Uploading thumbnail...</span>
                    <span>{thumbnailProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-200"
                      style={{ width: `${thumbnailProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleThumbnailUpload}
                disabled={thumbnailUploading || (typeof thumbnail === "string")}
                className={`mt-4 w-full px-4 py-2.5 rounded-xl text-white font-medium shadow-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                  thumbnailUploading || (typeof thumbnail === "string") ? "bg-blue-400 cursor-not-allowed opacity-70" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {thumbnailUploading ? `Uploading ${thumbnailProgress}%...` : "Update Thumbnail"}
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold mb-2">
                Video Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Catchy title for your video"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm font-medium text-lg"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="12"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell viewers about your video..."
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm resize-none"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={handleDetailsUpdate}
                disabled={detailsUpdating}
                className={`px-8 py-3 rounded-xl text-white font-semibold shadow-md transition flex items-center justify-center min-w-[180px] cursor-pointer ${
                  detailsUpdating ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {detailsUpdating && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>}
                {detailsUpdating ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog />
    </div>
  );
}

export default VideoUpdatePage;
