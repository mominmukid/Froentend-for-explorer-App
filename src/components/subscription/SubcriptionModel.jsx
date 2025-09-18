import React from 'react'

function SubcriptionModel() {
   return (
      <>
         <div className="flex items-center gap-3 mb-4">
            <img
               src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
               alt="TechGuru"
               className="w-10 h-10 rounded-full"
            />
            <div>
               <h3 className="font-semibold">TechGuru</h3>
               <p className="text-gray-400 text-sm">2 hours ago</p>
            </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ml-13">
            <div className="group cursor-pointer">
               <div className="relative mb-3">
                  <img
                     src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=225&fit=crop"
                     alt="Video thumbnail"
                     className="w-full aspect-video object-cover rounded-lg group-hover:rounded-none transition-all duration-200"
                  />
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-xs px-1 py-0.5 text-white rounded" >10:24</span>
               </div>
               <div>
                  <h4 className="font-medium line-clamp-2 mb-1 group-hover:text-blue-400">
                     Building Modern Web Applications with React and TypeScript
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">125K views • 2 hours ago</p>
               </div>
            </div>
         </div>
      </>
   )
}

export default SubcriptionModel