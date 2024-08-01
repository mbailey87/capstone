import React from 'react';
import heroImage from '../assets/photos/hero.webp';

const HomePage = () => {
  return (
    <div className="text-center">
      <img src={heroImage} alt="Hero" className="w-full h-64 object-cover" />
      <h1 className="text-4xl font-bold my-4 text-purple-700">Welcome to the Student Registration App</h1>
      <p className="text-lg text-gray-700">Easily manage student registrations and courses.</p>
    </div>
  );
};

export default HomePage;
