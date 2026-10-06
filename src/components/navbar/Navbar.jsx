import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsvisibalTrue, toggleIsvisibalfalse } from '../../store/VideoSlice';
import Sidebar from './Sidebar';
import Navitems from './Navitems';
import ProfileBtn from './ProfileBtn';

function Navbar() {
  const [cancle, setcancle] = useState(true);
  const [isblock, setIsblock] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const isVideoPage = location.pathname.startsWith('/video/');
  const isSidebarVisible = useSelector((state) => state.video.isvisibal);

  const handelList = () => {
    if (isVideoPage) {
      // On video watch page, toggle the overlay drawer (open on three dots / hamburger)
      setcancle((prev) => !prev);
    } else {
      // On desktop non-video pages, toggle desktop sidebar; on mobile, toggle drawer
      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        if (isSidebarVisible) {
          dispatch(toggleIsvisibalfalse());
        } else {
          dispatch(toggleIsvisibalTrue());
        }
      } else {
        setcancle((prev) => !prev);
      }
    }
  };

  const handleIsBlock = () => {
    setIsblock(!isblock);
  };

  return (
    <nav className="w-full h-full bg-white/95 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800 dark:bg-[#202222]/95">
      <div className="w-full h-full flex justify-between items-center">
        <div className="w-full h-full flex justify-evenly md:justify-between md:px-5 items-center">
          <Navitems handelList={handelList} handleIsBlock={handleIsBlock} />
          <ProfileBtn isblock={isblock} handleIsBlock={handleIsBlock} setIsblock={setIsblock} />
        </div>
        <Sidebar cancle={cancle} setcancle={setcancle} />
      </div>
    </nav>
  );
}

export default Navbar;
