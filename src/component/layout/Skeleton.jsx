// CampaignSkeleton.jsx
import React from "react";

const Skeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-2xl shadow-lg p-4 w-full">
      <div className="bg-gray-300 w-full h-48 rounded"></div>
      <div className="mt-4 space-y-2">
        <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-full rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>
    </div>
  );
};

export default Skeleton;
