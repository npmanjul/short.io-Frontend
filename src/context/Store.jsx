import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

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
      `http://localhost:8000/api/v1/urlanalytics/urlanalytics/${url}`
    );

    setUrlAnalytics(response.data);
  };

  const fetchVisitData = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/analytics/analyticsvisit/${localStorage.getItem(
        "userId"
      )}`
    );

    setVisitData(response.data);
  };

  const fetchDeviceInfo = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/analytics/analyticsinfo/${localStorage.getItem(
        "userId"
      )}`
    );

    setDeviceInfo(response.data);
  };

  const fetchDeviceBattery = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/analytics/analyticsBattery/${localStorage.getItem(
        "userId"
      )}`
    );

    setDeviceBattery(response.data);
  };

  const fetchDeviceNetwork = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/analytics/analyticsnetwork/${localStorage.getItem(
        "userId"
      )}`
    );

    setDeviceNetwork(response.data);
  };

  const fetchDeviceLocation = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/analytics/analyticslocation/${localStorage.getItem(
        "userId"
      )}`
    );

    setDeviceLocation(response.data);
  };

  const fetchRecentActivity = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/analytics/analyticsrecentactivity/${localStorage.getItem(
        "userId"
      )}`
    );

    setRecentActivity(response.data.data);
  };

  const fetchUrl = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/analytics/analyticsurl/${localStorage.getItem(
        "userId"
      )}`
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
