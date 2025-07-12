import React from "react";
import { Link } from "react-router";

function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About PetPals</h1>
          <p className="text-xl">Connecting loving homes with adorable pets since 2024</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 py-12">
        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-4">
            At PetPals, we believe every pet deserves a loving home. Our mission is to create a platform that connects 
            adorable pets with caring families, making the adoption process simple, transparent, and joyful.
          </p>
          <p className="text-lg text-gray-600">
            We're committed to reducing the number of homeless pets by providing a trusted platform where pet lovers 
            can find their perfect companion and give them the love and care they deserve.
          </p>
        </div>

        {/* Vision Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Vision</h2>
          <p className="text-lg text-gray-600 mb-4">
            We envision a world where every pet has a loving home and every family can experience the joy of pet companionship. 
            Through our platform, we aim to:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
            <li>Make pet adoption accessible and straightforward</li>
            <li>Build a community of responsible pet owners</li>
            <li>Provide educational resources for pet care</li>
            <li>Create lasting bonds between pets and families</li>
          </ul>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
          <p className="text-lg text-gray-600 mb-4">
            PetPals was born from a simple idea: making pet adoption easier and more accessible. Our founder, a passionate 
            pet lover, experienced the challenges of finding the right pet and decided to create a solution.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            What started as a small project has grown into a trusted platform that has helped thousands of pets find their 
            forever homes. We're proud of the community we've built and the lives we've touched.
          </p>
          <p className="text-lg text-gray-600">
            Today, PetPals continues to grow, serving pet lovers across the country and making a difference in the lives 
            of both pets and their human companions.
          </p>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Compassion</h3>
              <p className="text-gray-600">We treat every pet with love and respect, understanding their unique needs and personalities.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Transparency</h3>
              <p className="text-gray-600">We believe in honest communication and clear information about every pet's background and needs.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Community</h3>
              <p className="text-gray-600">We foster a supportive community of pet lovers who share knowledge and experiences.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Responsibility</h3>
              <p className="text-gray-600">We promote responsible pet ownership and ensure pets go to caring, prepared homes.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Team</h2>
          <p className="text-lg text-gray-600 mb-6">
            PetPals is powered by a dedicated team of pet lovers, developers, and animal welfare advocates who are 
            committed to making a difference in the lives of pets and their families.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">HD</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hardik Mathur</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">AM</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Amit Kumar</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">SK</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
              <p className="text-gray-600">Pet Care Specialist</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-6">
            Ready to find your perfect companion? Start your journey with PetPals today!
          </p>
          <Link to="/" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Browse Pets
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutUs; 