import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import FoundPetCard from "../components/FoundPetCard";
import { Link } from "react-router-dom";

function FoundPets() {
  const [foundPets, setFoundPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterBreed, setFilterBreed] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    const fetchFoundPets = async () => {
      try {
        const q = query(collection(db, "pets"), where("status", "==", "found"));
        const querySnapshot = await getDocs(q);
        const pets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFoundPets(pets);
      } catch (error) {
        console.error("Error fetching found pets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoundPets();
  }, []);

  const filteredPets = foundPets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(search.toLowerCase()) ||
                         pet.description.toLowerCase().includes(search.toLowerCase());
    const matchesBreed = !filterBreed || pet.breed.toLowerCase().includes(filterBreed.toLowerCase());
    const matchesLocation = !filterLocation || pet.foundLocation.toLowerCase().includes(filterLocation.toLowerCase());
    
    return matchesSearch && matchesBreed && matchesLocation;
  });

  const uniqueBreeds = [...new Set(foundPets.map(pet => pet.breed).filter(Boolean))];
  const uniqueLocations = [...new Set(foundPets.map(pet => pet.foundLocation).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading found pets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-4">Found Pets</h1>
          <p className="text-xl text-gray-600 mb-6">
            These pets have been found and are looking for their families. If you recognize any of these pets, please contact the finder.
          </p>
          <Link 
            to="/found-pet" 
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Report a Found Pet
          </Link>
        </div>

        {/* Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-green-500">{foundPets.length}</div>
              <div className="text-gray-600">Total Found Pets</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500">{uniqueBreeds.length}</div>
              <div className="text-gray-600">Different Breeds</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500">{uniqueLocations.length}</div>
              <div className="text-gray-600">Areas Found</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by name, breed, or description..."
              className="px-4 py-2 border rounded focus:outline-none focus:border-green-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              value={filterBreed}
              onChange={e => setFilterBreed(e.target.value)}
              className="px-4 py-2 border rounded focus:outline-none focus:border-green-500"
            >
              <option value="">All Breeds</option>
              {uniqueBreeds.map(breed => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
            <select
              value={filterLocation}
              onChange={e => setFilterLocation(e.target.value)}
              className="px-4 py-2 border rounded focus:outline-none focus:border-green-500"
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
            Showing {filteredPets.length} of {foundPets.length} found pets
          </p>
        </div>

        {/* Pets Grid */}
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map(pet => (
              <FoundPetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No found pets</h3>
            <p className="text-gray-500 mb-6">
              {search || filterBreed || filterLocation 
                ? "Try adjusting your search criteria." 
                : "No pets have been reported as found recently."
              }
            </p>
            {search || filterBreed || filterLocation && (
              <button 
                onClick={() => {
                  setSearch("");
                  setFilterBreed("");
                  setFilterLocation("");
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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

export default FoundPets; 