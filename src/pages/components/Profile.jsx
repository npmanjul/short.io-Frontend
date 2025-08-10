import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utilis/constants";
import Loader from "../../components/Loader";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });
  const [loading, setLoading] = useState(true);

  function getMemberSince(isoDate) {
    const date = new Date(isoDate);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `Member since ${month} ${year}`;
  }

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_URL}/analytics/analyticsprofile/${localStorage.getItem(
          "userId"
        )}`
      );

      console.log("User Data:", response.data.user.createdAt);
      if (response.status === 200) {
        setUserData(response.data.user);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          pic: response.data.user.pic,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader
          height={"h-10"}
          width={"w-10"}
          color={"text-white"}
          bgColor={"fill-black"}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <img
                src={
                  userData.pic ||
                  "https://lh3.googleusercontent.com/a/ACg8ocJVPq5hPf64Itbr9atoteXIGGSrjQ6oqd8KT12rP_6XBGDyFA=s96-c"
                }
                alt="user"
                className="rounded-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full text-white hover:bg-blue-600">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {userData.name}
            </h2>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-sm text-gray-500">
              {getMemberSince(userData.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Settings Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Profile Settings
        </h3>
        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-gray-700">
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={formData.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-no-drop"
                  defaultValue={formData.email}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          {/* Save Button for Profile */}
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* Password Settings Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Change Password
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Save Button for Password */}
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
