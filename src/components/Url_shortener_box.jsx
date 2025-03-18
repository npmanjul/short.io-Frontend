import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { StoreState } from "../context/Store.jsx";

const Url_shortener_box = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const { setUrlId } = StoreState();

  const generateUrl = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/url/generate",
        {
          url: url,
        }
      );

      if (localStorage.getItem("token")) {
        if (response.status === 201) {
          setUrlId(response.data.shortId);
          navigate("/url");
          toast.success("URL Generated");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full h-[100vh] bg-indigo-950">
        <div className="border-3 border-gray-700 p-1 rounded-full flex justify-center items-center flex-row relative">
          <input
            type="text"
            className=" w-[500px] h-[55px] rounded-4xl outline-0 text-[18px] text-white pl-13.5 pr-4 "
            placeholder="Enter the link here"
            name="url"
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <div className="absolute top-4 left-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
              fill="rgba(255,255,255,1)"
            >
              <path d="M17.6567 14.8284L16.2425 13.4142L17.6567 12C19.2188 10.4379 19.2188 7.90524 17.6567 6.34314C16.0946 4.78105 13.5619 4.78105 11.9998 6.34314L10.5856 7.75736L9.17139 6.34314L10.5856 4.92893C12.9287 2.58578 16.7277 2.58578 19.0709 4.92893C21.414 7.27208 21.414 11.0711 19.0709 13.4142L17.6567 14.8284ZM14.8282 17.6569L13.414 19.0711C11.0709 21.4142 7.27189 21.4142 4.92875 19.0711C2.5856 16.7279 2.5856 12.9289 4.92875 10.5858L6.34296 9.17157L7.75717 10.5858L6.34296 12C4.78086 13.5621 4.78086 16.0948 6.34296 17.6569C7.90506 19.2189 10.4377 19.2189 11.9998 17.6569L13.414 16.2426L14.8282 17.6569ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z"></path>
            </svg>
          </div>
          <button
            onClick={() => generateUrl()}
            className="bg-blue-600 cursor-pointer text-white font-bold py-4 px-6 rounded-4xl"
          >
            Shorten Now!
          </button>
        </div>
      </div>
    </>
  );
};

export default Url_shortener_box;
