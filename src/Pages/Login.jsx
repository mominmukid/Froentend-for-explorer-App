import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { loginAsyncUser, loginUserWithGoogle } from "../store/UserSlice";

function Login() {
  const {
    register,
    handleSubmit,
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

  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  function extractFirstLineError(htmlString) {
    if (!htmlString) return "Unknown error";
    const match = htmlString.match(/<pre>([\s\S]*?)<\/pre>/);
    if (!match) return "Unknown error";
    const clean = match[1].replace(/<br\s*\/?>/gi, "\n").replace(/&nbsp;/g, " ");
    return clean.split("\n")[0].trim();
  }

  const onSubmit = async (formData) => {
    try {
      const resultAction = await dispatch(loginAsyncUser(formData));
      if (loginAsyncUser.fulfilled.match(resultAction)) {
        const loggedInUser = resultAction.payload;
        await saveUser(loggedInUser.user);
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 500,
          theme: "dark",
        });
        navigate("/");
        window.location.reload();
      } else {
        const errormsg =
          extractFirstLineError(resultAction.payload || resultAction.error.message) ||
          "Login failed";
        toast.error(errormsg, {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const responceGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const resultAction = await dispatch(loginUserWithGoogle(authResult["code"]));
        if (loginUserWithGoogle.fulfilled.match(resultAction)) {
          const loggedInUser = resultAction.payload;
          await saveUser(loggedInUser.user);
          toast.success("Login successful", {
            position: "top-right",
            autoClose: 1000,
            theme: "dark",
          });
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <NavLink to="/" className="inline-flex items-center gap-2 mb-4">
            <img src="/Images/logo.png" alt="Wideview logo" className="w-8 h-8" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Wide<span className="text-red-600">view</span>
            </span>
          </NavLink>
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Welcome back</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border ${
                errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              } rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-white transition`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border ${
                  errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                } rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12 text-gray-900 dark:text-white transition`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min length is 6" },
                  maxLength: { value: 20, message: "Max length is 20" },
                })}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {passwordVisible ? <IoMdEyeOff size={18} /> : <IoEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>
            )}
          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] text-white font-semibold py-3 px-4 rounded-xl hover:opacity-95 transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>

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

          {/* Google Login */}
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
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <button
              className="text-blue-500 hover:text-blue-600 font-semibold cursor-pointer"
              onClick={() => navigate("/register")}
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
