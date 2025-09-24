import React, { useEffect, useState } from 'react'
import { getChannelSubscibres } from '../../store/subscriptionSlice';
import { useDispatch } from 'react-redux';
import { getUserdetils } from '../../store/UserSlice';
import { NavLink } from 'react-router';

function Subscribs({ video: { channel } }) {
  const dispatch = useDispatch()
  const [subscribeCount, setSubscribeCount] = useState(0);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchLikes = async () => {
      if (channel) {

        const resultAction = await dispatch(getUserdetils(channel));

        if (getUserdetils.fulfilled.match(resultAction)) {
          const loggedInUser = resultAction.payload; // ✅ user + tokens from backend
          setUser(loggedInUser);
        }
        // ✅ fetch channel subscribers
        const resultActions = await dispatch(getChannelSubscibres(channel));
        if (getChannelSubscibres.fulfilled.match(resultActions)) {
          const subscribedChannels = resultActions.payload;

          setSubscribeCount(subscribedChannels.length);
        }
      } else {
        console.error("Failed to fetch video likes");
      }

    }
    fetchLikes();
  }, [dispatch, channel]);
  return (
    <NavLink   to={`/subscription/video/${channel}`}
         state={{ channel }} className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6 text-center">
      <img
        src={user?.avatar}
        alt="TechGuru"
        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
      />
      <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">{user?.username}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{subscribeCount} subscribers</p>
      <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-full text-sm font-medium w-full">
        Subscribed
      </button>
    </NavLink>

  )
}

export default Subscribs