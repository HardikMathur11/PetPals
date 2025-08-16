import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { db, auth } from "../utils/firebase";
import { addDoc, collection, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function AddEditPet() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [user] = useAuthState(auth);
  const [pet, setPet] = useState({
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
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      const fetchPet = async () => {
        const docRef = doc(db, "pets", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setPet(docSnap.data());
      };
      fetchPet();
    }
  }, [id, isEdit]);

  const handleChange = e => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPet(prev => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!pet.name || !pet.breed || !pet.age || !pet.gender) {
      setError("Name, breed, age, and gender are required.");
      setLoading(false);
      return;
    }
    try {
      if (isEdit) {
        const docRef = doc(db, "pets", id);
        await updateDoc(docRef, { ...pet });
      } else {
        await addDoc(collection(db, "pets"), {
          ...pet,
          ownerId: user?.uid || "",
          status: "registered",
          createdAt: serverTimestamp(),
        });
      }
      setLoading(false);
      navigate("/manage-pets");
    } catch (err) {
      setError("Failed to save pet. " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">{isEdit ? "Edit Pet" : "Add Pet"}</h2>
      {error && <div className="text-red-500 mb-4 p-3 bg-red-50 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Pet Name *"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={pet.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="breed"
              placeholder="Breed *"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={pet.breed}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age (years) *"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={pet.age}
              onChange={handleChange}
              required
            />
            <select
              name="gender"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={pet.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender *</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              name="color"
              placeholder="Color"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={pet.color}
              onChange={handleChange}
            />
            <select
              name="size"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={pet.size}
              onChange={handleChange}
            >
              <option value="">Select Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
        </div>

        {/* Identification */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-lg font-semibold mb-4">Identification</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="microchipId"
              placeholder="Microchip ID"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={pet.microchipId}
              onChange={handleChange}
            />
            <input
              type="text"
              name="collar"
              placeholder="Collar Description"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={pet.collar}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-lg font-semibold mb-4">Description</h3>
          <textarea
            name="description"
            placeholder="Describe your pet's personality, behavior, etc."
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 h-24"
            value={pet.description}
            onChange={handleChange}
          />
        </div>

        {/* Special Features */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-lg font-semibold mb-4">Special Features</h3>
          <textarea
            name="specialFeatures"
            placeholder="Distinguishing marks, special features, medical conditions, etc."
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 h-24"
            value={pet.specialFeatures}
            onChange={handleChange}
          />
        </div>

        {/* Owner Information */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-lg font-semibold mb-4">Owner Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="ownerName"
              placeholder="Owner Name"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={pet.ownerName}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="ownerPhone"
              placeholder="Owner Phone"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={pet.ownerPhone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="ownerEmail"
              placeholder="Owner Email"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={pet.ownerEmail}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-lg font-semibold mb-4">Pet Photo (Optional)</h3>
          <input
            type="file"
            accept="image/*"
            className="w-full mb-4"
            onChange={handleImageChange}
          />
          {pet.imageUrl && (
            <img src={pet.imageUrl} alt="Preview" className="w-full h-48 object-cover rounded" />
          )}
          {!pet.imageUrl && (
            <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
              <p className="text-gray-500">No image selected</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors font-semibold"
          disabled={loading}
        >
          {loading ? "Saving..." : isEdit ? "Update Pet" : "Add Pet"}
        </button>
      </form>
    </div>
  );
}

export default AddEditPet; 