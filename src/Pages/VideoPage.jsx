import React, { useEffect } from 'react'
import Videopalyer from '../components/Video/Videopalyer'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSingleVideo, fetchAsyncVideoSingle } from '../store/VideoFeatureSlice'
import { toggleIsvisibalfalse } from '../store/VideoSlice'

function VideoPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const singleVideo = useSelector(getSingleVideo);

  // Ensure sidebar is hidden on video watch page
  useEffect(() => {
    dispatch(toggleIsvisibalfalse());
  }, [dispatch]);

  // Scroll to top when video page opens or video changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  useEffect(() => {
    dispatch(fetchAsyncVideoSingle(id))
  }, [dispatch, id])

  return (
    <div className='w-full min-h-screen'>
      <Videopalyer singleVideo={singleVideo} />
    </div>
  )
}

export default VideoPage