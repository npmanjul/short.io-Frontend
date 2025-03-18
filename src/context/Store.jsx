import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [urlId, setUrlId] = useState("");

  return (
    <StoreContext.Provider
      value={{
        setUrlId,
        urlId,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const StoreState = () => {
  return useContext(StoreContext);
};

export default StoreProvider;
