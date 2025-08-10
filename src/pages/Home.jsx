import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { BACKEND_URL } from "../utilis/constants.js";
import useStore from "../store.js";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUrlId, url, setUrl } = useStore();

  const generateUrl = async () => {
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/url/generate`, {
        url: url,
        userId: localStorage.getItem("userId"),
      });

      if (localStorage.getItem("token")) {
        if (response.status === 201) {
          setUrlId(response.data.shortId);
          navigate("/url");
          toast.success("URL Generated Successfully!");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        navigate("/login");
      } else {
        toast.error("Failed to generate URL. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        generateUrl();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [generateUrl]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen w-full bg-gradient-to-br bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-zinc-100 backdrop-blur-lg rounded-2xl p-8 shadow">
            <h1 className="text-3xl md:text-4xl font-bold text-Black text-center mb-8">
              URL Shortener
            </h1>
            <div className="relative flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-2">
              <div className="relative w-full">
                <input
                  type="text"
                  className="w-full h-14  rounded-xl bg-white/5  border border-black/40  text-zinc-700 text-lg px-16 py-4 focus:outline-none   transition-all duration-300 placeholder-zinc-600 "
                  placeholder="Enter your long URL here"
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <div className="absolute left-6 top-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="#000000"
                    className="transition-colors duration-300 "
                  >
                    <path d="M17.6567 14.8284L16.2425 13.4142L17.6567 12C19.2188 10.4379 19.2188 7.90524 17.6567 6.34314C16.0946 4.78105 13.5619 4.78105 11.9998 6.34314L10.5856 7.75736L9.17139 6.34314L10.5856 4.92893C12.9287 2.58578 16.7277 2.58578 19.0709 4.92893C21.414 7.27208 21.414 11.0711 19.0709 13.4142L17.6567 14.8284ZM14.8282 17.6569L13.414 19.0711C11.0709 21.4142 7.27189 21.4142 4.92875 19.0711C2.5856 16.7279 2.5856 12.9289 4.92875 10.5858L6.34296 9.17157L7.75717 10.5858L6.34296 12C4.78086 13.5621 4.78086 16.0948 6.34296 17.6569C7.90506 19.2189 10.4377 19.2189 11.9998 17.6569L13.414 16.2426L14.8282 17.6569ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z"></path>
                  </svg>
                </div>
              </div>

              <button
                onClick={generateUrl}
                disabled={isLoading}
                className="w-full sm:w-[200px] bg-gradient-to-br from-green-500 to-green-800 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Shorten Now"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
