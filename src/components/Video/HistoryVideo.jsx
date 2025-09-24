import React from 'react'
import { NavLink } from 'react-router'
import uploasedTime from '../../utils/uploadedTime';


function HistoryVideo({ video: { _id, description, title, duration, owner: { username, avatar }, thumbnail, views, createdAt }, }) {
   const uploadBefore = uploasedTime(createdAt);
   
   return (
      <NavLink to={`/video/${_id}`} state={{ _id }}>
         <div className="flex-1 sm:flex gap-4 p-3 rounded-lg bg-gray-200 dark:bg-gray-800 transition-colors mb-5" >
            <div className="relative flex-shrink-0" >
               <img src={thumbnail || "public/Images/alt.avif"} alt="a" className="w-full h-fit  md:w-48 md:h-28 object-cover rounded-lg" />
               <span className=" w-fit absolute bottom-2 left-3 md:absolute md:bottom-2 md:right-2   lg:left-3 lg:bottom-[9.5rem] bg-black bg-opacity-80 text-xs px-1 py-0.5 rounded text-white" >{(duration / 60).toFixed(2)}</span>
            </div>
            <div className="flex-1 min-w-0" >
               <h3 className="font-medium mb-2 hover:text-blue-400 cursor-pointer">{title}</h3>
               <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2 flex-wrap" >
                  <img src={avatar} alt="Channel" className="w-12 object-cover h-12 rounded-full " />
                  <span >{username}</span>
                  <span>•</span>
                  <span >{views} views</span>
                  <span>•</span>
                  <span >{uploadBefore}</span>
               </div>
               <p className="hidden sm:block text-gray-700 dark:text-gray-300 text-sm line-clamp-2" >{description}</p>
            </div>
         </div>
      </NavLink>

   )
}

export default HistoryVideo