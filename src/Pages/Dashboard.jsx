import React from 'react'
import DashboardVideo from '../components/Video/DashboardVideo'

function Dashboard() {
   return (
      <>
         <div class="flex">

            {/* <!-- Main Content Area --> */}
            <main class="flex-1 p-6 ml-0  pt-20" >
               {/* <!-- Header --> */}
               <div class="mb-8" >
                  <h1 class="text-3xl font-bold mb-2" >Creator Dashboard</h1>
                  <p class="text-gray-600 dark:text-gray-200" >Manage your content and track performance</p>
               </div>

               {/* <!-- Quick Stats --> */}
               <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 center" >
                  {/* <!-- Stat Card 1 --> */}
                  <div class="bg-gray-200 rounded-lg p-6" >
                     <div class="flex items-center justify-between mb-4" >
                        <h3 class="text-gray-700 text-sm font-medium" >Total Views</h3>
                        <i data-lucide="eye" class="w-5 h-5 text-blue-400"></i>
                     </div>
                     <div data-id="stat-content-1">
                        <p class="text-2xl font-bold mb-1 dark:text-gray-800" >2.4M</p>

                     </div>
                  </div>

                  {/* <!-- Stat Card 2 --> */}
                  <div class="bg-gray-200 rounded-lg p-6" >
                     <div class="flex items-center justify-between mb-4" data-id="stat-header-2">
                        <h3 class="text-gray-700 text-sm font-medium" >Subscribers</h3>
                        <i data-lucide="users" class="w-5 h-5 text-green-400"></i>
                     </div>
                     <div>
                        <p class="text-2xl font-bold mb-1 dark:text-gray-800 ">145K</p>

                     </div>
                  </div>
               </div>

               {/* <!-- Action Buttons --> */}
               <div class="flex flex-wrap gap-4 mb-8" data-id="dashboard-actions">
                  <button class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium" >
                     <i data-lucide="upload" class="w-4 h-4 inline mr-2"></i>
                     Upload Video
                  </button>
               </div>
               <div className='flex flex-col gap-4'>
                  <DashboardVideo />
                  <DashboardVideo />
                  <DashboardVideo />
               </div>

            </main>
         </div>


         <div  data-source="components/badge.html"></div>
     
      </>
   )
}

export default Dashboard