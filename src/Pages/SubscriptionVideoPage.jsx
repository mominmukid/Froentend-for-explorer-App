import React, { useEffect, useState } from "react";
import SubcriptionModel from "../components/subscription/SubcriptionModel";
import { useParams, useNavigate } from "react-router-dom";
import { getSubscriberVideos } from "../store/subscriptionSlice";
import { useDispatch } from "react-redux";
import { FiFilm, FiArrowLeft, FiUser } from "react-icons/fi";

const SubscriberVideos = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      try {
        const resultAction = await dispatch(getSubscriberVideos(id));
        if (getSubscriberVideos.fulfilled.match(resultAction)) {
          setVideos(resultAction.payload || []);
        }
      } catch (error) {
        console.error("Error fetching subscriber videos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVideo();
  }, [id, dispatch]);

  const channelInfo = videos.length > 0 && videos[0]?.owner ? videos[0].owner : null;

  return (
    <main className="flex-1 max-w-7xl mx-auto pt-20 pb-16 px-4 min-h-screen">
      {/* Header */}
      <header className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
         <div className="flex items-center gap-4 mb-4">
            <button
               onClick={() => navigate("/subscription")}
               className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
               aria-label="Back"
            >
               <FiArrowLeft size={20} />
            </button>
            {loading ? (
               <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            ) : channelInfo ? (
               <div className="flex items-center gap-4">
                  <img src={channelInfo.avatar || "/Images/profile.png"} alt={channelInfo.username} className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700" />
                  <div>
                     <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                        {channelInfo.username}
                     </h1>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {videos.length} videos
                     </p>
                  </div>
               </div>
            ) : (
               <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                     Channel Videos
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                     All videos published by this creator
                  </p>
               </div>
            )}
         </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
             <div key={i} className="animate-pulse flex flex-col gap-3">
                <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl" />
                <div className="flex gap-3">
                   <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
                   <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
                   </div>
                </div>
             </div>
          ))}
        </div>
      ) : videos.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10">
          {videos.map((video) => (
            <SubcriptionModel key={video._id} video={video} />
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center px-4 bg-gray-50 dark:bg-gray-800/20 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
          <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 flex items-center justify-center text-4xl mb-6 shadow-inner">
            <FiFilm />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No videos found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
            This creator hasn't published any videos yet or they have been removed. Check back later!
          </p>
          <button
            onClick={() => navigate("/subscription")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2"
          >
            <FiUser /> View Subscriptions
          </button>
        </div>
      )}
    </main>
  );
};

export default SubscriberVideos;
