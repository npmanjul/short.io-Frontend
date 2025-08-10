import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="h-[70px] bg-zinc-200/50 backdrop-blur-lg border-2 border-zinc-200 w-[90%] fixed top-5 flex justify-between items-center pl-5 pr-3 sm:pr-4 sm:pl-7 rounded-full z-50">
          <NavLink to="/">
            <div className="text-2xl text-zinc-800 font-bold">short.io </div>
          </NavLink>
          <div className="flex justify-center items-center gap-3">
            {token ? (
              <NavLink to="/dashboard">
                <div className="border-1 border-zinc-500 text-black flex justify-center items-center gap-1 p-3 sm:py-2 sm:px-4 cursor-pointer rounded-4xl text-[16px] font-semibold ">
                  <span className="hidden sm:block">Dashboard</span>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                    </svg>
                  </div>
                </div>
              </NavLink>
            ) : (
              <>
                {(location.pathname === "/signup" ||
                  location.pathname === "/") && (
                  <NavLink to="/login">
                    <div className="border-1 border-zinc-500 text-black flex justify-center items-center gap-1 p-3 sm:py-2 sm:px-4 cursor-pointer rounded-4xl text-[16px] font-semibold ">
                      <span>Login</span>
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
                )}

                {location.pathname === "/login" && (
                  <NavLink to="/signup">
                    <div className="border-1 border-zinc-500 text-black flex justify-center items-center gap-1 p-3 sm:py-2 sm:px-4 cursor-pointer rounded-4xl text-[16px] font-semibold ">
                      <span>Signup</span>
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
                )}
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
