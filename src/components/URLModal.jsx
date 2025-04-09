import React, { useState, useEffect } from "react";
import QRModal from "./QRModal";
import Loader from "./Loader";
import QRGenerator from "./QRGenerator";
import toast from "react-hot-toast";
import LineChart from "./LineChart";
import axios from "axios";
import DoughnutChart from "./DoughnutChart.jsx";
import BarChart from "./BarChart.jsx";
import { StoreState } from "../context/Store.jsx";
import { BACKEND_URL, FRONTEND_URL } from "../utilis/constants.js";

const URLModal = ({ url, onClose }) => {
  const { urlAnalytics, fetchUrlAnalytics } = StoreState();
  const [isLoading, setIsLoading] = useState(true);
  const [visitAnalytics, setVisitAnalytics] = useState([]);
  const [locationAnalytics, setLocationAnalytics] = useState([]);
  const [deviceInfoAnalytics, setDeviceInfoAnalytics] = useState([]);
  const [networkInfoAnalytics, setNetworkInfoAnalytics] = useState([]);
  const [batteryInfoAnalytics, setBatteryInfoAnalytics] = useState([]);

  const generateRandomColors = (size) => {
    return Array.from(
      { length: size },
      () =>
        `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")}`
    );
  };

  const getTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (diffInSeconds < 60) return rtf.format(-diffInSeconds, "second");
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return rtf.format(-diffInMinutes, "minute");
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return rtf.format(-diffInHours, "hour");
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return rtf.format(-diffInDays, "day");
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return rtf.format(-diffInMonths, "month");
    const diffInYears = Math.floor(diffInMonths / 12);
    return rtf.format(-diffInYears, "year");
  };

  const fetchVisitAnalytics = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/urlanalytics/analyticsvisit/${url.urlId}`
    );

    setVisitAnalytics(response.data);
  };

  const fetchLocationAnalytics = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/urlanalytics/locationanalytics/${url.urlId}`
    );

    setLocationAnalytics(response.data);
  };

  const fetchdeviceInfoAnalytics = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/urlanalytics/deviceinfoanalytics/${url.urlId}`
    );

    setDeviceInfoAnalytics(response.data);
  };

  const fetchnetworkInfoAnalytics = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/urlanalytics/networkinfoanalytics/${url.urlId}`
    );

    setNetworkInfoAnalytics(response.data);
  };

  const fetchbatteryInfoAnalytics = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/urlanalytics/batteryinfoanalytics/${url.urlId}`
    );

    setBatteryInfoAnalytics(response.data);
  };

  const handleCopy = async ({ content }) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchUrlAnalytics(url.urlId),
        fetchVisitAnalytics(),
        fetchLocationAnalytics(),
        fetchdeviceInfoAnalytics(),
        fetchnetworkInfoAnalytics(),
        fetchbatteryInfoAnalytics(),
      ]);
      setIsLoading(false);
    };
    fetchAllData();

    // Add event listener for escape key
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleClose = () => {
    const modal = document.querySelector(".modal-content");
    if (modal) {
      modal.classList.add("opacity-0", "scale-95");
      setTimeout(() => {
        onClose();
      }, 100);
    } else {
      onClose();
    }
  };

  if (!url) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm transition-opacity w-full"
      onClick={handleClose}
    >
      <div
        className="modal-content bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl mx-4 transform transition-all duration-200 ease-in-out opacity-100 scale-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            URL Details
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        {isLoading ? (
          <div className="flex justify-center items-center h-[100vh]">
            <Loader
              height={"h-8"}
              width={"w-8"}
              color={"text-white"}
              bgColor={"fill-black"}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto gap-6">
            <div className="flex flex-col p-6 gap-5">
              <div className="flex justify-center items-start gap-8 w-full flex-col sm:flex-row">
                <div className="flex flex-col gap-7 w-full">
                  {/* Original URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Original URL
                    </label>
                    <div className="flex justify-between items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                        <span className="text-gray-900 dark:text-white break-all">
                          <a
                            href={url.redirectURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {url.redirectURL}
                          </a>
                        </span>
                      </div>
                      <div
                        onClick={() => handleCopy({ content: url.redirectURL })}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#B7B7B7"
                        >
                          <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Short URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Short URL
                    </label>
                    <div className="flex justify-between items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                        <span className="text-blue-600 dark:text-blue-400 break-all">
                          <a
                            href={`${FRONTEND_URL}/redirect/${url.shortId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {`${FRONTEND_URL}/redirect/${url.shortId}`}
                          </a>
                        </span>
                      </div>
                      <div
                        onClick={() =>
                          handleCopy({
                            content: `${FRONTEND_URL}/redirect/${url.shortId}`,
                          })
                        }
                        className="cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#B7B7B7"
                        >
                          <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/*  URL Status*/}
                  <div className="flex gap-4 w-full">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        URL Status
                      </label>
                      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#78A75A"
                        >
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                        <span>
                          {urlAnalytics.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        URL Expiry
                      </label>
                      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#434343"
                        >
                          <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                        </svg>
                        <span>
                          {urlAnalytics.isExpiry ? (
                            <div>Soon</div>
                          ) : (
                            <div>No Expiry</div>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Total Clicks
                      </label>
                      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#434343"
                        >
                          <path d="M468-240q-96-5-162-74t-66-166q0-100 70-170t170-70q97 0 166 66t74 162l-84-25q-13-54-56-88.5T480-640q-66 0-113 47t-47 113q0 57 34.5 100t88.5 56l25 84Zm48 158q-9 2-18 2h-18q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v18q0 9-2 18l-78-24v-12q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h12l24 78Zm305 22L650-231 600-80 480-480l400 120-151 50 171 171-79 79Z" />
                        </svg>
                        <span>{urlAnalytics.totalClicks}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex justify-center items-center w-full sm:w-auto">
                  <QRGenerator urlId={url.shortId} />
                </div>
              </div>

              <div className="flex justify-center items-center w-full flex-col gap-4">
                {/* Analytics Chart */}

                <div className="flex justify-center items-center w-full flex-col gap-4 ">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white w-full ">
                    Analytics Dashboard
                  </h3>

                  {visitAnalytics.visitCounts &&
                  visitAnalytics.visitCounts.length > 0 ? (
                    <>
                      {/* Total Visits */}
                      <div className="w-full p-4 bg-gray-100 rounded-xl">
                        <h3 className="text-[16px] font-bold text-gray-600 mb-4">
                          Total Visits
                        </h3>
                        <LineChart
                          labelsArray={visitAnalytics.uniqueVisitDates}
                          dataArray={visitAnalytics.visitCounts}
                          labelName={"Visitors"}
                          title={"Visitors"}
                          tooltipName={"Visit"}
                        />
                      </div>

                      {/* Device Location */}
                      <div className="w-full flex justify-center items-center gap-4 flex-col p-4 bg-gray-100 rounded-xl">
                        <div className="text-[16px] font-bold text-gray-600 text-start w-full">
                          Device Location
                        </div>
                        <div className="flex justify-center items-center w-full gap-4 flex-col sm:flex-row">
                          <div className="flex justify-center items-center w-full flex-col gap-4 bg-white rounded-xl py-4">
                            <div className="w-full px-5">
                              <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                                City
                              </h3>
                            </div>
                            <DoughnutChart
                              labelsArray={locationAnalytics.cities || []}
                              dataArray={locationAnalytics.cityCounts || []}
                              labelName={"Location"}
                              title={"Location"}
                              tooltipName={"Visit"}
                              bgColorArray={generateRandomColors(
                                locationAnalytics.cities?.length || 0
                              )}
                            />
                          </div>
                          <div className="flex justify-center items-center w-full flex-col py-4 gap-4 bg-white rounded-xl">
                            <div className="w-full px-5">
                              <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                                State
                              </h3>
                            </div>
                            <DoughnutChart
                              labelsArray={locationAnalytics.regions || []}
                              dataArray={locationAnalytics.regionCounts || []}
                              labelName={"Location"}
                              title={"Location"}
                              tooltipName={"Visit"}
                              bgColorArray={generateRandomColors(
                                locationAnalytics?.regions?.length || 0
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex justify-center items-center w-full flex-col gap-4 bg-white rounded-xl py-4">
                          <div className="w-full px-5">
                            <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                              Country
                            </h3>
                          </div>

                          <div className="w-full flex justify-center items-center h-[300px] py-3">
                            <BarChart
                              labelsArray={locationAnalytics.countries || []}
                              dataArray={locationAnalytics.countryCounts || []}
                              chartTitle={"Users"}
                              bgColorArray={generateRandomColors(
                                locationAnalytics.countries?.length || 0
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Device Information */}
                      <div className="w-full flex justify-center items-center gap-4 flex-col p-4 bg-gray-100 rounded-xl">
                        <div className="text-[16px] font-bold text-gray-600 text-start w-full">
                          Device Information
                        </div>

                        <div className="flex justify-center items-center w-full gap-4 flex-col sm:flex-row">
                          <div className="flex justify-center items-center w-full flex-col gap-4 bg-white rounded-xl py-4">
                            <div className="w-full px-5">
                              <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                                Device Type
                              </h3>
                            </div>
                            <DoughnutChart
                              labelsArray={
                                deviceInfoAnalytics.deviceTypes || []
                              }
                              dataArray={
                                deviceInfoAnalytics.deviceTypeCounts || []
                              }
                              labelName={"Location"}
                              title={"Location"}
                              tooltipName={"Visit"}
                              bgColorArray={generateRandomColors(
                                deviceInfoAnalytics.deviceTypes?.length || 0
                              )}
                            />
                          </div>
                          <div className="flex justify-center items-center w-full flex-col py-4 gap-4 bg-white rounded-xl">
                            <div className="w-full px-5">
                              <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                                Language
                              </h3>
                            </div>
                            <DoughnutChart
                              labelsArray={deviceInfoAnalytics.languages || []}
                              dataArray={
                                deviceInfoAnalytics.languageCounts || []
                              }
                              labelName={"Location"}
                              title={"Location"}
                              tooltipName={"Visit"}
                              bgColorArray={generateRandomColors(
                                deviceInfoAnalytics.languages?.length || 0
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex justify-center items-center w-full gap-4 flex-col sm:flex-row">
                          <div className="flex justify-center items-center w-full flex-col gap-4 bg-white rounded-xl py-4">
                            <div className="w-full px-5">
                              <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                                Vendor
                              </h3>
                            </div>
                            <DoughnutChart
                              labelsArray={deviceInfoAnalytics.vendors || []}
                              dataArray={deviceInfoAnalytics.vendorCounts || []}
                              labelName={"Location"}
                              title={"Location"}
                              tooltipName={"Visit"}
                              bgColorArray={generateRandomColors(
                                deviceInfoAnalytics.vendors?.length || 0
                              )}
                            />
                          </div>
                          <div className="flex justify-center items-center w-full flex-col py-4 gap-4 bg-white rounded-xl">
                            <div className="w-full px-5">
                              <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                                Plateform
                              </h3>
                            </div>
                            <DoughnutChart
                              labelsArray={deviceInfoAnalytics.platforms || []}
                              dataArray={
                                deviceInfoAnalytics.platformCounts || []
                              }
                              labelName={"Location"}
                              title={"Location"}
                              tooltipName={"Visit"}
                              bgColorArray={generateRandomColors(
                                deviceInfoAnalytics.platforms?.length || 0
                              )}
                            />
                          </div>
                        </div>

                        {/* Device Cores */}
                        <div className="flex justify-center items-center w-full flex-col gap-4 bg-white rounded-xl py-4">
                          <div className="w-full px-5">
                            <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                              Device Cores
                            </h3>
                          </div>
                          <div className="w-full flex justify-center items-center h-[300px] py-3">
                            <BarChart
                              labelsArray={
                                deviceInfoAnalytics.deviceCores || []
                              }
                              dataArray={
                                deviceInfoAnalytics.deviceCoresCounts || []
                              }
                              chartTitle={"Users"}
                              bgColorArray={generateRandomColors(
                                deviceInfoAnalytics.deviceCores?.length || 0
                              )}
                            />
                          </div>
                        </div>

                        {/* Device RAM */}
                        <div className="flex justify-center items-center w-full flex-col gap-4 bg-white rounded-xl py-4">
                          <div className="w-full px-5">
                            <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                              Device RAM
                            </h3>
                          </div>
                          <div className="w-full flex justify-center items-center h-[300px] py-3">
                            <BarChart
                              labelsArray={deviceInfoAnalytics.deviceRAMs || []}
                              dataArray={
                                deviceInfoAnalytics.deviceRAMCounts || []
                              }
                              chartTitle={"Users"}
                              bgColorArray={generateRandomColors(
                                deviceInfoAnalytics.deviceRAMs?.length || 0
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Network Information */}
                      <div className="w-full flex justify-center items-center gap-4 flex-col p-4 bg-gray-100 rounded-xl">
                        <div className="text-[16px] font-bold text-gray-600 text-start w-full">
                          Network Information
                        </div>

                        <div className="flex justify-center items-center w-full gap-4 flex-col sm:flex-row">
                          <div className="flex justify-center items-center w-full flex-col gap-4 bg-white rounded-xl py-4">
                            <div className="w-full px-5">
                              <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                                Connection Type
                              </h3>
                            </div>
                            <DoughnutChart
                              labelsArray={
                                deviceInfoAnalytics.connectionTypes || []
                              }
                              dataArray={
                                deviceInfoAnalytics.connectionTypeCounts || []
                              }
                              labelName={"Location"}
                              title={"Location"}
                              tooltipName={"Visit"}
                              bgColorArray={generateRandomColors(
                                deviceInfoAnalytics.connectionTypes?.length || 0
                              )}
                            />
                          </div>
                          <div className="flex justify-center items-center w-full flex-col py-4 gap-4 bg-white rounded-xl">
                            <div className="w-full px-5">
                              <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                                Device Status
                              </h3>
                            </div>
                            <DoughnutChart
                              labelsArray={
                                deviceInfoAnalytics.onlineStatuses || []
                              }
                              dataArray={
                                deviceInfoAnalytics.onlineStatusCounts || []
                              }
                              labelName={"Location"}
                              title={"Location"}
                              tooltipName={"Visit"}
                              bgColorArray={generateRandomColors(
                                deviceInfoAnalytics.onlineStatuses?.length || 0
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex justify-center items-center w-full gap-4 flex-col sm:flex-row">
                          <div className="flex justify-center items-center w-full flex-col gap-4 bg-white rounded-xl py-4">
                            <div className="w-full px-5">
                              <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                                ISP
                              </h3>
                            </div>
                            <DoughnutChart
                              labelsArray={networkInfoAnalytics.isps || []}
                              dataArray={networkInfoAnalytics.ispCounts || []}
                              labelName={"Location"}
                              title={"Location"}
                              tooltipName={"Visit"}
                              bgColorArray={generateRandomColors(
                                networkInfoAnalytics.isps?.length || 0
                              )}
                            />
                          </div>
                          <div className="flex justify-center items-center w-full flex-col py-4 gap-4 bg-white rounded-xl">
                            <div className="w-full px-5">
                              <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                                Org
                              </h3>
                            </div>
                            <DoughnutChart
                              labelsArray={networkInfoAnalytics.orgs || []}
                              dataArray={networkInfoAnalytics.orgCounts || []}
                              labelName={"Location"}
                              title={"Location"}
                              tooltipName={"Visit"}
                              bgColorArray={generateRandomColors(
                                networkInfoAnalytics.orgs?.length || 0
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex justify-center items-center w-full gap-4 flex-col sm:flex-row">
                          <div className="flex justify-center items-center w-full flex-col gap-4 bg-white rounded-xl py-4">
                            <div className="w-full px-5">
                              <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                                Proxy
                              </h3>
                            </div>
                            <DoughnutChart
                              labelsArray={networkInfoAnalytics.proxies || []}
                              dataArray={networkInfoAnalytics.proxyCounts || []}
                              labelName={"Location"}
                              title={"Location"}
                              tooltipName={"Visit"}
                              bgColorArray={generateRandomColors(
                                networkInfoAnalytics.proxies?.length || 0
                              )}
                            />
                          </div>
                          <div className="flex justify-center items-center w-full flex-col py-4 gap-4 bg-white rounded-xl">
                            <div className="w-full px-5">
                              <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                                Hosting
                              </h3>
                            </div>
                            <DoughnutChart
                              labelsArray={networkInfoAnalytics.hostings || []}
                              dataArray={
                                networkInfoAnalytics.hostingCounts || []
                              }
                              labelName={"Location"}
                              title={"Location"}
                              tooltipName={"Visit"}
                              bgColorArray={generateRandomColors(
                                networkInfoAnalytics.hostings?.length || 0
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Network Information */}
                      <div className="w-full flex justify-center items-center gap-4 flex-col p-4 bg-gray-100 rounded-xl">
                        <div className="text-[16px] font-bold text-gray-600 text-start w-full">
                          Battery Information
                        </div>

                        {/* Device Battery */}
                        <div className=" rounded-lg py-2 w-full bg-white">
                          <div className="w-full rounded-lg p-4 overflow-auto">
                            <LineChart
                              labelsArray={
                                batteryInfoAnalytics.batteryLevels || []
                              }
                              dataArray={
                                batteryInfoAnalytics.batteryLevelCounts || []
                              }
                              labelName={"Battery Level"}
                              title={"Battery Level"}
                              tooltipName={"Visiter"}
                            />
                          </div>
                        </div>

                        <div className=" rounded-lg py-2 w-full bg-white">
                          <div className="w-full rounded-lg p-4 overflow-x-auto">
                            <LineChart
                              labelsArray={
                                batteryInfoAnalytics.dischargingTimes || []
                              }
                              dataArray={
                                batteryInfoAnalytics.dischargingTimeCounts || []
                              }
                              labelName={"Discharging Time"}
                              title={"Discharging Time"}
                              tooltipName={"Visiter"}
                            />
                          </div>
                        </div>

                        <div className="flex justify-center items-center w-full flex-col gap-4 bg-white rounded-xl py-4">
                          <div className="w-full px-5">
                            <h3 className="text-start text-[14px] font-bold px-4 py-1 bg-gray-100 rounded-xl inline-block">
                              Charging Status
                            </h3>
                          </div>
                          <div className="w-full flex justify-center items-center h-[300px] py-3">
                            <BarChart
                              labelsArray={
                                batteryInfoAnalytics.chargingStatuses || []
                              }
                              dataArray={
                                batteryInfoAnalytics.chargingStatusCounts || []
                              }
                              chartTitle={"Users"}
                              bgColorArray={generateRandomColors(
                                batteryInfoAnalytics.chargingStatuses?.length ||
                                  0
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full py-12 px-4">
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-full p-4 mb-4">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No Analytics Data Available
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm">
                        This URL hasn't received any visits yet. Analytics will
                        appear here once people start visiting your shortened
                        URL.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default URLModal;
