import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function AboutUs() {
   return (
      <div className="min-h-screen   text-gray-900 dark:text-gray-100 px-6 py-12">
         <div className="max-w-5xl mx-auto space-y-12">

            {/* About Section */}
            <section className=" rounded-2xl  p-2">
               <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
                  About <span className="text-gray-900 dark:text-white">Wideview</span>
               </h1>
               <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                  Welcome to <strong>Wideview</strong>, your space for endless
                  videos, creators, and entertainment. Our mission is to make video
                  sharing simple, engaging, and fun for everyone.
               </p>
               <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                  Wideview is more than just a video platform. It’s a community where
                  people can <span className="font-semibold">share ideas, express creativity,
                     and connect with others worldwide</span>. Whether you’re a viewer,
                  a creator, or an explorer, Wideview is built to give you a smooth
                  and interactive experience.
               </p>

               {/* Website Features */}
               <div className="mt-6 space-y-4">
                  <h2 className="text-xl font-bold text-blue-600">✨ What Wideview Offers:</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                     <li>🎥 <strong>Unlimited Video Uploads</strong> – Share your content without boundaries.</li>
                     <li>🔍 <strong>Smart Search & Filters</strong> – Quickly find videos and creators you love.</li>
                     <li>📊 <strong>Playlists </strong> – Organize videos your way.</li>
                     <li>💬 <strong>Engagement</strong> – Like, comment, and share to connect with the community.</li>
                     <li>📱 <strong>Responsive Design</strong> – Enjoy Wideview on any device, anytime.</li>

                  </ul>
               </div>

               {/* Developer Info */}
               <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-6">
                  This platform is designed and built by{" "}
                  <span className="font-semibold">Mukid Momin</span>, a passionate{" "}
                  <span className="font-semibold">Full Stack Web Developer</span>{" "}
                  skilled in frontend (React, Redux, Tailwind, Bootstrap, HTML, CSS, JavaScript)
                  and backend (Node.js, Express, MongoDB, REST APIs).
               </p>
               <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  Mukid has worked on projects like{" "}
                  <span className="font-semibold">Fincify</span>,{" "}
                  <span className="font-semibold">MKEcom</span>, and completed a virtual internship with{" "}
                  <span className="font-semibold">JP Morgan</span>. His goal is to build user-friendly
                  digital solutions that solve real-world problems.
               </p>
            </section>

            {/* Contact Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
               <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
                  Contact Us
               </h2>
               <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Have questions, suggestions, or just want to say hi? We’d love to
                  hear from you!
               </p>

               {/* Contact Form */}
               <form className="max-w-2xl mx-auto space-y-4">
                  <input
                     type="text"
                     placeholder="Your Name"
                     className="w-full p-3 rounded-xl border dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     required
                  />
                  <input
                     type="email"
                     placeholder="Your Email"
                     className="w-full p-3 rounded-xl border dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     required
                  />
                  <textarea
                     placeholder="Your Message"
                     rows="5"
                     className="w-full p-3 rounded-xl border dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     required
                  ></textarea>
                  <button
                     type="submit"
                     className="w-full py-3 rounded-xl  bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] text-white font-semibold"
                  >
                     Send Message
                  </button>
               </form>

               {/* Social Links */}
               <div className="flex justify-center gap-6 mt-8">
                  <a
                     href="mailto:mominmukid@gmail.com"
                     className="text-blue-500 hover:text-blue-700"
                  >
                     <FaEnvelope size={26} />
                  </a>
                  <a
                     href="https://github.com/mominmukid"
                     target="_blank"
                     rel="noreferrer"
                     className="text-gray-800 dark:text-gray-200 hover:text-gray-500"
                  >
                     <FaGithub size={26} />
                  </a>
                  <a
                     href="https://linkedin.com/in/mukid-momin"
                     target="_blank"
                     rel="noreferrer"
                     className="text-blue-700 hover:text-blue-900"
                  >
                     <FaLinkedin size={26} />
                  </a>
               </div>

               {/* Extra Details */}
               <div className="mt-8 text-center space-y-2">
                  <p>
                     📧 Email:{" "}
                     <a
                        href="mailto:mominmukid@gmail.com"
                        className="text-blue-600 hover:underline"
                     >
                        mominmukid@gmail.com
                     </a>
                  </p>
                  <p>📍 Location: Pune, India</p>
               </div>
            </section>
         </div>
      </div>
   );
}

export default AboutUs;
