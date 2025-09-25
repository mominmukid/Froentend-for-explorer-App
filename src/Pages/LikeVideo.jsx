import React, { useEffect } from 'react'
import VideoCard from '../components/Video/VideoCard'
import LikeCard from '../components/Video/LikesCard'
import { useDispatch, useSelector } from 'react-redux';
import { getUserLikedVideo, getUserLikedVideos } from '../store/UserSlice';
function LikeVideo() {
  const userLiked = useSelector(getUserLikedVideo);
  const dispatch = useDispatch();
  let isuserLikedEmpty = false;
  if (userLiked && userLiked.length === 0) {
    isuserLikedEmpty = true;
  }
  useEffect(() => {
    // Fetch user history when component mounts
    // Assuming you have a Redux action to fetch user history
    dispatch(getUserLikedVideos());
  }, [userLiked, dispatch]);
  return (
    <>
      {/* <!-- Main Content --> */}
      <div className="flex">
        {/* <!-- Main Content Area --> */}
        <main className="flex-1 p-auto ml-0  pt-20 min-h-screen" >
          {/* <!-- Header --> */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" >Liked Videos</h1>
            <p className="text-gray-700 dark:text-gray-300" >Videos you've liked</p>
          </div>

          {/* <!-- Controls --> */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6" >
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300" >
              <span className='text-md font-bold'>({userLiked?.length})</span>
              <span>•</span>
              <span >Updated today</span>
            </div>
          </div>

          {/* <!-- Video List --> */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 w-full" >
            {userLiked && !isuserLikedEmpty ? userLiked.map((video) => (
              <LikeCard key={video._id} video={video} />
            )) : <p className='text-gray-700 dark:text-gray-300'>No liked videos</p>}
          </div>


        </main>
      </div>

    </>
  )
}

export default LikeVideo