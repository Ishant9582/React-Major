


import App from './App.jsx';
import React from 'react';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout, Login } from './components/index.js'; // Ensure Protected is imported
import Post from "./pages/Post";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost.jsx";
import Signup from './pages/Signup.jsx';
import EditPost from "./pages/Editpost.jsx";
import UserProfile from './pages/Userlogindata.jsx';
import UpdateForm from './pages/Update.jsx';
import AllPosts from "./pages/AllPost.jsx";
import Protected from "./components/Isowner.jsx"

// Create the router with updated routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/getuser/data/io",
        element: (
          <AuthLayout authentication>
            <UserProfile />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <Protected>
              <EditPost />
            </Protected>
          </AuthLayout>
        ),
      },
      {
        path: "/update",
        element: (
          <AuthLayout authentication>
            <UpdateForm />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
