import React from 'react'
import { useEffect } from 'react'
import VideoCard from '../components/Video/VideoCard'
import { useDispatch } from 'react-redux'
import { toggleIsvisibalTrue } from '../store/VideoSlice'
function Home() {
  const dispath = useDispatch()
  useEffect(() => {
    dispath(toggleIsvisibalTrue())
  },[])

  return (
    <>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" >
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </>
  )
}

export default Home

