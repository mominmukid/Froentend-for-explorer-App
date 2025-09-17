import React from 'react'
import { Route, Routes } from 'react-router'
import { useSelector } from 'react-redux'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Navbar from '../components/navbar/Navbar'
import SideBox from '../components/navbar/Sidebox'
import VideoPage from './VideoPage'


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
         <div className={`ml-0 mt-13 p-4 dark:bg-[#202222] dark:text-white bg-[#f8f9fc]   hide-scrollbar ${toggle?"md:ml-[240px]":"lg:ml-0"}`}>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/about' element={<About />} />
               <Route path='/contact' element={<Contact />} />
               <Route path='/video' element={<VideoPage />} />
            </Routes>
         </div>
      </div>
   )
}

export default Layout
