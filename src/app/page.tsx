// src/app/page.tsx
"use client";

import React from 'react';
import CardLineChart from '../components/chart';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">SmartBeehive Dashboard</h1>
      <p className="mt-4 text-lg text-gray-700"> - </p>
      <div className="mt-10 w-full max-w-4xl">
        <CardLineChart />
      </div>
    </div>
  );
};

export default Home;
