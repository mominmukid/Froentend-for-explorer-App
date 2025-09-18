import React from 'react'

function Subscribs() {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face"
                alt="TechGuru"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">TechGuru</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">1.2M subscribers</p>
              <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-full text-sm font-medium w-full">
                Subscribed
              </button>
            </div>

  )
}

export default Subscribs