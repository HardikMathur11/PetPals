import React from "react";
import { Link } from "react-router";

function PetCard({ pet, onEdit, onDelete, isOwner }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img
        src={pet.imageUrl}
        alt={pet.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-1">{pet.name}</h2>
          <p className="text-gray-600">{pet.breed}</p>
          <p className="text-gray-500 text-sm mb-2">{pet.age} years old</p>
        </div>
        <div className="flex gap-2 mt-2">
          {isOwner && (
            <>
              <button onClick={() => onEdit(pet)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Edit</button>
              <button onClick={() => onDelete(pet.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
            </>
          )}
          <Link to={`/pet/${pet.id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">View</Link>
        </div>
      </div>
    </div>
  );
}

export default PetCard; 