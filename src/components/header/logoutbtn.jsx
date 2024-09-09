import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authslice';
import { Logout } from '../../appwrite/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { postout } from '../../store/postslice';
export default function LogoutBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const logouthandler = () => {
    Logout().then(() => {
      dispatch(logout());
      dispatch(postout()) ;
      toast.success("Log out successfully")
      navigate("/")
    })
    .catch((err)=>{
      toast.error(`err.message`)
    })
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        {/* Add Post and other navigation items here */}

      </div>

      <div className="relative inline-block text-left ml-auto">
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none"
        >
          Account
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            className="origin-top-right absolute right-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            style={{ minWidth: '150px', top: '100%', zIndex: 10 }}
          >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <Link
                to="/getuser/data/io"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Account settings
              </Link>
              <button
                onClick={logouthandler}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
