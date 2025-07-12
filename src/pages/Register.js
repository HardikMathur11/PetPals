import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    address: "",
    city: "",
    country: "",
    profilePhoto: null
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePhoto: file, profilePhotoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Create user profile data
      const userProfile = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        profilePhotoUrl: formData.profilePhotoUrl || null,
        createdAt: new Date().toISOString()
      };

      // Save profile data to localStorage (or you can use Firestore)
      localStorage.setItem(`userProfile_${userCredential.user.uid}`, JSON.stringify(userProfile));

      // Update Firebase Auth profile
      await updateProfile(userCredential.user, { 
        displayName: `${formData.firstName} ${formData.lastName}`,
        // Don't store Base64 in Firebase Auth photoURL - it's too long
        // photoURL: formData.profilePhotoUrl || null
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] py-8">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        
        {/* Profile Photo */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
          {formData.profilePhotoUrl && (
            <img 
              src={formData.profilePhotoUrl} 
              alt="Profile Preview" 
              className="w-20 h-20 rounded-full object-cover mt-2 mx-auto"
            />
          )}
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password Fields */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {/* Date of Birth */}
        <input
          type="date"
          name="dateOfBirth"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />

        {/* Address */}
        <textarea
          name="address"
          placeholder="Address"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          required
        />

        {/* City and Country */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
        
        <div className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </div>
      </form>
    </div>
  );
}

export default Register; 