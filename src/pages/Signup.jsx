import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import GoogleAuth from "../components/GoogleAuth";
import Loader from "../components/Loader";
import { BACKEND_URL } from "../utilis/constants";

const Signup = () => {
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await axios.post(`${BACKEND_URL}/user/signup`, formData);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data._id);

        navigate("/url");
        toast.success("Signup successful");
        setLoader(false);
      } else {
        toast.error("Unexpected response from the server");
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
      <div className="pt-18 h-[100vh] flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black">
        <div>
          <img src="/public/signup.png" className="h-[600px] w-[600px]" />
        </div>
        <div className="w-[50%] flex justify-center items-center">
          <div className="flex justify-center items-center flex-col w-full max-w-[450px] border-2 border-gray-400 p-9 rounded-2xl">
            <h1 className="text-white text-5xl font-bold pb-7">Signup</h1>
            <form
              onSubmit={handleSubmit}
              className="flex justify-start items-center flex-col  rounded-lg text-[16px] w-full"
            >
              <label className="w-full flex  items-start flex-col text-gray-300 dark:text-gray-300 font-medium relative">
                Name :
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Name"
                  className="w-full px-11 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-black dark:text-white"
                  onChange={handleChange}
                  value={formData.name}
                />
                <div className="absolute top-[38px] left-[12px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                  </svg>
                </div>
              </label>

              <label className="w-full flex  items-start flex-col text-gray-300 dark:text-gray-300 font-medium mt-3 relative">
                Email :
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  className="w-full px-11 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-black dark:text-white"
                  value={formData.email}
                  onChange={handleChange}
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

              <label className="w-full flex  items-start flex-col text-gray-300 dark:text-gray-300 font-medium mt-3 relative">
                Password:
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-11 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-black dark:text-white"
                  onChange={handleChange}
                  value={formData.password}
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
      </div>
    </>
  );
};

export default Signup;
