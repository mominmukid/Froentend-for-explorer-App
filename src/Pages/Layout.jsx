import React from 'react'
import { Route, Routes } from 'react-router'
import { useSelector } from 'react-redux'
import Home from './Home'
import History from './History'
import LikeVideo from './LikeVideo'
import Navbar from '../components/navbar/Navbar'
import SideBox from '../components/navbar/Sidebox'
import VideoPage from './VideoPage'
import Subscription from './Subscription'
import Playlist from './Playlist'
import Dashboard from './Dashboard'
import Login from './Login'
import Register from './Register'


function Layout() {
   const toggle = useSelector(state => state.video.isvisibal);
   return (
      <div>
         {/* Navbar */}
         <div className='w-full h-15  flex justify-center items-center fixed top-0 left-0 z-50'>
            <Navbar />
         </div>

         {/* Sidebar */}
         <SideBox />
         {/* Main Content */}
         <div className={`ml-0 mt-13 p-4 dark:bg-[#202222] dark:text-white bg-[#f8f9fc]   hide-scrollbar ${toggle ? "md:ml-[240px]" : "md:ml-0"}`}>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/history' element={<History />} />
               <Route path='/like' element={<LikeVideo />} />
               <Route path='/video' element={<VideoPage />} />
               <Route path='/subscription' element={<Subscription />} />
               <Route path='/playlist' element={<Playlist />} />
               <Route path='/dashboard' element={<Dashboard />} />
               <Route path='/login' element={<Login />} />
               <Route path='/register' element={<Register />} />
            </Routes>
         </div>
      </div>
   )
}

export default Layout
