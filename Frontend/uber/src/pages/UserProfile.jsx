import React, { useContext, useState, useEffect } from 'react';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserDataContext);
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setUserInfo(response.data);
      setFormData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch profile');
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setUserInfo(response.data);
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="text-center p-6">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src={userInfo?.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-full w-full h-full object-cover border-4 border-gray-200"
            />
          </div>
          
          {!isEditing ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {`${userInfo?.fullname.firstname} ${userInfo?.fullname.lastname}`}
              </h2>
              <p className="text-gray-600">{userInfo?.email}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="firstname"
                  value={formData?.firstname || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="First Name"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastname"
                  value={formData?.lastname || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData?.email || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled
                  placeholder="Email"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(userInfo);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;