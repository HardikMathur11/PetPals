import React from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 px-6 py-3 flex items-center justify-between shadow">
      <Link to="/" className="text-white text-2xl font-bold">PetPals</Link>
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-white hover:underline">Home</Link>
        {user && <Link to="/manage-pets" className="text-white hover:underline">Manage Pets</Link>}
        {user && <Link to="/profile" className="text-white hover:underline">Profile</Link>}
        {!user ? (
          <>
            <Link to="/login" className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-700">Login</Link>
            <Link to="/register" className="text-white bg-blue-700 px-3 py-1 rounded hover:bg-blue-900">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 