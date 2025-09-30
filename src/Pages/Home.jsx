import React, { useEffect, useState } from "react";
import VideoCard from "../components/Video/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsvisibalTrue } from "../store/VideoSlice";
import { fetchAsyncVideos, getAllVideos } from "../store/VideoFeatureSlice";
import DownloadCard from '../components/download/DownloadCard'
import PlaylistPopUp from '../components/playlist/PlaylistPopUp'
import { selectSearchVideos } from '../store/searchSlice'

import Loader from "./Loader";
import Share from '../components/share/Share'
function Home() {
  const dispatch = useDispatch();
  const [showShare, setShowShare] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [id, setId] = useState(null);
  const allVideos = useSelector(selectSearchVideos)
  // const allVideosStatus = useSelector(selectSearchStatus)

  useEffect(() => {
    dispatch(toggleIsvisibalTrue());
    dispatch(fetchAsyncVideos(20));
  }, []);

  const videos = useSelector(getAllVideos);

  // Sort by most recent upload
  const sortedVideos = [...videos].sort((a, b) => {
    return new Date(b.uploadedAt) - new Date(a.uploadedAt); // replace uploadedAt with your property
  });

  return (
    <>
      {allVideos.length === 0 && videos.length === 0 ? (
        <Loader count={9} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {allVideos.length === 0 ? sortedVideos.map((video, index) => (
            <VideoCard key={index} video={video} setShowShare={setShowShare} setId={setId} setShowDownload={setShowDownload} setShowPlaylist={setShowPlaylist} />
          )) : allVideos.map((video, index) => (
            <VideoCard key={index} video={video} setShowShare={setShowShare} setId={setId} setShowDownload={setShowDownload} setShowPlaylist={setShowPlaylist} />
          ))}
        </div>
      )}
      {/* for share */}
      {showShare && (<Share setShowShare={setShowShare} links={`https://wideview.netlify.app/video/${id}`} />)}
      {/* //download */}
      {(showDownload && <DownloadCard setShowDownload={setShowDownload} videoId={id} />)}

      {showPlaylist && (<PlaylistPopUp setShowPlaylist={setShowPlaylist} videoId={id} />)}

    </>
  );
}


export default Home