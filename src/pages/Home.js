import React, { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import PetCard from "../components/PetCard";
import LostPetCardCompact from "../components/LostPetCardCompact";
import FoundPetCardCompact from "../components/FoundPetCardCompact";
import { Link } from "react-router-dom";

function Home() {
  const [user] = useAuthState(auth);
  const [pets, setPets] = useState([]);
  const [userPets, setUserPets] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all, lost, found, registered

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pets"));
        setPets(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching pets:", error);
        // Set empty array to prevent further errors
        setPets([]);
      }
    };
    fetchPets();
  }, []);

  useEffect(() => {
    const fetchUserPets = async () => {
      if (user) {
        try {
          const userQuery = query(collection(db, "pets"), where("ownerId", "==", user.uid));
          const querySnapshot = await getDocs(userQuery);
          setUserPets(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Error fetching user pets:", error);
          setUserPets([]);
        }
      }
    };
    fetchUserPets();
  }, [user]);

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || pet.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusCount = (status) => {
    return pets.filter(pet => pet.status === status).length;
  };

  const getUserPetCount = (status) => {
    return userPets.filter(pet => pet.status === status).length;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto py-8 px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome to PetPals</h1>
            <p className="text-xl text-gray-600 mb-6">
              Connecting lost pets with their loving families. Together, we can bring every pet home.
            </p>
          </div>

          {/* User's Pets Section */}
          {user && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Pets</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-red-700">Your Lost Pets</h3>
                      <p className="text-red-600 text-sm">{getUserPetCount("lost")} pets</p>
                    </div>
                    <div className="text-2xl font-bold text-red-500">{getUserPetCount("lost")}</div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-green-700">Your Found Pets</h3>
                      <p className="text-green-600 text-sm">{getUserPetCount("found")} pets</p>
                    </div>
                    <div className="text-2xl font-bold text-green-500">{getUserPetCount("found")}</div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-700">Your Registered Pets</h3>
                      <p className="text-blue-600 text-sm">{getUserPetCount("registered")} pets</p>
                    </div>
                    <div className="text-2xl font-bold text-blue-500">{getUserPetCount("registered")}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-red-500">{getStatusCount("lost")}</div>
              <div className="text-gray-600">Lost Pets</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-green-500">{getStatusCount("found")}</div>
              <div className="text-gray-600">Found Pets</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-500">{getStatusCount("registered")}</div>
              <div className="text-gray-600">Registered Pets</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-purple-500">{pets.length}</div>
              <div className="text-gray-600">Total Pets</div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder="Search pets by name or breed..."
                className="flex-1 px-4 py-2 border rounded shadow"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="px-4 py-2 border rounded shadow"
              >
                <option value="all">All Pets</option>
                <option value="lost">Lost Pets</option>
                <option value="found">Found Pets</option>
                <option value="registered">Registered Pets</option>
              </select>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-semibold text-red-700 mb-3">Lost Your Pet?</h3>
              <p className="text-red-600 mb-4">Don't panic! Report your lost pet immediately to increase chances of finding them.</p>
              <div className="flex gap-2">
                <Link to="/lost-pet" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Report Lost Pet
                </Link>
                <Link to="/lost-pets" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  View Lost Pets
                </Link>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Found a Pet?</h3>
              <p className="text-green-600 mb-4">Help reunite a lost pet with their family. Report found pets here.</p>
              <div className="flex gap-2">
                <Link to="/found-pet" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Report Found Pet
                </Link>
                <Link to="/found-pets" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  View Found Pets
                </Link>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Register Your Pet</h3>
              <p className="text-blue-600 mb-4">Pre-register your pet to make recovery easier if they ever get lost.</p>
              <Link to="/register-pet" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Register Pet
              </Link>
            </div>
          </div>

          {/* Pets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPets.map(pet => {
              if (pet.status === "lost") {
                return <LostPetCardCompact key={pet.id} pet={pet} />;
              } else if (pet.status === "found") {
                return <FoundPetCardCompact key={pet.id} pet={pet} />;
              } else {
                return <PetCard key={pet.id} pet={pet} isOwner={false} />;
              }
            })}
          </div>

          {filteredPets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No pets found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4">PetPals</h3>
              <p className="text-gray-300 mb-4">
                Helping lost pets find their way home. Join our community to reunite pets with their families.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white flex justify-center items-center">
                  <i className="fab fa-facebook"></i> <img src="https://cdn-icons-png.flaticon.com/128/733/733547.png" className="w-[14px] h-[14px] mr-1 " alt="" /> Facebook
                </a>
                <a href="#" className="text-gray-300 hover:text-white flex justify-center items-center">
                  <i className="fab fa-twitter"></i> <img src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png" className="w-[14px] h-[14px] mr-1 " alt="" /> Twitter
                </a>
                <a href="#" className="text-gray-300 hover:text-white flex justify-center items-center ">
                  <i className="fab fa-instagram"></i> <img src="https://cdn-icons-png.flaticon.com/128/174/174855.png" className="w-[14px] h-[14px] mr-1 " alt="" />  Instagram
                </a>
              </div>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-gray-300">
                <a href="mailto:hardikmathur11@gmail.com" className="block">📧 Email: hardikmathur11@gmail.com</a>
                <a href="tel:+918000763098" className="block">📞 Phone: +91 8000763098</a>
                <a href="https://wa.me/918000763098" className="block">📱 WhatsApp: +91 8000763098</a>
                <span className="block">📍 Address: 123 Pet Street, Animal City, AC 12345</span>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-300">
                <Link to="/about" className="block hover:text-white">About Us</Link>
                <Link to="/how-it-works" className="block hover:text-white">How It Works</Link>
                <Link to="/pet-care-tips" className="block hover:text-white">Pet Care Tips</Link>
                <Link to="/privacy-policy" className="block hover:text-white">Privacy Policy</Link>
                <Link to="/terms-of-service" className="block hover:text-white">Terms of Service</Link>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 PetPals. All rights reserved. | Made with ❤️ for pets and their families</p>
            <p className="mt-2 text-sm">
              PetPals is dedicated to reuniting lost pets with their families. Every pet deserves to be home.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home; 