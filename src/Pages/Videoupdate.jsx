import React, { useState } from "react";

function VideoUpdatePage() {
   const [thumbnail, setThumbnail] = useState("https://source.unsplash.com/random/400x225/?video");
   const [video, setVideo] = useState(null);
   const [title, setTitle] = useState("My Awesome Video");
   const [description, setDescription] = useState("This is the description of the video...");

   // Handle Thumbnail Change
   const handleThumbnailChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setThumbnail(URL.createObjectURL(file));
         setThumbnail(file); // save actual file for upload
      }
   };

   // Handle Video Upload
   const handleVideoChange = (e) => {
      const file = e.target.files[0];
      if (file) setVideo(file);
   };

   // Upload Video Only
   const handleVideoUpload = async () => {
      if (!video) return alert("Please select a video!");
      const formData = new FormData();
      formData.append("video", video);

      await fetch("http://localhost:3000/api/v1/videos/update-video", {
         method: "POST",
         body: formData,
      });

      alert("✅ Video updated successfully!");
   };

   // Upload Thumbnail Only
   const handleThumbnailUpload = async () => {
      if (!thumbnail || typeof thumbnail === "string") return alert("Please select a thumbnail!");
      const formData = new FormData();
      formData.append("thumbnail", thumbnail);

      await fetch("http://localhost:3000/api/v1/videos/update-thumbnail", {
         method: "POST",
         body: formData,
      });

      alert("✅ Thumbnail updated successfully!");
   };

   // Update Text Details Only
   const handleDetailsUpdate = async () => {
      await fetch("http://localhost:3000/api/v1/videos/update-details", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ title, description }),
      });

      alert("✅ Details updated successfully!");
   };

   return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-200 p-4 sm:p-8">
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
                        className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                     >
                        Update Video
                     </button>
                  </div>

                  {/* Thumbnail Upload */}
                  <div>
                     <label className="block text-sm font-medium mb-2">Thumbnail</label>
                     <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        <img
                           src={typeof thumbnail === "string" ? thumbnail : URL.createObjectURL(thumbnail)}
                           alt="Thumbnail Preview"
                           className="w-full h-full object-cover"
                        />
                        <input
                           type="file"
                           accept="image/*"
                           onChange={handleThumbnailChange}
                           className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                     </div>
                     <button
                        onClick={handleThumbnailUpload}
                        className="mt-2 w-full px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700  transition"
                     >
                        Update Thumbnail
                     </button>
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
                  <div className="flex justify-end">
                     <button
                        onClick={handleDetailsUpdate}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition cursor-pointer"
                     >
                        Update Details
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default VideoUpdatePage;
