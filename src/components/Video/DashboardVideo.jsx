import React from "react";
import { NavLink } from "react-router-dom";

function DashboardVideo() {
   return (
      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-2 sm:p-4 gap-4 flex flex-col sm:flex-row">
         {/* Thumbnail */}
         <div className="relative sm:flex-shrink-0">
            <img
               src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=120&h=68&fit=crop"
               alt="Video thumbnail"
               className="sm:w-32 h-20 object-cover rounded w-full"
            />
            <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-xs px-1 py-0.5 rounded text-white">
               10:24
            </span>
         </div>

         {/* Video Info */}
         <div className="flex-1">
            <NavLink to="/video">
               <h3 className="font-medium mb-1 hover:underline">
                  Building Modern Web Applications with React and TypeScript
               </h3>
            </NavLink>
            <p className="text-gray-700 dark:text-gray-200 text-sm mb-2">
               125K views • 2 days ago
            </p>
            <div className="flex items-center gap-4 text-sm mb-3">
               <span className="text-green-400">5.2K likes</span>
               <span className="text-gray-800 dark:text-gray-200">324 comments</span>
            </div>

            {/* Update Button */}
            <NavLink to="/video/update">
               <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                  Update
               </button>
            </NavLink>
         </div>
      </div>
   );
}

export default DashboardVideo;
