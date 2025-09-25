import React, { useEffect, useState } from 'react'
import SubcriptionModel from '../components/subscription/SubcriptionModel'
import Subscribs from '../components/subscription/Subscribs'
import { getUserSubscribers } from '../store/subscriptionSlice'
import { useDispatch } from 'react-redux'
import Loader from '../Pages/Loader'  // ✅ your loader component

function Subscription() {
  const [subscribes, setSubscribes] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loader state
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserSubscribrs = async (id) => {
      try {
        if (!id) return;
        setLoading(true);
        const resultAction = await dispatch(getUserSubscribers(id))
        if (getUserSubscribers.fulfilled.match(resultAction)) {
          const subscribedChannels = resultAction.payload;
          setSubscribes(subscribedChannels || []);
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setLoading(false); 
      }
    }
    if (user?._id) {
      fetchUserSubscribrs(user?._id)
    }
  }, [dispatch, user?._id])

  return (
    <div className="flex">
      <main className="flex-1 p-6 ml-0 pt-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Subscriptions ({subscribes.length}) </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Latest videos from channels you follow ! click to go
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : (
          <>
            {/* Example Latest Videos Section */}


            {/* Channels Tab Content */}
            <div className="block mt-10">
              {subscribes.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No subscriptions yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {subscribes.map((video) => (
                    <Subscribs key={video._id} video={video} userId={user?._id} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Subscription
