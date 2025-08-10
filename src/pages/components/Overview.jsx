import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LineChart from "../../components/LineChart";
import { BACKEND_URL, FRONTEND_URL } from "../../utilis/constants";
import Loader from "../../components/Loader";
import useStore from "../../store";

// Register required components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  const [overviewData, setOverviewData] = useState([]);
  const { visitData, fetchVisitData, recentActivity, fetchRecentActivity } =
    useStore();
  const [isLoading, setIsLoading] = useState(true);

  const LimitWords = ({ text = "", wordLimit }) => {
    const limitedText = React.useMemo(() => {
      if (!text) return ""; // Return an empty string if text is undefined or null
      const words = text.split("");
      return words.length > wordLimit
        ? words.slice(0, wordLimit).join("") + "..."
        : text;
    }, [text, wordLimit]);

    return <p className="max-w-lg break-words">{limitedText}</p>;
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

  useEffect(() => {
    const fetchOverviewData = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/analytics/analyticsoverview/${localStorage.getItem(
          "userId"
        )}`
      );
      setOverviewData(response.data);
    };

    const fetchAllData = async () => {
      await Promise.all([
        fetchRecentActivity(),
        fetchVisitData(),
        fetchOverviewData(),
      ]);
      setIsLoading(false); // only after all have finished
    };

    fetchAllData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader
            height={"h-10"}
            width={"w-10"}
            color={"text-white"}
            bgColor={"fill-black"}
          />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total URLs Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-500">
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
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-600">
                    Total URLs
                  </h2>
                  <p className="text-2xl font-semibold text-gray-800">
                    {overviewData.totalURL || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Active Links Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-500">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-600">
                    Active Links
                  </h2>
                  <p className="text-2xl font-semibold text-gray-800">
                    {overviewData.totalActiveLinks || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Total inactive links */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#B89230"
                  >
                    <path d="m770-302-60-62q40-11 65-42.5t25-73.5q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 57-29.5 105T770-302ZM634-440l-80-80h86v80h-6ZM792-56 56-792l56-56 736 736-56 56ZM440-280H280q-83 0-141.5-58.5T80-480q0-69 42-123t108-71l74 74h-24q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h65l79 80H320Z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-600">
                    Inactive Links
                  </h2>
                  <p className="text-2xl font-semibold text-gray-800">
                    {overviewData.totalURL - overviewData.totalActiveLinks || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Total Clicks Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-500">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-600">
                    Total Clicks
                  </h2>
                  <p className="text-2xl font-semibold text-gray-800">
                    {overviewData.totalVisitCount || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Chart Section */}
            <div className="bg-white rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-800 p-6 pb-0">
                URL Performance
              </h2>
              <div className=" rounded-lg flex items-center justify-center">
                <LineChart
                  labelsArray={visitData.datesArray}
                  dataArray={visitData.countsArray}
                  labelName={"URL Clicks"}
                  title={"Click Trends Over Time"}
                  tooltipName={"Clicks"}
                />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4 overflow-x-auto">
                {recentActivity.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg w-full"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 w-[100px] sm:w-auto overflow-hidden whitespace-nowrap">
                          <LimitWords text={item.redirectURL} wordLimit={25} />
                        </p>
                        <p className="text-xs text-gray-500">
                          {getTimeAgo(`${item.date}T${item.time}`)}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 w-[100px] sm:w-auto overflow-hidden whitespace-nowrap">
                      <a
                        href={`${FRONTEND_URL}/link/${item.shortId}`}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                      >
                        <LimitWords
                          text={`${FRONTEND_URL}/link/${item.shortId}`}
                          wordLimit={20}
                        />
                      </a>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Overview;
