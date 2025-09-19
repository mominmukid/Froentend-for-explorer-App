import React, { useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const password = watch("password");

  const onSubmit = (data) => {
    toast.success("Signup successful (demo)", {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
    console.log("Form data:", data);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setValue("avatar", e.target.files); // Update RHF value
      clearErrors("avatar"); // Clear error immediately
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
      setValue("banner", e.target.files); // Update RHF value
      clearErrors("banner"); // Clear error immediately
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md mx-auto pt-10 rounded-lg ">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="rounded-full flex items-center justify-center text-red-500 text-2xl mt-2 ml-[-3rem] font-bold">
              <FaRegCirclePlay />
            </span>
            <span className="text-2xl font-bold text-white">TubeClone</span>
          </a>
          <h1 className="text-3xl font-bold text-white mb-2">Create account</h1>
          <p className="text-gray-300">Join TubeClone today</p>
        </div>

        {/* Signup Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && (
              <div className="text-red-500 text-sm mt-1">{errors.fullName.message}</div>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <div className="text-red-500 text-sm mt-1">{errors.username.message}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                })}
              />
              <button
                type="button"
                className="absolute right-4 top-3 text-gray-800 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</div>
            )}
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Avatar
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pl-12 pr-12 cursor-pointer"
                {...register("avatar", { required: "Avatar is required" })}
                onChange={handleAvatarChange}
              />
              <i className="absolute left-4 top-3 text-xl text-gray-300">
                <BsPersonCircle />
              </i>
            </div>
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="mt-2 w-20 h-20 rounded-full object-cover"
              />
            )}
            {errors.avatar && (
              <div className="text-red-500 text-sm mt-1">{errors.avatar.message}</div>
            )}
          </div>

          {/* Banner Image (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Banner Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
              {...register("banner")}
              onChange={handleBannerChange}
            />
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="mt-2 w-full h-32 rounded-lg object-cover"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 cursor-pointer px-4 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            Create Account
          </button>
        </form>

        {/* Signin link */}
        <div className="text-center mt-6">
          <p className="text-gray-300">
            Already have an account?{" "}
            <button
              className="text-blue-400 underline cursor-pointer hover:text-blue-300 font-medium"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
