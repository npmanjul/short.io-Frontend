import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utilis/constants";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async (credentialResponse) => {
    try {
      setLoading(true);

      // Decode the JWT token from Google
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Decoded JWT:", decoded);

      // Send the decoded user data to backend
      const response = await axios.post(`${BACKEND_URL}/user/googleauth`, {
        email: decoded.email,
        name: decoded.name,
        pic: decoded.picture,
        uid: decoded.sub,
      });

      if (response.status === 201 || response.status === 200) {
        // Store authentication data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data._id);

        navigate("/");
        toast.success("Login successful");
      } else {
        toast.error("Authentication failed");
      }
    } catch (error) {
      console.error("Google Auth Error:", error);

      // Handle different types of errors
      if (error.response) {
        toast.error(error.response.data.message || "Authentication failed");
      } else if (error.request) {
        toast.error("Network error. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.log("Google Login Failed");
    toast.error("Google login failed. Please try again.");
  };

  return (
    <>
      <div className="text-[14px] text-neutral-400 py-4 w-full flex justify-center items-center gap-2">
        <div className="h-[1px] bg-neutral-600 w-full"></div>
        <div className="w-[300px]">Or sign in with</div>
        <div className="h-[1px] bg-neutral-600 w-full"></div>
      </div>

      <div className="w-full flex justify-center items-center flex-col">
        <GoogleLogin
          onSuccess={handleGoogleAuth}
          onError={handleGoogleError}
          disabled={loading}
        />
        {loading && (
          <div className="text-center mt-2 text-sm text-neutral-400">
            Authenticating...
          </div>
        )}
      </div>
    </>
  );
};

export default GoogleAuth;
