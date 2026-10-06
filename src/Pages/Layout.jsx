import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Components
import Navbar from "../components/navbar/Navbar";
import SideBox from "../components/navbar/Sidebox";
import CheckAuthentication from "../components/checkAuthntication";

// Lazy-loaded pages for fast initial bundle and optimal code-splitting
const Home = lazy(() => import("./Home"));
const History = lazy(() => import("./History"));
const LikeVideo = lazy(() => import("./LikeVideo"));
const VideoPage = lazy(() => import("./VideoPage"));
const Subscription = lazy(() => import("./Subscription"));
const Playlist = lazy(() => import("./Playlist"));
const Dashboard = lazy(() => import("./Dashboard"));
const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const Upload = lazy(() => import("./Upload"));
const UserSetting = lazy(() => import("./UserSetting"));
const Videoupdate = lazy(() => import("./Videoupdate"));
const PlaylistCreate = lazy(() => import("./PlaylistCreate"));
const PlaylistDetailsPage = lazy(() => import("./Showplaylist"));
const SubscriptionVideoPage = lazy(() => import("../Pages/SubscriptionVideoPage"));
const AboutUs = lazy(() => import("./AboutUs"));

const GOOGLE_CLIENT_ID = "717402326393-gvv9ls6lfjr8ci9cjfnkg3oh4fe9m6lv.apps.googleusercontent.com";

// Declared outside of Layout to prevent unnecessary remounts on render
const GoogleLoginWrapper = () => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Login />
  </GoogleOAuthProvider>
);

const GoogleRegisterWrapper = () => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Register />
  </GoogleOAuthProvider>
);

// Fallback spinner during route transitions
const PageFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function Layout() {
  const toggle = useSelector((state) => state.video.isvisibal);
  const location = useLocation();
  const isVideoPage = location.pathname.startsWith("/video/");

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-[#1a1c1e] text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Top Navbar */}
      <header className="w-full h-16 fixed top-0 left-0 z-50 shadow-xs">
        <Navbar />
      </header>

      {/* Collapsible Sidebar (hidden on video watch page) */}
      {!isVideoPage && <SideBox />}

      {/* Global Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Main Content Area */}
      <main
        className={`pt-16 min-h-screen p-4 sm:p-6 transition-all duration-300 ${
          !isVideoPage && toggle ? "md:ml-[240px]" : "md:ml-0"
        }`}
      >
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/login" element={<GoogleLoginWrapper />} />
            <Route path="/register" element={<GoogleRegisterWrapper />} />
            <Route path="/about" element={<AboutUs />} />

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
              path="/subscription/video/:id"
              element={
                <CheckAuthentication>
                  <SubscriptionVideoPage />
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
              path="/playlist/create"
              element={
                <CheckAuthentication>
                  <PlaylistCreate />
                </CheckAuthentication>
              }
            />
            <Route
              path="/playlist/show/:id"
              element={
                <CheckAuthentication>
                  <PlaylistDetailsPage />
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
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default Layout;
