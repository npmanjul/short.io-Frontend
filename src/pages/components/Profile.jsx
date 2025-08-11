import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utilis/constants";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import OtpVerificationModal from "../../components/OtpVerificationModal";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pic: "",
  });
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isGoogleAuthUser, setIsGoogleAuthUser] = useState(false);

  function getMemberSince(isoDate) {
    if (!isoDate) return "Member since Unknown";

    try {
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
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Member since Unknown";
    }
  }

  const getUser = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");

      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        return;
      }

      const response = await axios.get(
        `${BACKEND_URL}/analytics/analyticsprofile/${userId}`
      );

      if (response.status === 200 && response.data.user) {
        setUserData(response.data.user);
        setFormData({
          name: response.data.user.name || "",
          email: response.data.user.email || "",
          pic: response.data.user.pic || "",
        });
        setIsGoogleAuthUser(response.data.user.isGoogleAuth || false);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      toast.error(err.response?.data?.message || "Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setProfileUpdateLoading(true);

      if (!formData.name?.trim()) {
        return toast.error("Name is required");
      }

      const userId = localStorage.getItem("userId");
      if (!userId) {
        return toast.error("User ID not found. Please log in again.");
      }

      const response = await axios.put(
        `${BACKEND_URL}/urlfeatures/updateusername/${userId}`,
        {
          name: formData.name.trim(),
          pic: formData.pic,
        }
      );

      if (response.status === 200) {
        setUserData((prev) => ({
          ...prev,
          name: formData.name.trim(),
          pic: formData.pic,
        }));
        await getUser();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setProfileUpdateLoading(false);
    }
  };

  const initiatePasswordChange = () => {
    const { oldPassword, newPassword, confirmPassword } = password;

    // Basic field validation
    if (
      !oldPassword?.trim() ||
      !newPassword?.trim() ||
      !confirmPassword?.trim()
    ) {
      return toast.error("All password fields are required");
    }

    // Prevent same password reuse
    if (oldPassword === newPassword) {
      return toast.error("New password must be different from old password");
    }

    // Confirm password match
    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match");
    }

    // If validation passes, open the OTP modal
    setIsOtpOpen(true);
  };

  const changePasswordHandle = async () => {
    setPasswordChangeLoading(true);
    const { oldPassword, newPassword } = password;
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        return toast.error("User ID not found. Please log in again.");
      }

      const response = await axios.post(
        `${BACKEND_URL}/urlfeatures/changepassword/${userId}`,
        { oldPassword: oldPassword.trim(), newPassword: newPassword.trim() }
      );

      if (response.status === 200) {
        setPassword({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setPasswordChangeLoading(false);
      setIsOtpOpen(false); // Close the modal on success or failure
    }
  };

  const handleFormDataChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * This function is the callback from the OTP modal.
   * It's called when the OTP is successfully verified,
   * and it then triggers the password change API call.
   */
  const handleOtpVerified = () => {
    changePasswordHandle();
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader
          height="h-10"
          width="w-10"
          color="text-white"
          bgColor="fill-black"
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
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <img
                src={userData.pic}
                alt={`${userData.name || "User"}'s profile`}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <button
              className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
              aria-label="Change profile picture"
            >
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
              {userData.name || "User"}
            </h2>
            <p className="text-gray-600">{userData.email || "No email"}</p>
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
                  value={formData.name}
                  onChange={(e) => handleFormDataChange("name", e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={formData.email}
                  disabled={true}
                  readOnly
                />
              </div>
            </div>
          </div>
          {/* Save Button for Profile */}
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={updateProfile}
              disabled={profileUpdateLoading}
            >
              {profileUpdateLoading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>
      </div>

      {/* Password Settings Section */}

      <div
        className="bg-white rounded-lg shadow p-6 "
        style={
          isGoogleAuthUser
            ? { pointerEvents: "none", opacity: 0.5, cursor: "not-allowed" }
            : {}
        }
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Change Password
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password.oldPassword}
                onChange={(e) =>
                  setPassword({ ...password, oldPassword: e.target.value })
                }
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password.newPassword}
                onChange={(e) =>
                  setPassword({ ...password, newPassword: e.target.value })
                }
                placeholder="Enter new password"
              />
              <p className="text-xs text-gray-500 mt-1">
                Must be 8+ chars with uppercase, number & special character
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password.confirmPassword}
                onChange={(e) =>
                  setPassword({ ...password, confirmPassword: e.target.value })
                }
                placeholder="Confirm new password"
              />
            </div>
          </div>
          {/* Save Button for Password */}
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={initiatePasswordChange} // Changed onClick to the new function
              disabled={passwordChangeLoading}
            >
              {passwordChangeLoading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>
      {/* OTP Modal */}
      <OtpVerificationModal
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        email={userData.email}
        onOtpVerified={handleOtpVerified}
        message={"Profile updated successfully"}
      />
    </div>
  );
};

export default Profile;
