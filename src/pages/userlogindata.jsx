
import { Link } from 'react-router-dom';
import React from 'react';
import { useState , useEffect } from 'react';
import { fetchUserData } from "../appwrite/auth"; // Adjust the path as needed




const UserProfile = () => {
        const [user, setUser] = useState(null);
      
        useEffect(() => {
          const getUserData = async () => {
            try {
              const userData = await fetchUserData();
              setUser(userData);
            } catch (error) {
              console.error("Failed to fetch user data:", error);
            }
          };
      
          getUserData();
        }, []);
      

  
    if (!user) {
      return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative flex items-center justify-center w-16 h-16">
                <div className="absolute w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin border-t-blue-500"></div>
            </div>
            <p className="text-gray-600 mt-4">Loading...</p>
        </div>
    );
    }
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen">
    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm">
      <div className="flex items-center justify-center">
        <div className="bg-blue-500 p-3 rounded-full shadow-inner">
          <svg
            className="h-10 w-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14l9-5-9-5-9 5 9 5z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14l6.16-3.422A9.974 9.974 0 0112 20.944M12 14l-6.16-3.422A9.974 9.974 0 0012 20.944M12 14V10m0 10a9.974 9.974 0 01-6.16-3.422M18.16 10.578A9.974 9.974 0 0012 3.056m0 0A9.974 9.974 0 005.84 10.578M12 3.056V10"
            ></path>
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-center text-gray-800 mt-4">
        User Profile
      </h2>
      <div className="mt-4">
        <p className="text-gray-600 text-sm">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Registration Date:</strong> {new Date(user.registration).toLocaleDateString()}
        </p>
      </div>
    </div>
    <Link to={"/"}>
    <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-300">
      Back to Home
    </button>
    
    </Link>
    <Link to={"/update"}>
    <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-300" >Update</button>
    </Link>
  </div>
  );
};

export default UserProfile;








