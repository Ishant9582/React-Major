import React from "react";
import { Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const authstatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authstatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authstatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authstatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authstatus,
    },
  ];

  return (
    <header className="bg-gray-700 border-gray-200 dark:bg-gray-900">
      <Container>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Postolio
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() =>
              document
                .getElementById("navbar-default")
                .classList.toggle("hidden")
            }
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-default"
          >
            <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 text-white">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                        }}
                        className="hover:text-green-400 cursor-pointer"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authstatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </header>
  );
}
