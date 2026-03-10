import React, { useEffect, useState } from "react";
import VideoCard from "../components/Video/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsvisibalTrue } from "../store/VideoSlice";
import { fetchAsyncVideos, getAllVideos } from "../store/VideoFeatureSlice";
import DownloadCard from '../components/download/DownloadCard';
import PlaylistPopUp from '../components/playlist/PlaylistPopUp';
import { selectSearchVideos } from '../store/searchSlice';
import Loader from "./Loader";
import Share from '../components/share/Share';

function Home() {
  const dispatch = useDispatch();
  const [showShare, setShowShare] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);

  const allVideos = useSelector(selectSearchVideos);
  const videos = useSelector(getAllVideos);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        dispatch(toggleIsvisibalTrue());
        setLoading(true);
        await dispatch(fetchAsyncVideos(20));
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [dispatch]);

  // Sort by most recent upload
  const sortedVideos = [...videos].sort((a, b) => {
    return new Date(b.uploadedAt) - new Date(a.uploadedAt);
  });

  return (
    <>
      {/* Show loader while fetching */}
      {loading ? (
        <Loader count={9} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
          {(allVideos.length === 0 ? sortedVideos : allVideos).map((video, index) => (
            <VideoCard
              key={index}
              video={video}
              setShowShare={setShowShare}
              setId={setId}
              setShowDownload={setShowDownload}
              setShowPlaylist={setShowPlaylist}
            />
          ))}
        </div>
      )}

      {/* Share */}
      {showShare && (
        <Share
          setShowShare={setShowShare}
          links={`https://wideview.netlify.app/video/${id}`}
        />
      )}

      {/* Download */}
      {showDownload && (
        <DownloadCard setShowDownload={setShowDownload} videoId={id} />
      )}

      {/* Playlist */}
      {showPlaylist && (
        <PlaylistPopUp setShowPlaylist={setShowPlaylist} videoId={id} />
      )}
    </>
  );
}

export default Home;
