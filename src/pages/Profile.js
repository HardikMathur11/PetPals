import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

function Profile() {
  const [user] = useAuthState(auth);
  const [petCount, setPetCount] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [newPhotoUrl, setNewPhotoUrl] = useState(null);

  useEffect(() => {
    const fetchPetCount = async () => {
      if (!user) return;
      const q = query(collection(db, "pets"), where("ownerId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      setPetCount(querySnapshot.size);
    };
    fetchPetCount();
  }, [user]);

  useEffect(() => {
    if (user) {
      // Load user profile data from localStorage
      const profileData = localStorage.getItem(`userProfile_${user.uid}`);
      if (profileData) {
        setUserProfile(JSON.parse(profileData));
      }
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(file);
        setNewPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpdate = async () => {
    if (!newPhoto || !user) return;
    
    setLoading(true);
    try {
      // Don't update Firebase Auth photoURL with Base64 (too long)
      // Instead, only update localStorage
      const updatedProfile = { ...userProfile, profilePhotoUrl: newPhotoUrl };
      localStorage.setItem(`userProfile_${user.uid}`, JSON.stringify(updatedProfile));
      setUserProfile(updatedProfile);
      
      setNewPhoto(null);
      setNewPhotoUrl(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating photo:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="text-center mt-10">Please login to view your profile.</div>;
  }

  // Try to get date joined from user metadata
  let dateJoined = "Unknown";
  if (user.metadata && user.metadata.creationTime) {
    dateJoined = new Date(user.metadata.creationTime).toLocaleDateString();
  }

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "Not provided";
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Get profile photo - prioritize localStorage over Firebase Auth
  const profilePhoto = userProfile?.profilePhotoUrl || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.firstName || user.displayName || "User")}&background=random`;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Profile Photo Section */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img 
                src={profilePhoto} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <label className="cursor-pointer text-white text-sm">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    Change Photo
                  </label>
                </div>
              )}
            </div>
            
            {isEditing && newPhotoUrl && (
              <div className="mt-4 text-center">
                <img 
                  src={newPhotoUrl} 
                  alt="New Photo Preview" 
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-2"
                />
                <button
                  onClick={handlePhotoUpdate}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? "Updating..." : "Save Photo"}
                </button>
              </div>
            )}
            
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700"
              >
                Edit Photo
              </button>
            )}
          </div>

          {/* Profile Information */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Welcome, {userProfile?.firstName || user.displayName || "Pet Lover"}!
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-700">Full Name:</span>
                    <p className="text-gray-600">
                      {userProfile?.firstName && userProfile?.lastName 
                        ? `${userProfile.firstName} ${userProfile.lastName}`
                        : user.displayName || "Not provided"
                      }
                    </p>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-700">Email:</span>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-700">Date of Birth:</span>
                    <p className="text-gray-600">
                      {userProfile?.dateOfBirth 
                        ? `${new Date(userProfile.dateOfBirth).toLocaleDateString()} (Age: ${calculateAge(userProfile.dateOfBirth)})`
                        : "Not provided"
                      }
                    </p>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-700">Date Joined:</span>
                    <p className="text-gray-600">{dateJoined}</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">Address Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-700">Address:</span>
                    <p className="text-gray-600">{userProfile?.address || "Not provided"}</p>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-700">City:</span>
                    <p className="text-gray-600">{userProfile?.city || "Not provided"}</p>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-700">Country:</span>
                    <p className="text-gray-600">{userProfile?.country || "Not provided"}</p>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-700">Pets Registered:</span>
                    <p className="text-gray-600">{petCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">Account Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                  Edit Profile
                </button>
                <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                  View My Pets
                </button>
                <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
                  Account Settings
                </button>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-semibold">
                Thank you for being a part of PetPals! 🐾
              </p>
              <p className="text-blue-600 text-sm mt-1">
                You've registered {petCount} pet{petCount !== 1 ? 's' : ''} and helped {petCount} companion{petCount !== 1 ? 's' : ''} find loving homes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 