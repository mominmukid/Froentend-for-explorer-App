import React, { useEffect, useState, useCallback } from "react";
import { MdDeleteForever, MdOutlineHistory } from "react-icons/md";
import { FiCompass } from "react-icons/fi";
import HistoryVideo from "../components/Video/HistoryVideo";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserhistory,
  getUserHistory,
  clerWatchHistory,
} from "../store/UserSlice";
import { toast } from "react-toastify";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useNavigate } from "react-router";

function History() {
  const userHistory = useSelector(getUserhistory);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed?.user || parsed);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    if (!user?._id) return;
    try {
      await dispatch(getUserHistory());
    } catch (err) {
      console.error(err);
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleClearHistory = async () => {
    const resultAction = await dispatch(clerWatchHistory());
    if (clerWatchHistory.fulfilled.match(resultAction)) {
      toast.success("Watch history cleared", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
    } else {
      toast.error("Failed to clear watch history", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  const confirmClearHistory = () => {
    confirmDialog({
      message: (
        <div className="text-center text-gray-800 dark:text-gray-200">
          Are you sure you want to clear your entire watch history?
        </div>
      ),
      header: (
        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
          Clear History
        </div>
      ),
      icon: "pi pi-exclamation-triangle text-red-500 mr-2 text-xl",
      accept: handleClearHistory,
      rejectClassName:
        "px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition",
      acceptClassName:
        "px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition",
      className:
        "rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 w-[90%] sm:w-[400px]",
      footerClassName: "flex justify-end gap-3 px-4 pt-4",
    });
  };

  const hasHistory = Array.isArray(userHistory) && userHistory.length > 0;

  return (
    <main className="flex-1 max-w-6xl mx-auto pt-20 pb-16 px-4 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Watch History
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Keep track of videos you've watched across Wideview
          </p>
        </div>

        {hasHistory && (
          <button
            className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-xl text-sm font-semibold transition cursor-pointer"
            onClick={confirmClearHistory}
          >
            <MdDeleteForever className="text-lg" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* History List or Empty State */}
      {hasHistory ? (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          {userHistory.map((video) => (
            <HistoryVideo key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 flex items-center justify-center text-3xl mb-4">
            <MdOutlineHistory />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No watch history yet
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
            Videos you watch will appear here so you can easily pick up where you left off.
          </p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] text-white font-medium rounded-xl shadow-xs hover:opacity-95 transition cursor-pointer"
          >
            <FiCompass />
            Explore Videos
          </button>
        </div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog />
    </main>
  );
}

export default History;
