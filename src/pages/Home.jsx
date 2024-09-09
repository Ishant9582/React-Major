import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white  ">
      {/* Header Section */}

  
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-20 pb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 transform hover:scale-110 transition-transform duration-300">
          Welcome to Postolio
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl">
          We provide innovative solutions that help businesses thrive in the digital world.
        </p>
        <Link to={"https://www.google.com/"}>
        <button className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-400 transform hover:scale-105 transition-transform duration-300 rounded-md text-xl">
          Learn More
        </button>
        </Link>
      </section>

      {/* Services Section */}
      <section className="py-16 px-8 bg-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12">Our Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-gray-700 p-6 rounded-lg transform hover:rotate-3 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4">Create post</h3>
            <p className="text-lg">
              We build fast, responsive, and secure websites tailored to your business needs.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-gray-700 p-6 rounded-lg transform hover:-rotate-3 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4">Read Posts</h3>
            <p className="text-lg">
              Our team creates applications that provide seamless user experiences.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-gray-700 p-6 rounded-lg transform hover:rotate-3 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4">Edit or Delete</h3>
            <p className="text-lg">
              Boost your online presence with our these features.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;


