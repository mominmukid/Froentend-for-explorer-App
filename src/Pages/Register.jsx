import React, { useState, useEffect } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { loginUserWithGoogle, ragisterAsyncUser } from "../store/UserSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

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
  } = useForm({ mode: "onBlur" });

  function saveUser(user) {
    const now = new Date();
    const item = {
      user: user,
      expiry: now.getTime() + 24 * 60 * 60 * 1000,
    };
    localStorage.setItem("user", JSON.stringify(item));
  }

  const password = watch("password");
  // Avatar and coverImage are now OPTIONAL - no required validation
  const avatarRegister = register("avatar");
  const coverRegister = register("coverImage");

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    };
  }, [avatarPreview, bannerPreview]);

  function extractFirstLineError(htmlString) {
    if (!htmlString) return "Unknown error";
    const match = htmlString.match(/<pre>([\s\S]*?)<\/pre>/);
    if (!match) return "Unknown error";
    const clean = match[1].replace(/<br\s*\/?>/gi, "\n").replace(/&nbsp;/g, " ");
    return clean.split("\n")[0].trim();
  }

  const onSubmit = async (formData) => {
    try {
      const resultAction = await dispatch(ragisterAsyncUser(formData));
      if (ragisterAsyncUser.fulfilled.match(resultAction)) {
        const ragisterUser = resultAction.payload;
        await saveUser(ragisterUser);
        toast.success("Registration successful", { position: "top-right", autoClose: 2000, theme: "dark" });
        navigate("/");
        window.location.reload();
      } else {
        const errormsg = extractFirstLineError(resultAction.payload || resultAction.error.message) || "Registration failed";
        toast.error(errormsg, { position: "top-right", autoClose: 3000, theme: "dark" });
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again.", { position: "top-right", autoClose: 2000, theme: "dark" });
    }
  };

  const handleAvatarChange = (e) => {
    if (typeof avatarRegister.onChange === "function") avatarRegister.onChange(e);
    const file = e.target.files?.[0];
    if (file) {
      clearErrors("avatar");
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e) => {
    if (typeof coverRegister.onChange === "function") coverRegister.onChange(e);
    const file = e.target.files?.[0];
    if (file) {
      clearErrors("coverImage");
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const responceGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const resultAction = await dispatch(loginUserWithGoogle(authResult["code"]));
        if (loginUserWithGoogle.fulfilled.match(resultAction)) {
          const loggedInUser = resultAction.payload;
          await saveUser(loggedInUser.user);
          toast.success("Login successful", { position: "top-right", autoClose: 1000, theme: "dark" });
          navigate("/");
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responceGoogle,
    onError: responceGoogle,
    flow: "auth-code",
  });

  const inputClass = (fieldError) =>
    `w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border ${
      fieldError ? "border-red-500" : "border-gray-300 dark:border-gray-700"
    } rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-white transition`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <NavLink to="/" className="inline-flex items-center gap-2 mb-4">
            <img src="/Images/logo.png" alt="logo" className="w-8 h-8" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Wide<span className="text-red-600">view</span>
            </span>
          </NavLink>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create account</h1>
          <p className="text-gray-600 dark:text-gray-400">Join Wideview today</p>
        </div>

        {/* Signup Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
            <input type="text" placeholder="Enter your full name" className={inputClass(errors.fullname)} {...register("fullname", { required: "Full name is required" })} />
            {errors.fullname && <div className="text-red-500 text-xs mt-1">{errors.fullname.message}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Username</label>
            <input type="text" placeholder="Choose a username" className={inputClass(errors.username)} {...register("username", { required: "Username is required" })} />
            {errors.username && <div className="text-red-500 text-xs mt-1">{errors.username.message}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email address</label>
            <input type="email" placeholder="Enter your email" className={inputClass(errors.email)} {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })} />
            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email.message}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Create a password" className={`${inputClass(errors.password)} pr-12`} {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })} />
              <button type="button" className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoMdEyeOff size={18} /> : <IoEye size={18} />}
              </button>
            </div>
            {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password.message}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
            <input type="password" placeholder="Confirm your password" className={inputClass(errors.confirmPassword)} {...register("confirmPassword", { required: "Confirm password is required", validate: (value) => value === password || "Passwords do not match" })} />
            {errors.confirmPassword && <div className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Profile Photo <span className="text-gray-400 font-normal">(Optional)</span></label>
            <div className="relative">
              <input type="file" accept="image/*" name={avatarRegister.name} onBlur={avatarRegister.onBlur} ref={avatarRegister.ref} className={`${inputClass(null)} pl-12 cursor-pointer`} onChange={handleAvatarChange} />
              <i className="absolute left-4 top-3.5 text-xl text-gray-400"><BsPersonCircle /></i>
            </div>
            {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" className="mt-2 w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700" />}
            <p className="text-xs text-gray-400 mt-1">A default avatar will be used if not provided</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Banner Image <span className="text-gray-400 font-normal">(Optional)</span></label>
            <input type="file" accept="image/*" name={coverRegister.name} onBlur={coverRegister.onBlur} ref={coverRegister.ref} className={`${inputClass(null)} cursor-pointer`} onChange={handleCoverChange} />
            {bannerPreview && <img src={bannerPreview} alt="Banner Preview" className="mt-2 w-full h-32 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-700" />}
            <p className="text-xs text-gray-400 mt-1">A default banner will be used if not provided</p>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] text-white font-semibold py-3 px-4 rounded-xl hover:opacity-95 transition cursor-pointer flex items-center justify-center disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/50 rounded-full animate-spin border-t-white mr-2" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-[#f8f9fc] dark:bg-[#1a1c1e] text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google */}
        <div className="flex justify-center">
          <button
            type="button"
            className="w-full max-w-xs flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-xs"
            onClick={googleLogin}
          >
            <FcGoogle className="text-2xl" />
            <span className="font-semibold text-gray-800 dark:text-white">Continue with Google</span>
          </button>
        </div>

        <div className="text-center mt-8 pb-8">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <button className="text-blue-500 hover:text-blue-600 font-semibold cursor-pointer" onClick={() => navigate("/login")}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;