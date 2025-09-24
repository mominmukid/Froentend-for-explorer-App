import React, { useEffect, useState } from 'react';
import DashboardVideo from '../components/Video/DashboardVideo';
import { MdCloudUpload } from "react-icons/md";
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../store/UserSlice';
import { getvideosUser } from '../store/VideoFeatureSlice';
import { getChannelSubscibres } from '../store/subscriptionSlice';

function Dashboard() {
  const navigate = useNavigate();
  const reduxUser = useSelector(getUser);
  const [localUser, setLocalUser] = useState(null);
  const dispatch = useDispatch();
  const [userVid, setUserVid] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [fallbackCover, setFallbackCover] = useState(null);
  const [totalViews, setTotalViews] = useState(0);
  const [totalSubscribers, setTotalSubscribers] = useState([]);

  const user = reduxUser?.user || localUser;

  // Load user from localStorage and set fallback cover
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setLocalUser(JSON.parse(userData));
    setFallbackCover("https://picsum.photos/1600/400");
  }, [reduxUser]);

  // Fetch videos
  useEffect(() => {
    const fetchVideo = async () => {
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
    };
    fetchVideo();
  }, []);

  // Fetch subscribers after localUser._id is available
  useEffect(() => {
    if (!localUser?._id) return;

    const fetchSubscribers = async () => {
      setLoadingSubs(true);
      try {
        const resultAction = await dispatch(getChannelSubscibres(localUser._id));
        if (getChannelSubscibres.fulfilled.match(resultAction)) {
          setTotalSubscribers(resultAction.payload || []);
        }
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      } finally {
        setLoadingSubs(false);
      }
    };
    fetchSubscribers();
  }, [dispatch, localUser?._id]);

  return (
    <div className="flex relative min-h-screen">
      {/* Loader overlay */}
      {(loadingVideos || loadingSubs) && (
        <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="mt-4 text-white font-medium text-lg">
            {loadingVideos ? "Loading videos..." : "Loading subscribers..."}
          </span>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 pt-20">
        {/* Header */}
        <div className="w-full h-48 md:h-60 bg-gradient-to-r from-blue-500 to-purple-600">
          {user?.coverImage ? (
            <img src={user.coverImage} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <img src={fallbackCover} alt="Fallback Cover" className="w-full h-full object-cover" />
          )}
        </div>

        {/* Profile Section */}
        <div className="flex justify-center md:justify-between items-center px-6">
          <div className="mt-[-2rem] flex flex-col md:flex-row items-center md:items-start">
            {/* Avatar */}
            <img
              src={user?.avatar || "https://i.pravatar.cc/150?img=5"}
              alt="User Avatar"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg object-cover"
            />

            {/* User Info */}
            <div className="pt-12 md:mt-0 md:ml-6 text-center md:text-left">
              <h2 className="text-2xl font-bold  text-gray-800 dark:text-gray-300">
                {user?.fullname || "Full Name"}
              </h2>
              <p className="text-gray-800 dark:text-gray-300">
                @{user?.username || "username"}
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-200">
            Manage your content and track performance
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-200 rounded-lg p-6">
            <h3 className="text-gray-700 text-sm font-medium mb-2">Total Views</h3>
            <p className="text-2xl font-bold dark:text-gray-800">{totalViews}</p>
          </div>
          <div className="bg-gray-200 rounded-lg p-6">
            <h3 className="text-gray-700 text-sm font-medium mb-2">Subscribers</h3>
            <p className="text-2xl font-bold dark:text-gray-800">{totalSubscribers?.length || 0}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 text-white"
            onClick={() => navigate('/upload')}
          >
            <MdCloudUpload />
            Upload Video
          </button>
        </div>

        {/* Videos Section */}
        <div className="flex flex-col gap-4">
          {!loadingVideos && userVid && userVid[0]?.userVideos?.length > 0 ? (
            [...userVid[0].userVideos]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((video) => (
                
                <DashboardVideo
                  key={video._id}
                  video={video}
                  user={userVid[0]}
                  setTotalViews={setTotalViews}
                  totalViews={totalViews}
                />
              ))
          ) : !loadingVideos ? (
            <p className="text-gray-700 dark:text-gray-200">No videos uploaded yet.</p>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
