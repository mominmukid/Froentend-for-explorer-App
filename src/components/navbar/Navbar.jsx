import React from 'react'
import { useState } from 'react';
import Sidebar from './Sidebar'
import Navitems from './Navitems'
import ProfileBtn from './ProfileBtn'

function Navbar() {
   // State to control sidebar toggle (true = closed, false = open)
   const [cancle, setcancle] = useState(true)
   const [isblock, setIsblock] = useState(false);
   // Function to toggle sidebar state
   const handelList = () => {
      setcancle(!cancle)
   }
   const handleIsBlock = () => {
      setIsblock(!isblock);
   }

   return (
      <div className='w-full h-full bg-white border-b-2 border-gray-100 dark:border-[#181818] dark:bg-[#202222] '>

         {/* Using <li> as wrapper is unusual. 
             A <div> or <nav> would be better semantically. */}
         <li className='w-full h-full flex justify-evenly md:justify-between md:pl-5 md:pr-0 items-center px-0'>

            {/* Navigation items in the center/left */}
            <ul className='w-full h-full flex justify-evenly md:justify-between md:px-5 items-center'>
               <Navitems handelList={handelList} handleIsBlock={handleIsBlock} />
               <ProfileBtn isblock={isblock} handleIsBlock={handleIsBlock} setIsblock={setIsblock} />
            </ul>
            {/* Sidebar (mobile menu) that toggles open/close */}
            <Sidebar cancle={cancle} setcancle={setcancle} />
         </li>
      </div>
   )
}

export default Navbar
