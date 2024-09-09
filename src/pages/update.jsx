import React, { useState } from 'react';
import { Client, Account } from 'appwrite';
import conf from "../conf/conf"
import { Navigate, useNavigate } from 'react-router-dom';
const UpdateForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);
  const navigate = useNavigate()
  // Initialize the Appwrite client
  const client = new Client()
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId);

  // Initialize the Account service
  const account = new Account(client);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Updating...');

    try {
      // Update the user's email
      const emailResult = await account.updateEmail(email, password);
      console.log("Email update result:", emailResult);

      // Update the user's username
      const nameResult = await account.updateName(username);
      console.log("Username update result:", nameResult);

      setStatus('User information updated successfully!');
      navigate("/")
    } catch (error) {
      setStatus('Error updating user information.');
      console.error("Update error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Update User Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm font-medium text-gray-600 mb-1">New Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">New Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-gray-600 mb-1">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        >
          Update Info
        </button>
      </form>
      {status && <p className={`mt-4 text-center ${status.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>{status}</p>}
    </div>
  );
};

export default UpdateForm;

