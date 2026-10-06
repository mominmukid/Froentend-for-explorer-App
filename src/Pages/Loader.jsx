import React from "react";

// Single video skeleton loader with shimmer effect
const VideoLoader = () => (
  <div className="animate-pulse flex flex-col space-y-3">
    {/* Thumbnail skeleton */}
    <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-700/80 aspect-video w-full rounded-2xl">
      <div className="absolute inset-0 skeleton-shimmer" />
    </div>
    {/* Info row */}
    <div className="flex gap-3 px-1">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700/80 flex-shrink-0">
        <div className="w-full h-full rounded-full skeleton-shimmer" />
      </div>
      {/* Text lines */}
      <div className="flex-1 space-y-2 pt-0.5">
        <div className="h-4 bg-gray-200 dark:bg-gray-700/80 rounded-lg w-[85%]" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700/80 rounded-lg w-[60%]" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700/80 rounded-lg w-[40%]" />
      </div>
    </div>
  </div>
);

// Grid loader with configurable count
const VideoGridLoader = ({ count = 12 }) => (
  <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: count }, (_, idx) => (
      <VideoLoader key={idx} />
    ))}
  </div>
);

export default VideoGridLoader;
