import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { StoreState } from "../context/Store";
import { BACKEND_URL } from "../utilis/constants.js";

const Redirect = () => {
  const [redirectURL, setRedirectURL] = useState("");
  const [isActive, setIsActive] = useState(true);
  const { id } = useParams();

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

  // Function to fetch redirect URL
  const fetchRedirectUrl = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/url/${id}`);
      if (response.data?.redirectURL) {
        setRedirectURL(response.data.redirectURL);
        setIsActive(response.data.isActive);
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
      console.log(response.data);
      const ipInfo = await axios.get(
        `${BACKEND_URL}/analytics/ip?ip=${response.data.ip}`
      );

      console.log(response.data);

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
      await axios.post(`${BACKEND_URL}/analytics/pushanalytics`, analyticsData);
    } catch (error) {
      console.error("Error pushing analytics:", error);
    }
  };

  // Fetch redirect URL
  useEffect(() => {
    fetchRedirectUrl();
  }, [id]);

  // Redirect when analytics data is ready
  useEffect(() => {
    if (
      redirectURL &&
      analyticsData.location !== "unavailable" &&
      analyticsData.ipAddress !== "unavailable"
    ) {
      pushAnalytics();
      if (isActive) {
        window.location.href = redirectURL;
      } else {
        window.location.href = "/timeout";
      }
    }
  }, [analyticsData.location, analyticsData.ipAddress]);

  // Fetch analytics data
  useEffect(() => {
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

  // return (
  //   <div className="w-full h-[100vh] flex justify-center items-center">
  //     <Loader
  //       height={"h-[70px]"}
  //       width={"w-[70px]"}
  //       color={"text-gray-300"}
  //       bgColor={"fill-red-600"}
  //     />
  //   </div>
  // );
};

export default Redirect;
