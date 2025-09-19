import React, { useState } from "react";
import HistoryVideo from "../components/Video/HistoryVideo";

function PlaylistDetailsPage() {
  const [playlist] = useState({
    name: "My Playlist",
    description: "This is a cool playlist with awesome videos.",
  });

  return (
    <div className="min-h-screen w-full  sm:p-6">
      <div className="w-full sm:max-w-5xl mx-auto shadow-lg rounded-2xl  sm:p-6">
        {/* Playlist Info */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{playlist.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{playlist.description}</p>

        {/* Playlist Videos */}
        <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Videos in Playlist
        </h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 w-full">
          <HistoryVideo />
          <HistoryVideo />
          <HistoryVideo />
          <HistoryVideo />
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetailsPage;
