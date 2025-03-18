import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { StoreState } from "../context/Store";
import { NavLink, useNavigate } from "react-router-dom";
import QRModal from "../components/QRModal";

const Url = () => {
  const { urlId } = StoreState();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:5173/redirect/${urlId}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset "Copied!" message after 2 seconds
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
    <>
      <Navbar />
      <div className="bg-blue-950 h-[100vh] w-full flex justify-center items-center">
        <div className="w-[500px]  bg-gray-900 p-5 flex justify-center items-center flex-col gap-3 shadow-2xl rounded-2xl">
          {/* url box */}
          <div className="flex justify-center items-center w-full gap-3">
            <div className="w-full border-2 border-white text-white rounded-[25px] px-7 py-3">
              {`http://localhost:5173/redirect/${urlId}`}
            </div>

            <a href={`http://localhost:5173/redirect/${urlId}`} target="_blank">
              <div className="bg-amber-800 p-3 rounded-4xl cursor-pointer ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#FFFFFF"
                >
                  <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                </svg>
              </div>
            </a>
          </div>

          {/* copy btn */}
          <button
            onClick={handleCopy}
            className="w-full flex justify-center items-center bg-blue-600 p-3 rounded-4xl text-white gap-1 cursor-pointer"
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
            <span className="font-bold text-[16px]">
              {copied ? "Copied!" : "Copy URL"}
            </span>
          </button>

          {/* navigate btn */}
          <div className="w-full flex justify-center items-center gap-3">
            <NavLink
              to="/"
              className="py-3 w-full bg-amber-800 flex justify-center items-center flex-col rounded-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="44px"
                viewBox="0 -960 960 960"
                width="44px"
                fill="#FFFFFF"
              >
                <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
              </svg>

              <span className="text-white font-semibold">Another URL</span>
            </NavLink>
            <QRModal />
            <NavLink
              to="/dashboard"
              className="py-3 w-full bg-amber-800 flex justify-evenly items-center flex-col rounded-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="44px"
                viewBox="0 -960 960 960"
                width="44px"
                fill="#FFFFFF"
              >
                <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
              </svg>

              <span className="text-white font-semibold">Analytics</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Url;
