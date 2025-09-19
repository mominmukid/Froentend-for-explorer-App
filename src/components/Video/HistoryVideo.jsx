import React from 'react'
import { NavLink } from 'react-router'

function HistoryVideo() {
   return (
      <NavLink to="/video">
      <div className="flex-1 sm:flex gap-4 p-3 rounded-lg bg-gray-200 dark:bg-gray-800 transition-colors mb-5" >
         <div className="relative flex-shrink-0" >
            <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=112&fit=crop" alt="Video thumbnail" className="w-full h-fit  md:w-48 md:h-28 object-cover rounded-lg" />
            <span className=" w-fit absolute bottom-2 left-3 md:absolute md:bottom-2 md:right-2   lg:left-3 lg:bottom-[9.5rem] bg-black bg-opacity-80 text-xs px-1 py-0.5 rounded text-white" >10:24</span>
         </div>
         <div className="flex-1 min-w-0" >
            <h3 className="font-medium mb-2 hover:text-blue-400 cursor-pointer">Building Modern Web Applications with React and TypeScript</h3>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2 flex-wrap" >
               <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=20&h=20&fit=crop&crop=face" alt="Channel" className="w-5 h-5 rounded-full " />
               <span >TechGuru</span>
               <span>•</span>
               <span >125K views</span>
               <span>•</span>
               <span >2 days ago</span>
            </div>
            <p className="hidden sm:block text-gray-700 dark:text-gray-300 text-sm line-clamp-2" >Learn how to build scalable web applications using React and TypeScript. This comprehensive tutorial covers best practices...</p>
         </div>
      </div>
      </NavLink>

   )
}

export default HistoryVideo