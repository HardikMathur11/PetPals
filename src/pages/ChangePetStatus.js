import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { db, auth } from "../utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function ChangePetStatus() {
  const { id } = useParams();
  const location = useLocation();
  const newStatus = location.state?.currentStatus; // "lost" or "found"
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    // Lost pet fields
    lastSeenDate: "",
    lastSeenTime: "",
    lastSeenLocation: "",
    reward: "",
    
    // Found pet fields
    foundDate: "",
    foundTime: "",
    foundLocation: "",
    currentLocation: "",
    
    // Contact fields
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
          
          // Pre-fill contact info from pet data
          setFormData(prev => ({
            ...prev,
            contactName: petData.ownerName || user?.displayName || "",
            contactPhone: petData.emergencyPhone || "",
            contactEmail: petData.emergencyEmail || user?.email || ""
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

    if (!user || !pet) {
      setError("Authentication error");
      setSubmitting(false);
      return;
    }

    if (pet.ownerId !== user.uid) {
      setError("You can only update your own pets");
      setSubmitting(false);
      return;
    }

    try {
      const updateData = {
        status: newStatus,
        updatedAt: new Date()
      };

      if (newStatus === "lost") {
        updateData.lastSeenDate = formData.lastSeenDate;
        updateData.lastSeenTime = formData.lastSeenTime;
        updateData.lastSeenLocation = formData.lastSeenLocation;
        updateData.reward = formData.reward;
        updateData.contactName = formData.contactName;
        updateData.contactPhone = formData.contactPhone;
        updateData.contactEmail = formData.contactEmail;
      } else if (newStatus === "found") {
        updateData.foundDate = formData.foundDate;
        updateData.foundTime = formData.foundTime;
        updateData.foundLocation = formData.foundLocation;
        updateData.currentLocation = formData.currentLocation;
        updateData.contactName = formData.contactName;
        updateData.contactPhone = formData.contactPhone;
        updateData.contactEmail = formData.contactEmail;
      }

      await updateDoc(doc(db, "pets", id), updateData);
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

  if (!newStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid Request</h2>
          <p className="text-gray-600 mb-4">Please select whether to mark the pet as lost or found.</p>
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

  if (!user || pet.ownerId !== user.uid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You can only update your own pets.</p>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {newStatus === "lost" ? "Mark Pet as Lost" : "Mark Pet as Found"}
            </h1>
            <p className="text-gray-600">
              {newStatus === "lost" 
                ? "Update your pet's status to help others find them."
                : "Update your pet's status to help reunite them with their family."
              }
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
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {newStatus === "lost" ? (
              <>
                {/* Last Seen Information */}
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h2 className="text-xl font-semibold text-red-700 mb-4">Last Seen Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="date"
                      name="lastSeenDate"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-red-500"
                      value={formData.lastSeenDate}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="time"
                      name="lastSeenTime"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-red-500"
                      value={formData.lastSeenTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <textarea
                    name="lastSeenLocation"
                    placeholder="Last Seen Location (Street, City, Landmarks) *"
                    className="w-full mt-4 px-4 py-2 border rounded focus:outline-none focus:border-red-500"
                    value={formData.lastSeenLocation}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </div>

                {/* Reward */}
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h2 className="text-xl font-semibold text-yellow-700 mb-4">Reward (Optional)</h2>
                  <input
                    type="text"
                    name="reward"
                    placeholder="Reward Amount (e.g., $100)"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:border-yellow-500"
                    value={formData.reward}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <>
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
                    placeholder="Where was the pet found? (Street, City, Landmarks) *"
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
              </>
            )}

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="contactName"
                  placeholder="Contact Name *"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-gray-500"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="contactPhone"
                  placeholder="Phone Number *"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-gray-500"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="contactEmail"
                  placeholder="Email Address"
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
                className={`px-6 py-2 rounded text-white transition-colors ${
                  newStatus === "lost" 
                    ? "bg-red-500 hover:bg-red-600" 
                    : "bg-green-500 hover:bg-green-600"
                } disabled:bg-gray-400`}
              >
                {submitting ? "Updating..." : `Mark as ${newStatus === "lost" ? "Lost" : "Found"}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePetStatus; 