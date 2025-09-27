import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { uploadVideo } from "../store/VideoFeatureSlice";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";


const UploadPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);

  // Tailwind styled confirm dialog
  const confirmUpload = (data) => {
    confirmDialog({
      message: (
        <div className="text-center text-gray-800 dark:text-gray-200">
          <p className="mb-2">Are you sure you want to upload this video?</p>
          <p className="text-blue-600 font-semibold mb-1">Title: {data.title}</p>
          <p className="text-green-600 font-semibold">Category: {data.category}</p>
        </div>
      ),
      header: (
        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">Confirm Upload</div>
      ),
      icon: "pi pi-exclamation-triangle text-yellow-500 mr-2 text-xl",
      accept: () => doUpload(data),
      rejectClassName:
        "px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400 transition",
      acceptClassName:
        "px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition",
      className:
        "rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 w-[90%] sm:w-[400px]",
      footerClassName: "flex justify-between px-4 pt-4",
    });
  };

  // Tailwind styled toast
  const showToast = (severity, summary, detail) => {
    const severityStyles = {
      info: "bg-blue-600 text-white",
      success: "bg-green-600 text-white",
      warn: "bg-yellow-500 text-black",
      error: "bg-red-600 text-white",
    };
    toast.current.show({
      severity,
      summary,
      detail,
      life: 2500,
      content: (
        <div className={`p-4 rounded-lg shadow-md ${severityStyles[severity]} flex flex-col`}>
          <span className="font-bold">{summary}</span>
          <span className="text-sm">{detail}</span>
        </div>
      ),
    });
  };

  const doUpload = async (data) => {
    setIsUploading(true);
    showToast("info", "Uploading...", "Your video is being uploaded");

    try {
      const resultAction = await dispatch(uploadVideo(data));
      if (uploadVideo.fulfilled.match(resultAction)) {
        showToast("success", "Success", "Video uploaded successfully 🎉");
        navigate("/");
      } else throw new Error("Upload failed");
    } catch (e) {
      console.error(e.message);
      showToast("error", "Error", "Video upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-800">
      <Toast ref={toast} position="top-right" />
      <ConfirmDialog />

      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-700 dark:text-gray-300">
          Upload Your Video
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit(confirmUpload)}>
          {/* Video File */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Video File
            </label>
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
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("thumbnail", { required: "Thumbnail is required" })}
              onChange={(e) => e.target.files[0] && setThumbnailPreview(URL.createObjectURL(e.target.files[0]))}
              className="w-full cursor-pointer px-4 py-2 border rounded-lg border-gray-400 dark:border-gray-600 dark:bg-gray-800 bg-gray-100"
              disabled={isUploading}
            />
            {thumbnailPreview && (
              <img src={thumbnailPreview} alt="Thumbnail Preview" className="mt-2 w-48 h-28 object-cover rounded-lg" />
            )}
            {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Title
            </label>
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
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Description
            </label>
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
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Category
            </label>
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

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 text-white font-medium rounded-lg transition-colors ${
              isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
