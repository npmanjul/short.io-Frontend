import React, { Profiler, useEffect, useState } from "react";
import Overview from "./components/Overview";
import URLs from "./components/URLs";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
1;
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("tab"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
    toast.success("Logged out successfully");
  };

  const tabs = [
    {
      id: "overview",
      name: "Overview",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "urls",
      name: "URLs",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      id: "settings",
      name: "Settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "urls":
        return <URLs />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      case "profile":
        return <Profile />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-30
        transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-white shadow-lg flex flex-col
      `}
      >
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">URL Shortener</h2>
          {/* Close button for mobile */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(false)}
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
        <nav className="mt-4 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                localStorage.setItem("tab", tab.id);
                setActiveTab(localStorage.getItem("tab"));
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Profile and Logout Section */}
        <div className="border-t border-gray-200 p-4 space-y-2">
          {/* Profile Button */}
          <button
            onClick={() => {
              localStorage.setItem("tab", "profile");
              setActiveTab(localStorage.getItem("tab"));
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
              activeTab === "profile"
                ? "bg-blue-50 text-blue-600 rounded-lg"
                : "text-gray-600 hover:bg-gray-50 rounded-lg"
            }`}
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Profile
          </button>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
          <button
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(true)}
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-gray-800">URL Shortener</h2>
          <div className="w-6"></div>
        </div>

        <div className="p-0 md:p-8 sm:pt-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 px-4 sm:px-0 py-2">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                {tabs.find((tab) => tab.id === activeTab)?.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {activeTab === "overview" &&
                  "Welcome back! Here's what's happening today."}
                {activeTab === "urls" &&
                  "Manage your shortened URLs and track their performance."}
                {activeTab === "analytics" &&
                  "View detailed analytics and insights about your URLs."}
                {activeTab === "settings" &&
                  "Configure your account settings and preferences."}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 w-full sm:w-auto">
              <NavLink to="/" className="w-full sm:w-auto">
                <button className="w-full flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-white bg-black rounded-lg cursor-pointer hover:bg-gray-800 transition-colors duration-200">
                  <span>Generate New URL</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="#FFFFFF"
                    className="sm:h-5 sm:w-5"
                  >
                    <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
                  </svg>
                </button>
              </NavLink>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-0 ">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
