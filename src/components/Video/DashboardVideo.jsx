import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import timeAgo from "../../utils/uploadedTime";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { deleteVideo } from '../../store/VideoFeatureSlice';
import { useDispatch } from "react-redux";

function DashboardVideo({ video, setTotalViews, handleDeleteVideo }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { createdAt, views, likeCount, title, duration, _id, thumbnail } = video;

  const formattedDate = timeAgo(createdAt);

  useEffect(() => {
    setTotalViews((prevTotal) => prevTotal + Number(views?.[0] || 0));
  }, [views, setTotalViews]);

  // Confirm delete function
  const confirmDelete = () => {
    confirmDialog({
      message: (
        <div className="text-center text-gray-800 dark:text-gray-200">
          Are you sure you want to delete <span className="font-semibold">{title}</span>?
        </div>
      ),
      header: (
        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">Confirm Delete</div>
      ),
      icon: "pi pi-exclamation-triangle text-yellow-500 mr-2 text-xl",
      accept: async () => {
        try {
          const result = await dispatch(deleteVideo(_id));
          if (deleteVideo.fulfilled.match(result)) {
            // Remove from parent dashboard without navigating
            handleDeleteVideo(_id);

            toast.current.show({
              severity: "success",
              summary: "Deleted",
              detail: "Video deleted successfully",
              life: 2500,
              content: (
                <div className="p-4 rounded-lg shadow-md bg-green-600 text-white flex flex-col">
                  <span className="font-bold">Deleted</span>
                  <span className="text-sm">Video deleted successfully</span>
                </div>
              ),
            });
          }
        } catch (error) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to delete video",
            life: 2500,
            content: (
              <div className="p-4 rounded-lg shadow-md bg-red-600 text-white flex flex-col">
                <span className="font-bold">Error</span>
                <span className="text-sm">Failed to delete video</span>
              </div>
            ),
          });
        }
      },
      rejectClassName:
        "px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400 transition",
      acceptClassName:
        "px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition",
      className:
        "rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 w-[90%] sm:w-[400px]",
      footerClassName: "flex justify-between px-4 pt-4",
    });
  };

  return (
    <div
      onClick={() => navigate(`/video/${_id}`, { state: { _id } })}
      className="bg-gray-200 dark:bg-gray-800 rounded-lg p-2 sm:p-4 gap-4 flex flex-col sm:flex-row cursor-pointer"
    >
      <Toast ref={toast} position="top-right" />
      <ConfirmDialog />

      {/* Thumbnail */}
      <div className="relative sm:flex-shrink-0">
        <img
          src={thumbnail}
          alt="Video thumbnail"
          className="sm:w-32 sm:h-20 h-36 object-cover rounded w-full"
        />
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-xs px-1 py-0.5 rounded text-white">
          {(duration / 60).toFixed(2)}
        </span>
      </div>

      {/* Video Info */}
      <div className="flex-1">
        <h3 className="font-medium mb-1 hover:underline">{title}</h3>

        <p className="text-gray-700 dark:text-gray-200 text-sm mb-2">
          {views} views • {formattedDate}
        </p>

        <div className="flex items-center gap-4 text-sm mb-3">
          <span className="text-green-400">{likeCount} likes</span>
          <span className="text-gray-800 dark:text-gray-200"></span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/video/update/${_id}`, { state: { _id } });
            }}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            Update
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              confirmDelete(); // ✅ No navigation here
            }}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardVideo;
