import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import VideoCard from "../components/Video/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsvisibalTrue } from "../store/VideoSlice";
import { fetchAsyncVideos, getAllVideos, getVideoStatus } from "../store/VideoFeatureSlice";
import DownloadCard from "../components/download/DownloadCard";
import PlaylistPopUp from "../components/playlist/PlaylistPopUp";
import { selectSearchVideos, clearSearch } from "../store/searchSlice";
import Loader from "./Loader";
import Share from "../components/share/Share";
import { STATUS } from "../utils/status";
import { FiFilm, FiRefreshCw } from "react-icons/fi";

const CATEGORIES = [
  "All", "Music", "Gaming", "Education", "Entertainment",
  "Science & Technology", "Sports", "Comedy", "Vlogs",
];

const VIDEOS_PER_PAGE = 8;

function Home() {
  const dispatch = useDispatch();
  const [showShare, setShowShare] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(VIDEOS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);

  const searchResults = useSelector(selectSearchVideos);
  const rawVideos = useSelector(getAllVideos);
  const videoStatus = useSelector(getVideoStatus);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        dispatch(toggleIsvisibalTrue());
        setLoading(true);
        await dispatch(fetchAsyncVideos(100));
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, [dispatch]);

  // Sort by most recent
  const sortedVideos = useMemo(() => {
    const list = Array.isArray(rawVideos) ? [...rawVideos] : [];
    return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }, [rawVideos]);

  // Filter by category or search
  const filteredVideos = useMemo(() => {
    if (searchResults && searchResults.length > 0) return searchResults;
    if (selectedCategory === "All") return sortedVideos;
    return sortedVideos.filter(
      (video) => video.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [searchResults, sortedVideos, selectedCategory]);

  // Paginated slice
  const displayedVideos = useMemo(() => {
    return filteredVideos.slice(0, visibleCount);
  }, [filteredVideos, visibleCount]);

  const hasMore = visibleCount < filteredVideos.length;

  // Reset pagination when category/search changes
  useEffect(() => {
    setVisibleCount(VIDEOS_PER_PAGE);
  }, [selectedCategory, searchResults]);

  // Infinite scroll with IntersectionObserver
  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    // Small delay to show loading indicator
    setTimeout(() => {
      setVisibleCount((prev) => prev + VIDEOS_PER_PAGE);
      setLoadingMore(false);
    }, 300);
  }, [hasMore, loadingMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  const handleRefresh = () => {
    dispatch(clearSearch());
    setSelectedCategory("All");
    setVisibleCount(VIDEOS_PER_PAGE);
    dispatch(fetchAsyncVideos(100));
  };

  const shareLink = typeof window !== "undefined" && id ? `${window.location.origin}/video/${id}` : "";

  return (
    <div className="min-h-screen pb-12">
      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 hide-scrollbar pt-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                if (searchResults.length > 0) dispatch(clearSearch());
              }}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xs"
                  : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Show loader while fetching */}
      {loading || videoStatus === STATUS.LOADING ? (
        <Loader count={8} />
      ) : displayedVideos.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayedVideos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                setShowShare={setShowShare}
                setId={setId}
                setShowDownload={setShowDownload}
                setShowPlaylist={setShowPlaylist}
              />
            ))}
          </div>

          {/* Infinite scroll sentinel & loading indicator */}
          {hasMore && (
            <div ref={sentinelRef} className="flex justify-center py-8">
              {loadingMore ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-3 border-gray-300 dark:border-gray-600 border-t-red-500 rounded-full animate-spin" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Loading more videos...</span>
                </div>
              ) : (
                <div className="h-1" />
              )}
            </div>
          )}

          {/* End of results indicator */}
          {!hasMore && filteredVideos.length > VIDEOS_PER_PAGE && (
            <div className="text-center py-6">
              <p className="text-sm text-gray-400 dark:text-gray-500">You've reached the end • {filteredVideos.length} videos</p>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center text-3xl mb-4">
            <FiFilm />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No videos found</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md text-sm mb-6">
            {searchResults.length > 0
              ? "We couldn't find any videos matching your search. Try different keywords or clear your search."
              : selectedCategory !== "All"
              ? `There are no videos uploaded in the \"${selectedCategory}\" category yet.`
              : "No videos are available right now. Be the first to upload one!"}
          </p>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] text-white font-medium rounded-xl shadow-md hover:opacity-95 transition cursor-pointer"
          >
            <FiRefreshCw className="text-sm" />
            Reset Filters
          </button>
        </div>
      )}

      {/* Modals */}
      {showShare && <Share setShowShare={setShowShare} links={shareLink} />}
      {showDownload && <DownloadCard setShowDownload={setShowDownload} videoId={id} />}
      {showPlaylist && <PlaylistPopUp setShowPlaylist={setShowPlaylist} videoId={id} />}
    </div>
  );
}

export default Home;
