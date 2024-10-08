import React from 'react';
import Navbar from '../components/Navbar';

function About() {
  return (
    <div className="h-screen flex flex-col">
      {/* Include Navbar at the top */}
      <Navbar />

      {/* Main Content */}
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-lg">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">About Us</h1>
          <p className="text-lg text-gray-600">
            We are a tech company dedicated to providing high-quality AI-powered
            solutions to solve everyday problems. Our mission is to empower
            businesses and individuals through innovative technology.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
