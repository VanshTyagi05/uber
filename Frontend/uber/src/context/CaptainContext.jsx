import { createContext, useContext, useState } from 'react';

const CaptainDataContext = createContext();

 const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateCaptain=(captainData)=>{
    setCaptain(captainData);
  }
  const value={
    captain,
    setCaptain,
    updateCaptain,
    isLoading,
    error,
    setIsLoading,
    setError
  }

  // const updateCaptainLocation = (latitude, longitude) => {
  //   setCaptain(prev => ({
  //     ...prev,
  //     location: { latitude, longitude }
  //   }));
  // };

  // const updateCaptainStatus = (isAvailable) => {
  //   setCaptain(prev => ({
  //     ...prev,
  //     isAvailable
  //   }));
  // };

  // const updateCaptainInfo = (captainInfo) => {
  //   setCaptain(captainInfo);
  // };


  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;



