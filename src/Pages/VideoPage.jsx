import React, { useEffect } from 'react'
import Videopalyer from '../components/Video/Videopalyer'
import { useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { getSingleVideo,fetchAsyncVideoSingle } from '../store/VideoFeatureSlice'

function VideoPage() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const singleVideo = useSelector(getSingleVideo);
  useEffect(() => {
    dispatch(fetchAsyncVideoSingle(id))
  }, [dispatch,id])
  return (
    <div className='w-full min-h-screen'>
      <Videopalyer singleVideo={singleVideo}/>
    </div>
  )
}

export default VideoPage