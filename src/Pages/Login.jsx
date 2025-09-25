import React, { useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useDispatch, } from "react-redux";
import { loginAsyncUser, } from "../store/UserSlice";
function Login() {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm({
      mode: "onBlur", // 👈 validate when field loses focus (can use "onChange" for real-time)
   });

   const navigate = useNavigate();
   const [passwordVisible, setPasswordVisible] = useState(false);
   const dispatch = useDispatch();
   const onSubmit = async (formData) => {
      try {
         const resultAction = await dispatch(loginAsyncUser(formData));

         if (loginAsyncUser.fulfilled.match(resultAction)) {
            const loggedInUser = resultAction.payload; // ✅ user + tokens from backend

            // ✅ Save user object in localStorage
            localStorage.setItem("user", JSON.stringify(loggedInUser.user));
            toast.success("Login successful", {
               position: "top-right",
               autoClose: 500,
               theme: "dark",
            });
            navigate("/");
            window.location.reload();
         } else {
            throw new Error("Login failed");
         }
      } catch (e) {
         toast.error("Login failed. Please try again.", {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
         });
         navigate("/login");
         console.error(e.message);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center">
         {/* Main Container */}
         <div className="w-full max-w-md mx-auto p-6 ">
            {/* Logo */}
            <div className="text-center mb-8">
               <NavLink
                  to="/"
                  className="inline-flex justify-start items-center ml-[-2.5rem] gap-2 mb-4"
               >
                  <span className="text-red-500 text-2xl mt-1">
                     <FaRegCirclePlay />
                  </span>
                  <span className="text-2xl font-bold">TubeClone</span>
               </NavLink>
               <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
               <p className="text-gray-700 dark:text-gray-300">
                  Sign in to your account
               </p>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                        placeholder="Enter your email"
                        className={`w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 shadow-md shadow-gray-600
      border ${errors.email ? "border-red-500" : "border-gray-600"}
      rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                        {...register("email", {
                           required: "Email is required",
                           pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Enter a valid email",
                           },
                        })}
                     />
                  </div>
                  {errors.email && (
                     <span className="text-red-500 text-sm m-1 block">
                        {errors.email.message}
                     </span>
                  )}
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
                        placeholder="Enter your password"
                        className={`w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 shadow-md shadow-gray-600 
                border ${errors.password ? "border-red-500" : "border-gray-600"} 
                rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pl-12 pr-12`}
                        {...register("password", {
                           required: "Password is required",
                           minLength: { value: 6, message: "Min length is 6" },
                           maxLength: { value: 20, message: "Max length is 20" },
                        })}
                     />

                     <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute right-4 top-3.5 text-gray-600 hover:text-gray-700 dark:text-gray-300 hover:dark:text-gray-400  flex items-center justify-center"
                     >
                        {passwordVisible ? <IoMdEyeOff /> : <IoEye />}
                     </button>
                  </div>
                  {errors.password && (
                     <span className="text-red-500 text-sm m-1 block">
                        {errors.password.message}
                     </span>
                  )}
               </div>

               {/* Remember Me */}


               {/* Sign In Button */}
               <button
                  type="submit"
                  className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  disabled={isSubmitting}
               >
                  Sign In
               </button>

               {/* Divider */}
               <div className="relative my-6 hidden">
                  <div className="absolute inset-0 flex items-center">
                     <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="  relative flex justify-center text-sm">
                     <span className="px-2 bg-gray-950 text-gray-200">
                        Or continue with
                     </span>
                  </div>
               </div>

               {/* Social Login */}
               <div className="grid grid-cols-1 place-items-center hidden">
                  <button
                     type="button"
                     className="w-[80%] flex items-center justify-center px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors gap-3 "
                  >
                     <span className="text-2xl">
                        <FcGoogle />
                     </span>
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
                     onClick={() => {
                        navigate("/register");
                     }}
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
