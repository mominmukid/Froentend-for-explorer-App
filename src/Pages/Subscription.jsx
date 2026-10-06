import React, { useEffect, useState } from "react";
import Subscribs from "../components/subscription/Subscribs";
import { getUserSubscribers } from "../store/subscriptionSlice";
import { useDispatch } from "react-redux";
import { MdSubscriptions } from "react-icons/md";
import { FiCompass } from "react-icons/fi";
import { useNavigate } from "react-router";

function Subscription() {
  const [subscribes, setSubscribes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchUserSubscribers = async (userId) => {
      try {
        if (!userId) return;
        setLoading(true);
        const resultAction = await dispatch(getUserSubscribers(userId));
        if (getUserSubscribers.fulfilled.match(resultAction)) {
          setSubscribes(resultAction.payload || []);
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchUserSubscribers(user._id);
    } else {
      setLoading(false);
    }
  }, [dispatch, user?._id]);

  return (
    <main className="flex-1 max-w-7xl mx-auto pt-20 pb-16 px-4 min-h-screen">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Subscriptions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Channels you have subscribed to across Wideview
          </p>
        </div>

        {subscribes.length > 0 && (
          <span className="text-xs font-semibold px-3 py-1 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-full w-fit">
            {subscribes.length} {subscribes.length === 1 ? "channel" : "channels"}
          </span>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-60 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          ))}
        </div>
      ) : subscribes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subscribes.map((video) => (
            <Subscribs key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 flex items-center justify-center text-3xl mb-4">
            <MdSubscriptions />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No subscriptions yet
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
            Subscribe to your favorite creators to stay updated whenever they publish new videos!
          </p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] text-white font-medium rounded-xl shadow-xs hover:opacity-95 transition cursor-pointer"
          >
            <FiCompass />
            Explore Channels
          </button>
        </div>
      )}
    </main>
  );
}

export default Subscription;
