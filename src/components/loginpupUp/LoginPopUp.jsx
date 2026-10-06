import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiX } from "react-icons/fi";

function AuthRequiredPopup({ setSetShowLogin }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    setSetShowLogin(false);
    navigate("/login");
  };

  const handleRegister = () => {
    setSetShowLogin(false);
    navigate("/register");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl relative">
        <button
          onClick={() => setSetShowLogin(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition"
        >
          <FiX size={20} />
        </button>

        <div className="flex flex-col items-center text-center mb-8 mt-4">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <FiLock size={28} />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            Authentication Required
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Please log in or create an account to access this feature and enjoy the full experience.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-sm hover:shadow-md"
          >
            Log In
          </button>
          <button
            onClick={handleRegister}
            className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthRequiredPopup;