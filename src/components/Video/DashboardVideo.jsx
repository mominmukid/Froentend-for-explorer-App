import React from 'react'
import { NavLink } from 'react-router'

function DashboardVideo() {
   return (
      <NavLink to="/video">
         <div class="bg-gray-200 dark:bg-gray-800 rounded-lg p-2 sm:p-4  gap-4  flex flex-col sm:flex-row" >
            <div class="relative sm:flex-shrink-0  " >
               <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=120&h=68&fit=crop" alt="Video thumbnail" class="sm:w-32 h-20 object-cover rounded w-full" />
               <span class="absolute bottom-1 right-1 bg-black bg-opacity-80 text-xs px-1 py-0.5 rounded text-white" >10:24</span>
            </div>
            <div class="flex-1" >
               <h3 class="font-medium mb-1" >Building Modern Web Applications with React and TypeScript</h3>
               <p class="text-gray-700 dark:text-gray-200 text-sm mb-2" >125K views • 2 days ago</p>
               <div class="flex items-center gap-4 text-sm" >
                  <span class="text-green-400" >5.2K likes</span>
                  <span class="text-gray-800 dark:text-gray-200" >324 comments</span>
               </div>
            </div>
         </div>
      </NavLink>
   )
}

export default DashboardVideo