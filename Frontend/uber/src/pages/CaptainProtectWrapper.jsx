import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const CaptainProtectWrapper = ({
  children
}) => {
  const navigate = useNavigate();

   // we will get token from the local storage
   // and check if it's valid or not
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/captain-login')
    }
  },['token']);
  return (
   <>
    {children}
   </>
  )
}

export default CaptainProtectWrapper;