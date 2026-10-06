import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";
import { FiVideo, FiSearch, FiList, FiMessageCircle, FiMonitor } from "react-icons/fi";

function AboutUs() {
  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 px-4 py-16 sm:px-6 lg:px-8 pt-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
             About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Wideview</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
             Welcome to <span className="font-semibold text-gray-900 dark:text-white">Wideview</span>, your space for endless videos, creators, and entertainment. Our mission is to make video sharing simple, engaging, and fun for everyone.
          </p>
        </section>

        {/* Vision Section */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 sm:p-12 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50"></div>
           <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-50"></div>
           
           <h2 className="text-2xl font-bold mb-6 relative z-10">Our Vision</h2>
           <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto relative z-10">
              Wideview is more than just a video platform. It’s a community where people can <span className="font-bold text-blue-600 dark:text-blue-400">share ideas, express creativity, and connect with others worldwide</span>. Whether you’re a viewer, a creator, or an explorer, Wideview is built to give you a smooth, responsive, and interactive experience.
           </p>
        </section>

        {/* Features Section */}
        <section className="space-y-8">
           <h2 className="text-3xl font-bold text-center">Platform Features</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                 { icon: <FiVideo />, title: "Unlimited Uploads", desc: "Share your high-quality content without boundaries or strict limits." },
                 { icon: <FiSearch />, title: "Smart Search", desc: "Quickly find the specific videos, channels, and creators you love." },
                 { icon: <FiList />, title: "Custom Playlists", desc: "Organize videos your way and save them for later viewing." },
                 { icon: <FiMessageCircle />, title: "Community Focus", desc: "Like, comment, and engage with your audience effectively." },
                 { icon: <FiMonitor />, title: "Responsive Design", desc: "Enjoy Wideview on any device, from mobile phones to smart TVs." }
              ].map((feature, i) => (
                 <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                       {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                 </div>
              ))}
           </div>
        </section>

        {/* Developer Info */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center gap-10">
           <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold mb-2">Meet the Developer</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                 Designed and built by <span className="font-bold text-white">Mukid Momin</span>, a passionate Full Stack Developer skilled in modern web technologies including React, Redux, Tailwind CSS, Node.js, and MongoDB.
              </p>
              <p className="text-blue-100 text-lg leading-relaxed">
                 Mukid has worked on impactful projects like Fincify, MKEcom, and completed a virtual internship with JP Morgan. His primary goal is to build user-friendly digital solutions that solve real-world problems.
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-200 mt-4 font-medium bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
                 Made with <FaHeart className="text-red-400" /> in Pune, India
              </div>
           </div>
           
           <div className="flex flex-col gap-4 w-full md:w-auto shrink-0">
              <a href="https://github.com/mominmukid" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition text-white font-medium backdrop-blur-sm border border-white/10">
                 <FaGithub size={24} /> View GitHub Profile
              </a>
              <a href="https://linkedin.com/in/mukid-momin" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition text-white font-medium backdrop-blur-sm border border-white/10">
                 <FaLinkedin size={24} /> Connect on LinkedIn
              </a>
              <a href="mailto:mominmukid@gmail.com" className="flex items-center gap-3 bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl transition font-bold shadow-lg">
                 <FaEnvelope size={24} /> Email Me
              </a>
           </div>
        </section>

      </div>
    </div>
  );
}

export default AboutUs;
