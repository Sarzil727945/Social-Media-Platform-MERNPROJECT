// DataContext.js
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [homeData, setHomeData] = useState([]);
  const [friendsData, setFriendsData] = useState([]);
  const [reqFriendsData, setReqFriendsData] = useState([]);

  const searchInfo = {
    homeData,
    friendsData,
    reqFriendsData,
    setHomeData,
    setFriendsData,
    setReqFriendsData,
  }
  return (
    <DataContext.Provider value={searchInfo}>
      {children}
    </DataContext.Provider>
  );
};
