import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { StoreState } from "../context/Store";
import { NavLink, useNavigate } from "react-router-dom";
import QRModal from "../components/QRModal";
import toast from "react-hot-toast";
import { FRONTEND_URL } from "../utilis/constants";

const Url = () => {
  const { urlId } = StoreState();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${FRONTEND_URL}/redirect/${urlId}`);
      // toast.success("Copied");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    if (!urlId) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 via-slate-800 to-zinc-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="bg-white/20 backdrop-blur-lg px-7 py-7 flex flex-col justify-center items-center gap-4 shadow-2xl rounded-3xl border border-gray-700/50">
          <h1 className="text-2xl font-bold text-white text-center mb-4">
            Your Shortened URL
          </h1>

          {/* URL Display Box */}
          <div className="flex flex-col sm:flex-row gap-3 w-[450px]">
            <div className="w-full backdrop-blur-lg bg-gray-800/50 text-white rounded-2xl px-4 py-3 text-sm md:text-base overflow-x-hidden whitespace-nowrap h-[50px]">
              {`${FRONTEND_URL}/redirect/${urlId}`}
            </div>

            <a
              href={`${FRONTEND_URL}/redirect/${urlId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-green-400 to-green-600 transition-all duration-300 hover:scale-105 p-3 rounded-2xl flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </a>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="w-full bg-gradient-to-br from-green-500 to-green-700 transition-all duration-300 p-4 rounded-2xl text-white flex justify-center items-center gap-2 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#FFFFFF"
            >
              <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
            </svg>
            <span className="font-semibold">
              {copied ? "Copied!" : "Copy URL"}
            </span>
          </button>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <NavLink
              to="/"
              className="bg-gradient-to-br from-green-600 to-green-800 transition-all duration-300  p-4 rounded-2xl flex flex-col items-center justify-center gap-2 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#FFFFFF"
                className="group-hover:scale-110 transition-transform"
              >
                <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
              </svg>
              <span className="text-white font-medium text-sm">New URL</span>
            </NavLink>

            <QRModal
              urlId={urlId}
              cssClass="bg-gradient-to-br from-green-600 to-green-800 transition-all duration-300  p-4 rounded-2xl flex flex-col items-center justify-center gap-2 group"
              title="QR Code"
            />

            <NavLink
              to="/dashboard"
              className="bg-gradient-to-br from-green-600 to-green-800 transition-all duration-300  p-4 rounded-2xl flex flex-col items-center justify-center gap-2 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#FFFFFF"
                className="group-hover:scale-110 transition-transform"
              >
                <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
              </svg>
              <span className="text-white font-medium text-sm">Analytics</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Url;
