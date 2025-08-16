import React from "react";
import { Link } from "react-router-dom";

function LostPetCard({ pet }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-red-500">
      <div className="relative">
        <img
          src={pet.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={pet.name}
          className="h-48 w-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
          LOST PET
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-1 text-red-700">{pet.name}</h2>
          <p className="text-gray-600 font-medium">{pet.breed}</p>
          <p className="text-gray-500 text-sm">{pet.age} years old • {pet.gender} • {pet.size}</p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <span className="text-gray-500 text-sm w-20">Color:</span>
            <span className="text-sm font-medium">{pet.color}</span>
          </div>
          
          {pet.microchipId && (
            <div className="flex items-start">
              <span className="text-gray-500 text-sm w-20">Microchip:</span>
              <span className="text-sm font-medium">{pet.microchipId}</span>
            </div>
          )}
          
          {pet.collar && (
            <div className="flex items-start">
              <span className="text-gray-500 text-sm w-20">Collar:</span>
              <span className="text-sm font-medium">{pet.collar}</span>
            </div>
          )}
        </div>

        <div className="bg-red-50 p-3 rounded mb-4">
          <h4 className="font-semibold text-red-700 mb-2">Last Seen</h4>
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-medium">Date:</span> {new Date(pet.lastSeenDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-medium">Time:</span> {pet.lastSeenTime}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Location:</span> {pet.lastSeenLocation}
          </p>
        </div>

        {pet.description && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-1">Description</h4>
            <p className="text-sm text-gray-600 line-clamp-2">{pet.description}</p>
          </div>
        )}

        {pet.specialFeatures && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-1">Special Features</h4>
            <p className="text-sm text-gray-600 line-clamp-2">{pet.specialFeatures}</p>
          </div>
        )}

        <div className="bg-blue-50 p-3 rounded mb-4">
          <h4 className="font-semibold text-blue-700 mb-2">Contact Information</h4>
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-medium">Name:</span> {pet.contactName}
          </p>
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-medium">Phone:</span> {pet.contactPhone}
          </p>
          {pet.contactEmail && (
            <p className="text-sm text-gray-700">
              <span className="font-medium">Email:</span> {pet.contactEmail}
            </p>
          )}
        </div>

        {pet.reward && (
          <div className="bg-yellow-50 p-3 rounded mb-4">
            <h4 className="font-semibold text-yellow-700 mb-1">Reward Offered</h4>
            <p className="text-lg font-bold text-yellow-800">${pet.reward}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Link 
            to={`/pet/${pet.id}`} 
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded text-center hover:bg-red-600 transition-colors"
          >
            View Details
          </Link>
          <button 
            onClick={() => window.open(`tel:${pet.contactPhone}`)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Call
          </button>
        </div>
      </div>
    </div>
  );
}

export default LostPetCard; 