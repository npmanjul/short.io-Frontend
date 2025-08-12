import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../utilis/constants";
import toast from "react-hot-toast";

const ActiveStatus = ({ isActive, shortId }) => {
  const [isChecked, setIsChecked] = useState(isActive);

  // console.log("Initial isChecked state:", isChecked);

  const handleIsActive = async (e) => {
    setIsChecked(e.target.checked);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/urlfeatures/setisactive/${shortId}`,
        {
          isActive: e.target.checked,
          isExpiry: !e.target.checked,
          expiryDate: null,
          expiryTime: null,
        }
      );

      if (response.status === 200) {
        toast.success(`URL is ${e.target.checked ? "Active" : "Inactive"}`);
      }
    } catch (error) {
      console.error("Error checking URL activity:", error);
    }
  };

  useEffect(() => {
    setIsChecked(isActive);
  }, [isActive]);

  return (
    <>
      <div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isChecked}
            onChange={handleIsActive}
          />
          <div className="w-11 h-6 bg-red-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
        </label>
      </div>
    </>
  );
};

export default ActiveStatus;
