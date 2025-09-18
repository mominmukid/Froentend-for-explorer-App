import React from 'react'
import SubcriptionModel from '../components/subscription/SubcriptionModel'
import Subscribs from '../components/subscription/Subscribs'
function Subscription() {
  return (
    <div className="flex">
      <main className="flex-1 p-6 ml-0  pt-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Subscriptions</h1>
          <p className="text-gray-700 dark:text-gray-300">Latest videos from channels you follow</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 border-b border-gray-800 pb-1">
          <nav className="flex gap-8">
            <button className="pb-1 border-b-2 border-blue-500 text-blue-500 font-medium cursor-pointer">Latest</button>
            <button className="pb-1 text-gray-700 dark:text-gray-300 hover:text-blue-500 font-medium cursor-pointer">Channels</button>
          </nav>
        </div>

        {/* Latest Videos Tab Content */}
        <div className="space-y-6">
          {/* Channel Section 1 */}
          <div>

          </div>


          <div>


            {/* Videos */}
            <div className="">
              <div className="  flex-1 gap-5 justify-center">
                <div className='mb-5'> <SubcriptionModel /></div>
                <div className='mb-5'> <SubcriptionModel /></div>
                <div className='mb-5'> <SubcriptionModel /></div>

                <div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Channels Tab Content */}
        <div className="block">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           <Subscribs/>
           <Subscribs/>
           <Subscribs/>
           
          </div>
        </div>
      </main>
    </div>

  )
}

export default Subscription
