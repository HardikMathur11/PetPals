import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ReduxOfflineIndicator from "./components/ReduxOfflineIndicator";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ManagePets from "./pages/ManagePets";
import PetDetails from "./pages/PetDetails";
import AddEditPet from "./pages/AddEditPet";
import AboutUs from "./pages/AboutUs";
import HowItWorks from "./pages/HowItWorks";
import PetCareTips from "./pages/PetCareTips";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import LostPet from "./pages/LostPet";
import FoundPet from "./pages/FoundPet";
import RegisterPet from "./pages/RegisterPet";
import LostPets from "./pages/LostPets";
import FoundPets from "./pages/FoundPets";
import ChangePetStatus from "./pages/ChangePetStatus";
import AdminUsers from "./pages/AdminUsers";
import MarkPetFound from "./pages/MarkPetFound";
import PetaAI from "./pages/petaAI"

export default function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <ReduxOfflineIndicator />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manage-pets" element={<ManagePets />} />
          <Route path="/pet/new" element={<AddEditPet />} />
          <Route path="/pet/:id" element={<PetDetails />} />
          <Route path="/pet/:id/edit" element={<AddEditPet />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pet-care-tips" element={<PetCareTips />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/lost-pet" element={<LostPet />} />
          <Route path="/found-pet" element={<FoundPet />} />
          <Route path="/register-pet" element={<RegisterPet />} />
          <Route path="/lost-pets" element={<LostPets />} />
          <Route path="/found-pets" element={<FoundPets />} />
          <Route path="/pet/:id/change-status" element={<ChangePetStatus />} />
          <Route path="/pet/:id/mark-found" element={<MarkPetFound />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/petaAI" element={<PetaAI />} />
        </Routes>
      </div>
    </Router>
  );
}


