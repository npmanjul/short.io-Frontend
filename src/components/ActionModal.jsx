import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utilis/constants.js";
import Loader from "./Loader.jsx";
import useStore from "../store.js";

const ActionModal = ({ url, onClose }) => {
  // State
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use Store
  const { urlAnalytics, fetchUrlAnalytics, fetchUrl } = useStore();

  // Reset Button
  const resetButton = () => {
    setDate("");
    setTime("");
  };

  function timeSinceExpiry(expiryDate, expiryTime) {
    if (!expiryDate || !expiryTime) return null;

    const [year, month, day] = expiryDate.split("-").map(Number);
    const [hour, minute] = expiryTime.split(":").map(Number);
    // Create expiry date in local timezone
    const expiryDateTime = new Date(year, month - 1, day, hour, minute, 0);
    const now = new Date();
    const diffMs = now - expiryDateTime;
    const diffSeconds = Math.abs(diffMs) / 1000;
    // Check if expired or not
    const isExpired = diffMs > 0;
    // Calculate time difference
    const secondsInYear = 3600 * 24 * 365.25;
    const years = Math.floor(diffSeconds / secondsInYear);
    if (years >= 1) {
      return { years, isExpired };
    }
    const days = Math.floor(diffSeconds / (3600 * 24));
    const hours = Math.floor((diffSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    return { days, hours, minutes, isExpired };
  }

  function formatExpiryTime(obj) {
    if (!obj) return "No expiry set";

    if (obj.years) {
      if (obj.isExpired) {
        return `Expired ${obj.years} year${obj.years !== 1 ? "s" : ""} ago.`;
      } else {
        return `Expires in ${obj.years} year${obj.years !== 1 ? "s" : ""}.`;
      }
    }

    const { days, hours, minutes, isExpired } = obj;
    // Handle cases where some values might be 0
    const parts = [];
    if (days > 0) {
      parts.push(`${days} day${days !== 1 ? "s" : ""}`);
    }
    if (hours > 0) {
      parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
    }
    if (minutes > 0) {
      parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
    }

    // Handle edge case where it's been less than a minute
    if (parts.length === 0) {
      if (isExpired) {
        return "Expired less than a minute ago.";
      } else {
        return "Expires in less than a minute.";
      }
    }

    // Join parts with proper grammar
    let timeString;
    if (parts.length === 1) {
      timeString = parts[0];
    } else if (parts.length === 2) {
      timeString = `${parts[0]} and ${parts[1]}`;
    } else {
      timeString = `${parts.slice(0, -1).join(", ")}, and ${
        parts[parts.length - 1]
      }`;
    }

    // Return appropriate message based on expiry status
    if (isExpired) {
      return `Expired ${timeString} ago.`;
    } else {
      return `Expires in ${timeString}.`;
    }
  }

  // Handle Submit
  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent double submission

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/urlfeatures/seturlexpiry`,
        {
          expiryDate: date,
          expiryTime: time,
          urlId: url.urlId,
        }
      );

      if (response.status === 200) {
        toast.success("Updated successfully");

        // Refresh both URL list and analytics data
        await Promise.all([fetchUrl(), fetchUrlAnalytics(url.urlId)]);

        onClose();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error updating URL expiry:", error);
      toast.error("Failed to update Action");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputField = (e) => {
    if ((date && time) || (date === "" && time === "")) {
      handleSubmit();
    } else {
      toast.error("Please select both the fields");
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await fetchUrlAnalytics(url.urlId);
      } catch (error) {
        console.error("Error fetching URL analytics:", error);
        toast.error("Failed to load URL data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [url.urlId]);

  useEffect(() => {
    if (urlAnalytics) {
      // Ensure correct date format (YYYY-MM-DD)
      if (urlAnalytics.expiryDate) {
        setDate(new Date(urlAnalytics.expiryDate).toISOString().split("T")[0]);
      } else {
        setDate("");
      }

      // Ensure correct time format (HH:MM)
      if (urlAnalytics.expiryTime) {
        const timeString = urlAnalytics.expiryTime
          .split(":")
          .slice(0, 2)
          .join(":");
        setTime(timeString);
      } else {
        setTime("");
      }
    }
  }, [urlAnalytics]);

  return (
    url && (
      <div
        className="fixed inset-0 z-50 flex justify-center items-center bg-black/75 backdrop-blur-sm transition-opacity w-full"
        onClick={handleClose}
      >
        <div
          className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg mx-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              URL Action
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 bg-gray-200 rounded-lg text-sm h-8 w-8 flex justify-center items-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#434343"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-[50vh]">
              <Loader
                height={"h-8"}
                width={"w-8"}
                color={"text-white"}
                bgColor={"fill-black"}
              />
            </div>
          ) : (
            <div className="p-4">
              <div className="w-full">
                <div className="flex justify-between items-center w-full pb-2">
                  <div className="text-start font-bold text-[18px]">
                    Set URL Expiry
                  </div>
                  <div>{formatExpiryTime(timeSinceExpiry(date, time))}</div>
                  <div
                    onClick={resetButton}
                    className="text-end text-blue-700 cursor-pointer"
                  >
                    Reset
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Time Selection */}
                  <div className="flex gap-2 w-full flex-col p-3 rounded-lg bg-gray-100">
                    <span className="font-bold text-start">Select Time:</span>
                    <input
                      type="time"
                      id="time"
                      min={new Date().toLocaleTimeString("en-CA", {
                        timeZone: "Asia/Kolkata",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>

                  {/* Date Selection */}
                  <label className="flex gap-2 w-full flex-col p-3 rounded-lg bg-gray-100">
                    <span className="font-bold text-start">Select Date:</span>
                    <input
                      type="date"
                      value={date}
                      min={new Date().toLocaleDateString("en-CA", {
                        timeZone: "Asia/Kolkata",
                      })}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </label>
                </div>
              </div>

              <button
                onClick={handleInputField}
                disabled={isSubmitting}
                className={`w-full mt-4 text-white font-medium rounded-lg px-5 py-2.5 cursor-pointer ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800"
                }`}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ActionModal;
