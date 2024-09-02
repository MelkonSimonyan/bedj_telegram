import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const InitDataContext = createContext();

export const useInitData = () => useContext(InitDataContext);

export const InitDataProvider = ({ children }) => {
  const [initData, setInitData] = useState(null);
  const [initDataLoading, setInitDataLoading] = useState(false);
  const [initDataError, setInitDataError] = useState(null);

  const fetchInitData = async () => {
    setInitDataLoading(true);

    const response = await axios.get("initData.json?" + new Date().getTime());

    setInitDataLoading(false);

    if (response.data) {
      if (response.data instanceof Object) {
        setInitData(response.data);
      } else {
        setInitDataError("initData.json is not a valid json file");
      }
    } else {
      setInitDataError("An error occurred,<br/> please reload the page.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  return (
    <InitDataContext.Provider
      value={{
        initData,
        initDataLoading,
        initDataError,
      }}
    >
      {children}
    </InitDataContext.Provider>
  );
};
