import React from "react";
import { Link } from "react-router-dom";

function PetCard({ pet, onEdit, onDelete, isOwner, currentUserId }) {
  const getStatusBadge = () => {
    // For non-logged-in users or third party users, don't show reunited status - show as normal pet
    if (pet.status === "reunited" && (!currentUserId || (!isOwner && pet.finderId !== currentUserId))) {
      return null; // No badge for non-logged-in or third party users
    }
    
    // For non-logged-in users, don't show found_by_community status
    if (pet.status === "found_by_community" && !currentUserId) {
      return null; // No badge for non-logged-in users
    }
    
    switch (pet.status) {
      case "lost":
        return <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">LOST</span>;
      case "found":
        return <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">FOUND</span>;
      case "found_by_community":
        return <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">FOUND BY COMMUNITY</span>;
      case "reunited":
        // Only show reunited badge to finder
        return pet.finderId === currentUserId ? 
          <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-semibold">REUNITED</span> : 
          null;
      case "registered":
        return null; // No badge for registered pets
      default:
        return null;
    }
  };

  const isFinder = currentUserId && pet.finderId === currentUserId;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={pet.imageUrl || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={pet.name}
          className="h-48 w-full object-cover"
        />
        <div className="absolute top-2 left-2">
          {getStatusBadge()}
        </div>
        {/* Show reunited badge only to finder */}
        {pet.status === "reunited" && isFinder && (
          <div className="absolute top-2 right-2">
            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
              YOU FOUND THIS PET
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-1">{pet.name}</h2>
          <p className="text-gray-600">{pet.breed}</p>
          <p className="text-gray-500 text-sm mb-2">
            {pet.age ? `${pet.age} years old` : ""}
            {pet.gender ? ` • ${pet.gender}` : ""}
            {pet.color ? ` • ${pet.color}` : ""}
            {pet.size ? ` • ${pet.size}` : ""}
          </p>
          {/* Show owner info for registered pets */}
          {pet.status === "registered" && (
            <div className="mt-2 bg-blue-50 rounded p-2 text-xs text-blue-900">
              <div><span className="font-semibold">👤</span> {pet.ownerName || "N/A"}</div>
            </div>
          )}
          {/* Only show reunited date to finder */}
          {pet.status === "reunited" && pet.reunitedAt && isFinder && (
            <p className="text-purple-600 text-sm font-medium">
              Reunited: {new Date(pet.reunitedAt.seconds * 1000).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          {isOwner && (
            <>
              <button onClick={() => onEdit(pet)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Edit</button>
              <button onClick={() => onDelete(pet.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
            </>
          )}
          {!isOwner && pet.finderId === currentUserId && pet.status === "found" && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Found by you</span>
          )}
          <Link to={`/pet/${pet.id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">View</Link>
        </div>
      </div>
    </div>
  );
}

export default PetCard; 