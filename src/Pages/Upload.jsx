import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { uploadVideo } from "../store/VideoFeatureSlice";
import { toast } from "react-toastify";

const UploadPage = () => {
   const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
   const [videoPreview, setVideoPreview] = useState(null);
   const [thumbnailPreview, setThumbnailPreview] = useState(null);
   const [isUploading, setIsUploading] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const onSubmit = async (data) => {
      setIsUploading(true); // ✅ start uploading state
      alert(`Uploading Video: ${data.title}\nCategory: ${data.category}`);

      try {
         const resultAction = await dispatch(uploadVideo(data));

         if (uploadVideo.fulfilled.match(resultAction)) {
            toast.success("Video Upload successful", {
               position: "top-right",
               autoClose: 500,
               theme: "dark",
            });
            navigate("/");
            // window.location.reload();
         } else {
            throw new Error("Upload failed");
         }
      } catch (e) {
         toast.error("Video upload failed. Please try again.", {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
         });
         navigate("/upload");
         console.error(e.message);
      } finally {
         setIsUploading(false); // ✅ stop uploading state
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center p-4">
         <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-700 dark:text-gray-300">Upload Your Video</h1>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

               {/* Video File */}
               <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Video File</label>
                  <input
                     type="file"
                     accept="video/*"
                     {...register("videoFile", { required: "Video file is required" })}
                     onChange={(e) => e.target.files[0] && setVideoPreview(URL.createObjectURL(e.target.files[0]))}
                     className="w-full cursor-pointer px-4 py-2 border rounded-lg border-gray-400 dark:border-gray-600 dark:bg-gray-800 bg-gray-100"
                     disabled={isUploading}
                  />
                  {videoPreview && <video src={videoPreview} controls className="mt-2 w-full rounded-lg" />}
                  {errors.videoFile && <p className="text-red-500 text-sm mt-1">{errors.videoFile.message}</p>}
               </div>

               {/* Thumbnail */}
               <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Thumbnail</label>
                  <input
                     type="file"
                     accept="image/*"
                     {...register("thumbnail", { required: "Thumbnail is required" })}
                     onChange={(e) => e.target.files[0] && setThumbnailPreview(URL.createObjectURL(e.target.files[0]))}
                     className="w-full cursor-pointer px-4 py-2 border rounded-lg border-gray-400 dark:border-gray-600 dark:bg-gray-800 bg-gray-100"
                     disabled={isUploading}
                  />
                  {thumbnailPreview && <img src={thumbnailPreview} alt="Thumbnail Preview" className="mt-2 w-48 h-28 object-cover rounded-lg" />}
                  {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>}
               </div>

               {/* Title */}
               <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Title</label>
                  <input
                     type="text"
                     placeholder="Enter video title"
                     {...register("title", { required: "Title is required" })}
                     className="w-full px-4 py-2 border rounded-lg border-gray-400 dark:border-gray-600 dark:bg-gray-800 bg-gray-100"
                     disabled={isUploading}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
               </div>

               {/* Description */}
               <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Description</label>
                  <textarea
                     rows="4"
                     placeholder="Add description"
                     {...register("description", { required: "Description is required" })}
                     className="w-full px-4 py-2 border rounded-lg border-gray-400 dark:border-gray-600 dark:bg-gray-800 bg-gray-100"
                     disabled={isUploading}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
               </div>

               {/* Category */}
               <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Category</label>
                  <select
                     {...register("category", { required: "Please select a category" })}
                     className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                     disabled={isUploading}
                  >
                     <option value="">Select a category</option>
                     <option value="Education">Education</option>
                     <option value="Entertainment">Entertainment</option>
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
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
               </div>

               {/* Uploading Indicator */}
               {isUploading && (
                  <div className="text-center text-blue-600 font-medium">Uploading...</div>
               )}

               {/* Submit Button */}
               <button
                  type="submit"
                  className={`w-full py-3 text-white font-medium rounded-lg transition-colors ${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                  disabled={isUploading} // ✅ disable while uploading
               >
                  {isUploading ? "Uploading..." : "Upload Video"}
               </button>
            </form>
         </div>
      </div>
   );
};

export default UploadPage;
