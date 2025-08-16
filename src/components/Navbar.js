import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-blue-600 px-4 py-3 shadow relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white text-xl md:text-2xl font-bold" onClick={closeMenu}>
          PetPals
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/" className="text-white hover:underline transition-colors">Home</Link>
          {user && <Link to="/manage-pets" className="text-white hover:underline transition-colors">Manage Pets</Link>}
          {user && <Link to="/profile" className="text-white hover:underline transition-colors">Profile</Link>}
          {!user ? (
            <>
              <Link to="/login" className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-700 transition-colors">Login</Link>
              <Link to="/register" className="text-white bg-blue-700 px-3 py-1 rounded hover:bg-blue-900 transition-colors">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 transition-colors">Logout</button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 rounded hover:bg-blue-700 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

              {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-blue-600 shadow-lg z-50`}>
          <div className="flex flex-col py-2">
            <Link 
              to="/" 
              className="text-white px-4 py-3 hover:bg-blue-700 transition-colors border-b border-blue-500"
              onClick={closeMenu}
            >
              Home
            </Link>
          {user && (
            <Link 
              to="/manage-pets" 
              className="text-white px-4 py-3 hover:bg-blue-700 transition-colors border-b border-blue-500"
              onClick={closeMenu}
            >
              Manage Pets
            </Link>
          )}
          {user && (
            <Link 
              to="/profile" 
              className="text-white px-4 py-3 hover:bg-blue-700 transition-colors border-b border-blue-500"
              onClick={closeMenu}
            >
              Profile
            </Link>
          )}
          {!user ? (
            <div className="flex flex-col gap-2 p-4">
              <Link 
                to="/login" 
                className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="text-white bg-blue-700 px-4 py-2 rounded hover:bg-blue-900 transition-colors text-center"
                onClick={closeMenu}
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="p-4">
              <button 
                onClick={handleLogout} 
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 