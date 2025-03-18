import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="h-[70px] bg-blue-700 w-full fixed top-0 flex justify-between items-center px-7">
        <NavLink to="/">
          <div className="text-2xl text-white font-bold">short.io </div>
        </NavLink>
        <div className="flex justify-center items-center gap-3">
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
