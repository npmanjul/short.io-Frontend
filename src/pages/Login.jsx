import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth.jsx";
import Loader from "../components/Loader.jsx";
import Navbar from "../components/Navbar.jsx";
import { BACKEND_URL } from "../utilis/constants.js";

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
      const response = await axios.post(`${BACKEND_URL}/user/login`, formData);

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data._id);
        navigate("/");
        toast.success("Login successful");
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
      <div className="pt-18 bg-white flex justify-center items-center min-h-screen w-full">
        <div className="flex flex-col-reverse lg:flex-row justify-center items-center w-full max-w-5xl mx-auto">
          <div className="flex justify-center items-center flex-col w-full max-w-[350px] sm:max-w-[400px] border border-gray-200 bg-white p-8 rounded-2xl shadow-md">
            <h1 className="text-zinc-900 text-4xl font-bold pb-7">Login</h1>
            <form
              onSubmit={handleSubmit}
              className="flex items-center flex-col rounded-lg text-[16px] w-full"
            >
              <label className="w-full flex items-start flex-col text-zinc-700 text-[16px] relative">
                Email:
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  className="w-full px-11 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-zinc-900"
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
                    fill="#bdbdbd"
                  >
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                  </svg>
                </div>
              </label>

              <label className="w-full flex items-start flex-col text-zinc-700 text-[16px] mt-3 relative">
                Password:
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-11 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-zinc-900"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
                <div className="absolute top-[38px] left-[12px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="rgba(173,184,194,1)"
                  >
                    <path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17ZM11 14V18H13V14H11Z"></path>
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
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="rgba(173,184,194,1)"
                      >
                        <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                      </svg>
                    </div>
                  ) : (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="rgba(173,184,194,1)"
                      >
                        <path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path>
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
          <div className="hidden lg:flex justify-center items-center w-full">
            <img
              src="/public/login.png"
              className="h-[400px] w-[400px] object-contain"
              alt="login"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
