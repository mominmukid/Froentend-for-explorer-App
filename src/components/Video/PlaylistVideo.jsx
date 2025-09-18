import React from 'react'

function PlaylistVideo() {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer">
      <div className="relative">
        <img src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop" alt="Playlist thumbnail" className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <i data-lucide="play" className="w-12 h-12 text-white opacity-80"></i>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-xs px-2 py-1 rounded text-white">
          12 videos
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2">Favorite Music</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">My favorite music videos and performances</p>
        <p className="text-gray-600 dark:text-gray-300 text-xs">Updated 2 days ago</p>
      </div>

    </div>

  )
}

export default PlaylistVideo