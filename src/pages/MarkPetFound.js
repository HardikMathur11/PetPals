import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../utils/firebase";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function MarkPetFound() {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    foundDate: "",
    foundTime: "",
    foundLocation: "",
    currentLocation: "",
    contactName: "",
    contactPhone: "",
    contactEmail: ""
  });

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const docRef = doc(db, "pets", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const petData = { id: docSnap.id, ...docSnap.data() };
          setPet(petData);
          
          // Pre-fill contact info from current user
          setFormData(prev => ({
            ...prev,
            contactName: user?.displayName || "",
            contactPhone: "",
            contactEmail: user?.email || ""
          }));
        }
      } catch (error) {
        setError("Failed to load pet information");
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (!user) {
      setError("Please login to mark pet as found");
      setSubmitting(false);
      return;
    }

    try {
      // Get user profile from localStorage
      const userProfileData = localStorage.getItem(`userProfile_${user.uid}`);
      const userProfile = userProfileData ? JSON.parse(userProfileData) : null;

      // Update the original pet to show it's found by community
      const updateData = {
        status: "found_by_community",
        foundDate: formData.foundDate,
        foundTime: formData.foundTime,
        foundLocation: formData.foundLocation,
        currentLocation: formData.currentLocation,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        finderId: user.uid,
        finderName: user.displayName || (userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : "Unknown"),
        finderEmail: user.email,
        finderPhone: userProfile?.emergencyPhone || formData.contactPhone,
        updatedAt: new Date(),
        foundBy: user.uid,
        isFoundByCommunity: true
      };

      await updateDoc(doc(db, "pets", id), updateData);

      // Create a new pet entry in the finder's found pets section
      const foundPetData = {
        name: pet.name || "Unknown",
        breed: pet.breed || "Unknown",
        age: pet.age || null,
        color: pet.color || "Unknown",
        gender: pet.gender || "Unknown",
        description: pet.description || "",
        image: pet.image || pet.imageUrl || null,
        status: "found",
        foundDate: formData.foundDate,
        foundTime: formData.foundTime,
        foundLocation: formData.foundLocation,
        currentLocation: formData.currentLocation,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        finderId: user.uid,
        finderName: user.displayName || (userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : "Unknown"),
        finderEmail: user.email,
        finderPhone: userProfile?.emergencyPhone || formData.contactPhone,
        originalPetId: id, // Reference to original lost pet
        originalOwnerId: pet.ownerId,
        originalOwnerName: pet.ownerName || "Unknown",
        createdAt: new Date(),
        updatedAt: new Date(),
        isFoundByCommunity: true
      };

      // Remove any undefined values to prevent Firestore errors
      Object.keys(foundPetData).forEach(key => {
        if (foundPetData[key] === undefined) {
          delete foundPetData[key];
        }
      });

      await addDoc(collection(db, "pets"), foundPetData);

      // Create reunited request
      const reunitedRequestData = {
        petId: id,
        originalOwnerId: pet.ownerId,
        finderId: user.uid,
        finderName: user.displayName || (userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : "Unknown"),
        finderEmail: user.email,
        finderPhone: userProfile?.emergencyPhone || formData.contactPhone || "",
        status: "pending", // pending, approved, rejected
        requestDate: new Date(),
        foundDate: formData.foundDate,
        foundLocation: formData.foundLocation,
        currentLocation: formData.currentLocation,
        message: `Pet found by ${user.displayName || (userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : "Unknown")}`
      };

      // Remove any undefined values to prevent Firestore errors
      Object.keys(reunitedRequestData).forEach(key => {
        if (reunitedRequestData[key] === undefined) {
          delete reunitedRequestData[key];
        }
      });

      await addDoc(collection(db, "reunitedRequests"), reunitedRequestData);
      
      alert("Pet marked as found successfully! The owner will be notified and reunited request has been sent.");
      navigate(`/pet/${id}`);
    } catch (err) {
      setError("Failed to update pet status. " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pet information...</p>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Pet Not Found</h2>
          <p className="text-gray-600 mb-4">The pet you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (pet.status !== "lost") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid Action</h2>
          <p className="text-gray-600 mb-4">This pet is not currently lost.</p>
          <button 
            onClick={() => navigate(`/pet/${id}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Back to Pet Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-green-700">
              I Found This Pet!
            </h1>
            <p className="text-gray-600">
              Help reunite this pet with their family by providing found information.
            </p>
          </div>

          {/* Pet Info Summary */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Pet Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div><span className="font-semibold">Name:</span> {pet.name}</div>
              <div><span className="font-semibold">Breed:</span> {pet.breed}</div>
              {pet.age && <div><span className="font-semibold">Age:</span> {pet.age} years</div>}
              {pet.color && <div><span className="font-semibold">Color:</span> {pet.color}</div>}
              {pet.ownerName && <div><span className="font-semibold">Owner:</span> {pet.ownerName}</div>}
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Found Information */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Found Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="date"
                  name="foundDate"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={formData.foundDate}
                  onChange={handleChange}
                  required
                />
                <input
                  type="time"
                  name="foundTime"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  value={formData.foundTime}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <textarea
                name="foundLocation"
                placeholder="Where did you find the pet? (Street, City, Landmarks) *"
                className="w-full mt-4 px-4 py-2 border rounded focus:outline-none focus:border-green-500"
                value={formData.foundLocation}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            {/* Current Location */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">Current Location</h2>
              <textarea
                name="currentLocation"
                placeholder="Where is the pet currently? (Your home, shelter, vet, etc.) *"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                value={formData.currentLocation}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="contactName"
                  placeholder="Your Name *"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-gray-500"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="contactPhone"
                  placeholder="Your Phone Number *"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-gray-500"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="contactEmail"
                  placeholder="Your Email Address"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-gray-500"
                  value={formData.contactEmail}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={() => navigate(`/pet/${id}`)}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors disabled:bg-gray-400"
              >
                {submitting ? "Marking as Found..." : "Mark as Found"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MarkPetFound; 