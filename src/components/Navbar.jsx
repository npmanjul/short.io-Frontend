import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="h-[70px] bg-white/20 backdrop-blur-lg border-2 border-white/30 w-[90%] fixed top-5 flex justify-between items-center px-7 rounded-full ">
          <NavLink to="/">
            <div className="text-2xl text-white font-bold">short.io </div>
          </NavLink>
          <div className="flex justify-center items-center gap-3">
            {token ? (
              <NavLink to="/dashboard">
                <div className="border-1 border-white text-white flex justify-center items-center gap-1 py-2 px-4 cursor-pointer rounded-4xl text-[16px] font-semibold ">
                  <span>Dashboard</span>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                    </svg>
                  </div>
                </div>
              </NavLink>
            ) : (
              <>
                <NavLink to="/login">
                  <div className="border-1 border-white text-white py-2 px-6 cursor-pointer rounded-4xl text-[16px] font-semibold ">
                    login
                  </div>
                </NavLink>

                <NavLink to="/signup">
                  <div className="bg-white py-2 px-6 rounded-4xl text-[16px] cursor-pointer font-semibold flex justify-center items-center gap-1">
                    <span>signup</span>
                    <div className="pt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="rgba(0,0,0,1)"
                      >
                        <path d="M1.99974 12.9999L1.9996 11L15.5858 11V5.58582L22 12L15.5858 18.4142V13L1.99974 12.9999Z"></path>
                      </svg>
                    </div>
                  </div>
                </NavLink>
              </>
            )}

            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
