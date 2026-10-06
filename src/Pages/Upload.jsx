import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { MdCloudUpload, MdVideoLibrary, MdImage, MdClose } from "react-icons/md";
import { UPLOAD_URL } from "../utils/apiConfig";

const CATEGORIES = [
  "Education", "Entertainment", "Music", "Gaming", "Science & Technology",
  "Sports", "Vlogs", "Comedy", "Lifestyle", "Movies", "News", "Travel",
  "Food", "Health & Fitness", "Fashion & Beauty", "DIY & Crafts",
  "Automotive", "Animals & Pets", "Business & Finance", "History",
  "Art & Culture", "Others",
];

const UploadPage = () => {
  const {
    register, handleSubmit, setValue, clearErrors,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoFileName, setVideoFileName] = useState("");
  const [thumbnailFileName, setThumbnailFileName] = useState("");

  const navigate = useNavigate();
  const toast = useRef(null);
  const xhrRef = useRef(null);

  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
      if (xhrRef.current) xhrRef.current.abort();
    };
  }, [videoPreview, thumbnailPreview]);

  const showToast = (severity, summary, detail) => {
    const styles = {
      info: "bg-blue-600 text-white", success: "bg-emerald-600 text-white",
      warn: "bg-amber-500 text-black", error: "bg-red-600 text-white",
    };
    toast.current?.show({
      severity, summary, detail, life: 3000,
      content: (
        <div className={`p-4 rounded-xl shadow-lg ${styles[severity]} flex flex-col`}>
          <span className="font-bold">{summary}</span>
          <span className="text-sm">{detail}</span>
        </div>
      ),
    });
  };

  const confirmUpload = (data) => {
    confirmDialog({
      message: (
        <div className="text-center text-gray-800 dark:text-gray-200 py-2">
          <p className="mb-2">Are you ready to publish this video?</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Title: {data.title}</p>
          <p className="text-xs text-gray-500 mt-1">Category: {data.category}</p>
        </div>
      ),
      header: (<div className="font-bold text-lg text-gray-900 dark:text-gray-100">Publish Video</div>),
      icon: "pi pi-cloud-upload text-blue-500 mr-2 text-2xl",
      accept: () => doUpload(data),
      rejectClassName: "px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition",
      acceptClassName: "px-4 py-2 rounded-lg bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] text-white hover:opacity-95 transition",
      className: "rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 w-[90%] sm:w-[420px]",
      footerClassName: "flex justify-end gap-3 px-4 pt-4",
    });
  };

  const doUpload = (data) => {
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    if (data.videoFile?.[0]) formData.append("video", data.videoFile[0]);
    if (data.thumbnail?.[0]) formData.append("thumbnel", data.thumbnail[0]);

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(percent);
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setUploadProgress(100);
        showToast("success", "Success", "Video published successfully! 🎉");
        setTimeout(() => navigate("/dashboard"), 1200);
      } else {
        showToast("error", "Upload Failed", "Server returned an error. Please try again.");
      }
      setIsUploading(false);
    });

    xhr.addEventListener("error", () => {
      showToast("error", "Upload Failed", "Network error. Please check your connection.");
      setIsUploading(false);
    });

    xhr.addEventListener("abort", () => {
      showToast("warn", "Cancelled", "Upload was cancelled.");
      setIsUploading(false);
      setUploadProgress(0);
    });

    xhr.open("POST", `${UPLOAD_URL}/videos/publishvideo`);
    xhr.withCredentials = true;
    xhr.send(formData);
  };

  const videoRegister = register("videoFile", {
    required: "Please select a video file",
    onChange: (e) => {
      const file = e.target.files?.[0];
      if (file) {
        clearErrors("videoFile");
        if (videoPreview) URL.revokeObjectURL(videoPreview);
        setVideoPreview(URL.createObjectURL(file));
        setVideoFileName(file.name);
      }
    },
  });

  const thumbnailRegister = register("thumbnail", {
    required: "Please select a thumbnail image",
    onChange: (e) => {
      const file = e.target.files?.[0];
      if (file) {
        clearErrors("thumbnail");
        if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
        setThumbnailPreview(URL.createObjectURL(file));
        setThumbnailFileName(file.name);
      }
    },
  });

  return (
    <div className="min-h-screen py-20 px-4 flex items-center justify-center">
      <Toast ref={toast} position="top-right" />
      <ConfirmDialog />

      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-10 transition">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto text-3xl mb-3 shadow-xs">
            <MdCloudUpload />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Upload Video</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Share your video with creators and viewers worldwide</p>
        </div>

        <form onSubmit={handleSubmit(confirmUpload)} className="space-y-6">
          {/* Video Dropzone */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Video File <span className="text-red-500">*</span>
            </label>
            <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl p-4 transition-all bg-gray-50/50 dark:bg-gray-800/40 text-center">
              {videoPreview ? (
                <div className="space-y-3">
                  <video src={videoPreview} controls className="w-full max-h-64 rounded-xl object-contain bg-black mx-auto" />
                  <div className="flex items-center justify-between px-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="truncate max-w-xs font-medium">{videoFileName}</span>
                    <button type="button" onClick={() => { setVideoPreview(null); setVideoFileName(""); setValue("videoFile", null); }}
                      className="text-red-500 hover:underline cursor-pointer flex items-center gap-1">
                      <MdClose /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center justify-center">
                  <MdVideoLibrary className="text-4xl text-gray-400 dark:text-gray-500 mb-2" />
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Click to select or drag and drop video</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">MP4, WebM, or MOV format supported</p>
                </div>
              )}
              <input type="file" accept="video/*" {...videoRegister} disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
            {errors.videoFile && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.videoFile.message}</p>}
          </div>

          {/* Thumbnail Dropzone */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Thumbnail Image <span className="text-red-500">*</span>
            </label>
            <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl p-4 transition-all bg-gray-50/50 dark:bg-gray-800/40 text-center">
              {thumbnailPreview ? (
                <div className="flex items-center justify-center gap-4">
                  <div className="relative w-48 aspect-video rounded-xl overflow-hidden shadow-sm">
                    <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate max-w-xs">{thumbnailFileName}</p>
                    <button type="button" onClick={() => { setThumbnailPreview(null); setThumbnailFileName(""); setValue("thumbnail", null); }}
                      className="mt-2 text-xs text-red-500 hover:underline cursor-pointer flex items-center gap-1">
                      <MdClose /> Change Thumbnail
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-5 flex flex-col items-center justify-center">
                  <MdImage className="text-3xl text-gray-400 dark:text-gray-500 mb-1" />
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Click to select thumbnail image</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">16:9 ratio recommended (JPG, PNG, WebP)</p>
                </div>
              )}
              <input type="file" accept="image/*" {...thumbnailRegister} disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
            {errors.thumbnail && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.thumbnail.message}</p>}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="e.g. Building a Modern React App in 2026"
              {...register("title", { required: "Title is required", minLength: { value: 3, message: "Title must be at least 3 characters" } })}
              disabled={isUploading}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 transition" />
            {errors.title && <p className="text-red-500 text-xs mt-1 font-medium">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea rows={4} placeholder="Tell viewers about your video..."
              {...register("description", { required: "Description is required" })}
              disabled={isUploading}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 transition" />
            {errors.description && <p className="text-red-500 text-xs mt-1 font-medium">{errors.description.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select {...register("category", { required: "Please select a category" })} disabled={isUploading}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 transition cursor-pointer">
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1 font-medium">{errors.category.message}</p>}
          </div>

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">Uploading...</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {uploadProgress < 100 ? "Please don't close this page while uploading" : "Processing your video..."}
              </p>
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={isUploading}
            className={`w-full py-3.5 rounded-xl text-white font-semibold text-base transition-all shadow-md cursor-pointer ${
              isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] hover:opacity-95"
            }`}>
            {isUploading ? `Uploading ${uploadProgress}%...` : "Publish Video"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
