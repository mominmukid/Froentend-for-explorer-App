import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Navbar from '../components/Navbar'
import SideBox from '../components/Sidebox'

function Layout() {
   return (
      <div>
         {/* Navbar */}
         <div className='w-full h-12  flex justify-center items-center fixed top-0 left-0 z-50'>
            <Navbar />
         </div>

         {/* Sidebar */}
         <div className='h-screen w-[17%] bg-red-600 fixed top-12 left-0 z-40 hidden lg:block'>
            <SideBox />
         </div>

         {/* Main Content */}
         <div className="ml-0 mt-13 p-4 md:ml-[18%]">
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/about' element={<About />} />
               <Route path='/contact' element={<Contact />} />
            </Routes>
         </div>
      </div>
   )
}

export default Layout
