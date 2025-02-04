import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectWrapper = ({
  children
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isLoading,setIsLoading] = useState(true);
  const { captain, setCaptain } = useContext(CaptainDataContext)
  useEffect(() => {
    // console.log(token);
    if (!token) {
      alert('token is not present');
        navigate('/captain-login')
    }
    // us token ki madad se hum captain ki profile layege
    // agr profile aagyi matlb thk hai..vrna toh koi dikkat hai..
    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/captainProfile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
      //  console.log(response);
        if (response.status === 200) {
            setCaptain(response.data.captain)
            setIsLoading(false)
        }
    })
        .catch(err => {
            // console.log(err);
            localStorage.removeItem('token')
            navigate('/captain-login')
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

export default CaptainProtectWrapper;