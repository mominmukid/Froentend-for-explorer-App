import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateVideo, updateThumnel, updateVideoDetails } from "../store/VideoFeatureSlice";
import { toast } from "react-toastify";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function VideoUpdatePage() {
   const [thumbnail, setThumbnail] = useState(null);
   const [video, setVideo] = useState(null);
   const [title, setTitle] = useState("My Awesome Video");
   const [description, setDescription] = useState("This is the description of the video...");

   const [videoUploading, setVideoUploading] = useState(false);
   const [thumbnailUploading, setThumbnailUploading] = useState(false);
   const [detailsUpdating, setDetailsUpdating] = useState(false);

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { id } = useParams();

   const handleVideoChange = (e) => {
      const file = e.target.files[0];
      if (file) setVideo(file);
   };

   const handleThumbnailChange = (e) => {
      const file = e.target.files[0];
      if (file) setThumbnail(file);
   };

   // Custom Confirm dialog
   const showConfirm = (message, onAccept) => {
      confirmDialog({
         message: <div className="text-center">{message}</div>,
         header: <div className="font-bold text-lg">Confirmation</div>,
         icon: "pi pi-exclamation-triangle text-yellow-500 mr-2 text-xl",
         accept: onAccept,
         rejectClassName: "px-4 py-2 rounded-lg bg-gray-300 text-gray-900 hover:bg-gray-400 transition",
         acceptClassName: "px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition",
         className: "rounded-2xl shadow-lg border border-gray-200 bg-white p-6 w-[90%] sm:w-[400px]",
         footerClassName: "flex justify-between px-4 pt-4",
      });
   };

   const handleVideoUpload = async () => {
      if (!video) return toast.warn("Please select a video first!");
      showConfirm("Are you sure you want to update the video?", async () => {
         try {
            setVideoUploading(true);
            toast.info("Uploading video...", { autoClose: 1000, theme: "dark" });

            const resultAction = await dispatch(updateVideo({ id, video }));
            if (updateVideo.fulfilled.match(resultAction)) {
               toast.success("Video updated successfully!", { autoClose: 1000, theme: "dark" });
               navigate(`/video/${id}`);
            } else {
               throw new Error("Update action not fulfilled");
            }
         } catch (error) {
            console.error(error);
            toast.error("Video update failed. Please try again.", { autoClose: 2000, theme: "dark" });
         } finally {
            setVideoUploading(false);
         }
      });
   };

   const handleThumbnailUpload = async () => {
      if (!thumbnail) return toast.warn("Please select a thumbnail first!");
      showConfirm("Are you sure you want to update the thumbnail?", async () => {
         try {
            setThumbnailUploading(true);
            toast.info("Uploading thumbnail...", { autoClose: 1000, theme: "dark" });

            const resultAction = await dispatch(updateThumnel({ id, thumbnail }));
            if (updateThumnel.fulfilled.match(resultAction)) {
               toast.success("Thumbnail updated successfully!", { autoClose: 1000, theme: "dark" });
               navigate(`/`);
            } else {
               throw new Error("Update action not fulfilled");
            }
         } catch (error) {
            console.error(error);
            toast.error("Thumbnail update failed. Please try again.", { autoClose: 2000, theme: "dark" });
         } finally {
            setThumbnailUploading(false);
         }
      });
   };

   const handleDetailsUpdate = async () => {
      if (!title.trim() || !description.trim()) return toast.warn("Title and description are required!");
      showConfirm("Are you sure you want to update the details?", async () => {
         try {
            setDetailsUpdating(true);
            toast.info("Updating details...", { autoClose: 1000, theme: "dark" });

            const resultAction = await dispatch(updateVideoDetails({ id, title, description }));
            if (updateVideoDetails.fulfilled.match(resultAction)) {
               toast.success("Details updated successfully!", { autoClose: 1000, theme: "dark" });
               navigate(`/`);
            } else {
               throw new Error("Update action not fulfilled");
            }
         } catch (error) {
            console.error(error);
            toast.error("Details update failed. Please try again.", { autoClose: 2000, theme: "dark" });
         } finally {
            setDetailsUpdating(false);
         }
      });
   };

   return (
      <div className="min-h-screen text-gray-900 dark:text-gray-200 p-4 sm:p-8">
         <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-10">
            <h1 className="text-2xl font-bold mb-6">Update Video</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* Video & Thumbnail */}
               <div className="col-span-1 space-y-6">
                  <div>
                     <label className="block text-sm font-medium mb-2">Upload Video</label>
                     <div className="relative w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        {video ? (
                           <video src={URL.createObjectURL(video)} controls className="w-full h-full object-cover rounded-lg" />
                        ) : (
                           <span className="text-gray-500">No video selected</span>
                        )}
                        <input type="file" accept="video/*" onChange={handleVideoChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                     </div>
                     <button
                        onClick={handleVideoUpload}
                        disabled={videoUploading}
                        className={`mt-2 w-full px-4 py-2 rounded-lg text-white ${videoUploading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] hover:scale-102"}`}
                     >
                        {videoUploading ? "Uploading..." : "Update Video"}
                     </button>
                  </div>

                  <div>
                     <label className="block text-sm font-medium mb-2">Thumbnail</label>
                     <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        {thumbnail ? (
                           <img src={typeof thumbnail === "string" ? thumbnail : URL.createObjectURL(thumbnail)} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                        ) : (
                           <span className="text-gray-500 flex items-center justify-center h-full">No thumbnail selected</span>
                        )}
                        <input type="file" accept="image/*" onChange={handleThumbnailChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                     </div>
                     <button
                        onClick={handleThumbnailUpload}
                        disabled={thumbnailUploading}
                        className={`mt-2 w-full px-4 py-2 rounded-lg text-white ${thumbnailUploading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] hover:scale-102"}`}
                     >
                        {thumbnailUploading ? "Uploading..." : "Update Thumbnail"}
                     </button>
                  </div>
               </div>

               {/* Video Details */}
               <div className="col-span-2 space-y-6">
                  <div>
                     <label htmlFor="title" className="block text-sm font-medium">Title</label>
                     <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800" />
                  </div>

                  <div>
                     <label htmlFor="description" className="block text-sm font-medium">Description</label>
                     <textarea id="description" rows="6" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800" />
                  </div>

                  <div className="flex justify-end">
                     <button
                        onClick={handleDetailsUpdate}
                        disabled={detailsUpdating}
                        className={`px-6 py-2 rounded-lg text-white shadow-md ${detailsUpdating ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] hover:scale-102"}`}
                     >
                        {detailsUpdating ? "Updating..." : "Update Details"}
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Global Confirm Dialog */}
         <ConfirmDialog />
      </div>
   );
}

export default VideoUpdatePage;
