import React, { useEffect } from "react";
import VideoCard from "../components/Video/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsvisibalTrue } from "../store/VideoSlice";
import { fetchAsyncVideos, getAllVideos } from "../store/VideoFeatureSlice";
import Loader from "./Loader";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleIsvisibalTrue());
    dispatch(fetchAsyncVideos(9));
  }, [dispatch]);

  const videos = useSelector(getAllVideos);

  // Create a new array by repeating videos to reach desired length
 
  return (
    <>
      {videos.length === 0 ? (
        <Loader count={9} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
