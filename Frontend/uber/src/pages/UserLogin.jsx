import React, { useContext, useState } from 'react';  
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserLogin = () => {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
const navigate=useNavigate();
  const {user,setUser}=React.useContext(UserDataContext);

  const handleSubmit = async(e) => {  
    e.preventDefault();  
    // Handle login logic here
    const loginUser={
      email:email,
      password:password
    }
    try {
       const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, loginUser);
        
        
        if(res.status==200){
         
          setUser(res.data.user);
          // we will store the token int the local storage
          localStorage.setItem('token',res.data.token);
          
          // navigate to the home
          navigate('/home');

        }
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please try again.");
      
    }
  };  

  return (  
    <div className="flex h-screen justify-center items-center bg-gray-100">  
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xs">  
        {/* Logo Section */}  
        <div className="mb-6 flex justify-center">  
          <img  
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZHQ2gAN47Ku00Y_eWXOB5jXEKIqFQ9pJBmA&s" // Replace with your logo path  
            alt="Company Logo"  
            className="h-12 w-auto" // You can adjust the size here  
          />  
        </div>  
        
        <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>  
        
        <form onSubmit={handleSubmit}>  
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
            Login  
          </button>  
        </form>  
        <Link to={'/signup'}>
        <p className="mt-4 text-center text-sm text-gray-600">  
          Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-700">Register here</a>  
        </p>  
        </Link>
        

        <Link to={'/captain-login'}>
        <button  
            type="submit"  
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"  
          >  
            Sign in as Captain 
          </button>  
        </Link>
      </div>  
    </div>  
  );  
};  

export default UserLogin;