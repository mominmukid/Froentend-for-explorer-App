import React from 'react'
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import Sidebar from './Sidebar';
import { IoListSharp } from "react-icons/io5";
function Navbar() {
   const [cancle, setcancle] = useState(true)
   const handelList = () => {
      setcancle(!cancle)
   }

   return (
      <div className='w-full h-full bg-white border-b-2 border-gray-400 dark:bg-gray-800'>
         <li className='w-full h-full flex justify-evenly items-center' >
            <ul className='md:hidden cursor-pointer' onClick={handelList}><IoListSharp /></ul>
            <Sidebar cancle={cancle} handelList={handelList} />
            <ul> <NavLink to="/">Home</NavLink></ul>
            <ul> <NavLink to="/about">About</NavLink></ul>
            <ul> <NavLink to="/contact">Contact</NavLink></ul>
         </li>
      </div>
   )
}

export default Navbar