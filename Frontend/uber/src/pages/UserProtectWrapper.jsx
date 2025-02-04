import React, { useContext, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';

const UserProtectWrapper = ({
  children
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isLoading,setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserDataContext)
  useEffect(() => {
    
    if (!token) {
      alert('token is not present');
        navigate('/login')
    }
    // us token ki madad se hum captain ki profile layege
    // agr profile aagyi matlb thk hai..vrna toh koi dikkat hai..
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
      
        if (response.status === 200) {
            setUser(response.data)
            setIsLoading(false)
        }
    })
        .catch(err => {
            console.log(err);
            localStorage.removeItem('token')
            navigate('/login')
        })
}, [ token ]);

if (isLoading) {
  return (
      <div>Loading...</div>
  )
}
  
  return (
   <>
    {children}
   </>
  )
}

export default UserProtectWrapper;