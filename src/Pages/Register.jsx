import React, { useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { BsPersonCircle } from "react-icons/bs";
const Signup = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const nevigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    alert("Signup functionality would be implemented here");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 mb-4">
            {/* Replace with your logo image if you have one */}
            <span className="rounded-full flex items-center justify-center text-red-500 text-2xl mt-2 ml-[-3rem] font-bold">
              <FaRegCirclePlay />
            </span>
            <span className="text-2xl font-bold">TubeClone</span>
          </a>
          <h1 className="text-3xl font-bold mb-2">Create account</h1>
          <p className="text-gray-700 dark:text-gray-300">Join TubeClone today</p>
        </div>

        {/* Signup Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-gray-100 shadow-md shadow-gray-600 dark:bg-gray-800 border border-gray-600 rounded-lg 
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 dark:bg-gray-800 shadow-md shadow-gray-600bg-gray-100 border border-gray-600 rounded-lg 
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm dark:text-gray-300 font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                placeholder="Create a password"
                className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 shadow-md shadow-gray-600 border border-gray-600 rounded-lg 
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4 top-3 text-sm  hover:text-gray-700 text-gray-800 cursor-pointer dark:text-gray-300  dark:hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Must be at least 8 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              placeholder="Confirm your password"
              className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 border border-gray-600 rounded-lg 
              focus:outline-none shadow-md shadow-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
            >
              Avatar
            </label>
            <div className="relative">
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                required
                className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 shadow-md shadow-gray-600 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pl-12 pr-12 cursor-pointer "
              />
              <i className="w-5 h-5 text-gray-800 absolute left-4 top-4.5 text-xl"><BsPersonCircle/></i>
            </div>
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 cursor-pointer px-4 rounded-lg transition-colors"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-950 text-gray-300">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social signup */}
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

        {/* Signin link */}
        <div className="text-center mt-6">
          <p className="text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <button

              className="text-blue-400 underline cursor-pointer hover:text-blue-300 font-medium"
              onClick={() => { nevigate("/login") }}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
