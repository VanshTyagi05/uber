
import React, { useContext, useState } from 'react'; 

import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import UserContext, { UserDataContext } from '../context/UserContext';
const UserSignup = () => {  
  const [firstName, setFirstName] = useState('');  
  const [lastName, setLastName] = useState('');  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [userData,setUserData] = useState(''); 

  const navigate=useNavigate();
  const {user,setUser}=React.useContext(UserDataContext);
  const handleSubmit = async (e) => {  
    e.preventDefault();  
    // Handle signup logic here  
   
    const newUser={
      fullname:{
        firstname:firstName,
        lastname:lastName
      },
      email:email,
      password:password
      }
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser);
       // console.log(res);
        if (res.status === 201) {
          const data = res.data;
          setUser(data.user);
          // we will store the token int the local storage
          localStorage.setItem('token',res.data.token);
          navigate('/home');
        }
      } catch (error) {
        console.error("Error during signup:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Signup failed. Please try again.");
      }


   
    
  };  

  return (  
    <div className="flex h-screen justify-center items-center bg-gray-100">  
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xs">  
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>  
        <form onSubmit={handleSubmit}>  
          <div className="mb-4">  
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="firstName">  
              First Name  
            </label>  
            <input  
              type="text"  
              id="firstName"  
              value={firstName}  
              onChange={(e) => setFirstName(e.target.value)}  
              required  
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
              placeholder="John"  
            />  
          </div>  
          
          <div className="mb-4">  
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="lastName">  
              Last Name  
            </label>  
            <input  
              type="text"  
              id="lastName"  
              value={lastName}  
              onChange={(e) => setLastName(e.target.value)}  
              required  
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
              placeholder="Doe"  
            />  
          </div>  

          <div className="mb-4">  
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">  
              Email  
            </label>  
            <input  
              type="email"  
              id="email"  
              value={email}  
              onChange={(e) => setEmail(e.target.value)}  
              required  
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
              placeholder="you@example.com"  
            />  
          </div>  
          
          <div className="mb-6">  
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">  
              Password  
            </label>  
            <input  
              type="password"  
              id="password"  
              value={password}  
              onChange={(e) => setPassword(e.target.value)}  
              required  
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
              placeholder="********"  
            />  
          </div>  
          
          <button  
            type="submit"  
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"  
          >  
            Sign Up  
          </button>  
        </form>  
        
        <p className="mt-4 text-center text-sm text-gray-600">  
          Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Log in here</a>  
        </p>  
      </div>  
    </div>  
  );  
};  

export default UserSignup;