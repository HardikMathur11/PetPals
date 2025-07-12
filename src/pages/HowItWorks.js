import React from "react";
import { Link } from "react-router";

function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">How PetPals Works</h1>
          <p className="text-xl">Simple steps to find your perfect companion</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Overview */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Getting Started</h2>
          <p className="text-lg text-gray-600 mb-4">
            PetPals makes finding your perfect pet companion simple and enjoyable. Our platform connects loving families 
            with adorable pets in need of homes. Here's how the process works:
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Create Your Account</h3>
                <p className="text-lg text-gray-600 mb-4">
                  Start by creating a free PetPals account. Simply provide your basic information and verify your email. 
                  This helps us ensure a safe and trusted community for both pets and families.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">What you'll need:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Valid email address</li>
                    <li>Your full name</li>
                    <li>Secure password</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-start">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Browse Available Pets</h3>
                <p className="text-lg text-gray-600 mb-4">
                  Explore our extensive database of pets looking for homes. Use our search filters to find pets that match 
                  your preferences - from breed and age to size and personality traits.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Search filters include:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Pet type (Dog, Cat, Bird, etc.)</li>
                    <li>Breed and age</li>
                    <li>Size and energy level</li>
                    <li>Location and availability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-start">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Learn About Your Pet</h3>
                <p className="text-lg text-gray-600 mb-4">
                  Click on any pet to view their detailed profile. You'll find comprehensive information including photos, 
                  personality traits, medical history, and care requirements.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Profile information includes:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>High-quality photos and videos</li>
                    <li>Detailed personality description</li>
                    <li>Medical history and vaccinations</li>
                    <li>Care requirements and special needs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-start">
              <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Contact the Owner</h3>
                <p className="text-lg text-gray-600 mb-4">
                  Once you've found a pet you're interested in, reach out to the current owner through our secure messaging 
                  system. Ask questions, arrange meetings, and get to know each other.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Communication features:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Secure in-app messaging</li>
                    <li>Photo and video sharing</li>
                    <li>Meeting scheduling tools</li>
                    <li>Document sharing for adoption</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-start">
              <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6">
                5
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Meet and Adopt</h3>
                <p className="text-lg text-gray-600 mb-4">
                  Arrange a meeting with the pet and current owner. This is your chance to ensure it's a perfect match. 
                  Once both parties are satisfied, complete the adoption process with our guidance.
                </p>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Adoption process:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>In-person meeting with the pet</li>
                    <li>Adoption agreement signing</li>
                    <li>Transfer of pet records</li>
                    <li>Post-adoption support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Tips for Success</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">For Pet Seekers</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Be honest about your lifestyle and experience</li>
                <li>Ask detailed questions about the pet's needs</li>
                <li>Consider all costs including food, vet care, and supplies</li>
                <li>Take your time to make the right decision</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-600">For Pet Owners</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide accurate and detailed information</li>
                <li>Share recent photos and videos</li>
                <li>Be transparent about any health or behavior issues</li>
                <li>Stay patient and choose the right family</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-green-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-xl mb-6">
            Join thousands of happy families who found their perfect companion through PetPals!
          </p>
          <div className="space-x-4">
            <Link to="/register" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Create Account
            </Link>
            <Link to="/" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Browse Pets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks; 