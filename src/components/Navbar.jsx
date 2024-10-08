import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <h1 className="text-white text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
          MyApp
        </h1>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <button 
            className="text-gray-300 hover:text-white transition duration-300" 
            onClick={() => navigate('/about')}
          >
            About
          </button>
          <button 
            className="text-gray-300 hover:text-white transition duration-300" 
            onClick={() => navigate('/contact')}
          >
            Contact
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
