import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import QRModal from "../components/QRModal";
import toast from "react-hot-toast";
import { FRONTEND_URL } from "../utilis/constants";
import useStore from "../store";

const Url = () => {
  // get urlId from store
  const { urlId, setUrl } = useStore();

  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${FRONTEND_URL}/link/${urlId}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("copied!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    if (!urlId) {
      navigate("/");
    }
  }, [urlId, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-2 py-8 flex justify-center items-center pt-30 sm:pt-0 min-h-[100vh]">
        <div className="bg-zinc-100 backdrop-blur-lg  w-full max-w-lg p-5 sm:px-8 sm:py-8 flex flex-col justify-center items-center gap-6 rounded-2xl">
          <h1 className="text-xl sm:text-2xl font-bold text-black text-center mb-2">
            Your Shortened URL
          </h1>

          {/* URL Display Box */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="w-full bg-white/20 text-gray-700 rounded-xl px-4 py-3 text-sm md:text-base overflow-x-auto whitespace-nowrap h-[48px] flex items-center border border-gray-800 overflow-hidden">
              {`${FRONTEND_URL}/link/${urlId}`}
            </div>
            <a
              href={`${FRONTEND_URL}/link/${urlId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600  transition-all duration-200 p-3 rounded-xl flex items-center justify-center shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="rgba(255,255,255,1)"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
            </a>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="w-full bg-green-600 transition-all duration-200 py-3 rounded-xl text-white flex justify-center items-center gap-2 font-medium shadow cursor-copy"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="http://www.w3.org/2000/svg"
              width="20"
              fill="#FFFFFF"
            >
              <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
            </svg>
            <span className="font-semibold">
              {copied ? "Copied!" : "Copy URL"}
            </span>
          </button>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            <NavLink
              to="/"
              className="bg-zinc-200 transition-all duration-200 py-3 rounded-xl flex flex-col items-center justify-center gap-1 group "
              onClick={() => setUrl("")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="#000000"
              >
                <path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path>
              </svg>
              <span className="text-black font-medium text-[15px]">
                New URL
              </span>
            </NavLink>

            <QRModal
              urlId={urlId}
              cssClass="bg-zinc-200  transition-all duration-200 py-3 rounded-xl flex flex-col items-center justify-center gap-1 group "
              title="QR Code"
              overlayCss={"bg-white backdrop-blur-sm"}
            />

            <NavLink
              to="/dashboard"
              className="bg-zinc-200 transition-all duration-200 py-3 rounded-xl flex flex-col items-center justify-center gap-1 group "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="#000000"
              >
                <path d="M3 12C3 12.5523 3.44772 13 4 13H10C10.5523 13 11 12.5523 11 12V4C11 3.44772 10.5523 3 10 3H4C3.44772 3 3 3.44772 3 4V12ZM3 20C3 20.5523 3.44772 21 4 21H10C10.5523 21 11 20.5523 11 20V16C11 15.4477 10.5523 15 10 15H4C3.44772 15 3 15.4477 3 16V20ZM13 20C13 20.5523 13.4477 21 14 21H20C20.5523 21 21 20.5523 21 20V12C21 11.4477 20.5523 11 20 11H14C13.4477 11 13 11.4477 13 12V20ZM14 3C13.4477 3 13 3.44772 13 4V8C13 8.55228 13.4477 9 14 9H20C20.5523 9 21 8.55228 21 8V4C21 3.44772 20.5523 3 20 3H14Z"></path>
              </svg>
              <span className="text-black font-medium text-[15px]">
                Analytics
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Url;
