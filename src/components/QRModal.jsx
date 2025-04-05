import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const QRModal = ({ urlId, cssClass, title = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [qr, setQr] = useState("");

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setTimeout(() => {
      setLoader(false);
    }, 4000);
  };

  const generateUrl = () => {
    const qr_code = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${`http://localhost:5173/redirect/${urlId}`}`;
    setQr(qr_code);
  };

  const downloadQR = () => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = qr;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);

      const jpegDataUrl = canvas.toDataURL("image/jpeg", 1.0);

      const link = document.createElement("a");
      link.href = jpegDataUrl;
      link.download = `QR_${`http://localhost:5173/redirect/${urlId}`}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  useEffect(() => {
    generateUrl();
  }, []);

  return (
    <>
      <button type="button" onClick={toggleModal} className={cssClass}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32px"
          viewBox="0 -960 960 960"
          width="32px"
          fill="#FFFFFF"
          className="group-hover:scale-110 transition-transform"
        >
          <path d="M520-120v-80h80v80h-80Zm-80-80v-200h80v200h-80Zm320-120v-160h80v160h-80Zm-80-160v-80h80v80h-80Zm-480 80v-80h80v80h-80Zm-80-80v-80h80v80h-80Zm360-280v-80h80v80h-80ZM180-660h120v-120H180v120Zm-60 60v-240h240v240H120Zm60 420h120v-120H180v120Zm-60 60v-240h240v240H120Zm540-540h120v-120H660v120Zm-60 60v-240h240v240H600Zm80 480v-120h-80v-80h160v120h80v80H680ZM520-400v-80h160v80H520Zm-160 0v-80h-80v-80h240v80h-80v80h-80Zm40-200v-160h80v80h80v80H400Zm-190-90v-60h60v60h-60Zm0 480v-60h60v60h-60Zm480-480v-60h60v60h-60Z" />
        </svg>
        <span className="text-white font-medium text-sm">{title}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm transition-opacity w-full"
          role="dialog"
          aria-labelledby="modal-title"
          onClick={toggleModal}
        >
          <div
            className="bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl w-full max-w-[400px] mx-4 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-700/50">
              <h3 id="modal-title" className="font-bold text-xl text-white">
                QR Code
              </h3>
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors focus:outline-none"
                onClick={toggleModal}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 flex justify-center items-center flex-col gap-4">
              <div className={`${loader ? "block" : "hidden"} animate-pulse`}>
                <Loader
                  height={"h-8"}
                  width={"w-8"}
                  color={"text-white"}
                  bgColor={"fill-blue-600"}
                />
              </div>

              <div
                className={`${
                  !loader ? "block" : "hidden"
                } bg-white p-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl`}
              >
                <img
                  src={qr}
                  alt="QR Code"
                  className="rounded-xl w-full max-w-[250px] h-auto"
                />
              </div>

              <button
                onClick={downloadQR}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors p-4 rounded-2xl text-white font-medium flex justify-center items-center gap-2 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#FFFFFF"
                  className="group-hover:scale-110 transition-transform"
                >
                  <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                </svg>
                <span>Download QR Code</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QRModal;
