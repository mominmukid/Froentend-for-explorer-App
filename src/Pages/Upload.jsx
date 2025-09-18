import React, { useState } from "react";

function Upload() {
   const [videoFile, setVideoFile] = useState(null);
   const [thumbnail, setThumbnail] = useState(null);
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");

   const handleVideoChange = (e) => {
      setVideoFile(e.target.files[0]);
   };

   const handleThumbnailChange = (e) => {
      setThumbnail(e.target.files[0]);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!videoFile) {
         alert("Please select a video file to upload!");
         return;
      }
      alert("Upload functionality will be implemented here!");
   };

   return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white flex items-center justify-center p-6">
         <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8">

            {/* Header */}
            <h1 className="text-2xl font-bold mb-6 text-center">
               🎬 Upload Your Video
            </h1>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>

               {/* Video Upload */}
               <div>
                  <label className="block text-sm font-medium mb-2">
                     Select Video
                  </label>
                  <div className="border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
                     <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="hidden"
                        id="video-upload"
                     />
                     <label htmlFor="video-upload" className="cursor-pointer text-center">
                        {videoFile ? (
                           <p className="text-green-500 font-medium">{videoFile.name}</p>
                        ) : (
                           <p className="text-gray-500">
                              Click to select video file or drag & drop
                           </p>
                        )}
                     </label>
                  </div>
               </div>

               {/* Thumbnail Upload */}
               <div>
                  <label className="block text-sm font-medium mb-2">
                     Upload Thumbnail (optional)
                  </label>
                  <input
                     type="file"
                     accept="image/*"
                     onChange={handleThumbnailChange}
                     className="block w-full text-sm text-gray-500 
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-600 file:text-white
                         hover:file:bg-blue-700 cursor-pointer"
                  />
                  {thumbnail && (
                     <p className="mt-2 text-green-500 font-medium">
                        {thumbnail.name}
                     </p>
                  )}
               </div>

               {/* Title */}
               <div>
                  <label className="block text-sm font-medium mb-2">
                     Video Title
                  </label>
                  <input
                     type="text"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     required
                     className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                     placeholder="Enter your video title"
                  />
               </div>

               {/* Description */}
               <div>
                  <label className="block text-sm font-medium mb-2">
                     Description
                  </label>
                  <textarea
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     rows="4"
                     className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                     placeholder="Add video description, hashtags, links..."
                  ></textarea>
               </div>

               {/* Submit Button */}
               <div className="flex justify-center">
                  <button
                     type="submit"
                     className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer"
                  >
                     Upload Video
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default Upload;
