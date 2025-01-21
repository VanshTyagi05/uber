import React, { useContext } from 'react'
import './App.css'
import {Route, Routes,Router } from 'react-router-dom'
import Start from './pages/Start'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import { UserDataContext } from './context/UserContext'
import { CaptainDataContext } from './context/CaptainContext'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'


const App = () => {
  // we can now use context as the data provider for the entire app
  const ans=useContext(UserDataContext);
  const captain=useContext(CaptainDataContext);
  console.log(ans);
  return (
    <div className='bg-red-900'>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup/>} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/home' element={
          // wrap the UserProtect Wrapper
          <UserProtectWrapper>

            <Home />
            </UserProtectWrapper>
        } />
        // user logout route
        <Route path='/user-logout' element={
          // wrap the UserProtect Wrapper
          <UserProtectWrapper>
             <UserLogout/>
            </UserProtectWrapper>
        } />
        <Route path='/captain-home' element={
          //wrap the Captain Home Wrapper
          <CaptainProtectWrapper>
            <CaptainHome/>
          </CaptainProtectWrapper>
          } />

      </Routes>
      </div>
  )
}

export default App