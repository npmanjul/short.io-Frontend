import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utilis/constants.js";
import { motivationalQuotes } from "../utilis/Quotes.js";

const Redirect = () => {
  const [redirectURL, setRedirectURL] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [hasRedirected, setHasRedirected] = useState(false); // Prevent multiple redirects
  const { id } = useParams();
  const [selectedQuote, setSelectedQuote] = useState(null);

  const [analyticsData, setAnalyticsData] = useState({
    location: "unavailable",
    ipAddress: "unavailable",
    city: "unavailable",
    region: "unavailable",
    country: "unavailable",
    zip: "unavailable",
    currency: "unavailable",
    isp: "unavailable",
    org: "unavailable",
    as: "unavailable",
    asname: "unavailable",
    reverse: "unavailable",
    proxy: "unavailable",
    hosting: "unavailable",
    deviceType: "unavailable",
    connectionType: "unavailable",
    downloadSpeed: "unavailable",
    deviceCores: "unavailable",
    deviceRAM: "unavailable",
    browser: "unavailable",
    platform: "unavailable",
    language: "unavailable",
    onlineStatus: "unavailable",
    vendor: "unavailable",
    batteryLevel: "unavailable",
    chargingStatus: "unavailable",
    dischargingTime: "unavailable",
    screenWidth: "unavailable",
    screenHeight: "unavailable",
    availableScreenWidth: "unavailable",
    availableScreenHeight: "unavailable",
    colorDepth: "unavailable",
    devicePixelRatio: "unavailable",
    timeZone: "unavailable",
    date: "unavailable",
    time: "unavailable",
    urlid: id,
  });

  // Check if URL is active or not
  const checkUrlActive = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/urlfeatures/checkurlexpiry/${id}`
      );
      console.log("URL active status response:", response.data);

      // More robust check for isActive
      if (response.data && typeof response.data.isActive !== "undefined") {
        setIsActive(response.data.isActive);
        console.log("Setting isActive to:", response.data.isActive);
      } else {
        console.warn("isActive not found in response, defaulting to false");
        setIsActive(false);
      }
    } catch (error) {
      console.error("Error checking URL activity:", error);
      // Set to false if there's an error (URL might not exist or be inactive)
      setIsActive(false);
    }
  };

  // Function to fetch redirect URL
  const fetchRedirectUrl = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/url/${id}`);
      console.log("Redirect URL response:", response.data);

      if (response.data?.redirectURL) {
        setRedirectURL(response.data.redirectURL);
        console.log("Setting redirectURL to:", response.data.redirectURL);
      } else {
        console.warn("redirectURL not found in response");
      }
    } catch (error) {
      console.error("Error fetching redirect URL:", error);
    }
  };

  // Function to determine device type
  const getDeviceName = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent)) return "iOS";
    if (/Android/.test(userAgent)) return "Android";
    if (/Windows/.test(userAgent)) return "Windows PC";
    if (/Macintosh/.test(userAgent)) return "Mac";
    if (/Linux/.test(userAgent)) return "Linux PC";

    return "Unknown Device";
  };

  // Function to fetch IP address and geolocation
  const fetchIP = async () => {
    try {
      const response = await axios.get("https://ipinfo.io/json");
      const ipInfo = await axios.get(
        `${BACKEND_URL}/analytics/ip?ip=${response.data.ip}`
      );

      setAnalyticsData((prev) => ({
        ...prev,
        location: `${response.data.loc}`, // Format: "latitude,longitude"
        ipAddress: response.data.ip,
        city: response.data.city,
        region: response.data.region,
        country: response.data.country,
        zip: response.data.postal,
        currency: ipInfo.data.currency,
        isp: ipInfo.data.isp,
        org: ipInfo.data.org,
        as: ipInfo.data.as,
        asname: ipInfo.data.asname,
        reverse: ipInfo.data.reverse,
        proxy: ipInfo.data.proxy,
        hosting: ipInfo.data.hosting,
      }));
    } catch (error) {
      console.error("Error fetching IP:", error);
    }
  };

  // Function to get battery information
  const getBatteryInfo = async () => {
    try {
      const battery = await navigator.getBattery();
      setAnalyticsData((prev) => ({
        ...prev,
        batteryLevel: `${Math.round(battery.level * 100)}`,
        chargingStatus: battery.charging ? "Yes" : "No",
        dischargingTime:
          battery.dischargingTime !== Infinity
            ? `${Math.round(battery.dischargingTime / 3600)}`
            : "N/A",
      }));
    } catch (error) {
      console.error("Error fetching battery info:", error);
    }
  };

  // Function to get time and timezone
  const getTimeInfo = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const formattedDate = `${day}/${month}/${year}`;

    setAnalyticsData((prev) => ({
      ...prev,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      date: formattedDate,
      time: formattedTime,
    }));
  };

  // Function to push analytics data
  const pushAnalytics = async () => {
    try {
      console.log("Pushing analytics data:", analyticsData);
      await axios.post(`${BACKEND_URL}/analytics/pushanalytics`, analyticsData);
      console.log("Analytics pushed successfully");
    } catch (error) {
      console.error("Error pushing analytics:", error);
    }
  };

  // Handle redirection logic
  const handleRedirection = async () => {
    if (hasRedirected) return; // Prevent multiple redirections

    console.log("Handling redirection with:", {
      redirectURL,
      isActive,
      analyticsReady:
        analyticsData.location !== "unavailable" &&
        analyticsData.ipAddress !== "unavailable",
    });

    // Check if we have all necessary data
    if (!redirectURL) {
      console.log("Waiting for redirectURL...");
      return;
    }

    if (isActive === null) {
      console.log("Waiting for isActive status...");
      return;
    }

    if (
      analyticsData.location === "unavailable" ||
      analyticsData.ipAddress === "unavailable"
    ) {
      console.log("Waiting for analytics data...");
      return;
    }

    // All data is ready, push analytics and redirect
    setHasRedirected(true);

    try {
      await pushAnalytics();
      console.log("Analytics pushed, now redirecting...");

      if (isActive === true) {
        console.log("URL is active, redirecting to:", redirectURL);
        window.location.href = redirectURL;
      } else {
        console.log("URL is inactive, redirecting to timeout page");
        window.location.href = "/timeout";
      }
    } catch (error) {
      console.error("Error during redirection process:", error);
      // Even if analytics fails, still redirect based on isActive status
      if (isActive === true) {
        window.location.href = redirectURL;
      } else {
        window.location.href = "/timeout";
      }
    }
  };

  // Initial data fetch
  useEffect(() => {
    // Select quote once when component mounts
    if (!selectedQuote && motivationalQuotes && motivationalQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setSelectedQuote(motivationalQuotes[randomIndex]);
    }
    checkUrlActive();
    fetchRedirectUrl();
  }, [id]);

  // Handle redirection when all data is ready
  useEffect(() => {
    handleRedirection();
  }, [redirectURL, isActive, analyticsData.location, analyticsData.ipAddress]);

  // Fetch analytics data
  useEffect(() => {
    console.log("Fetching analytics data...");

    // Set device info
    setAnalyticsData((prev) => ({
      ...prev,
      deviceType: getDeviceName(),
      connectionType: navigator.connection?.effectiveType || "unavailable",
      downloadSpeed: navigator.connection?.downlink
        ? `${navigator.connection.downlink}`
        : "unavailable",
      deviceCores: navigator.hardwareConcurrency || "unavailable",
      deviceRAM: navigator.deviceMemory
        ? `${navigator.deviceMemory}`
        : "unavailable",
      browser: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      onlineStatus: navigator.onLine ? "Online" : "Offline",
      vendor: navigator.vendor,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      availableScreenWidth: window.screen.availWidth,
      availableScreenHeight: window.screen.availHeight,
      colorDepth: window.screen.colorDepth,
      devicePixelRatio: window.devicePixelRatio,
    }));

    fetchIP();
    getBatteryInfo();
    getTimeInfo();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-sm">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8 text-center">
          {/* Simple Spinner */}
          <div className="w-12 h-12 mx-auto mb-6">
            <div className="w-full h-full border-3 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
          </div>

          {/* Title */}
          <h1 className="text-xl font-semibold text-slate-900 mb-8">
            Redirecting...
          </h1>

          {/* Quote */}
          {selectedQuote && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600 leading-relaxed">
                "{selectedQuote.quote}"
              </p>
              <p className="text-xs text-slate-400 font-medium">
                — {selectedQuote.author || "Unknown"}
              </p>
            </div>
          )}
        </div>

        {/* Simple Progress Indicator */}
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-slate-300 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-slate-300 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redirect;
