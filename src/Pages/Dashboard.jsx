import React, { useEffect, useState, useMemo, useCallback } from "react";
import DashboardVideo from "../components/Video/DashboardVideo";
import { MdCloudUpload, MdOutlineVideoLibrary, MdOutlineRemoveRedEye, MdPeopleOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../store/UserSlice";
import { getvideosUser } from "../store/VideoFeatureSlice";
import { getChannelSubscibres } from "../store/subscriptionSlice";

function Dashboard() {
  const navigate = useNavigate();
  const reduxUser = useSelector(getUser);
  const [localUser, setLocalUser] = useState(null);
  const dispatch = useDispatch();
  const [userVid, setUserVid] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [totalSubscribers, setTotalSubscribers] = useState([]);

  // Load user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const data = JSON.parse(userData);
        setLocalUser(data?.user || data);
      } catch {
        setLocalUser(null);
      }
    }
  }, [reduxUser]);

  const user = reduxUser?.username ? reduxUser : (reduxUser?.user || localUser);

  // Fetch videos
  const fetchVideos = useCallback(async () => {
    setLoadingVideos(true);
    try {
      const resultAction = await dispatch(getvideosUser());
      if (getvideosUser.fulfilled.match(resultAction)) {
        setUserVid(resultAction.payload || []);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoadingVideos(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Fetch subscribers when user id is available
  useEffect(() => {
    const userId = user?._id;
    if (!userId) return;

    const fetchSubscribers = async () => {
      try {
        const resultAction = await dispatch(getChannelSubscibres(userId));
        if (getChannelSubscibres.fulfilled.match(resultAction)) {
          setTotalSubscribers(resultAction.payload || []);
        }
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };
    fetchSubscribers();
  }, [dispatch, user?._id]);

  const videoList = useMemo(() => {
    if (!userVid || userVid.length === 0) return [];
    const videos = userVid[0]?.userVideos || (Array.isArray(userVid) ? userVid : []);
    return [...videos].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }, [userVid]);

  const totalViews = useMemo(() => {
    return videoList.reduce((acc, video) => acc + (Number(video.viewsCount) || 0), 0);
  }, [videoList]);

  const handleDeleteVideo = useCallback((deletedId) => {
    setUserVid((prev) => {
      if (!prev || !prev[0]) return prev;
      return [
        {
          ...prev[0],
          userVideos: (prev[0].userVideos || []).filter((v) => v._id !== deletedId),
        },
      ];
    });
  }, []);

  return (
    <div className="min-h-screen pb-16 max-w-7xl mx-auto px-4 pt-18">
      {/* Cover Banner */}
      <div className="w-full h-44 sm:h-56 md:h-64 rounded-3xl overflow-hidden relative shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        {user?.coverImage && (
          <img
            src={user.coverImage}
            alt="Channel Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-14 px-4 sm:px-8 mb-8 gap-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
          <div className="relative z-0 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white dark:border-[#202222] shadow-xl bg-gray-200 dark:bg-gray-700">
            <img
              src={user?.avatar || "/Images/profile.png"}
              alt="Avatar"
              onError={(e) => {
                e.currentTarget.src = "/Images/profile.png";
              }}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {user?.fullname || user?.username || "Creator Channel"}
            </h1>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              @{user?.username || "creator"}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/upload")}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] text-white font-semibold rounded-xl shadow-md hover:opacity-95 transition cursor-pointer"
        >
          <MdCloudUpload className="text-xl" />
          <span>Upload Video</span>
        </button>
      </div>

      {/* Metrics / Stats Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl">
            <MdOutlineVideoLibrary />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Total Videos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{videoList.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl">
            <MdOutlineRemoveRedEye />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Total Views</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{totalViews.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center text-2xl">
            <MdPeopleOutline />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Subscribers</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{totalSubscribers.length.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Videos List Section */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Uploaded Videos</h2>
          <span className="text-xs text-gray-500 font-medium">{videoList.length} total</span>
        </div>

        {loadingVideos ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
            ))}
          </div>
        ) : videoList.length > 0 ? (
          <div className="flex flex-col gap-3.5">
            {videoList.map((video) => (
              <DashboardVideo
                key={video._id}
                video={video}
                handleDeleteVideo={handleDeleteVideo}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800/60 border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-950/30 text-red-500 flex items-center justify-center mx-auto text-2xl mb-3">
              <MdCloudUpload />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No videos uploaded yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-5">
              Upload your first video to share it with the world and build your audience!
            </p>
            <button
              onClick={() => navigate("/upload")}
              className="px-5 py-2.5 bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] text-white font-medium rounded-xl shadow-xs hover:opacity-95 transition cursor-pointer"
            >
              Upload Video
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
