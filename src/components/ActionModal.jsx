import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utilis/constants.js";
import Loader from "./Loader.jsx";
import useStore from "../store.js";
import { CalendarDays, Clock, FolderClock } from "lucide-react";

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
        className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      >
        <div
          className="relative w-full max-w-md mx-2 bg-white rounded-2xl shadow-2xl border border-blue-100 p-0 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-xl font-bold text-black">
              URL Expiry Settings
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition rounded-full p-1"
              aria-label="Close"
            >
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Loader */}
          {isLoading ? (
            <div className="flex justify-center items-center h-[200px]">
              <Loader
                height={"h-8"}
                width={"w-8"}
                color={"text-blue-700"}
                bgColor={"fill-blue-200"}
              />
            </div>
          ) : (
            <div className="px-6 py-6">
              {/* Expiry Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-zinc-800 flex items-center gap-2">
                  <FolderClock className="w-5 h-5 text-blue-500" />
                  <span>{formatExpiryTime(timeSinceExpiry(date, time))}</span>
                </div>
                <button
                  onClick={resetButton}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Date & Time Pickers */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-zinc-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>Select Time</span>
                  </label>
                  <input
                    type="time"
                    id="time"
                    min={new Date().toLocaleTimeString("en-CA", {
                      timeZone: "Asia/Kolkata",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-zinc-700 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-blue-400" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toLocaleDateString("en-CA", {
                      timeZone: "Asia/Kolkata",
                    })}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleInputField}
                disabled={isSubmitting}
                className={`w-full mt-6 text-white font-semibold rounded-lg px-5 py-2.5 shadow transition ${
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
