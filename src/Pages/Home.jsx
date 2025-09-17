import React from 'react'
import { useEffect } from 'react'
import VideoCard from '../components/Video/VideoCard'
import { useDispatch } from 'react-redux'
import { toggleIsvisibalTrue } from '../store/VideoSlice'
function Home() {
  const dispath = useDispatch()
  useEffect(() => {
    dispath(toggleIsvisibalTrue())
  }, )

  return (
    <>
      <div className='w-full h-fit flex justify-center  md:justify-between items-center flex-wrap gap-4'>
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