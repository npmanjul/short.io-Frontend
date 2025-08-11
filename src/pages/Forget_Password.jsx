import React, { useState } from "react";
import OtpVerificationModal from "../components/OtpVerificationModal";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utilis/constants";

const Forget_Password = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const navigate = useNavigate();

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await axios.post(`${BACKEND_URL}/user/checkuser`, { email });

      if (res.data.exists === true) {
        setIsOtpOpen(true);
      } else {
        toast.error("User is not found");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleOtpVerified = () => {
    setIsOtpOpen(false);
    setStep(2);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Add your password change logic here
    if (
      !passwords.newPassword ||
      !passwords.confirmPassword ||
      passwords.newPassword !== passwords.confirmPassword
    ) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/urlfeatures/forgetpassword`,
        {
          email,
          newPassword: passwords.newPassword,
        }
      );
      if (res.status === 200) {
        toast.success("Password changed successfully");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error in changing password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          {step === 1
            ? "Enter your registered email to reset the password."
            : "Enter your new password below."}
        </p>

        {step === 1 && (
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Send OTP
            </button>

            <OtpVerificationModal
              isOpen={isOtpOpen}
              onClose={() => setIsOtpOpen(false)}
              email={email} // Use the email from form data
              onOtpVerified={handleOtpVerified}
              message={"OTP Verification Successful"}
            />
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter new password"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Confirm new password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Change Password
            </button>
          </form>
        )}

        {emailSent && step === 2 && (
          <div className="text-green-600 text-center mt-4">
            Reset link sent to <span className="font-semibold">{email}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forget_Password;
