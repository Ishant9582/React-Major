
import { Link } from 'react-router-dom';
import React from 'react';
import { useState , useEffect } from 'react';
import { fetchUserData } from "../appwrite/auth"; // Adjust the path as needed




const UserProfile = () => {
        const [user, setUser] = useState(null);
        const [showAlert, setShowAlert] = useState(true); // For controlling the alert visibility

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
    const closeAlert = () => {
      setShowAlert(false); // This will hide the alert box
    };
  return (

    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen">
              {showAlert && (
          <div
            id="alert-1"
            className="flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div className="ms-3 text-sm font-medium">
              !!!!! If you want to update then dont use previous name and email !!!!!!!!
            </div>
            <button
              type="button"
              onClick={closeAlert}
              className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        )}
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








