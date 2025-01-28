import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
      // Clear any stored authentication tokens or captain data
      localStorage.removeItem('token');
     
      
      // Redirect to the login page or home page
      navigate('/login');
    };
  
    // Execute logout when component mounts
    useEffect(() => {
      handleLogout();
    }, []);
 
  return (
    <div>
      Logging out...
    </div>
  );
};

export default UserLogout;