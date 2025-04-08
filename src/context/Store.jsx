import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../utilis/constants.js";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [urlId, setUrlId] = useState("");
  const [visitData, setVisitData] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState([]);
  const [deviceBattery, setDeviceBattery] = useState([]);
  const [deviceNetwork, setDeviceNetwork] = useState([]);
  const [deviceLocation, setDeviceLocation] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [urlAnalytics, setUrlAnalytics] = useState([]);
  const [url, setUrl] = useState([]);

  const fetchUrlAnalytics = async (url) => {
    const response = await axios.get(
      `${BACKEND_URL}/urlanalytics/urlanalytics/${url}`
    );

    setUrlAnalytics(response.data);
  };

  const fetchVisitData = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/analytics/analyticsvisit/${localStorage.getItem(
        "userId"
      )}`
    );

    setVisitData(response.data);
  };

  const fetchDeviceInfo = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/analytics/analyticsinfo/${localStorage.getItem("userId")}`
    );

    setDeviceInfo(response.data);
  };

  const fetchDeviceBattery = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/analytics/analyticsBattery/${localStorage.getItem(
        "userId"
      )}`
    );

    setDeviceBattery(response.data);
  };

  const fetchDeviceNetwork = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/analytics/analyticsnetwork/${localStorage.getItem(
        "userId"
      )}`
    );

    setDeviceNetwork(response.data);
  };

  const fetchDeviceLocation = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/analytics/analyticslocation/${localStorage.getItem(
        "userId"
      )}`
    );

    setDeviceLocation(response.data);
  };

  const fetchRecentActivity = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/analytics/analyticsrecentactivity/${localStorage.getItem(
        "userId"
      )}`
    );

    setRecentActivity(response.data.data);
  };

  const fetchUrl = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/analytics/analyticsurl/${localStorage.getItem("userId")}`
    );

    setUrl(response.data);
  };

  return (
    <StoreContext.Provider
      value={{
        setUrlId,
        urlId,
        visitData,
        fetchVisitData,
        deviceInfo,
        fetchDeviceInfo,
        deviceBattery,
        fetchDeviceBattery,
        deviceNetwork,
        fetchDeviceNetwork,
        deviceLocation,
        fetchDeviceLocation,
        recentActivity,
        fetchRecentActivity,
        url,
        fetchUrl,
        urlAnalytics,
        fetchUrlAnalytics,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const StoreState = () => {
  return useContext(StoreContext);
};

export default StoreProvider;
