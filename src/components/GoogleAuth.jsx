import React, { useState } from "react";
import { auth, googleProvider } from "../utilis/firebaseConfig.js";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        const response = await axios.post(
          "http://localhost:8000/api/v1/user/googleauth",
          {
            email: result.user.email,
            name: result.user.displayName,
            pic: result.user.photoURL,
            uid: result.user.uid,
          }
        );

        if (response.status === 201) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data._id);
          navigate("/url");
          toast.success("Login successful");
        }
      } else {
        toast.error("authentication Failed");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="text-[14px] text-neutral-400 py-4 w-full flex justify-center items-center gap-2">
        <div className="h-[1px] bg-neutral-600 w-full"></div>
        <div className="w-[300px]">Or sign in with</div>
        <div className="h-[1px] bg-neutral-600 w-full"></div>
      </div>

      <div className="w-full">
        <button
          onClick={signInWithGoogle}
          className="flex items-center justify-center gap-2 bg-white dark:bg-black text-black-700 dark:text-white border py-2 border-gray-300 shadow-md  rounded-lg hover:bg-gray-100 hover:dark:bg-gray-600 cursor-pointer transition duration-300 w-full"
        >
          <FcGoogle size={25} />
          <span className="text-[16px] font-medium dark:text-white text-black">
            Sign in with Google
          </span>
        </button>
      </div>
    </>
  );
};

export default GoogleAuth;
