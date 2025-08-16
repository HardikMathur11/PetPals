import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function FoundPet() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [petData, setPetData] = useState({
    name: "Unknown",
    breed: "",
    age: "",
    gender: "",
    color: "",
    size: "",
    microchipId: "",
    collar: "",
    foundDate: "",
    foundTime: "",
    foundLocation: "",
    description: "",
    specialFeatures: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    currentLocation: "",
    imageUrl: "",
    status: "found"
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
      setError("Please login to report a found pet");
      setLoading(false);
      return;
    }

    try {
      const petWithUserData = {
        ...petData,
        finderId: user.uid,
        finderName: user.displayName || `${userProfile?.firstName} ${userProfile?.lastName}`,
        createdAt: serverTimestamp(),
        isActive: true
      };

      await addDoc(collection(db, "pets"), petWithUserData);
      navigate("/");
    } catch (err) {
      setError("Failed to report found pet. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-4">Please login to report a found pet.</p>
          <button 
            onClick={() => navigate("/login")}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
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
            <h1 className="text-3xl font-bold text-green-600 mb-2">Report Found Pet</h1>
            <p className="text-gray-600">Help reunite this pet with their family. Your kindness can make a difference.</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pet Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Pet Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Pet Name (if known)"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={petData.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="breed"
                  placeholder="Breed (if known)"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={petData.breed}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Estimated Age"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={petData.age}
                  onChange={handleChange}
                />
                <select
                  name="gender"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={petData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unknown">Unknown</option>
                </select>
                <input
                  type="text"
                  name="color"
                  placeholder="Color/Markings *"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={petData.color}
                  onChange={handleChange}
                  required
                />
                <select
                  name="size"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={petData.size}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Size *</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <input
                  type="text"
                  name="microchipId"
                  placeholder="Microchip ID (if found)"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={petData.microchipId}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="collar"
                  placeholder="Collar Description"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={petData.collar}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Found Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Found Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="date"
                  name="foundDate"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={petData.foundDate}
                  onChange={handleChange}
                  required
                />
                <input
                  type="time"
                  name="foundTime"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={petData.foundTime}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <textarea
                name="foundLocation"
                placeholder="Where was the pet found? (Street, City, Landmarks) *"
                className="w-full mt-4 px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                value={petData.foundLocation}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            {/* Current Location */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Location</h2>
              
              <textarea
                name="currentLocation"
                placeholder="Where is the pet currently? (Your home, shelter, vet, etc.) *"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                value={petData.currentLocation}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Description & Special Features</h2>
              
              <textarea
                name="description"
                placeholder="Detailed description of the pet *"
                className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                value={petData.description}
                onChange={handleChange}
                rows="4"
                required
              />
              
              <textarea
                name="specialFeatures"
                placeholder="Special features, scars, markings, or identifying characteristics"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                value={petData.specialFeatures}
                onChange={handleChange}
                rows="3"
              />
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="contactName"
                  placeholder="Your Name *"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={petData.contactName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="contactPhone"
                  placeholder="Your Phone Number *"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={petData.contactPhone}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="contactEmail"
                  placeholder="Your Email Address"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={petData.contactEmail}
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
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
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
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
              >
                {loading ? "Reporting Found Pet..." : "Report Found Pet"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FoundPet; 