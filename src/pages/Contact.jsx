import React from 'react';
import Navbar from '../components/Navbar';

function Contact() {
  return (
    <div className="h-screen flex flex-col">
      {/* Include Navbar at the top */}
      <Navbar />

      {/* Main Content */}
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-lg">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-4">
            Feel free to reach out to us for any queries or support. We would
            love to hear from you!
          </p>
          <p className="text-lg text-gray-600">
            Email: <a href="mailto:support@myapp.com" className="text-blue-500">support@myapp.com</a>
          </p>
          <p className="text-lg text-gray-600">
            Phone: <a href="tel:+1234567890" className="text-blue-500">+123 456 7890</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
