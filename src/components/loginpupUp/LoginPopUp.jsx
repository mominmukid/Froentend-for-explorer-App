import React from "react";
import { useNavigate } from "react-router-dom";

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

   const handleCancel = () => {
      setSetShowLogin(false);
   };

   return (
      <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50">
         <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white text-center">
               Login Required
            </h2>
            <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
               You need to be logged in to use this feature. Please login or register to continue.
            </p>

            {/* Buttons */}
            <div className="flex  gap-3 mb-4">
               <button
                  onClick={handleLogin}
                  className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
               >
                  Login
               </button>
               <button
                  onClick={handleRegister}
                  className="w-full py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
               >
                  Register
               </button>
            </div>

            {/* Cancel Button */}
            <button
               onClick={handleCancel}
               className="w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
            >
               Cancel
            </button>
         </div>
      </div>
   );
}

// Example parent page

export default AuthRequiredPopup