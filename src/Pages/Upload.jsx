import React, { useState } from "react";

function Upload() {
   const [videoFile, setVideoFile] = useState(null);
   const [thumbnail, setThumbnail] = useState(null);
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [category, setCategory] = useState("");

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
      alert(`Uploading "${title}" in category "${category}"`);
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

               {/* Category */}
               <div>
                  <label className="block text-sm font-medium mb-2">
                     Category
                  </label>
                  <select
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                     required
                     className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                     <option value="">Select a category</option>
                     <option value="education">Education</option>
                     <option value="entertainment">Entertainment</option>
                     <option value="Music">Music</option>
                     <option value="Gaming">Gaming</option>
                     <option value="Science & Technology">Science & Technology</option>
                     <option value="Sports">Sports</option>
                     <option value="Vlogs">Vlogs</option>
                     <option value="Comedy">Comedy</option>
                     <option value="Lifestyle">Lifestyle</option>
                     <option value="Movies">Movies</option>
                     <option value="News">News</option>
                     <option value="Travel">Travel</option>
                     <option value="Food">Food</option>
                     <option value="Health & Fitness">Health & Fitness</option>
                     <option value="Fashion & Beauty">Fashion & Beauty</option>
                     <option value="DIY & Crafts">DIY & Crafts</option>
                     <option value="Automotive">Automotive</option>
                     <option value="Animals & Pets">Animals & Pets</option>
                     <option value="Business & Finance">Business & Finance</option>
                     <option value="History">History</option>
                     <option value="Art & Culture">Art & Culture</option>
                     <option value="Politics">Politics</option>
                     <option value="Environment">Environment</option>
                     <option value="Religion & Spirituality">Religion & Spirituality</option>
                     <option value="Parenting">Parenting</option>
                     <option value="Real Estate">Real Estate</option>
                     <option value="Photography">Photography</option>
                     <option value="Books & Literature">Books & Literature</option>
                     <option value="Theater">Theater</option>
                     <option value="Animation">Animation</option>
                     <option value="Documentary">Documentary</option>
                     <option value="Short Films">Short Films</option>
                     <option value="Others">Others</option>
                  </select>
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
