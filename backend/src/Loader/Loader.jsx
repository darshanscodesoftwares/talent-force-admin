import React from "react";

export const BannerLoader = () => {
  return (
    <div className="space-y-12  mb-[200px]">
      {/* Top banners shimmer */}
      <div className="flex gap-20">
        <div className="w-60 h-32 bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="w-60 h-32 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>

      {/* Table shimmer */}
      <div className="space-y-6">
        {[...Array(5)].map((_, idx) => (
          <div
            className="h-12 w-full bg-gray-300 rounded-lg animate-pulse"
            key={idx}
          ></div>
        ))}
      </div>
    </div>
  );
};

export const SeekerTableLoader = () => {

}

export const RecruiterTableLoader = () => {

}