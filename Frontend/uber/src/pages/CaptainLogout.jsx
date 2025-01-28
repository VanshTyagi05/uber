import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication tokens or captain data
    localStorage.removeItem('token');
   
    
    // Redirect to the login page or home page
    navigate('/captain-login');
  };

  // Execute logout when component mounts
  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
      <p>Please wait while we log you out safely.</p>
    </div>
  );
};

export default CaptainLogout;