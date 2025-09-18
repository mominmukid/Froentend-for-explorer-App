import React, { useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
function Login() {
   const nevigate=useNavigate()
   const [passwordVisible, setPasswordVisible] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();
      alert("Login functionality would be implemented here");
   };

   return (
      <div className=" min-h-screen flex items-center justify-center">
         {/* Main Container */}
         <div className="w-full max-w-md mx-auto p-6 ">
            {/* Logo */}
            <div className="text-center mb-8">
               <a href="/" className="inline-flex justify-start items-center ml-[-2.5rem]   gap-2 mb-4">
                  <span className="text-red-500 text-2xl mt-1"><FaRegCirclePlay /></span>
                  <span className="text-2xl font-bold">TubeClone</span>
               </a>
               <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
               <p className="text-gray-700 dark:text-gray-300">Sign in to your account</p>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
               {/* Email Field */}
               <div>
                  <label
                     htmlFor="email"
                     className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
                  >
                     Email address
                  </label>
                  <div className="relative">
                     <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 shadow-md shadow-gray-600 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pl-12"
                        placeholder="Enter your email"
                     />
                     <i className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" data-lucide="mail"></i>
                  </div>
               </div>

               {/* Password Field */}
               <div>
                  <label
                     htmlFor="password"
                     className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
                  >
                     Password
                  </label>
                  <div className="relative">
                     <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        required
                        className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 shadow-md shadow-gray-600 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pl-12 pr-12"
                        placeholder="Enter your password"
                     />
                     <i className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" data-lucide="lock"></i>
                     <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-300"
                     >
                        <i data-lucide={passwordVisible ? "eye" : "eye-off"} className="w-5 h-5"></i>
                     </button>
                  </div>
               </div>

               {/* Remember & Forgot Password */}
               <div className="flex items-center justify-between">
                  <label className="flex items-center">
                     <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                     />
                     <span className="ml-2 text-sm text-gray-800 dark:text-gray-300">Remember me</span>
                  </label>

               </div>

               {/* Sign In Button */}
               <button
                  type="submit"
                  className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
               >
                  Sign In
               </button>

               {/* Divider */}
               <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                     <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                     <span className="px-2 bg-gray-950 text-gray-200">
                        Or continue with
                     </span>
                  </div>
               </div>

               {/* Social Login Buttons */}
               <div className="grid grid-cols-1 place-items-center">
                  <button
                     type="button"
                     className=" w-[80%] flex items-center justify-center px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors gap-3 "
                  >
                     <span className="text-2xl"><FcGoogle /></span>
                     <span className="text-xl text-white font-semibold">Google</span>
                  </button>

               </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
               <p className="text-gray-600 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <button
                     className="text-blue-500 underline hover:text-blue-600 font-medium cursor-pointer"
                     onClick={()=>{nevigate("/register")}}
                  >
                     Sign up
                  </button>
               </p>
            </div>
         </div>
      </div>
   );
}

export default Login;
