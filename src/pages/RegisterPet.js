import React, { useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function RegisterPet() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [petData, setPetData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    color: "",
    size: "",
    microchipId: "",
    collar: "",
    description: "",
    specialFeatures: "",
    emergencyPhone: "",
    emergencyEmail: "",
    imageUrl: "",
    status: "registered"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPetData(prev => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!user) {
      setError("Please login to register your pet");
      setLoading(false);
      return;
    }

    try {
      // Get user profile from localStorage
      const userProfileData = localStorage.getItem(`userProfile_${user.uid}`);
      const userProfile = userProfileData ? JSON.parse(userProfileData) : null;
      
      const petWithUserData = {
        ...petData,
        ownerId: user.uid,
        ownerName: user.displayName || (userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : "Unknown"),
        ownerEmail: user.email,
        ownerPhone: userProfile?.emergencyPhone || petData.emergencyPhone,
        ownerAddress: userProfile ? `${userProfile.address}, ${userProfile.city}, ${userProfile.country}` : "",
        createdAt: serverTimestamp(),
        isActive: true
      };

      await addDoc(collection(db, "pets"), petWithUserData);
      navigate("/");
    } catch (err) {
      setError("Failed to register pet. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-4">Please login to register your pet.</p>
          <button 
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Register Your Pet</h1>
            <p className="text-gray-600">Pre-register your pet to make recovery easier if they ever get lost.</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Pet Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Basic Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Pet Name *"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  value={petData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="breed"
                  placeholder="Breed *"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  value={petData.breed}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age (years)"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  value={petData.age}
                  onChange={handleChange}
                />
                <select
                  name="gender"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  value={petData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  type="text"
                  name="color"
                  placeholder="Color/Markings"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  value={petData.color}
                  onChange={handleChange}
                />
                <select
                  name="size"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  value={petData.size}
                  onChange={handleChange}
                >
                  <option value="">Select Size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Additional Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="microchipId"
                  placeholder="Microchip ID (if any)"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  value={petData.microchipId}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="collar"
                  placeholder="Collar description"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  value={petData.collar}
                  onChange={handleChange}
                />
              </div>
              
              <textarea
                name="description"
                placeholder="Description of your pet"
                className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                value={petData.description}
                onChange={handleChange}
                rows="3"
              />
              
              <textarea
                name="specialFeatures"
                placeholder="Special features or identifying characteristics"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                value={petData.specialFeatures}
                onChange={handleChange}
                rows="3"
              />
            </div>

            {/* Emergency Contact */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Emergency Contact</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="emergencyPhone"
                  placeholder="Emergency Phone Number"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  value={petData.emergencyPhone}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="emergencyEmail"
                  placeholder="Emergency Email"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  value={petData.emergencyEmail}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Pet Photo</h2>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              
              {petData.imageUrl && (
                <div className="mt-4">
                  <img 
                    src={petData.imageUrl} 
                    alt="Pet Preview" 
                    className="w-48 h-48 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? "Registering Pet..." : "Register Pet"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPet; 