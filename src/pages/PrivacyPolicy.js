import React from "react";
import { Link } from "react-router";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl">How we protect and handle your information</p>
          <p className="text-sm mt-2">Last updated: January 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Introduction</h2>
          <p className="text-lg text-gray-600 mb-4">
            At PetPals, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
            pet adoption platform.
          </p>
          <p className="text-lg text-gray-600">
            By using PetPals, you agree to the collection and use of information in accordance with this policy. 
            If you have any questions about this Privacy Policy, please contact us.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Information We Collect</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Personal Information</h3>
              <p className="text-gray-600 mb-3">When you create an account or use our services, we may collect:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Name and contact information (email, phone number)</li>
                <li>Account credentials and profile information</li>
                <li>Pet information and photos you upload</li>
                <li>Communication preferences</li>
                <li>Location information (if you choose to share it)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-600">Usage Information</h3>
              <p className="text-gray-600 mb-3">We automatically collect certain information when you use our platform:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Device information and IP address</li>
                <li>Browser type and operating system</li>
                <li>Pages visited and time spent on our site</li>
                <li>Search queries and interactions</li>
                <li>Error logs and performance data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Cookies and Tracking</h3>
              <p className="text-gray-600 mb-3">We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze site usage and improve performance</li>
                <li>Provide personalized content and recommendations</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Information */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">How We Use Your Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Service Provision</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Create and manage your account</li>
                <li>Process pet listings and adoptions</li>
                <li>Facilitate communication between users</li>
                <li>Provide customer support</li>
                <li>Send important service updates</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-600">Improvement & Analytics</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Analyze usage patterns and trends</li>
                <li>Improve our platform and services</li>
                <li>Develop new features and functionality</li>
                <li>Conduct research and surveys</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Information Sharing */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Information Sharing and Disclosure</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-orange-600">When We Share Information</h3>
              <p className="text-gray-600 mb-3">We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
                <li><strong>Service providers:</strong> With trusted third-party services that help us operate our platform</li>
                <li><strong>Legal requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Public information:</strong> Pet listings and profiles are publicly visible</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-red-600">What We Don't Share</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Your personal contact information without consent</li>
                <li>Account passwords or security credentials</li>
                <li>Private messages between users</li>
                <li>Financial information (we don't collect payment data)</li>
                <li>Location data unless you choose to share it</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Data Security</h2>
          
          <div className="space-y-4">
            <p className="text-lg text-gray-600">
              We implement appropriate technical and organizational measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-green-600">Security Measures</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                  <li>Secure hosting and infrastructure</li>
                  <li>Employee training on data protection</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Your Responsibilities</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Keep your account credentials secure</li>
                  <li>Don't share your login information</li>
                  <li>Log out when using shared devices</li>
                  <li>Report suspicious activity immediately</li>
                  <li>Use strong, unique passwords</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Rights and Choices</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Access and Control</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access your personal information</li>
                <li>Update or correct your data</li>
                <li>Delete your account and data</li>
                <li>Download your information</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-indigo-600">Privacy Settings</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Control profile visibility</li>
                <li>Manage notification preferences</li>
                <li>Choose what information to share</li>
                <li>Set communication preferences</li>
                <li>Control cookie settings</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Children's Privacy</h2>
          <p className="text-lg text-gray-600 mb-4">
            PetPals is not intended for children under 13 years of age. We do not knowingly collect personal information 
            from children under 13. If you are a parent or guardian and believe your child has provided us with personal 
            information, please contact us immediately.
          </p>
          <p className="text-lg text-gray-600">
            If you are between 13 and 18 years old, please have your parent or guardian review this Privacy Policy 
            and give their consent before using our services.
          </p>
        </div>

        {/* International Users */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">International Users</h2>
          <p className="text-lg text-gray-600 mb-4">
            PetPals is operated from India. If you are accessing our services from outside India, please be aware that 
            your information may be transferred to, stored, and processed in India where our servers are located.
          </p>
          <p className="text-lg text-gray-600">
            By using our services, you consent to the transfer of your information to India and the use and disclosure 
            of your information as described in this Privacy Policy.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Changes to This Privacy Policy</h2>
          <p className="text-lg text-gray-600 mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other 
            operational, legal, or regulatory reasons. We will notify you of any material changes by:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
            <li>Posting the updated policy on our website</li>
            <li>Sending you an email notification</li>
            <li>Displaying a notice on our platform</li>
          </ul>
          <p className="text-lg text-gray-600 mt-4">
            Your continued use of PetPals after any changes indicates your acceptance of the updated Privacy Policy.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-indigo-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-xl mb-6">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="space-y-2 text-lg">
            <p>📧 Email: privacy@petpals.com</p>
            <p>📞 Phone: +91 8000763098</p>
            <p>📍 Address: 123 Pet Street, Animal City, AC 12345</p>
          </div>
          <div className="mt-6">
            <Link to="/" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy; 