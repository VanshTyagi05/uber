import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios({
          method: 'get',
          url: `${import.meta.env.VITE_BASE_URL}/user/logout`,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error('Logout error:', error);
        if (error.response?.status === 401) {
          // localStorage.removeItem("token");
          alert('Logout error. Please try again.', error);
          navigate("/login");
        }
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default UserLogout;