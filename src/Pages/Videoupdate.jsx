import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateVideo, updateThumnel, updateVideoDetails } from "../store/VideoFeatureSlice";
import { toast } from "react-toastify";

function VideoUpdatePage() {
   const [thumbnail, setThumbnail] = useState(null);
   const [video, setVideo] = useState(null);
   const [title, setTitle] = useState("My Awesome Video");
   const [description, setDescription] = useState("This is the description of the video...");

   // separate loading states
   const [videoUploading, setVideoUploading] = useState(false);
   const [thumbnailUploading, setThumbnailUploading] = useState(false);
   const [detailsUpdating, setDetailsUpdating] = useState(false);

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { id } = useParams();

   // Handle Video Upload
   const handleVideoChange = (e) => {
      const file = e.target.files[0];
      if (file) setVideo(file);
   };

   const handleThumbnailChange = (e) => {
      const file = e.target.files[0];
      if (file) setThumbnail(file);
   };

   // Upload Video Only
   const handleVideoUpload = async () => {
      if (!video) return alert("Please select a new Video first!");
      const confirmed = window.confirm("Are you sure you want to update your Video?");
      if (!confirmed) return;

      try {
         setVideoUploading(true);
         const resultAction = await dispatch(updateVideo({ id, video }));

         if (updateVideo.fulfilled.match(resultAction)) {
            toast.success("Video Updated successfully!", {
               position: "top-right",
               autoClose: 800,
               theme: "dark",
            });
            navigate(`/video/${id}`);
         } else {
            throw new Error("Update action was not fulfilled");
         }
      } catch (error) {
         console.error(error);
         toast.error("Video update failed. Please try again.", {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
         });
      } finally {
         setVideoUploading(false);
      }
   };

   const handleThumbnailUpload = async () => {
      if (!thumbnail) return alert("Please select a new Thumbnail first!");
      const confirmed = window.confirm("Are you sure you want to update your Thumbnail?");
      if (!confirmed) return;

      try {
         setThumbnailUploading(true);
         const resultAction = await dispatch(updateThumnel({ id, thumbnail }));

         if (updateThumnel.fulfilled.match(resultAction)) {
            toast.success("Thumbnail Updated successfully!", {
               position: "top-right",
               autoClose: 800,
               theme: "dark",
            });
            navigate(`/`);
         } else {
            throw new Error("Update action was not fulfilled");
         }
      } catch (error) {
         console.error(error);
         toast.error("Thumbnail update failed. Please try again.", {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
         });
      } finally {
         setThumbnailUploading(false);
      }
   };

   const handleDetailsUpdate = async () => {
      if (!title.trim() || !description.trim())
         return alert("Please add a Title and Description first!");
      const confirmed = window.confirm("Are you sure you want to update your Video Title and Description?");
      if (!confirmed) return;

      try {
         setDetailsUpdating(true);
         const resultAction = await dispatch(updateVideoDetails({ id, title, description }));

         if (updateVideoDetails.fulfilled.match(resultAction)) {
            toast.success("Title and Description Updated successfully!", {
               position: "top-right",
               autoClose: 800,
               theme: "dark",
            });
            navigate(`/`);
         } else {
            throw new Error("Update action was not fulfilled");
         }
      } catch (error) {
         console.error(error);
         toast.error("Title/Description update failed. Please try again.", {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
         });
      } finally {
         setDetailsUpdating(false);
      }
   };
   
   return (
      <div className="min-h-screen text-gray-900 dark:text-gray-200 p-4 sm:p-8">
         <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-10">
            <h1 className="text-2xl font-bold mb-6">Update Video</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* Left Section (Video & Thumbnail) */}
               <div className="col-span-1 space-y-6">
                  {/* Video Upload */}
                  <div>
                     <label className="block text-sm font-medium mb-2">Upload Video</label>
                     <div className="relative w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        {video ? (
                           <video
                              src={URL.createObjectURL(video)}
                              controls
                              className="w-full h-full object-cover rounded-lg"
                           />
                        ) : (
                           <span className="text-gray-500">No video selected</span>
                        )}
                        <input
                           type="file"
                           accept="video/*"
                           onChange={handleVideoChange}
                           className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                     </div>
                     <button
                        onClick={handleVideoUpload}
                        disabled={videoUploading}
                        className={`mt-2 w-full px-4 py-2 rounded-lg text-white transition cursor-pointer ${videoUploading
                           ? "bg-gray-400 cursor-not-allowed"
                           : "bg-blue-600 hover:bg-blue-700"
                           }`}
                     >
                        {videoUploading ? "Uploading..." : "Update Video"}
                     </button>
                     {videoUploading && (
                        <div className="mt-2 text-sm text-blue-600">Video updating... please wait.</div>
                     )}
                  </div>

                  {/* Thumbnail Upload */}
                  <div>
                     <label className="block text-sm font-medium mb-2">Thumbnail</label>
                     <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        {thumbnail ? (
                           <img
                              src={
                                 typeof thumbnail === "string"
                                    ? thumbnail
                                    : URL.createObjectURL(thumbnail)
                              }
                              alt="Thumbnail Preview"
                              className="w-full h-full object-cover"
                           />
                        ) : (
                           <span className="text-gray-500 flex items-center justify-center h-full">
                              No thumbnail selected
                           </span>
                        )}
                        <input
                           type="file"
                           accept="image/*"
                           onChange={handleThumbnailChange}
                           className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                     </div>
                     <button
                        onClick={handleThumbnailUpload}
                        disabled={thumbnailUploading}
                        className={`mt-2 w-full px-4 py-2 rounded-lg text-white transition cursor-pointer ${thumbnailUploading
                           ? "bg-gray-400 cursor-not-allowed"
                           : "bg-blue-600 hover:bg-blue-700"
                           }`}
                     >
                        {thumbnailUploading ? "Uploading..." : "Update Thumbnail"}
                     </button>
                     {thumbnailUploading && (
                        <div className="mt-2 text-sm text-blue-600">Thumbnail updating... please wait.</div>
                     )}
                  </div>
               </div>

               {/* Right Section (Details) */}
               <div className="col-span-2 space-y-6">
                  {/* Title */}
                  <div>
                     <label htmlFor="title" className="block text-sm font-medium">
                        Title
                     </label>
                     <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                     />
                  </div>

                  {/* Description */}
                  <div>
                     <label htmlFor="description" className="block text-sm font-medium">
                        Description
                     </label>
                     <textarea
                        id="description"
                        rows="6"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full rounded-lg border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                     />
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end flex-col gap-2">
                     <button
                        onClick={handleDetailsUpdate}
                        disabled={detailsUpdating}
                        className={`px-6 py-2 rounded-lg text-white shadow-md transition cursor-pointer ${detailsUpdating
                           ? "bg-gray-400 cursor-not-allowed"
                           : "bg-blue-600 hover:bg-blue-700"
                           }`}
                     >
                        {detailsUpdating ? "Updating..." : "Update Details"}
                     </button>
                     {detailsUpdating && (
                        <div className="text-sm text-blue-600">Title & Description updating... please wait.</div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default VideoUpdatePage;
