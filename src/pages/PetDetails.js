import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { db, auth } from "../utils/firebase";
import { doc, getDoc, deleteDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import FoundPet from "./FoundPet";

function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [reunitedRequest, setReunitedRequest] = useState(null);

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

  useEffect(() => {
    const fetchReunitedRequest = async () => {
      if (!user || !pet) return;
      
      try {
        // Check if there's a reunited request for this pet
        const requestQuery = query(
          collection(db, "reunitedRequests"), 
          where("petId", "==", id)
        );
        const requestSnapshot = await getDocs(requestQuery);
        
        if (!requestSnapshot.empty) {
          const requestData = requestSnapshot.docs[0].data();
          setReunitedRequest({ id: requestSnapshot.docs[0].id, ...requestData });
        }
      } catch (error) {
        console.error("Error fetching reunited request:", error);
      }
    };

    fetchReunitedRequest();
  }, [user, pet, id]);

  const handleDelete = async () => {
    if(confirm("Are you sure you want to delete this pet?")) {
    await deleteDoc(doc(db, "pets", id));
    navigate("/manage-pets");
    alert("Pet deleted successfully");
    }
  };

  const handleMarkAsFound = async () => {
    if(confirm("Has this lost pet been found? This will mark it as reunited.")) {
      try {
        await updateDoc(doc(db, "pets", id), {
          status: "reunited",
          reunitedAt: new Date(),
          updatedAt: new Date()
        });
        alert("Pet marked as reunited successfully!");
        window.location.reload();
      } catch (error) {
        alert("Failed to update pet status: " + error.message);
      }
    }
  };

  const handleMarkAsReunited = async () => {
    if(confirm("Has this found pet been reunited with its owner? This will mark it as reunited.")) {
      try {
        await updateDoc(doc(db, "pets", id), {
          status: "reunited",
          reunitedAt: new Date(),
          updatedAt: new Date()
        });
        alert("Pet marked as reunited successfully!");
        window.location.reload();
      } catch (error) {
        alert("Failed to update pet status: " + error.message);
      }
    }
  };

  const handleReunitedRequest = async (action) => {
    if (!reunitedRequest) return;
    
    try {
      const requestRef = doc(db, "reunitedRequests", reunitedRequest.id);
      
      if (action === "approve") {
        await updateDoc(requestRef, { status: "approved" });
        await updateDoc(doc(db, "pets", id), { status: "reunited" });
        alert("Reunited request approved! Pet status updated to reunited.");
      } else if (action === "reject") {
        await updateDoc(requestRef, { status: "rejected" });
        alert("Reunited request rejected.");
      }
      
      window.location.reload();
    } catch (error) {
      alert("Error updating request: " + error.message);
    }
  };

  const handleMarkReunitedAsLost = async () => {
    if(confirm("Mark this reunited pet as lost again?")) {
      try {
        await updateDoc(doc(db, "pets", id), {
          status: "lost",
          updatedAt: new Date()
        });
        alert("Pet marked as lost successfully!");
        window.location.reload();
      } catch (error) {
        alert("Failed to update pet status: " + error.message);
      }
    }
  };

  const handleMarkReunitedAsFound = async () => {
    if(confirm("Mark this reunited pet as found again?")) {
      try {
        await updateDoc(doc(db, "pets", id), {
          status: "found",
          updatedAt: new Date()
        });
        alert("Pet marked as found successfully!");
        window.location.reload();
      } catch (error) {
        alert("Failed to update pet status: " + error.message);
      }
    }
  };

  if (!pet) return <div className="text-center mt-10">Loading...</div>;

  const isOwner = user && pet.ownerId === user.uid;

  const renderLostPetDetails = () => (
    <div className="space-y-6">
      {/* Pet Information */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Pet Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><span className="font-semibold">Name:</span> {pet.name}</div>
          <div><span className="font-semibold">Breed:</span> {pet.breed}</div>
          <div><span className="font-semibold">Age:</span> {pet.age} years</div>
          <div><span className="font-semibold">Gender:</span> {pet.gender}</div>
          <div><span className="font-semibold">Color:</span> {pet.color}</div>
          <div><span className="font-semibold">Size:</span> {pet.size}</div>
          {pet.microchipId && <div><span className="font-semibold">Microchip UID:</span> {pet.microchipId}</div>}
          {pet.collar && <div><span className="font-semibold">Collar:</span> {pet.collar}</div>}
        </div>
      </div>

      {/* Last Seen Information */}
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h3 className="text-xl font-semibold text-red-700 mb-4">Last Seen Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><span className="font-semibold">Date:</span> {new Date(pet.lastSeenDate).toLocaleDateString()}</div>
          <div><span className="font-semibold">Time:</span> {pet.lastSeenTime}</div>
        </div>
        <div className="mt-4">
          <span className="font-semibold">Location:</span>
          <p className="mt-2 text-gray-700">{pet.lastSeenLocation}</p>
        </div>
      </div>

      {/* Description */}
      {pet.description && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
          <p className="text-gray-700">{pet.description}</p>
        </div>
      )}

      {/* Special Features */}
      {pet.specialFeatures && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Special Features</h3>
          <p className="text-gray-700">{pet.specialFeatures}</p>
        </div>
      )}

      {/* Contact Information */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Contact Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><span className="font-semibold">Name:</span> {pet.contactName}</div>
          <div><span className="font-semibold">Phone:</span> {pet.contactPhone}</div>
          {pet.contactEmail && <div><span className="font-semibold">Email:</span> {pet.contactEmail}</div>}
        </div>
      </div>

      {/* Reward */}
      {pet.reward && (
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 className="text-xl font-semibold text-yellow-700 mb-2">Reward Offered</h3>
          <p className="text-2xl font-bold text-yellow-800">${pet.reward}</p>
        </div>
      )}
    </div>
  );

  const renderFoundPetDetails = () => (
    <div className="space-y-6">
      {/* Pet Information */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Pet Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><span className="font-semibold">Name:</span> {pet.name}</div>
          <div><span className="font-semibold">Breed:</span> {pet.breed}</div>
          <div><span className="font-semibold">Age:</span> {pet.age} years</div>
          <div><span className="font-semibold">Gender:</span> {pet.gender}</div>
          <div><span className="font-semibold">Color:</span> {pet.color}</div>
          <div><span className="font-semibold">Size:</span> {pet.size}</div>
          {pet.microchipId && <div><span className="font-semibold">Microchip ID:</span> {pet.microchipId}</div>}
          {pet.collar && <div><span className="font-semibold">Collar:</span> {pet.collar}</div>}
        </div>
      </div>

      {/* Found Information */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Found Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><span className="font-semibold">Date:</span> {new Date(pet.foundDate).toLocaleDateString()}</div>
          <div><span className="font-semibold">Time:</span> {pet.foundTime}</div>
        </div>
        <div className="mt-4">
          <span className="font-semibold">Found Location:</span>
          <p className="mt-2 text-gray-700">{pet.foundLocation}</p>
        </div>
      </div>

      {/* Current Location */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Current Location</h3>
        <p className="text-gray-700">{pet.currentLocation}</p>
      </div>

      {/* Description */}
      {pet.description && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
          <p className="text-gray-700">{pet.description}</p>
        </div>
      )}

      {/* Special Features */}
      {pet.specialFeatures && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Special Features</h3>
          <p className="text-gray-700">{pet.specialFeatures}</p>
        </div>
      )}

      {/* Finder Contact */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-xl font-semibold text-yellow-700 mb-4">Finder Contact</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><span className="font-semibold">Name:</span> {pet.contactName}</div>
          <div><span className="font-semibold">Phone:</span> {pet.contactPhone}</div>
          {pet.contactEmail && <div><span className="font-semibold">Email:</span> {pet.contactEmail}</div>}
        </div>
      </div>
    </div>
  );

  const renderRegisteredPetDetails = () => (
    <div className="space-y-6">
      {/* Pet Information */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Pet Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><span className="font-semibold">Name:</span> {pet.name}</div>
          <div><span className="font-semibold">Breed:</span> {pet.breed}</div>
          <div><span className="font-semibold">Age:</span> {pet.age} years</div>
          <div><span className="font-semibold">Gender:</span> {pet.gender}</div>
          <div><span className="font-semibold">Color:</span> {pet.color}</div>
          <div><span className="font-semibold">Size:</span> {pet.size}</div>
          {pet.microchipId && <div><span className="font-semibold">Microchip ID:</span> {pet.microchipId}</div>}
          {pet.collar && <div><span className="font-semibold">Collar:</span> {pet.collar}</div>}
        </div>
      </div>

      {/* Description */}
      {pet.description && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">DDescription</h3>
          <p className="text-gray-700">{pet.description}</p>
        </div>
      )}

      {/* Owner Information */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Owner Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><span className="font-semibold">👤</span> {pet.ownerName || "Not specified"}</div>
          <div><span className="font-semibold">📞</span> {pet.ownerPhone || "Not specified"}</div>
          <div><span className="font-semibold">✉️</span> {pet.ownerEmail || "Not specified"}</div>
          <div><span className="font-semibold">🏠</span> {pet.ownerAddress || "Not specified"}</div>
          <div><span className="font-semibold">Registered:</span> {pet.createdAt ? new Date(pet.createdAt.seconds * 1000).toLocaleDateString() : "Unknown"}</div>
        </div>
      </div>
    </div>
  );

  const renderReunitedPetDetails = () => {
    const isFinder = user && pet.finderId === user.uid;
    
    // For non-logged-in users or third party users, show normal pet information without reunion details
    if (!user || (!isOwner && !isFinder)) {
      return (
        <div className="space-y-6">
          {/* Pet Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Pet Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div><span className="font-semibold">Name:</span> {pet.name}</div>
              <div><span className="font-semibold">Breed:</span> {pet.breed}</div>
              <div><span className="font-semibold">Age:</span> {pet.age} years</div>
              <div><span className="font-semibold">Gender:</span> {pet.gender}</div>
              <div><span className="font-semibold">Color:</span> {pet.color}</div>
              <div><span className="font-semibold">Size:</span> {pet.size}</div>
              {pet.microchipId && <div><span className="font-semibold">Microchip ID:</span> {pet.microchipId}</div>}
              {pet.collar && <div><span className="font-semibold">Collar:</span> {pet.collar}</div>}
            </div>
          </div>

          {/* Description */}
          {pet.description && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
              <p className="text-gray-700">{pet.description}</p>
            </div>
          )}
        </div>
      );
    }

  return (
      <div className="space-y-6">
        {/* Pet Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Pet Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div><span className="font-semibold">Name:</span> {pet.name}</div>
            <div><span className="font-semibold">Breed:</span> {pet.breed}</div>
            <div><span className="font-semibold">Age:</span> {pet.age} years</div>
            <div><span className="font-semibold">Gender:</span> {pet.gender}</div>
            <div><span className="font-semibold">Color:</span> {pet.color}</div>
            <div><span className="font-semibold">Size:</span> {pet.size}</div>
            {pet.microchipId && <div><span className="font-semibold">Microchip ID:</span> {pet.microchipId}</div>}
            {pet.collar && <div><span className="font-semibold">Collar:</span> {pet.collar}</div>}
          </div>
        </div>

        {/* Reunion Information - Only show to finder */}
        {isFinder && (
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">Reunion Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div><span className="font-semibold">Reunited:</span> {pet.reunitedAt ? new Date(pet.reunitedAt.seconds * 1000).toLocaleDateString() : "Unknown"}</div>
              <div><span className="font-semibold">Status:</span> Successfully reunited with family</div>
              {pet.foundLocation && <div><span className="font-semibold">Found Location:</span> {pet.foundLocation}</div>}
              {pet.finderName && <div><span className="font-semibold">Found by:</span> {pet.finderName}</div>}
            </div>
          </div>
        )}

        {/* Description */}
        {pet.description && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
            <p className="text-gray-700">{pet.description}</p>
          </div>
        )}

        {/* Owner Information */}
        {isOwner && (
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Owner Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div><span className="font-semibold">Owner:</span> {pet.ownerName || "Not specified"}</div>
              <div><span className="font-semibold">Registered:</span> {pet.createdAt ? new Date(pet.createdAt.seconds * 1000).toLocaleDateString() : "Unknown"}</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderFoundByCommunityDetails = () => (
    <div className="space-y-6">
      {/* Pet Information */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Pet Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><span className="font-semibold">Name:</span> {pet.name}</div>
          <div><span className="font-semibold">Breed:</span> {pet.breed}</div>
          <div><span className="font-semibold">Age:</span> {pet.age} years</div>
          <div><span className="font-semibold">Gender:</span> {pet.gender}</div>
          <div><span className="font-semibold">Color:</span> {pet.color}</div>
          <div><span className="font-semibold">Size:</span> {pet.size}</div>
          {pet.microchipId && <div><span className="font-semibold">Microchip ID:</span> {pet.microchipId}</div>}
          {pet.collar && <div><span className="font-semibold">Collar:</span> {pet.collar}</div>}
        </div>
      </div>

      {/* Found Information */}
      <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
        <h3 className="text-xl font-semibold text-orange-700 mb-4">Found by Community</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><span className="font-semibold">Found Date:</span> {new Date(pet.foundDate).toLocaleDateString()}</div>
          <div><span className="font-semibold">Found Time:</span> {pet.foundTime}</div>
        </div>
        <div className="mt-4">
          <span className="font-semibold">Found Location:</span>
          <p className="mt-2 text-gray-700">{pet.foundLocation}</p>
        </div>
      </div>

      {/* Current Location */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Current Location</h3>
        <p className="text-gray-700">{pet.currentLocation}</p>
      </div>

      {/* Finder Contact */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Finder Contact</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><span className="font-semibold">Name:</span> {pet.contactName}</div>
          <div><span className="font-semibold">Phone:</span> {pet.contactPhone}</div>
          {pet.contactEmail && <div><span className="font-semibold">Email:</span> {pet.contactEmail}</div>}
        </div>
      </div>

      {/* Description */}
      {pet.description && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
          <p className="text-gray-700">{pet.description}</p>
        </div>
      )}

      {/* Owner Information */}
      {isOwner && (
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Owner Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div><span className="font-semibold">Owner:</span> {pet.ownerName || "Not specified"}</div>
            <div><span className="font-semibold">Registered:</span> {pet.createdAt ? new Date(pet.createdAt.seconds * 1000).toLocaleDateString() : "Unknown"}</div>
          </div>
        </div>
      )}

      {/* Reunited Request Information */}
      {reunitedRequest && (
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 className="text-xl font-semibold text-yellow-700 mb-4">Reunited Request</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div><span className="font-semibold">Status:</span> 
              <span className={`ml-2 px-2 py-1 rounded text-sm ${
                reunitedRequest.status === "pending" ? "bg-yellow-500 text-white" :
                reunitedRequest.status === "approved" ? "bg-green-500 text-white" :
                "bg-red-500 text-white"
              }`}>
                {reunitedRequest.status.toUpperCase()}
              </span>
            </div>
            <div><span className="font-semibold">Request Date:</span> {new Date(reunitedRequest.requestDate.seconds * 1000).toLocaleDateString()}</div>
            <div><span className="font-semibold">Found by:</span> {reunitedRequest.finderName}</div>
            <div><span className="font-semibold">Finder Email:</span> {reunitedRequest.finderEmail}</div>
            {reunitedRequest.finderPhone && <div><span className="font-semibold">Finder Phone:</span> {reunitedRequest.finderPhone}</div>}
          </div>
          {reunitedRequest.message && (
            <div className="mt-4">
              <span className="font-semibold">Message:</span>
              <p className="mt-2 text-gray-700">{reunitedRequest.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="relative">
            <img 
              src={pet.imageUrl || "https://via.placeholder.com/800x400?text=No+Image+Available"} 
              alt={pet.name} 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute top-4 left-4">
              {pet.status === "lost" && (
                <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  LOST PET
                </span>
              )}
              {pet.status === "found" && (
                <span className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  FOUND PET
                </span>
              )}
              {pet.status === "found_by_community" && user && (
                <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  FOUND BY COMMUNITY
                </span>
              )}
              {pet.status === "registered" && (
                <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  REGISTERED PET
                </span>
              )}
              {pet.status === "reunited" && user && (isOwner || pet.finderId === user.uid) && (
                <span className="bg-purple-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  REUNITED
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{pet.name}</h1>
                <p className="text-xl text-gray-600">{pet.breed}</p>
              </div>
              <Link to={location.state?.from || "/"} className="text-blue-600 hover:underline">
                ← Back
              </Link>
            </div>

            {/* Status-specific details */}
            {pet.status === "lost" && renderLostPetDetails()}
            {pet.status === "found" && renderFoundPetDetails()}
            {pet.status === "registered" && renderRegisteredPetDetails()}
            {pet.status === "reunited" && renderReunitedPetDetails()}
            {pet.status === "found_by_community" && renderFoundByCommunityDetails()}

            {/* Action buttons */}
            {isOwner && (
              <div className="flex gap-4 mt-8 pt-6 border-t">
                <button 
                  onClick={() => navigate(`/pet/${id}/edit`)} 
                  className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors"
                >
                  Edit Pet
                </button>
                <button 
                  onClick={handleDelete} 
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Delete Pet
                </button>
              </div>
            )}

            {/* Status change buttons for registered pets */}
            {isOwner && pet.status === "registered" && (
              <div className="flex gap-4 mt-6 pt-6 border-t">
                <button 
                  onClick={() => navigate(`/pet/${id}/change-status`, { state: { currentStatus: "lost" } })}
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Report as Lost
                </button>
                <button 
                  onClick={() => navigate(`/pet/${id}/change-status`, { state: { currentStatus: "found" } })}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Report as Found
                </button>
              </div>
            )}

            {/* Reunion buttons for lost/found pets */}
            {isOwner && pet.status === "lost" && (
              <div className="flex gap-4 mt-6 pt-6 border-t">
                <button 
                  onClick={handleMarkAsFound}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Mark as Found
                </button>
              </div>
            )}

            {isOwner && pet.status === "found_by_community" && (
              <div className="flex gap-4 mt-6 pt-6 border-t">
                <button 
                  onClick={handleMarkAsReunited}
                  className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600 transition-colors"
                >
                  Mark as Reunited
                </button>
              </div>
            )}

            {isOwner && pet.status === "found" && (
              <div className="flex gap-4 mt-6 pt-6 border-t">
                <button 
                  onClick={handleMarkAsReunited}
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Mark as Reunited
                </button>
              </div>
            )}

            {/* Buttons for reunited pets to be marked as lost/found again */}
            {isOwner && pet.status === "reunited" && (
              <div className="flex gap-4 mt-6 pt-6 border-t">
                <button 
                  onClick={handleMarkReunitedAsLost}
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Mark as Lost Again
                </button>
                <button 
                  onClick={handleMarkReunitedAsFound}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Mark as Found Again
                </button>
              </div>
            )}

            {/* Contact buttons for lost/found pets */}
            {!isOwner && (pet.status === "lost" || pet.status === "found") && (
              <div className="flex gap-4 mt-8 pt-6 border-t">
                <button 
                  onClick={() => window.open(`tel:${pet.contactPhone}`)}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Call {pet.status === "lost" ? "Owner" : "Finder"}
                </button>
                {pet.contactEmail && (
                  <button 
                    onClick={() => window.open(`mailto:${pet.contactEmail}`)}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Send Email
                  </button>
                )}
              </div>
            )}

            {/* Mark as Found button for non-owners (when pet is lost) */}
            {!isOwner && pet.status === "lost" && (
              <div className="flex gap-4 mt-6 pt-6 border-t">
                <button 
                  onClick={() => navigate(`/pet/${id}/mark-found`, { 
                    state: { 
                      petData: pet,
                      isFinder: true 
                    } 
                  })}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  I Found This Pet
                </button>
              </div>
            )}

            {/* Reunited Request Buttons */}
            {reunitedRequest && (
              <div className="flex gap-4 mt-6 pt-6 border-t">
                {reunitedRequest.status === "pending" && (
                  <>
                    <button 
                      onClick={() => handleReunitedRequest("approve")}
                      className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                      Approve Reunited Request
                    </button>
                    <button 
                      onClick={() => handleReunitedRequest("reject")}
                      className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                      Reject Reunited Request
                    </button>
                  </>
                )}
                {reunitedRequest.status === "approved" && (
                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                    <h3 className="text-xl font-semibold text-purple-700 mb-4">Reunited Request Status</h3>
                    <p>This pet has been successfully reunited with its owner.</p>
                  </div>
                )}
                {reunitedRequest.status === "rejected" && (
                  <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <h3 className="text-xl font-semibold text-red-700 mb-4">Reunited Request Status</h3>
                    <p>This pet's reunited request has been rejected.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetails; 