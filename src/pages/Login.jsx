import React, { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth.jsx";
import Loader from "../components/Loader.jsx";
import Navbar from "../components/Navbar.jsx";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        formData
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate("/url");
        toast.success("Login successful");
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoader(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-18 bg-black flex justify-center items-center h-[100vh] w-full">
        <div className="flex justify-center items-center w-[50%]">
          <div className="flex justify-center items-center flex-col max-w-[450px]  border-2  border-gray-400 p-9 rounded-2xl">
            <h1 className="text-white text-5xl font-bold pb-7">Login</h1>
            <form
              onSubmit={handleSubmit}
              className="flex items-center flex-col  rounded-lg text-[16px] w-full"
            >
              <label className="w-full flex  items-start flex-col text-gray-700 dark:text-gray-300 text-[16px] relative">
                Email :
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  className="w-full px-11 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-black dark:text-white"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
                <div className="absolute top-[38px] left-[12px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                  </svg>
                </div>
              </label>

              <label className="w-full flex  items-start flex-col text-gray-700 dark:text-gray-300 text-[16px] mt-3 relative">
                Password:
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-11 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-black dark:text-white "
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
                <div className="absolute top-[38px] left-[12px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                  </svg>
                </div>
                <div
                  onClick={() => setVisible(!visible)}
                  className="absolute top-10 right-5 cursor-pointer"
                >
                  {visible ? (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e3e3e3"
                      >
                        <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                      </svg>
                    </div>
                  ) : (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e3e3e3"
                      >
                        <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                      </svg>
                    </div>
                  )}
                </div>
              </label>

              <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 mt-4 rounded-lg transition duration-200 cursor-pointer">
                {loader ? (
                  <Loader
                    height={"h-6"}
                    width={"w-6"}
                    color={"text-white"}
                    bgColor={"fill-blue-600"}
                  />
                ) : (
                  <>Submit</>
                )}
              </button>
            </form>
            <GoogleAuth />
          </div>
        </div>
        <div>
          <img src="/public/login.png" className="h-[600px] w-[600px]" />
        </div>
      </div>
    </>
  );
};

export default Login;
