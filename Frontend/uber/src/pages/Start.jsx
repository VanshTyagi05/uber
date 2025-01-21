import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Section with Background Image */}
      <div
        className="flex-grow bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/9845372/pexels-photo-9845372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
        <div className="absolute top-8 left-8">
          <h1 className="text-white text-4xl font-bold">Uber</h1>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-black text-white p-6 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Get started with Uber</h2>
       <Link to='/login'> 
       <button className="flex items-center justify-center px-6 py-3 bg-white text-black font-medium rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">
          Continue
          <span className="ml-2 text-xl ">→</span>
        </button>
       </Link>
      </div>
    </div>
  )
}

export default Start