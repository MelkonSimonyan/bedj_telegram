import { createContext, useContext, useState } from "react";

const InitDataContext = createContext();

export const useInitData = () => useContext(InitDataContext);

export const InitDataProvider = ({ children }) => {
  const [initData, setInitData] = useState(null);
  const [initDataLoading, setInitDataLoading] = useState(false);
  const [initDataError, setInitDataError] = useState(null);

  return (
    <InitDataContext.Provider
      value={{
        initData,
        setInitData,
        initDataLoading,
        setInitDataLoading,
        initDataError,
        setInitDataError,
      }}
    >
      {children}
    </InitDataContext.Provider>
  );
};
