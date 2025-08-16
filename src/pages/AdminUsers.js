import React, { useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function AdminUsers() {
  const [user] = useAuthState(auth);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        // Get all pets to extract user information
        const petsQuery = await getDocs(collection(db, "pets"));
        const pets = petsQuery.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Create a map of unique users
        const userMap = new Map();
        
        pets.forEach(pet => {
          if (pet.ownerId && !userMap.has(pet.ownerId)) {
            // Get user profile from localStorage
            const profileData = localStorage.getItem(`userProfile_${pet.ownerId}`);
            const userProfile = profileData ? JSON.parse(profileData) : null;
            
            userMap.set(pet.ownerId, {
              uid: pet.ownerId,
              email: pet.ownerEmail || "Unknown",
              displayName: pet.ownerName || "Unknown",
              firstName: userProfile?.firstName || "Not set",
              lastName: userProfile?.lastName || "Not set",
              phone: userProfile?.emergencyPhone || pet.ownerPhone || "Not set",
              address: userProfile ? `${userProfile.address}, ${userProfile.city}, ${userProfile.country}` : "Not set",
              petCount: 1,
              pets: [pet.name]
            });
          } else if (pet.ownerId) {
            // Update existing user
            const existingUser = userMap.get(pet.ownerId);
            existingUser.petCount += 1;
            existingUser.pets.push(pet.name);
            userMap.set(pet.ownerId, existingUser);
          }
        });
        
        setAllUsers(Array.from(userMap.values()));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">👥 All Users Information</h1>
          
          <div className="mb-4">
            <p className="text-gray-600">Total Users: <span className="font-semibold">{allUsers.length}</span></p>
          </div>

          {allUsers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No users found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Info</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pets</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allUsers.map((userInfo, index) => (
                    <tr key={userInfo.uid} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {userInfo.firstName} {userInfo.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{userInfo.email}</div>
                          <div className="text-xs text-gray-400">Display: {userInfo.displayName}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">{userInfo.phone}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{userInfo.address}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">
                          <span className="font-semibold">{userInfo.petCount}</span> pets
                        </div>
                        <div className="text-xs text-gray-500 max-w-xs truncate">
                          {userInfo.pets.join(", ")}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-xs text-gray-500 font-mono">{userInfo.uid}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Sample Users for Testing */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">📋 Sample Users for Testing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border">
                <div className="font-semibold text-green-600">Test User 1:</div>
                <div>Email: john.doe@example.com</div>
                <div>Name: John Doe</div>
                <div>Phone: +1-555-0123</div>
                <div>Password: test123</div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-semibold text-green-600">Test User 2:</div>
                <div>Email: jane.smith@example.com</div>
                <div>Name: Jane Smith</div>
                <div>Phone: +1-555-0456</div>
                <div>Password: test123</div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-semibold text-green-600">Test User 3:</div>
                <div>Email: mike.wilson@example.com</div>
                <div>Name: Mike Wilson</div>
                <div>Phone: +1-555-0789</div>
                <div>Password: test123</div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-semibold text-green-600">Test User 4:</div>
                <div>Email: sarah.jones@example.com</div>
                <div>Name: Sarah Jones</div>
                <div>Phone: +1-555-0321</div>
                <div>Password: test123</div>
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              💡 Use these credentials to test the app. Register new users or login with existing ones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers; 