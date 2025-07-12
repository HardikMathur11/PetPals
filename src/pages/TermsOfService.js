import React from "react";
import { Link } from "react-router";

function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl">Terms and conditions for using PetPals</p>
          <p className="text-sm mt-2">Last updated: January 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Agreement to Terms</h2>
          <p className="text-lg text-gray-600 mb-4">
            By accessing and using PetPals ("the Service"), you accept and agree to be bound by the terms and provision 
            of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
          <p className="text-lg text-gray-600">
            These Terms of Service ("Terms") govern your use of our website and services. Please read them carefully 
            before using our platform.
          </p>
        </div>

        {/* Service Description */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Service Description</h2>
          <p className="text-lg text-gray-600 mb-4">
            PetPals is a pet adoption platform that connects pet owners with potential adopters. Our services include:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
            <li>Pet listing and profile creation</li>
            <li>Pet search and discovery tools</li>
            <li>User communication and messaging</li>
            <li>Pet care information and resources</li>
            <li>Community features and support</li>
          </ul>
          <p className="text-lg text-gray-600 mt-4">
            We provide the platform and tools, but the actual adoption process is between users. 
            PetPals is not responsible for the outcome of adoptions.
          </p>
        </div>

        {/* User Accounts */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">User Accounts and Registration</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Account Creation</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>You must be at least 18 years old to create an account</li>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>You are responsible for all activities under your account</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-600">Account Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Keep your account information up to date</li>
                <li>Use the service only for lawful purposes</li>
                <li>Respect other users' privacy and rights</li>
                <li>Report any suspicious or inappropriate activity</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* User Conduct */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Acceptable Use and Conduct</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-600">What You May Do</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Create and manage pet listings</li>
                <li>Search and browse available pets</li>
                <li>Communicate with other users</li>
                <li>Share pet care information</li>
                <li>Participate in community discussions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-red-600">What You May Not Do</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Post false or misleading information</li>
                <li>Harass or abuse other users</li>
                <li>Use the service for commercial purposes without permission</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pet Listings */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Pet Listings and Content</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Listing Requirements</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide accurate and complete pet information</li>
                <li>Use clear, recent photos of the pet</li>
                <li>Include honest descriptions of behavior and health</li>
                <li>Update listings when pets are adopted</li>
                <li>Ensure you have the right to list the pet</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-orange-600">Content Guidelines</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>No inappropriate or offensive content</li>
                <li>No copyrighted material without permission</li>
                <li>No spam or commercial advertising</li>
                <li>No personal information of others</li>
                <li>No content that promotes harm or illegal activities</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Content Ownership</h3>
              <p className="text-gray-600">
                You retain ownership of content you post, but grant us a license to use, display, and distribute 
                it on our platform. We may remove content that violates our terms or policies.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy and Data */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Privacy and Data Protection</h2>
          <p className="text-lg text-gray-600 mb-4">
            Your privacy is important to us. Our collection and use of personal information is governed by our 
            Privacy Policy, which is incorporated into these Terms by reference.
          </p>
          <p className="text-lg text-gray-600">
            By using our service, you consent to the collection and use of your information as described in our 
            Privacy Policy.
          </p>
        </div>

        {/* Disclaimers */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Disclaimers and Limitations</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-red-600">Service Availability</h3>
              <p className="text-gray-600">
                We strive to provide reliable service but cannot guarantee uninterrupted access. We may modify, 
                suspend, or discontinue the service at any time without notice.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-orange-600">Adoption Outcomes</h3>
              <p className="text-gray-600">
                PetPals facilitates connections but is not responsible for adoption outcomes. We do not verify 
                the accuracy of user-provided information or guarantee successful adoptions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-600">Pet Health and Safety</h3>
              <p className="text-gray-600">
                We are not responsible for the health, safety, or welfare of pets listed on our platform. 
                Users should conduct their own due diligence and consult with veterinarians.
              </p>
            </div>
          </div>
        </div>

        {/* Liability */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Limitation of Liability</h2>
          <p className="text-lg text-gray-600 mb-4">
            To the maximum extent permitted by law, PetPals shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages, including but not limited to:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-2 mb-4">
            <li>Loss of profits, data, or use</li>
            <li>Damages resulting from pet adoptions</li>
            <li>Injuries to persons or property</li>
            <li>Emotional distress or mental anguish</li>
            <li>Any other damages arising from use of our service</li>
          </ul>
          <p className="text-lg text-gray-600">
            Our total liability shall not exceed the amount you paid us, if any, in the 12 months preceding the claim.
          </p>
        </div>

        {/* Termination */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Termination</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-red-600">Account Termination</h3>
              <p className="text-gray-600">
                We may terminate or suspend your account at any time for violations of these Terms or for any 
                other reason at our sole discretion.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Your Right to Terminate</h3>
              <p className="text-gray-600">
                You may terminate your account at any time by contacting us or using the account deletion feature 
                in your profile settings.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-600">Effect of Termination</h3>
              <p className="text-gray-600">
                Upon termination, your right to use the service ceases immediately. We may retain certain information 
                as required by law or for legitimate business purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Governing Law */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Governing Law and Disputes</h2>
          <p className="text-lg text-gray-600 mb-4">
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes 
            arising from these Terms or your use of the service shall be resolved in the courts of India.
          </p>
          <p className="text-lg text-gray-600">
            We encourage users to resolve disputes amicably. If you have concerns, please contact us before 
            pursuing legal action.
          </p>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Changes to Terms</h2>
          <p className="text-lg text-gray-600 mb-4">
            We reserve the right to modify these Terms at any time. We will notify users of significant changes 
            through our platform or by email.
          </p>
          <p className="text-lg text-gray-600">
            Your continued use of the service after changes become effective constitutes acceptance of the new Terms. 
            If you do not agree to the changes, you should stop using our service.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-teal-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-xl mb-6">
            If you have questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2 text-lg">
            <p>📧 Email: legal@petpals.com</p>
            <p>📞 Phone: +91 8000763098</p>
            <p>📍 Address: 123 Pet Street, Animal City, AC 12345</p>
          </div>
          <div className="mt-6">
            <Link to="/" className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService; 