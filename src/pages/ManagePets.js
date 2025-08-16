import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { collection, getDocs, deleteDoc, doc, query, where, updateDoc } from "firebase/firestore";
import PetCard from "../components/PetCard";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function ManagePets() {
  const [user] = useAuthState(auth);
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [reunitedRequests, setReunitedRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchPets = async () => {
      try {
        console.log("Fetching pets for user:", user.uid, user.email);
        
        // Get pets owned by user
        const ownedQuery = query(collection(db, "pets"), where("ownerId", "==", user.uid));
        const ownedSnapshot = await getDocs(ownedQuery);
        const ownedPets = ownedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Owned pets:", ownedPets.length, ownedPets);
        
        // Get pets found by user
        const foundQuery = query(collection(db, "pets"), where("finderId", "==", user.uid));
        const foundSnapshot = await getDocs(foundQuery);
        const foundPets = foundSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Found pets:", foundPets.length, foundPets);
        
        // Combine and remove duplicates
        const allPets = [...ownedPets, ...foundPets];
        const uniquePets = allPets.filter((pet, index, self) => 
          index === self.findIndex(p => p.id === pet.id)
        );
        
        console.log("Total unique pets:", uniquePets.length, uniquePets);
        
        // Debug: Get ALL pets in database to see what's there
        const allPetsQuery = await getDocs(collection(db, "pets"));
        const allPetsInDB = allPetsQuery.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("ALL pets in database:", allPetsInDB.length, allPetsInDB);
        
        // Find pets that should belong to this user but aren't showing
        const userPetsInDB = allPetsInDB.filter(pet => 
          pet.ownerId === user.uid || pet.finderId === user.uid
        );
        console.log("User pets found in ALL pets:", userPetsInDB.length, userPetsInDB);
        
        setPets(uniquePets);
      } catch (error) {
        console.error("Error fetching pets:", error);
        alert("Error fetching pets: " + error.message);
      }
    };

    const fetchReunitedRequests = async () => {
      try {
        // Get requests where user is the owner (received requests)
        const receivedQuery = query(collection(db, "reunitedRequests"), where("originalOwnerId", "==", user.uid));
        const receivedSnapshot = await getDocs(receivedQuery);
        const receivedRequests = receivedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Get requests where user is the finder (sent requests)
        const sentQuery = query(collection(db, "reunitedRequests"), where("finderId", "==", user.uid));
        const sentSnapshot = await getDocs(sentQuery);
        const sentRequests = sentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setReunitedRequests([...receivedRequests, ...sentRequests]);
      } catch (error) {
        console.error("Error fetching reunited requests:", error);
      }
    };

    fetchPets();
    fetchReunitedRequests();
  }, [user]);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredPets(pets);
    } else if (statusFilter === "registered") {
      setFilteredPets(pets.filter(pet => pet.status === "registered"));
    } else {
      setFilteredPets(pets.filter(pet => pet.status === statusFilter));
    }
  }, [pets, statusFilter]);

  const handleEdit = (pet) => {
    navigate(`/pet/${pet.id}/edit`);
  };

  const handleDelete = async (petId) => {
    const confirmed = confirm("Are you sure you want to delete this pet?");
    if (confirmed) {
      try {
    await deleteDoc(doc(db, "pets", petId));
        alert("Pet deleted successfully");
        // Only update state if deletion was successful
    setPets(pets.filter(pet => pet.id !== petId));
      } catch (error) {
        alert("Failed to delete pet: " + error.message);
      }
    }
  };

  const handleReunitedRequest = async (requestId, action) => {
    try {
      const requestRef = doc(db, "reunitedRequests", requestId);
      const request = reunitedRequests.find(r => r.id === requestId);
      
      if (action === "approve") {
        // Update request status
        await updateDoc(requestRef, { status: "approved" });
        
        // Update pet status to reunited
        const petRef = doc(db, "pets", request.petId);
        await updateDoc(petRef, { status: "reunited" });
        
        alert("Reunited request approved! Pet status updated to reunited.");
      } else if (action === "reject") {
        await updateDoc(requestRef, { status: "rejected" });
        alert("Reunited request rejected.");
      }
      
      // Refresh requests
      const updatedRequests = reunitedRequests.map(r => 
        r.id === requestId ? { ...r, status: action === "approve" ? "approved" : "rejected" } : r
      );
      setReunitedRequests(updatedRequests);
      
    } catch (error) {
      alert("Error updating request: " + error.message);
    }
  };

  const getStatusCount = (status) => {
    if (status === "lost") {
      // Count both lost and found_by_community as "lost" for display
      return pets.filter(pet => 
        pet.status === "lost" || pet.status === "found_by_community"
      ).length;
    }
    return pets.filter(pet => pet.status === status).length;
  };

  const getPendingRequestsCount = () => {
    return reunitedRequests.filter(req => req.status === "pending").length;
  };

  if (!user) {
    return <div className="text-center mt-10">Please login to manage your pets.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Debug Info - Remove this after fixing the issue */}
     

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Your Pets</h2>
        <Link to="/register-pet" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Register Pet</Link>
      </div>

      {/* Status Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{getStatusCount("registered")}</div>
          <div className="text-sm text-blue-700">Registered</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">{getStatusCount("lost")}</div>
          <div className="text-sm text-red-700">Lost</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{getStatusCount("found")}</div>
          <div className="text-sm text-green-700">Found</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{getStatusCount("reunited")}</div>
          <div className="text-sm text-purple-700">Reunited</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{getPendingRequestsCount()}</div>
          <div className="text-sm text-orange-700">Pending Requests</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-600">{pets.length}</div>
          <div className="text-sm text-gray-700">Total</div>
        </div>
      </div>

      {/* Reunited Requests Section */}
      {getPendingRequestsCount() > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-yellow-800 mb-4">Pending Reunited Requests</h3>
          <div className="space-y-4">
            {reunitedRequests
              .filter(req => req.status === "pending")
              .map(request => (
                <div key={request.id} className="bg-white p-4 rounded-lg border border-yellow-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">
                        {request.originalOwnerId === user.uid 
                          ? `Someone found your pet!` 
                          : `You found a pet!`
                        }
                      </p>
                      <p className="text-sm text-gray-600">
                        Found on: {request.foundDate} at {request.foundLocation}
                      </p>
                      <p className="text-sm text-gray-600">
                        Current location: {request.currentLocation}
                      </p>
                      {request.originalOwnerId === user.uid && (
                        <p className="text-sm text-gray-600">
                          Found by: {request.finderName} ({request.finderEmail})
                        </p>
                      )}
                    </div>
                    {request.originalOwnerId === user.uid && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReunitedRequest(request.id, "approve")}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReunitedRequest(request.id, "reject")}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-4 py-2 rounded transition-colors ${
            statusFilter === "all" 
              ? "bg-gray-600 text-white" 
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All ({pets.length})
        </button>
        <button
          onClick={() => setStatusFilter("registered")}
          className={`px-4 py-2 rounded transition-colors ${
            statusFilter === "registered" 
              ? "bg-blue-600 text-white" 
              : "bg-blue-200 text-blue-700 hover:bg-blue-300"
          }`}
        >
          Registered ({getStatusCount("registered")})
        </button>
        <button
          onClick={() => setStatusFilter("lost")}
          className={`px-4 py-2 rounded transition-colors ${
            statusFilter === "lost" 
              ? "bg-red-600 text-white" 
              : "bg-red-200 text-red-700 hover:bg-red-300"
          }`}
        >
          Lost ({getStatusCount("lost")})
        </button>
        <button
          onClick={() => setStatusFilter("found")}
          className={`px-4 py-2 rounded transition-colors ${
            statusFilter === "found" 
              ? "bg-green-600 text-white" 
              : "bg-green-200 text-green-700 hover:bg-green-300"
          }`}
        >
          Found ({getStatusCount("found")})
        </button>
        <button
          onClick={() => setStatusFilter("reunited")}
          className={`px-4 py-2 rounded transition-colors ${
            statusFilter === "reunited" 
              ? "bg-purple-600 text-white" 
              : "bg-purple-200 text-purple-700 hover:bg-purple-300"
          }`}
        >
          Reunited ({getStatusCount("reunited")})
        </button>
      </div>

      {/* Pets Grid */}
      {filteredPets.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">
            {statusFilter === "all" 
              ? "You haven't added any pets yet." 
              : `No ${statusFilter} pets found.`
            }
          </div>
          {statusFilter === "all" && (
      <button
        onClick={() => navigate("/pet/new")}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
              Add Your First Pet
      </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPets.map(pet => (
            <PetCard 
              key={pet.id} 
              pet={pet} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
              isOwner={pet.ownerId === user.uid}
              currentUserId={user.uid}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ManagePets; 