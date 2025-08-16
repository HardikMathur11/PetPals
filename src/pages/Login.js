import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }

    setResetLoading(true);
    setError("");
    setSuccess("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent! Check your inbox.");
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError("No account found with this email address");
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] py-8">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <input
          type="email"
          placeholder="Email Address"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 mb-4"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Forgot Password Button */}
        <div className="text-center mb-4">
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={resetLoading}
            className="text-blue-600 hover:underline disabled:text-gray-400"
          >
            {resetLoading ? "Sending..." : "Forgot Password?"}
          </button>
        </div>
        
        <div className="text-center">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login; 