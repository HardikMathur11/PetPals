import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import PetCard from "../components/PetCard";
import { Link } from "react-router-dom";

function Home() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      const querySnapshot = await getDocs(collection(db, "pets"));
      setPets(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPets();
  }, []);

  const filteredPets = pets.filter(
    pet =>
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.breed.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-center mb-2">Welcome to PetPals</h1>
          <p className="text-center text-gray-600 mb-6">
            Find adorable pets looking for loving homes. Browse through our collection of registered pets.
          </p>
          <div className="mb-4 flex flex-col items-center">
            <input
              type="text"
              placeholder="Search pets by name or breed..."
              className="w-full max-w-xl px-4 py-2 border rounded shadow"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="mt-2 text-gray-700">Total Pets Registered: <span className="font-bold">{pets.length}</span></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {filteredPets.map(pet => (
              <PetCard key={pet.id} pet={pet} isOwner={false} />
            ))}
          </div>
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
                Connecting loving homes with adorable pets. Find your perfect companion today!
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
            <p>&copy; 2025 PetPals. All rights reserved. | Made with ❤️ for pets and their humans</p>
            <p className="mt-2 text-sm">
              PetPals is not responsible for any pet adoption outcomes. Please ensure proper care and attention for your pets.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home; 