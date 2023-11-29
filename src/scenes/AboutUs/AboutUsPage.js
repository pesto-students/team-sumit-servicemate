import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="bg-gray-100 pb-4">
      {/* Hero Section */}
      <div className="bg-gray-300 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg mb-8">Connecting you with trusted home service providers.</p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700">
          We are committed to making your home maintenance and improvement tasks easier. Our platform connects you with reliable and skilled electricians, plumbers, carpenters, and more. Whether you need emergency repairs or want to enhance your home, we have got you covered.
        </p>
      </div>

      {/* How It Works */}
      <div className="bg-white container mx-auto p-8 rounded shadow-md my-8">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="text-gray-700 mb-4">
          1. Enter your location to find a list of nearby home service providers.
        </p>
        <p className="text-gray-700 mb-4">
          2. Browse through profiles, reviews, and services offered by vendors.
        </p>
        <p className="text-gray-700 mb-4">
          3. Contact vendors directly, request quotes, and hire the right professionals.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
