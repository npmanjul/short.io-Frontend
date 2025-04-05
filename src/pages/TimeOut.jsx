import React from "react";
import { Link } from "react-router-dom";

const TimeOut = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black text-white min-h-screen w-full p-4">
      <div className="text-center space-y-6">
        {/* Clock Icon */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-red-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-4 border-4 border-red-500 rounded-full"></div>
          <div className="absolute inset-8 border-4 border-red-500 rounded-full"></div>
        </div>

        {/* Main Text */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
          Link Expired
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto">
          This URL has expired and is no longer available. The link you're
          trying to access has reached its time limit.
        </p>

        {/* Action Button */}
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TimeOut;
