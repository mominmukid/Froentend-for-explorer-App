import React from 'react'
import { IoPersonCircleSharp } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { NavLink } from 'react-router';
import { useDispatch } from 'react-redux';
import { toggleIsvisibalfalse } from '../../store/VideoSlice';
import uploasedTime from '../../utils/uploadedTime';
function VideoCard({ video: { _id,title, thumbnail, duration, views, createdAt } }) {
   const dispatch = useDispatch()
   const handlesidebar = () => {
      dispatch(toggleIsvisibalfalse())
   }
   const uploadBefore = uploasedTime(createdAt); 

   return (

      <NavLink   to={`/video/${_id}`}   state={{ _id }} className="group cursor-pointer bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-md" onClick={handlesidebar}>
         <div className="relative mb-3" >
            <img src={thumbnail} alt="Video thumbnail" className="w-full aspect-video object-cover rounded-lg group-hover:rounded-none transition-all duration-200" />
            <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-xs px-1 py-0.5 rounded text-white" >{((duration/60).toFixed(2))}</span>
         </div>
         <div className="flex gap-3" >
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=36&h=36&fit=crop&crop=face" alt="Channel avatar" className="w-9 h-9 rounded-full flex-shrink-0" data-id="channel-avatar-1" />
            <div >
               <h3 className="font-medium line-clamp-2 mb-1 group-hover:text-blue-400" >{title}</h3>
               <p className="text-gray-700 dark:text-gray-300 text-sm mb-1" >TechGuru</p>
               <p className="text-gray-700 dark:text-gray-300 text-sm" >{views} • {uploadBefore} </p>
            </div>
         </div>
      </NavLink>

   )
}

export default VideoCard