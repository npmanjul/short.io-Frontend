import React, { useEffect, useState } from "react";
import { FRONTEND_URL } from "../utilis/constants.js";

const QRGenerator = ({ urlId }) => {
  const [qr, setQr] = useState("");

  useEffect(() => {
    if (urlId) {
      const qr_code = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${`${FRONTEND_URL}/link/${urlId}`}`;
      setQr(qr_code);
    }
  }, [urlId]);

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
      link.download = `QR_${urlId}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {qr && (
        <div className="bg-white w-[250px] h-[250px] p-4 rounded-2xl shadow transition-all duration-300 hover:shadow-xl">
          <img src={qr} alt="QR Code" />
        </div>
      )}

      <button
        onClick={downloadQR}
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-3 px-4 rounded-2xl text-white text-[14px] font-medium flex justify-center items-center gap-2 group"
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
  );
};

export default QRGenerator;
