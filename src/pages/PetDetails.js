import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router";
import { db, auth } from "../utils/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPet = async () => {
      const docRef = doc(db, "pets", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPet({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchPet();
  }, [id]);

  const handleDelete = async () => {
    if(confirm("Are you sure you want to delete this pet?")) {
    await deleteDoc(doc(db, "pets", id));
    navigate("/manage-pets");
    alert("Pet deleted successfully");
    }
  };

  if (!pet) return <div className="text-center mt-10">Loading...</div>;

  const isOwner = user && pet.ownerId === user.uid;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded shadow flex flex-col md:flex-row gap-8">
      <img src={pet.imageUrl} alt={pet.name} className="w-full md:w-1/2 h-80 object-cover rounded" />
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-2">{pet.name}</h2>
        <div className="text-lg text-gray-600 mb-2">{pet.breed}</div>
        <div className="mb-2"><span className="font-semibold">Age:</span> {pet.age} years</div>
        <div className="mb-2"><span className="font-semibold">Gender:</span> {pet.gender}</div>
        <div className="mb-4">
          <span className="font-semibold">Description</span>
          <div>{pet.description}</div>
        </div>
        <div className="text-gray-500 text-sm mb-4">Registered on {pet.createdAt ? new Date(pet.createdAt.seconds * 1000).toLocaleDateString() : "Unknown"}</div>
        <Link to={location.state?.from || "/manage-pets"} className="text-blue-600 hover:underline mb-4 block">&larr; Back</Link>
        {isOwner && (
          <div className="flex gap-2">
            <button onClick={() => navigate(`/pet/${id}/edit`)} className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500">Edit Pet</button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Delete Pet</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PetDetails; 