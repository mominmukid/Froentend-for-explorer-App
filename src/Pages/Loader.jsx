import React from "react";

// Single video loader
const VideoLoader = () => (
  <div className="animate-pulse flex flex-col space-y-3">
    {/* Thumbnail */}
    <div className="bg-gray-300 dark:bg-gray-700 h-40 w-full rounded-lg"></div>
    {/* Title */}
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
    {/* Description */}
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
  </div>
);

// Grid loader
const VideoGridLoader = ({ count = 9 }) => (
  <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
    {Array(count)
      .fill(0)
      .map((_, idx) => (
        <VideoLoader key={idx} />
      ))}
  </div>
);

export default VideoGridLoader;
