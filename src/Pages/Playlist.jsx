import React from 'react'
import { FaPlus } from "react-icons/fa";
import PlaylistVideo from '../components/Video/PlaylistVideo';
import { useNavigate } from 'react-router';
function Playlist() {
  const navigate = useNavigate();
  return (
    <>
      {/* <!-- Main Content Area --> */}
      <main className="flex-1 p-6 ml-0 pt-20 min-h-screen">
        {/* <!-- Header --> */}
        <div className="flex-1 sm:flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Playlists</h1>
            <p className=" text-gray-700 dark:text-gray-300">Organize your favorite videos</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium flex justify-center items-center gap-1 cursor-pointer" onClick={() => {
            navigate('/playlist/create');
          }}>
            <FaPlus />
            Create Playlist
          </button>
        </div>

        {/* <!-- Playlists Grid --> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <PlaylistVideo />
          <PlaylistVideo />
          <PlaylistVideo />
          <PlaylistVideo />
        </div>

        {/* <!-- Empty State (if no playlists) --> */}
        <div className="text-center py-16 hidden">
          <i data-lucide="list-video" className="w-16 h-16 text-gray-600 mx-auto mb-4"></i>
          <h3 className="text-xl font-semibold mb-2 text-gray-400">No playlists yet</h3>
          <p className="text-gray-500 mb-6">Create your first playlist to organize your favorite videos</p>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium" onClick={() => navigate('/playlist/create')}>
            Create Playlist
          </button>
        </div>
      </main>
    </>
  )
}

export default Playlist
