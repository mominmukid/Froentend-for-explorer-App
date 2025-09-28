import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import HistoryVideo from "../components/Video/HistoryVideo";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserhistory,
  getUserHistory,
  clerWatchHistory,
} from "../store/UserSlice";
import { toast } from "react-toastify";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";

function History() {
  const userHistory = useSelector(getUserhistory);
  const dispatch = useDispatch();

  let isuserHistoryEmpty = false;
  if (userHistory && userHistory.length === 0) {
    isuserHistoryEmpty = true;
  }

  const [user, setuser] = useState({});


  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed?.user) {
        setuser(parsed.user);

      } else {
        setuser(null);

      }
    } else {
      setuser(null);

    }
  }, [dispatch]);

  const getHistory = async () => {
    if (!user?._id) return;
    dispatch(getUserHistory());
  };

  useEffect(() => {
    getHistory();
  }, [dispatch, user]);

  const handleClearHistory = async () => {
    const resultAction = await dispatch(clerWatchHistory());
    if (clerWatchHistory.fulfilled.match(resultAction)) {
      toast.success("History cleared", {
        position: "top-right",
        autoClose: 500,
        theme: "dark",
      });
    } else {
      toast.error("Clearing history failed", {
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
          Are you sure you want to clear all history?
        </div>
      ),
      header: (
        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
          Confirmation
        </div>
      ),
      icon: "pi pi-exclamation-triangle text-yellow-500 mr-2 text-xl",
      accept: handleClearHistory,
      rejectClassName:
        "px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400 transition",
      acceptClassName:
        "px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition",
      className:
        "rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 w-[90%] sm:w-[400px]",
      footerClassName: "flex justify-between items-center px-4 pt-4 gap-3", // ✅ space buttons apart
    });
  };

  return (
    <>
      <main className="flex-1 mx-auto mt-0 pt-20 min-h-screen px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Watch History</h1>
          <p className="text-gray-800 dark:text-gray-200">
            Keep track of videos you've watched
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              className="bg-red-400 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-medium flex justify-center text-white items-center cursor-pointer opacity-100"
              onClick={confirmClearHistory}
            >
              <MdDeleteForever className="mr-1" />
              Clear all history
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4" data-id="history-list">
          <div data-id="history-today-section">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {isuserHistoryEmpty ? "No history to show" : "Recently Watched"}
            </h2>

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 w-full">
              {userHistory &&
                userHistory.map((video) => (
                  <HistoryVideo key={video._id} video={video} />
                ))}
            </div>
          </div>
        </div>

        {/* Confirm Dialog */}
        <ConfirmDialog />
      </main>
    </>
  );
}

export default History;
