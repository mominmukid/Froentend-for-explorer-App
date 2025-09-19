import React from 'react'
import VideoCard from '../components/Video/VideoCard'
import HistoryVideo from '../components/Video/HistoryVideo'
function LikeVideo() {
  return (
    <>
  {/* <!-- Main Content --> */}
  <div className="flex">
    {/* <!-- Main Content Area --> */}
    <main className="flex-1 p-auto ml-0  pt-20" >
      {/* <!-- Header --> */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" >Liked Videos</h1>
        <p className="text-gray-700 dark:text-gray-300" >Videos you've liked</p>
      </div>

      {/* <!-- Controls --> */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6" >
        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300" >
          <span>24 videos</span>
          <span>•</span>
          <span >Updated today</span>
        </div>
      </div>

      {/* <!-- Video List --> */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 w-full" >
        <HistoryVideo/>
        <HistoryVideo/>
        <HistoryVideo/>
      </div>

      {/* <!-- Load More --> */}
      <div className="text-center mt-8" >
        <button className="bg-gray-300 cursor-pointer hover:text-white hover:bg-gray-600 px-6 py-3 rounded-lg font-medium text-gray-700">
          Load More Videos
        </button>
      </div>
    </main>
  </div>

    </>
  )
}

export default LikeVideo