import React, { useEffect, useState } from "react";
import { getChannelSubscibres } from "../../store/subscriptionSlice";
import { useDispatch } from "react-redux";
import { getUserdetils } from "../../store/UserSlice";
import { NavLink } from "react-router";
import { MdCheck } from "react-icons/md";

function Subscribs({ video: { channel } }) {
  const dispatch = useDispatch();
  const [subscribeCount, setSubscribeCount] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    let isMounted = true;
    const fetchChannelInfo = async () => {
      if (!channel) return;
      try {
        const resultAction = await dispatch(getUserdetils(channel));
        if (getUserdetils.fulfilled.match(resultAction) && isMounted) {
          setUser(resultAction.payload);
        }

        const subAction = await dispatch(getChannelSubscibres(channel));
        if (getChannelSubscibres.fulfilled.match(subAction) && isMounted) {
          const subscribedList = subAction.payload || [];
          setSubscribeCount(subscribedList.length);
        }
      } catch (err) {
        console.error("Failed to fetch channel info:", err);
      }
    };

    fetchChannelInfo();
    return () => {
      isMounted = false;
    };
  }, [dispatch, channel]);

  return (
    <NavLink
      to={`/subscription/video/${channel}`}
      state={{ channel }}
      className="bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 flex flex-col items-center group cursor-pointer"
    >
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 border-2 border-transparent group-hover:border-red-500 transition-colors">
        <img
          src={user?.avatar || "/Images/profile.png"}
          alt={user?.username || "Channel"}
          onError={(e) => {
            e.currentTarget.src = "/Images/profile.png";
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1 group-hover:text-blue-500 transition-colors">
        {user?.username || "Creator Channel"}
      </h3>

      <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">
        {subscribeCount} {subscribeCount === 1 ? "subscriber" : "subscribers"}
      </p>

      <span className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-700/80 text-gray-700 dark:text-gray-200 group-hover:bg-red-50 group-hover:text-red-600 dark:group-hover:bg-red-950/40 dark:group-hover:text-red-400 transition-colors">
        <MdCheck className="text-base text-emerald-500" />
        <span>Subscribed</span>
      </span>
    </NavLink>
  );
}

export default Subscribs;