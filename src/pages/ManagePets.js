import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import PetCard from "../components/PetCard";
import { useNavigate } from "react-router";

function ManagePets() {
  const [user] = useAuthState(auth);
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchPets = async () => {
      const q = query(collection(db, "pets"), where("ownerId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      setPets(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPets();
  }, [user]);

  const handleEdit = (pet) => {
    navigate(`/pet/${pet.id}/edit`);
  };

  const handleDelete = async (petId) => { 
    if(confirm("Are you sure you want to delete this pet?")){
    await deleteDoc(doc(db, "pets", petId));
    alert("Pet deleted successfully");
    }

    setPets(pets.filter(pet => pet.id !== petId));
  };

  if (!user) {
    return <div className="text-center mt-10">Please login to manage your pets.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Manage Your Pets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pets.map(pet => (
          <PetCard key={pet.id} pet={pet} onEdit={handleEdit} onDelete={handleDelete} isOwner={true} />
        ))}
      </div>
      <button
        onClick={() => navigate("/pet/new")}
        className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg hover:bg-blue-800"
        title="Add Pet"
      >
        +
      </button>
    </div>
  );
}

export default ManagePets; 