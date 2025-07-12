import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ManagePets from "./pages/ManagePets";
import { createRoot } from "react-dom/client";
import PetDetails from "./pages/PetDetails";
import AddEditPet from "./pages/AddEditPet";
import AboutUs from "./pages/AboutUs";
import HowItWorks from "./pages/HowItWorks";
import PetCareTips from "./pages/PetCareTips";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

export default function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
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
        </Routes>
      </div>
    </Router>
  );
}


