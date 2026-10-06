import React, { useEffect, useState } from "react";
import LikeCard from "../components/Video/LikesCard";
import { useDispatch, useSelector } from "react-redux";
import { getUserLikedVideo, getUserLikedVideos } from "../store/UserSlice";
import { AiOutlineLike } from "react-icons/ai";
import { FiCompass } from "react-icons/fi";
import { useNavigate } from "react-router";

function LikeVideo() {
  const userLiked = useSelector(getUserLikedVideo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiked = async () => {
      setLoading(true);
      try {
        await dispatch(getUserLikedVideos());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLiked();
  }, [dispatch]);

  const hasLiked = Array.isArray(userLiked) && userLiked.length > 0;

  return (
    <main className="flex-1 max-w-6xl mx-auto pt-20 pb-16 px-4 min-h-screen">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Liked Videos
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Videos you have given a thumbs up
          </p>
        </div>

        {hasLiked && (
          <span className="text-xs font-semibold px-3 py-1 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-full w-fit">
            {userLiked.length} {userLiked.length === 1 ? "video" : "videos"}
          </span>
        )}
      </div>

      {/* Video List */}
      {loading ? (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl" />
          ))}
        </div>
      ) : hasLiked ? (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          {userLiked.map((video) => (
            <LikeCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 flex items-center justify-center text-3xl mb-4">
            <AiOutlineLike />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No liked videos yet
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
            Videos you like while watching will be saved here so you can easily rewatch them anytime.
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
    </main>
  );
}

export default LikeVideo;