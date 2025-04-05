import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { StoreState } from "../context/Store";

const ActionModal = ({ url, onClose }) => {
  const { urlAnalytics, fetchUrlAnalytics } = StoreState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const resetButton = () => {
    setDate("");
    setTime("");
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/url/urlexpiry",
        {
          isActive: isChecked,
          expiryDate: date,
          expiryTime: time,
          urlId: url.urlId,
        }
      );

      if (response.status === 201) {
        toast.success("Updated successfully");
        onClose();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to update Action");
    }
  };

  const handleInputField = (e) => {
    if (date && time) {
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
    if (url) {
      fetchUrlAnalytics(url.urlId);
    }
  }, [url]);

  useEffect(() => {
    if (urlAnalytics) {
      console.log("URL Analytics Data:", urlAnalytics);

      setIsChecked(urlAnalytics.isActive || false);

      // Ensure correct date format (YYYY-MM-DD)
      if (urlAnalytics.expiryDate) {
        setDate(new Date(urlAnalytics.expiryDate).toISOString().split("T")[0]);
      }

      // Ensure correct time format (HH:MM)
      if (urlAnalytics.expiryTime) {
        const timeString = urlAnalytics.expiryTime
          .split(":")
          .slice(0, 2)
          .join(":");
        setTime(timeString);
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
          className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg"
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

          <div className="p-4">
            <div className="w-full">
              <div className="flex justify-between items-center w-full pb-2">
                <div className="text-start font-bold text-[18px]">
                  Set URL Expiry
                </div>
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
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </label>

                {/* Toggle Switch */}
                <div className="flex justify-between items-center gap-2 w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div className="w-full flex justify-start items-center gap-1">
                    <div className="font-bold text-start text-gray-900 dark:text-gray-300">
                      URL Status:
                    </div>
                    <span className="ms-3 text-sm font-bold">
                      {isChecked ? (
                        <div className="text-green-600">Active</div>
                      ) : (
                        <div className="text-red-500">Inactive</div>
                      )}
                    </span>
                  </div>

                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-red-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleInputField}
              className="w-full bg-blue-700 mt-4 hover:bg-blue-800 text-white font-medium rounded-lg px-5 py-2.5 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ActionModal;
