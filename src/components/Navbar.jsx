import React from 'react'
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import Sidebar from './Sidebar';
import Navitems from './Navitems';
function Navbar() {
   const [cancle, setcancle] = useState(true)
   const handelList = () => {
      setcancle(!cancle)
   }

   return (
      <div className='w-full h-full bg-white border-b-2 border-gray-300 dark:border-gray-700 dark:bg-[#202222]'>

         <li className='w-full h-full flex justify-evenly md:justify-between md:pl-5 md:pr-0 items-center px-0' >
            <ul className='w-full h-full flex justify-evenly md:justify-between md:px-5 items-center'> <Navitems handelList={handelList} /></ul>
            <Sidebar cancle={cancle} handelList={handelList} />
         </li>
      </div>
   )
}

export default Navbar