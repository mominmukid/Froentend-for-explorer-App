import React from 'react'
import { IoPersonCircleSharp } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { NavLink } from 'react-router';
import { useDispatch } from 'react-redux';
import { toggleIsvisibalfalse } from '../../store/VideoSlice';
function VideoCard() {
   const dispatch = useDispatch()
   const handlesidebar = () => {
      dispatch(toggleIsvisibalfalse())
   }
   return (

      <NavLink to="/video" className="w-[90%] sm:w-[45%] md:w-[45%] lg:w-[30%] bg-white border border-gray-200 rounded-[30px] shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden cursor-pointer" onClick={handlesidebar}>
         <img className="rounded-t-lg" src="public\Images\jms-kFHz9Xh3PPU-unsplash.jpg" alt="Video" />
         <div className='w-full flex justify-between items-center'>
            <div className='w-[20%] h-fit p-2'>
               <p className='w-10 h-10 flex justify-center items-center rounded-full text-6xl'><IoPersonCircleSharp /></p>
            </div>

            <div className='w-[70%] text-[17px] pb-2'>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
               <p className='text-gray-500'> Channel Name</p>
               <p className='w-full flex justify-start items-start text-gray-500 text-[14px]'>
                  <span >415K Views</span>
                  <span className='w-fit flex justify-end items-end text-xl'> <LuDot /> </span>
                  <span >2 years</span>
               </p>
            </div>
         </div>
      </NavLink>
   )
}

export default VideoCard