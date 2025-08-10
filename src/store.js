import { create } from "zustand";
import axios from "axios";
import { BACKEND_URL } from "./utilis/constants.js";

const useStore = create((set, get) => ({
  // STATES
  urlId: "",
  visitData: [],
  deviceInfo: [],
  deviceBattery: [],
  deviceNetwork: [],
  deviceLocation: [],
  recentActivity: [],
  urlAnalytics: [],
  url: [],
  page: 1,
  limit: 10,

  // ACTIONS
  setUrlId: (id) => set({ urlId: id }),
  setVisitData: (data) => set({ visitData: data }),
  setDeviceInfo: (data) => set({ deviceInfo: data }),
  setDeviceBattery: (data) => set({ deviceBattery: data }),
  setDeviceNetwork: (data) => set({ deviceNetwork: data }),
  setDeviceLocation: (data) => set({ deviceLocation: data }),
  setRecentActivity: (data) => set({ recentActivity: data }),
  setUrlAnalytics: (data) => set({ urlAnalytics: data }),
  setUrl: (data) => set({ url: data }),
  setPage: (data) => set({ page: data }),
  setLimit: (data) => set({ limit: data }),

  // API FUNCTIONS
  fetchUrlAnalytics: async (urlId) => {
    const res = await axios.get(
      `${BACKEND_URL}/urlanalytics/urlanalytics/${urlId}`
    );
    set({ urlAnalytics: res.data });
  },

  fetchVisitData: async () => {
    const res = await axios.get(
      `${BACKEND_URL}/analytics/analyticsvisit/${localStorage.getItem(
        "userId"
      )}`
    );
    set({ visitData: res.data });
  },

  fetchDeviceInfo: async () => {
    const res = await axios.get(
      `${BACKEND_URL}/analytics/analyticsinfo/${localStorage.getItem("userId")}`
    );
    set({ deviceInfo: res.data });
  },

  fetchDeviceBattery: async () => {
    const res = await axios.get(
      `${BACKEND_URL}/analytics/analyticsBattery/${localStorage.getItem(
        "userId"
      )}`
    );
    set({ deviceBattery: res.data });
  },

  fetchDeviceNetwork: async () => {
    const res = await axios.get(
      `${BACKEND_URL}/analytics/analyticsnetwork/${localStorage.getItem(
        "userId"
      )}`
    );
    set({ deviceNetwork: res.data });
  },

  fetchDeviceLocation: async () => {
    const res = await axios.get(
      `${BACKEND_URL}/analytics/analyticslocation/${localStorage.getItem(
        "userId"
      )}`
    );
    set({ deviceLocation: res.data });
  },

  fetchRecentActivity: async () => {
    const res = await axios.get(
      `${BACKEND_URL}/analytics/analyticsrecentactivity/${localStorage.getItem(
        "userId"
      )}`
    );
    set({ recentActivity: res.data.data });
  },

  fetchUrl: async (val) => {
    const { page, limit } = get(); // ✅ get current page & limit from state
    const res = await axios.get(
      `${BACKEND_URL}/analytics/analyticsurl/${localStorage.getItem(
        "userId"
      )}?urlname=${val || ""}&page=${page}&limit=${limit}`
    );
    set({ url: res.data });
  },

  deleteUrl: async (urlId) => {
    await axios.delete(
      `${BACKEND_URL}/analytics/deleteurl/${localStorage.getItem(
        "userId"
      )}/${urlId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  },
}));

export default useStore;
