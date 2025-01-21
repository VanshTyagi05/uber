import React, { useState } from 'react';  
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  
  
    const handleSubmit = (e) => {  
      e.preventDefault();  
      // Handle login logic here  
      console.log('Email:', email);  
      console.log('Password:', password);  
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
      
      <h2 className="text-2xl font-bold mb-6 text-center">Captain Login</h2>  
      
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
          Sign In as Captain  
        </button>  
      </form>  
      
      <Link to ="/captain-signup">
      <p className="mt-4 text-center text-sm text-gray-600">  
        Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-700">Register as Captain here</a>  
      </p>  
      </Link>

      
    </div>  
  </div>  
  )
};

export default CaptainLogin;