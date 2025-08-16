import React from "react";
import { Link } from "react-router-dom";

function LostPetCardCompact({ pet }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-red-500">
      <div className="relative">
        <img
          src={pet.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={pet.name}
          className="h-32 w-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
          LOST
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-bold mb-1 text-red-700">{pet.name}</h3>
          <p className="text-gray-600 text-sm">{pet.breed} • {pet.age} years</p>
          <p className="text-gray-500 text-xs">{pet.color} • {pet.size}</p>
        </div>

        <div className="mb-3">
          <p className="text-xs text-gray-600 mb-1">
            <span className="font-medium">Last seen:</span> {new Date(pet.lastSeenDate).toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-600">
            <span className="font-medium">Location:</span> {pet.lastSeenLocation ? pet.lastSeenLocation.substring(0, 30) + '...' : 'Location not specified'}
          </p>
        </div>

        {pet.reward && (
          <div className="bg-yellow-50 p-2 rounded mb-3">
            <p className="text-xs font-semibold text-yellow-700">Reward: ${pet.reward}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Link 
            to={`/pet/${pet.id}`} 
            className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm text-center hover:bg-red-600 transition-colors"
          >
            View Details
          </Link>
          <button 
            onClick={() => window.open(`tel:${pet.contactPhone}`)}
            className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition-colors"
          >
            Call
          </button>
        </div>
      </div>
    </div>
  );
}

export default LostPetCardCompact; 