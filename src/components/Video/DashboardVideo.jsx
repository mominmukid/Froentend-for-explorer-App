import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import timeAgo from "../../utils/uploadedTime";
import formatDuration from "../../utils/formatDuration";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { deleteVideo } from "../../store/VideoFeatureSlice";
import { useDispatch } from "react-redux";
import { MdEdit, MdDeleteOutline, MdVisibility, MdThumbUp } from "react-icons/md";

function DashboardVideo({ video, handleDeleteVideo }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { createdAt, viewsCount, likeCount, title, duration, _id, thumbnail } = video;

  const formattedDate = timeAgo(createdAt);

  // Confirm delete function
  const confirmDelete = () => {
    confirmDialog({
      message: (
        <div className="text-center text-gray-800 dark:text-gray-200">
          Are you sure you want to delete <span className="font-semibold">"{title}"</span>?
          This action cannot be undone.
        </div>
      ),
      header: (
        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">Delete Video</div>
      ),
      icon: "pi pi-exclamation-triangle text-red-500 mr-2 text-xl",
      accept: async () => {
        try {
          const result = await dispatch(deleteVideo(_id));
          if (deleteVideo.fulfilled.match(result)) {
            if (typeof handleDeleteVideo === "function") {
              handleDeleteVideo(_id);
            }
            toast.current?.show({
              severity: "success",
              summary: "Deleted",
              detail: "Video deleted successfully",
              life: 2500,
              content: (
                <div className="p-4 rounded-xl shadow-md bg-emerald-600 text-white flex flex-col">
                  <span className="font-bold">Deleted</span>
                  <span className="text-sm">Video deleted successfully</span>
                </div>
              ),
            });
          }
        } catch (e) {
          console.error(e);
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to delete video",
            life: 2500,
            content: (
              <div className="p-4 rounded-xl shadow-md bg-red-600 text-white flex flex-col">
                <span className="font-bold">Error</span>
                <span className="text-sm">Failed to delete video</span>
              </div>
            ),
          });
        }
      },
      rejectClassName:
        "px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition",
      acceptClassName:
        "px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition",
      className:
        "rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 w-[90%] sm:w-[420px]",
      footerClassName: "flex justify-end gap-3 px-4 pt-4",
    });
  };

  return (
    <div
      onClick={() => navigate(`/video/${_id}`, { state: { _id } })}
      className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-3 sm:p-4 gap-4 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer hover:shadow-md transition-all group"
    >
      <Toast ref={toast} position="top-right" />
      <ConfirmDialog />

      <div className="flex flex-col sm:flex-row gap-4 flex-1 min-w-0">
        {/* Thumbnail */}
        <div className="relative sm:flex-shrink-0 w-full sm:w-44 aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={thumbnail || "/Images/alt.avif"}
            alt={title}
            onError={(e) => {
              e.currentTarget.src = "/Images/alt.avif";
            }}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
          <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-xs font-medium px-1.5 py-0.5 rounded text-white">
            {formatDuration(duration)}
          </span>
        </div>

        {/* Video Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5 hover:text-blue-500 transition line-clamp-2">
            {title}
          </h3>

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2.5">
            <span className="flex items-center gap-1">
              <MdVisibility className="text-sm" />
              {viewsCount || 0} views
            </span>
            <span className="flex items-center gap-1 text-emerald-500 dark:text-emerald-400 font-medium">
              <MdThumbUp className="text-sm" />
              {likeCount || 0} likes
            </span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/video/update/${_id}`, { state: { _id } });
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-xs font-semibold rounded-lg transition"
        >
          <MdEdit size={15} />
          <span>Edit</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            confirmDelete();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60 text-xs font-semibold rounded-lg transition"
        >
          <MdDeleteOutline size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

export default DashboardVideo;
