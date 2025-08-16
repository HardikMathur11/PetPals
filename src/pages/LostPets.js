import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import LostPetCard from "../components/LostPetCard";
import { Link } from "react-router-dom";

function LostPets() {
  const [lostPets, setLostPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterBreed, setFilterBreed] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    const fetchLostPets = async () => {
      try {
        const q = query(collection(db, "pets"), where("status", "==", "lost"));
        const querySnapshot = await getDocs(q);
        const pets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLostPets(pets);
      } catch (error) {
        console.error("Error fetching lost pets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLostPets();
  }, []);

  const filteredPets = lostPets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(search.toLowerCase()) ||
                         pet.description.toLowerCase().includes(search.toLowerCase());
    const matchesBreed = !filterBreed || pet.breed.toLowerCase().includes(filterBreed.toLowerCase());
    const matchesLocation = !filterLocation || pet.lastSeenLocation.toLowerCase().includes(filterLocation.toLowerCase());
    
    return matchesSearch && matchesBreed && matchesLocation;
  });

  const uniqueBreeds = [...new Set(lostPets.map(pet => pet.breed).filter(Boolean))];
  const uniqueLocations = [...new Set(lostPets.map(pet => pet.lastSeenLocation).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lost pets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Lost Pets</h1>
          <p className="text-xl text-gray-600 mb-6">
            Help reunite these lost pets with their families. If you recognize any of these pets, please contact the owner immediately.
          </p>
          <Link 
            to="/lost-pet" 
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Report Your Lost Pet
          </Link>
        </div>

        {/* Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-red-500">{lostPets.length}</div>
              <div className="text-gray-600">Total Lost Pets</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500">{uniqueBreeds.length}</div>
              <div className="text-gray-600">Different Breeds</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500">{uniqueLocations.length}</div>
              <div className="text-gray-600">Areas Affected</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by name, breed, or description..."
              className="px-4 py-2 border rounded focus:outline-none focus:border-red-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              value={filterBreed}
              onChange={e => setFilterBreed(e.target.value)}
              className="px-4 py-2 border rounded focus:outline-none focus:border-red-500"
            >
              <option value="">All Breeds</option>
              {uniqueBreeds.map(breed => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
            <select
              value={filterLocation}
              onChange={e => setFilterLocation(e.target.value)}
              className="px-4 py-2 border rounded focus:outline-none focus:border-red-500"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPets.length} of {lostPets.length} lost pets
          </p>
        </div>

        {/* Pets Grid */}
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map(pet => (
              <LostPetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🐕</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No lost pets found</h3>
            <p className="text-gray-500 mb-6">
              {search || filterBreed || filterLocation 
                ? "Try adjusting your search criteria." 
                : "Great news! No pets are currently reported as lost."
              }
            </p>
            {search || filterBreed || filterLocation && (
              <button 
                onClick={() => {
                  setSearch("");
                  setFilterBreed("");
                  setFilterLocation("");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LostPets; 