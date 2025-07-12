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
    description: "",
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
    if (!pet.name || !pet.breed || !pet.age || !pet.gender || !pet.imageUrl) {
      setError("All fields including image are required.");
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
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{isEdit ? "Edit Pet" : "Add Pet"}</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Pet Name"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={pet.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={pet.breed}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={pet.age}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={pet.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={pet.description}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="w-full mb-4"
          onChange={handleImageChange}
        />
        {pet.imageUrl && (
          <img src={pet.imageUrl} alt="Preview" className="mb-4 w-full h-48 object-cover rounded" />
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : isEdit ? "Update Pet" : "Add Pet"}
        </button>
      </form>
    </div>
  );
}

export default AddEditPet; 