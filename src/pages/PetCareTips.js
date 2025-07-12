import React from "react";
import { Link } from "react-router";

function PetCareTips() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Pet Care Tips</h1>
          <p className="text-xl">Essential information to keep your pets happy and healthy</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Pet Care</h2>
          <p className="text-lg text-gray-600 mb-4">
            Caring for a pet is a rewarding experience that comes with great responsibility. Whether you're a first-time 
            pet owner or an experienced caregiver, these tips will help you provide the best care for your furry, feathered, 
            or scaly friends.
          </p>
          <p className="text-lg text-gray-600">
            Remember, every pet is unique, so always consult with a veterinarian for personalized advice.
          </p>
        </div>

        {/* Dog Care */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">🐕 Dog Care Guide</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Daily Care</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Feed 2-3 times daily with high-quality dog food</li>
                <li>Provide fresh water at all times</li>
                <li>Exercise for 30-60 minutes daily</li>
                <li>Regular potty breaks and walks</li>
                <li>Brush coat regularly (frequency depends on breed)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">Health & Wellness</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Annual veterinary check-ups</li>
                <li>Keep vaccinations up to date</li>
                <li>Regular flea and tick prevention</li>
                <li>Dental care and teeth cleaning</li>
                <li>Monitor for signs of illness</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Training Tips:</h4>
            <p className="text-gray-600">
              Start training early with positive reinforcement. Use treats and praise to reward good behavior. 
              Be consistent with commands and establish clear boundaries.
            </p>
          </div>
        </div>

        {/* Cat Care */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">🐱 Cat Care Guide</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-orange-600">Daily Care</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Feed 2-3 times daily with cat food</li>
                <li>Clean, fresh water in multiple locations</li>
                <li>Clean litter box daily</li>
                <li>Provide scratching posts and toys</li>
                <li>Regular grooming sessions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-600">Health & Wellness</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Annual veterinary check-ups</li>
                <li>Core vaccinations and boosters</li>
                <li>Parasite prevention (fleas, worms)</li>
                <li>Dental health monitoring</li>
                <li>Watch for behavioral changes</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold mb-2">Environmental Enrichment:</h4>
            <p className="text-gray-600">
              Cats need mental stimulation. Provide climbing structures, window perches, interactive toys, 
              and safe outdoor access if possible. Rotate toys to keep them interested.
            </p>
          </div>
        </div>

        {/* Bird Care */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">🦜 Bird Care Guide</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-yellow-600">Daily Care</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Fresh food and water daily</li>
                <li>Clean cage and perches regularly</li>
                <li>Social interaction and playtime</li>
                <li>Safe flight time outside cage</li>
                <li>Monitor temperature and humidity</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">Health & Wellness</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Regular avian veterinary check-ups</li>
                <li>Proper diet with variety</li>
                <li>Clean environment to prevent disease</li>
                <li>Monitor for respiratory issues</li>
                <li>Beak and nail maintenance</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold mb-2">Social Needs:</h4>
            <p className="text-gray-600">
              Birds are highly social creatures. Spend time talking, singing, and playing with your bird daily. 
              Consider getting a companion bird if you're away frequently.
            </p>
          </div>
        </div>

        {/* General Pet Care Tips */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">General Pet Care Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Emergency Preparedness</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Keep emergency vet contact numbers</li>
                <li>Have a pet first-aid kit ready</li>
                <li>Know signs of common emergencies</li>
                <li>Plan for natural disasters</li>
                <li>Keep pet records organized</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">Nutrition Guidelines</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Choose age-appropriate food</li>
                <li>Follow feeding guidelines</li>
                <li>Avoid human food that's toxic</li>
                <li>Monitor weight and adjust portions</li>
                <li>Consult vet for dietary changes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Seasonal Care */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Seasonal Care Guide</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-orange-600">Summer Care</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide shade and cool water</li>
                <li>Never leave pets in hot cars</li>
                <li>Exercise during cooler hours</li>
                <li>Watch for heatstroke signs</li>
                <li>Use pet-safe sunscreen if needed</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Winter Care</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Keep pets warm and dry</li>
                <li>Limit outdoor time in extreme cold</li>
                <li>Check for frostbite on paws</li>
                <li>Provide warm bedding</li>
                <li>Consider pet sweaters for short-haired pets</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Additional Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Veterinary Care</h3>
              <p className="text-gray-600 mb-4">Find trusted veterinarians in your area</p>
              <a href="#" className="text-blue-600 hover:underline">Find a Vet</a>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-600">Pet Supplies</h3>
              <p className="text-gray-600 mb-4">Quality food, toys, and accessories</p>
              <a href="#" className="text-green-600 hover:underline">Shop Supplies</a>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Training Resources</h3>
              <p className="text-gray-600 mb-4">Professional training tips and guides</p>
              <a href="#" className="text-purple-600 hover:underline">Learn More</a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
          <p className="text-xl mb-6">
            Connect with our community of pet lovers for advice and support!
          </p>
          <Link to="/" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Join Our Community
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PetCareTips; 