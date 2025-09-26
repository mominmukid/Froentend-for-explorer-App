import React, { useState, useEffect } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { BsPersonCircle } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { ragisterAsyncUser } from "../store/UserSlice";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const password = watch("password");

  // register objects for file inputs so we can call the original handlers
  const avatarRegister = register("avatar", { required: "Avatar is required" });
  const coverRegister = register("coverImage", { required: "Banner is required" });

  useEffect(() => {
    // cleanup object URLs on unmount to avoid memory leaks
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
      if (bannerPreview) {
        URL.revokeObjectURL(bannerPreview);
      }
    };
  }, [avatarPreview, bannerPreview]);

  const onSubmit = async (formData) => {
    try {
      const resultAction = await dispatch(ragisterAsyncUser(formData));

      if (ragisterAsyncUser.fulfilled.match(resultAction)) {
        const ragisterUser = resultAction.payload;
        localStorage.setItem("user", JSON.stringify(ragisterUser));
        toast.success("Registration successful", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
        navigate("/");
        window.location.reload();
      } else {
        // Handle rejection where payload might contain an error message
        const errorMessage = resultAction.error.message || "Registration failed";
        throw new Error(errorMessage);
      }
    } catch (e) {
      console.error(e.message);
      toast.error(e.message === "Registration failed" ? "Registration failed. Please try again." : e.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      navigate("/register");
    }
  };

  /**
   * Custom handler for Avatar file input change.
   * Updates the preview, calls the original RHF change handler, and re-validates.
   */
  const handleAvatarChange = (e) => {
    // 1. Call original react-hook-form onChange so it registers the file
    if (typeof avatarRegister.onChange === "function") {
      avatarRegister.onChange(e);
    }
    const file = e.target.files?.[0];
    if (file) {
      // 2. Clear any existing required errors, since we now have a file
      clearErrors("avatar");

      // 3. Create and set the preview URL
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);

      // 4. Explicitly trigger validation for the 'avatar' field to ensure required check passes
      trigger("avatar");
    }
  };

  /**
   * Custom handler for Cover Image file input change.
   * Updates the preview, calls the original RHF change handler, and re-validates.
   */
  const handleCoverChange = (e) => {
    // 1. Call original react-hook-form onChange so it registers the file
    if (typeof coverRegister.onChange === "function") {
      coverRegister.onChange(e);
    }
    const file = e.target.files?.[0];
    if (file) {
      // 2. Clear any existing required errors, since we now have a file
      clearErrors("coverImage");

      // 3. Create and set the preview URL
      const url = URL.createObjectURL(file);
      setBannerPreview(url);

      // 4. Explicitly trigger validation for the 'coverImage' field to ensure required check passes
      trigger("coverImage");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto pt-10 rounded-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <NavLink to="/" className="inline-flex items-center gap-2 mb-4">
            <span className="rounded-full flex items-center justify-center text-red-500 text-2xl mt-2 ml-[-3rem] font-bold">
              <FaRegCirclePlay />
            </span>
            <span className="text-2xl font-bold dark:text-gray-300 text-gray-700">
              TubeClone
            </span>
          </NavLink>
          <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            Create account
          </h1>
          <p className="dark:text-gray-300 text-gray-700">Join TubeClone today</p>
        </div>

        {/* Signup Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...register("fullname", { required: "Full name is required" })}
            />
            {errors.fullname && (
              <div className="text-red-500 text-sm mt-1">
                {errors.fullname.message}
              </div>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <div className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
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
              <div className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-4 top-3 text-gray-800 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoMdEyeOff /> : <IoEye />}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Avatar
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                name={avatarRegister.name}
                onBlur={avatarRegister.onBlur}
                ref={avatarRegister.ref}
                className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pl-12 pr-12 cursor-pointer"
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
              <div className="text-red-500 text-sm mt-1">
                {errors.avatar.message}
              </div>
            )}
          </div>

          {/* Banner (coverImage) */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Banner Image
            </label>
            <input
              type="file"
              accept="image/*"
              name={coverRegister.name}
              onBlur={coverRegister.onBlur}
              ref={coverRegister.ref}
              className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
              onChange={handleCoverChange}
            />
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="mt-2 w-full h-32 rounded-lg object-cover"
              />
            )}
            {errors.coverImage && (
              <div className="text-red-500 text-sm mt-1">
                {errors.coverImage.message}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 cursor-pointer px-4 rounded-lg transition-colors flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                {/* Tailwind CSS Spinner (adjust colors/size as needed) */}
                <div className="w-5 h-5 border-2 border-white border-opacity-50 rounded-full animate-spin border-t-white mr-2"></div>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Signin link */}
        <div className="text-center mt-6">
          <p className="dark:text-gray-300 text-gray-700">
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