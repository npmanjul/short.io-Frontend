import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const Redirect = () => {
  const [redirectURL, setRedirectURL] = useState("");
  const { id } = useParams();
  const [analyticsData, setAnalyticsData] = useState({
    longitude: "" || "unavailable",
    latitude: "",
    accuracy: "",
    ipAddress: "",
    deviceType: "",
    connectionType: "",
    downloadSpeed: "",
    deviceCores: "",
    deviceRAM: "",
    browser: "",
    platform: "",
    language: "",
    onlineStatus: "",
    vendor: "",
    batteryLevel: "" || "unavailable",
    chargingStatus: "" || "unavailable",
    dischargingTime: "" || "unavailable",
    screenWidth: "",
    screenHeight: "",
    availableScreenWidth: "",
    availableScreenHeight: "",
    colorDepth: "",
    devicePixelRatio: "",
    timeZone: "",
    date: "",
    time: "",
  });

  // Function to fetch redirect URL
  const redirectUrl = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/url/${id}`
      );
      if (response.data?.redirectURL) {
        setRedirectURL(response.data.redirectURL);
      }
    } catch (error) {
      console.error("Error fetching redirect URL:", error);
    }
  };

  // Function to determine device type
  const getDeviceName = () => {
    const userAgent = navigator.userAgent;
    if (/Windows|Mac|Linux/.test(userAgent)) return "Desktop";
    if (/Android/.test(userAgent)) return "Android Device";
    if (/iPad|iPhone|iPod/.test(userAgent)) return "iOS Device";
    return "Unknown Device";
  };

  // Function to fetch IP address
  const fetchIP = async () => {
    try {
      const response = await axios.get("https://api64.ipify.org?format=json");
      setAnalyticsData((prev) => ({
        ...prev,
        ipAddress: response.data.ip,
      }));
    } catch (error) {
      console.error("Error fetching IP:", error);
    }
  };

  // Function to get battery information
  const getBatteryInfo = async () => {
    try {
      const battery = await navigator.getBattery();
      console.log(battery);
      setAnalyticsData((prev) => ({
        ...prev,
        batteryLevel: battery.level * 100,
        chargingStatus: battery.charging ? "Yes" : "No",
        dischargingTime: battery.dischargingTime / 3600,
      }));
    } catch (error) {
      console.error("Error fetching battery info:", error);
    }
  };

  // Function to get time and timezone
  const getTimeInfo = () => {
    try {
      const response = new Date();
      setAnalyticsData((prev) => ({
        ...prev,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        date: response.toLocaleDateString(),
        time: response.toLocaleTimeString(),
      }));
    } catch (error) {
      console.error("Error fetching time info:", error);
    }
  };

  // Function to push analytics data
  const pushAnalytics = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/analytics/pushanalytics`,
        analyticsData
      );
      console.log("Push analytics response:", response);
    } catch (error) {
      console.error("Error pushing analytics:", error);
    }
  };

  // Fetch redirect URL
  useEffect(() => {
    redirectUrl();
  }, [id]);

  // Redirect when the URL is fetched
  useEffect(() => {
    if (redirectURL && analyticsData.longitude && analyticsData.ipAddress) {
      pushAnalytics();
      window.location.href = redirectURL;
    }
  }, [redirectURL, analyticsData.longitude, analyticsData.ipAddress]);

  // Fetch analytics data
  useEffect(() => {
    // Set device type
    setAnalyticsData((prev) => ({
      ...prev,
      deviceType: getDeviceName() || "unavailable",
    }));

    // Fetch geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setAnalyticsData((prev) => ({
          ...prev,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          accuracy: position.coords.accuracy,
        }));
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        setAnalyticsData((prev) => ({
          ...prev,
          longitude: error.message,
          latitude: error.message,
          accuracy: error.message,
        }));
      }
    );

    // Fetch IP
    fetchIP();

    // Set device-related info
    setAnalyticsData((prev) => ({
      ...prev,
      connectionType: navigator.connection?.effectiveType || "unavailable",
      downloadSpeed: navigator.connection?.downlink || "unavailable",
      deviceCores: navigator.hardwareConcurrency || "unavailable",
      deviceRAM: navigator.deviceMemory || "unavailable",
      browser: navigator.userAgent || "unavailable",
      platform: navigator.platform || "unavailable",
      language: navigator.language || "unavailable",
      onlineStatus: navigator.onLine ? "Online" : "Offline",
      vendor: navigator.vendor || "unavailable",
      screenWidth: screen.width || "unavailable",
      screenHeight: screen.height || "unavailable",
      availableScreenWidth: screen.availWidth || "unavailable",
      availableScreenHeight: screen.availHeight || "unavailable",
      colorDepth: screen.colorDepth || "unavailable",
      devicePixelRatio: window.devicePixelRatio || "unavailable",
    }));

    // Fetch battery info
    getBatteryInfo();

    // Fetch time info
    getTimeInfo();
  }, []);

  return (
    <div className="pt-9 pl-9">
      <Loader
        height={"h-[100px]"}
        width={"w-[100px]"}
        color={"text-gray-300"}
        bgColor={"fill-red-600"}
      />
    </div>
  );
};

export default Redirect;
