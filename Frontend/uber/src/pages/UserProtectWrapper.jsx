import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const UserProtectWrapper = ({
  children
}) => {
  const navigate = useNavigate();

   // we will get token from the local storage
   // and check if it's valid or not
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  },['token']);
  // const { user } = useContext(UserDataContext)
  // if (!user.email) {
  //   navigate('/login')
  // }
  return (
   <>
    {children}
   </>
  )
}

export default UserProtectWrapper