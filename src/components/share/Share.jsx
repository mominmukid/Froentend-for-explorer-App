import React, { useState } from "react";
import { FaCopy, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";

function ShareBox({ setShowShare, links }) {
  const [link] = useState(links);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied!");
  };

  const handleCancel = () => {
    setShowShare(false);
  };

  const handleShare = (platform) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          link
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          link
        )}&text=Check this out!`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          link
        )}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[999]">
      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white text-center">
          Share this link
        </h2>

        {/* Link Box */}
        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2 mb-4">
          <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
            {link}
          </span>
          <button
            onClick={copyToClipboard}
            className="ml-3 text-blue-600 hover:text-blue-800"
          >
            <FaCopy size={18} />
          </button>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-4 justify-center mb-4">
          <button
            onClick={() => handleShare("facebook")}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaFacebook size={20} />
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600"
          >
            <FaTwitter size={20} />
          </button>
          <button
            onClick={() => handleShare("whatsapp")}
            className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
          >
            <FaWhatsapp size={20} />
          </button>
        </div>

        {/* Cancel Button */}
        <button
          className="w-full py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ShareBox;
