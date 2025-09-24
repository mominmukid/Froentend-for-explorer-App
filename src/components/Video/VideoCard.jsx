import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch } from 'react-redux';
import { toggleIsvisibalfalse } from '../../store/VideoSlice';
import uploasedTime from '../../utils/uploadedTime';
import { setuserHistory, getUserdetils } from '../../store/UserSlice';

function VideoCard({ video: { _id, title, thumbnail, duration, views, createdAt, owner, } }) {
   
   const dispatch = useDispatch();
   const [user, setUser] = useState(null); // owner details
   const [loading, setLoading] = useState(true);

   const handlesidebar = () => {
      dispatch(setuserHistory(_id));
      dispatch(toggleIsvisibalfalse());
   };

   useEffect(() => {
      const getuserDitails = async () => {
         try {
            const resultAction = await dispatch(getUserdetils(owner));

            if (getUserdetils.fulfilled.match(resultAction)) {
               const loggedInUser = resultAction.payload; // ✅ user + tokens from backend
               setUser(loggedInUser);
            }
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false);
         }
      };

      getuserDitails();
   }, [dispatch, owner]);

   const uploadBefore = uploasedTime(createdAt);

   return (
      <NavLink
         to={`/video/${_id}`}
         state={{ _id }}
         className="group cursor-pointer bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-md"
         onClick={handlesidebar}
      >
         {/* Thumbnail */}
         <div className="relative mb-3">
            <img
               src={thumbnail}
               alt="Video thumbnail"
               className="w-full aspect-video object-cover rounded-lg group-hover:rounded-none transition-all duration-200"
            />
            <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-xs px-1 py-0.5 rounded text-white">
               {(duration / 60).toFixed(2)}
            </span>
         </div>

         {/* Video info */}
         <div className="flex gap-3">
            {/* Avatar */}
            <img
               src={
                  user?.avatar ||
                  "https://via.placeholder.com/36x36.png?text=U" // fallback
               }
               alt="Channel avatar"
               className="w-12 h-12  rounded-full object-cover flex-shrink-0  "
            />

            {/* Text details */}
            <div>
               <h3 className="font-medium line-clamp-2 mb-1 group-hover:text-blue-400">
                  {title}
               </h3>

               {/* Owner name */}
               <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                  {loading ? "Loading..." : user?.username || "Unknown User"}
               </p>

               {/* Views + time */}
               <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {views} • {uploadBefore}
               </p>
            </div>
         </div>
      </NavLink>
   );
}

export default VideoCard;
