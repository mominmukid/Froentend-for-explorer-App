import React, { useEffect, useState } from "react";
import SubcriptionModel from "../components/subscription/SubcriptionModel";
import { useParams } from "react-router";
import { getSubscriberVideos } from "../store/subscriptionSlice";
import { useDispatch } from "react-redux";

const SubscriberVideos = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      try {
        const resultAction = await dispatch(getSubscriberVideos(id));
        if (getSubscriberVideos.fulfilled.match(resultAction)) {
          setVideos(resultAction.payload);
        }
      } catch (error) {
        console.error("Error fetching subscriber videos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVideo();
  }, [id, dispatch]);

  return (
    <main className="flex-1 p-6 pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Subscriber Videos
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            All videos from this channel
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : videos.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <SubcriptionModel key={video._id} video={video} />
            ))}
          </section>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No videos found.
          </p>
        )}
      </div>
    </main>
  );
};

export default SubscriberVideos;
