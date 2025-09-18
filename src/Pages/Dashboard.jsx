import React from 'react'
import DashboardVideo from '../components/Video/DashboardVideo'
import { MdCloudUpload } from "react-icons/md";
import { useNavigate } from 'react-router';
function Dashboard() {
   const navigate = useNavigate();

   const handleUploadClick = () => {
      navigate('/upload');
   };
   return (
      <>
         <div className="flex">

            {/* <!-- Main Content Area --> */}
            <main className="flex-1 p-6 ml-0 pt-20">

               {/* <!-- Header --> */}
               <div class="relative w-full h-48 md:h-60 bg-gradient-to-r from-blue-500 to-purple-600 mb-20">
                  <img
                     src="https://source.unsplash.com/random/1600x400/?nature,abstract"
                     alt=""
                     class="w-full h-full object-cover"
                  />

                  <div class="absolute -bottom-16 left-6 flex items-center">
                     <img
                        src="https://i.pravatar.cc/150?img=5"
                        alt="User Avatar"
                        class="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg object-cover"
                     />
                  </div>
               </div>
               <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
                  <p className="text-gray-600 dark:text-gray-200">
                     Manage your content and track performance
                  </p>
               </div>

               {/* <!-- Quick Stats --> */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 center">

                  {/* <!-- Stat Card 1 --> */}
                  <div className="bg-gray-200 rounded-lg p-6">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-700 text-sm font-medium">Total Views</h3>
                        {/* removed: data-lucide="eye" */}
                        <i className="w-5 h-5 text-blue-400"></i>
                     </div>
                     {/* removed: data-id="stat-content-1" */}
                     <div>
                        <p className="text-2xl font-bold mb-1 dark:text-gray-800">2.4M</p>
                     </div>
                  </div>

                  {/* <!-- Stat Card 2 --> */}
                  <div className="bg-gray-200 rounded-lg p-6">
                     {/* removed: data-id="stat-header-2" */}
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-700 text-sm font-medium">Subscribers</h3>
                        {/* removed: data-lucide="users" */}
                        <i className="w-5 h-5 text-green-400"></i>
                     </div>
                     <div>
                        <p className="text-2xl font-bold mb-1 dark:text-gray-800">145K</p>
                     </div>
                  </div>
               </div>

               {/* <!-- Action Buttons --> */}
               <div className="flex flex-wrap gap-4 mb-8">
                  <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 cursor-pointer" onClick={handleUploadClick}>
                     <MdCloudUpload />
                     Upload Video
                  </button>
               </div>

               {/* <!-- Videos Section --> */}
               <div className="flex flex-col gap-4">
                  <DashboardVideo />
                  <DashboardVideo />
                  <DashboardVideo />
               </div>

            </main>
         </div>

         {/* removed: data-source="components/badge.html" */}
      </>
   )
}

export default Dashboard
