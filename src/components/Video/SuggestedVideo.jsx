import React from 'react'
import { NavLink } from 'react-router'

function SuggestedVideo() {
   return (
      <NavLink to="/video">
      <div className="flex gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg mb-4">
         <div className="w-40 aspect-video bg-black rounded-lg"></div>
         <div>
            <h3 className="text-sm font-semibold">Video 1 Title</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
               200k views • 2 days ago
            </p>
         </div>
      </div>
      </NavLink>
   )
}

export default SuggestedVideo