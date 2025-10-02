import React from "react";
import { Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./Home";
import History from "./History";
import LikeVideo from "./LikeVideo";
import VideoPage from "./VideoPage";
import Subscription from "./Subscription";
import Playlist from "./Playlist";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import Upload from "./Upload";
import UserSetting from "./UserSetting";
import Videoupdate from "./Videoupdate";
import PlaylistCreate from "./PlaylistCreate";
import PlaylistDetailsPage from "./Showplaylist";
import Loder from "./Loader";
import SubscriptionVideoPage from "../Pages/SubscriptionVideoPage";
import AboutUs from "./AboutUs";
// Components
import Navbar from "../components/navbar/Navbar";
import SideBox from "../components/navbar/Sidebox";
import CheckAuthentication from "../components/checkAuthntication";
import { GoogleOAuthProvider } from "@react-oauth/google";
function Layout() {
   const toggle = useSelector((state) => state.video.isvisibal);

   const GoogleAuthWrapper = () => {
      return (
         <GoogleOAuthProvider clientId="717402326393-gvv9ls6lfjr8ci9cjfnkg3oh4fe9m6lv.apps.googleusercontent.com">
            <Login />
            
         </GoogleOAuthProvider>
      )
   }
   const GoogleAuthWrapper2 = () => {
      return (
         <GoogleOAuthProvider clientId="717402326393-gvv9ls6lfjr8ci9cjfnkg3oh4fe9m6lv.apps.googleusercontent.com">
         
            <Register/>
         </GoogleOAuthProvider>
      )
   }

   return (
      <div>
         {/* Navbar */}
         <div className="w-full h-15 flex justify-center items-center fixed top-0 left-0 z-50">
            <Navbar />
         </div>

         {/* Sidebar */}
         <SideBox />

         {/* Toast Notifications */}
         <ToastContainer />

         {/* Main Content */}
         <div
            className={`ml-0 mt-13 p-4 dark:bg-[#202222] dark:text-white bg-[#f8f9fc] hide-scrollbar ${toggle ? "md:ml-[240px]" : "md:ml-0"
               }`}
         >
            <Routes>
               <Route path="/" element={<Home />} />

               {/* Protected Routes */}
               <Route
                  path="/history"
                  element={
                     <CheckAuthentication>
                        <History />
                     </CheckAuthentication>
                  }
               />
               <Route
                  path="/like"
                  element={
                     <CheckAuthentication>
                        <LikeVideo />
                     </CheckAuthentication>
                  }
               />
               <Route
                  path="/subscription"
                  element={
                     <CheckAuthentication>
                        <Subscription />
                     </CheckAuthentication>
                  }
               />
               <Route
                  path="/playlist"
                  element={
                     <CheckAuthentication>
                        <Playlist />
                     </CheckAuthentication>
                  }
               />
               <Route
                  path="/dashboard"
                  element={
                     <CheckAuthentication>
                        <Dashboard />
                     </CheckAuthentication>
                  }
               />
               <Route
                  path="/upload"
                  element={
                     <CheckAuthentication>
                        <Upload />
                     </CheckAuthentication>
                  }
               />
               <Route
                  path="/video/update/:id"
                  element={
                     <CheckAuthentication>
                        <Videoupdate />
                     </CheckAuthentication>
                  }
               />
               <Route
                  path="/setting"
                  element={
                     <CheckAuthentication>
                        <UserSetting />
                     </CheckAuthentication>
                  }
               />
               <Route
                  path="/subscription/video/:id"
                  element={
                     <CheckAuthentication>
                        <SubscriptionVideoPage />
                     </CheckAuthentication>
                  }
               />

               {/* Public Routes */}
               <Route path="/video/:id" element={<VideoPage />} />
               <Route path="/login" element={<GoogleAuthWrapper />} />
               <Route path="/register" element={<GoogleAuthWrapper2 />} />
               <Route path="/playlist/create" element={<PlaylistCreate />} />
               <Route path="/playlist/show/:id" element={<PlaylistDetailsPage />} />
               <Route path="/loder" element={<Loder />} />
               <Route path="/about" element={<AboutUs />} />
            </Routes>
         </div>
      </div>
   );
}

export default Layout;
